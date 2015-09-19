var op = {};
exports.op = op;

var CURRENT_VERSION = 15;

function BinaryWriteCursor(writer) {
  this.buffer = new Buffer(1024);
  this.writer = writer;
  this.offset = 0;
}

BinaryWriteCursor.prototype.growToHold = function(space) {
  if (this.offset + space > this.buffer.length) {
    var old = this.buffer;
    this.buffer = new Buffer(old.length * 2);
    old.copy(this.buffer);
  }
};

BinaryWriteCursor.prototype.string = function(str) {
  if (str === undefined) {
    console.trace('undefined string');
    str = '?';
  }
  this.I32(this.writer.stringIndex(str));
};

BinaryWriteCursor.prototype.I32 = function(value) {
  this.growToHold(4);
  this.buffer.writeInt32LE(value, this.offset);
  this.offset += 4;
};

BinaryWriteCursor.prototype.I64 = function(value) {
  this.growToHold(8);
  this.buffer.writeInt32LE(value, this.offset);
  this.buffer.writeInt32LE(0, this.offset + 4);
  this.offset += 8;
};

BinaryWriteCursor.prototype.I16 = function(value) {
  this.growToHold(2);
  this.buffer.writeInt16LE(value, this.offset);
  this.offset += 2;
};

BinaryWriteCursor.prototype.double = function(value) {
  this.growToHold(8);
  this.buffer.writeDoubleLE(value, this.offset);
  this.offset += 8;
};

/* This is the overall serialization loop. It keeps an index into the list of
 * STables and objects in the SC. As we discover new ones, they get added. We
 * finished when we've serialized everything. */
SerializationWriter.prototype.serializationLoop = function() {
  var workTodo = true;

  var sTablesListPos = 0;
  var objectsListPos = 0;
  var contextsListPos = 0;
  while (workTodo) {
    /* Current work list sizes. */
    var sTablesTodo = this.sc.root_stables.length;
    var objectsTodo = this.sc.root_objects.length;
    var contextsTodo = this.contexts.length;

    /* Reset todo flag - if we do some work we'll go round again as it
       * may have generated more. */
    workTodo = false;

    /* Serialize any STables on the todo list. */
    while (sTablesListPos < sTablesTodo) {
      this.serializeSTable(this.sc.root_stables[sTablesListPos]);
      sTablesListPos++;
      workTodo = true;
    }

    /* Serialize any objects on the todo list. */
    while (objectsListPos < objectsTodo) {
      this.serializeObject(this.sc.root_objects[objectsListPos]);
      objectsListPos++;
      workTodo = true;
    }

    /* Serialize any contexts on the todo list. */
    while (contextsListPos < contextsTodo) {
      this.serializeContext(this.contexts[contextsListPos]);
      contextsListPos++;
      workTodo = true;
    }
  }

  /* Finally, serialize repossessions table (this can't make any more
   * work, so is done as a separate step here at the end). */
  this.serializeRepossessions();
};


SerializationWriter.prototype.serializeRepossessions = function() {
    /* TODO */
};

function SerializationWriter(sc, sh) {
  this.dependentSCs = [];
  this.contexts = [];
  this.sc = sc;
  this.sh = sh;
  this.sh.push(null);
  this.numClosures = 0;

  this.stables = new BinaryWriteCursor(this);
  this.stables_data = new BinaryWriteCursor(this);
  this.objects = new BinaryWriteCursor(this);
  this.objects_data = new BinaryWriteCursor(this);
  this.deps = new BinaryWriteCursor(this);
  this.closures = new BinaryWriteCursor(this);
  this.contexts_headers = new BinaryWriteCursor(this);
  this.contexts_data = new BinaryWriteCursor(this);
}

var HEADER_SIZE = 4 * 18;

SerializationWriter.prototype.header_I32 = function(value) {
  this.buffer.writeUInt32LE(value, this.header_offset);
  this.header_offset += 4;
};

SerializationWriter.prototype.writeChunk = function(cursor) {
  if (cursor.offset) {
    cursor.buffer.copy(this.buffer, this.offset, 0, cursor.offset);
  }
  this.offset += cursor.offset;
};

SerializationWriter.prototype.concatenateOutputs = function() {
  var output_size = 0;

  this.header_offset = 0;
  this.offset = HEADER_SIZE;

  /* Calculate total size. */
  output_size += HEADER_SIZE;
  output_size += this.stables.offset;
  output_size += this.stables_data.offset;
  output_size += this.objects.offset;
  output_size += this.objects_data.offset;
  output_size += this.deps.offset;
  output_size += this.closures.offset;
  output_size += this.contexts_data.offset;
  output_size += this.contexts_headers.offset;

  this.buffer = new Buffer(output_size);

  /* Write version into header. */
  this.header_I32(CURRENT_VERSION);

  /* Put dependencies table in place and set location/rows in header. */
  this.header_I32(this.offset);
  this.header_I32(this.dependentSCs.length);


  this.writeChunk(this.deps);

  /* Put STables table in place, and set location/rows in header. */
  this.header_I32(this.offset);
  this.header_I32(this.sc.root_stables.length);

  this.writeChunk(this.stables);

  /* Put STables data in place. */
  this.header_I32(this.offset);

  this.writeChunk(this.stables_data);

  /* Put objects table in place, and set location/rows in header. */

  this.header_I32(this.offset);
  this.header_I32(this.sc.root_objects.length);

  this.writeChunk(this.objects);

  /* Put objects data in place. */
  this.header_I32(this.offset);

  this.writeChunk(this.objects_data);

  /* Put closures table in place, and set location/rows in header. */
  this.header_I32(this.offset);
  this.header_I32(this.numClosures);

  this.writeChunk(this.closures);

  /* Put contexts table in place, and set location/rows in header. */
  this.header_I32(this.offset);
  this.header_I32(this.contexts.length);

  this.writeChunk(this.contexts_headers);

  /* Put contexts data in place. */
  this.header_I32(this.offset);

  this.writeChunk(this.contexts_data);

  /* Put repossessions table in place, and set location/rows in header. */
  this.header_I32(this.offset);
  this.header_I32(this.sc.rep_scs.length);


  //  /* Sanity check. */
  if (this.offset != output_size)
    throw 'Serialization sanity check failed: offset != output_size (' + offset + ' != ' + output_size + ')';

  return this.buffer.toString('base64');
};

SerializationWriter.prototype.serialize = function() {
  this.serializationLoop();
  return this.concatenateOutputs();
};

op.serialize = function(sc, sh) {
  var writer = new SerializationWriter(sc, sh);
  return writer.serialize();
};