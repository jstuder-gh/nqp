my %const_map := nqp::hash(
    'CCLASS_ANY',           65535,
    'CCLASS_UPPERCASE',     1,
    'CCLASS_LOWERCASE',     2,
    'CCLASS_ALPHABETIC',    4,
    'CCLASS_NUMERIC',       8,
    'CCLASS_HEXADECIMAL',   16,
    'CCLASS_WHITESPACE',    32,
    'CCLASS_PRINTING',      64,
    'CCLASS_BLANK',         256,
    'CCLASS_CONTROL',       512,
    'CCLASS_PUNCTUATION',   1024,
    'CCLASS_ALPHANUMERIC',  2048,
    'CCLASS_NEWLINE',       4096,
    'CCLASS_WORD',          8192,
    
    'HLL_ROLE_NONE',        0,
    'HLL_ROLE_INT',         1,
    'HLL_ROLE_NUM',         2,
    'HLL_ROLE_STR',         3,
    'HLL_ROLE_ARRAY',       4,
    'HLL_ROLE_HASH',        5,
    'HLL_ROLE_CODE',        6,
    
    'CONTROL_NEXT',         4,
    'CONTROL_REDO',         8,
    'CONTROL_LAST',         16,
    'CONTROL_RETURN',       32,
    'CONTROL_TAKE',         128,
    'CONTROL_WARN',         256,
    'CONTROL_SUCCEED',      512,
    'CONTROL_PROCEED',      1024,
    'CONTROL_LABELED',      4096,
    'CONTROL_AWAIT',        8192,
    'CONTROL_EMIT',         16384,
    'CONTROL_DONE',         32768,
    
    'STAT_EXISTS',             0,
    'STAT_FILESIZE',           1,
    'STAT_ISDIR',              2,
    'STAT_ISREG',              3,
    'STAT_ISDEV',              4,
    'STAT_CREATETIME',         5,
    'STAT_ACCESSTIME',         6,
    'STAT_MODIFYTIME',         7,
    'STAT_CHANGETIME',         8,
    'STAT_BACKUPTIME',         9,
    'STAT_UID',                10,
    'STAT_GID',                11,
    'STAT_ISLNK',              12,
    'STAT_PLATFORM_DEV',       -1,
    'STAT_PLATFORM_INODE',     -2,
    'STAT_PLATFORM_MODE',      -3,
    'STAT_PLATFORM_NLINKS',    -4,
    'STAT_PLATFORM_DEVTYPE',   -5,
    'STAT_PLATFORM_BLOCKSIZE', -6,
    'STAT_PLATFORM_BLOCKS',    -7,

    'C_TYPE_CHAR',              -1,
    'C_TYPE_SHORT',             -2,
    'C_TYPE_INT',               -3,
    'C_TYPE_LONG',              -4,
    'C_TYPE_LONGLONG',          -5,
    'C_TYPE_SIZE_T',            -6,
    'C_TYPE_BOOL',              -7,
    'C_TYPE_ATOMIC_INT',        -8,
    'C_TYPE_FLOAT',             -1,
    'C_TYPE_DOUBLE',            -2,
    'C_TYPE_LONGDOUBLE',        -3,

    'TYPE_CHECK_CACHE_DEFINITIVE',  0,
    'TYPE_CHECK_CACHE_THEN_METHOD', 1,
    'TYPE_CHECK_NEEDS_ACCEPTS',     2,

    'NORMALIZE_NONE',            0,
    'NORMALIZE_NFC',             1,
    'NORMALIZE_NFD',             2,
    'NORMALIZE_NFKC',            3,
    'NORMALIZE_NFKD',            4,

    'SIG_HUP',                  1,
    'SIG_INT',                  2,
    'SIG_QUIT',                 3,
    'SIG_ILL',                  4,
    'SIG_TRAP',                 5,
    'SIG_ABRT',                 6,
    'SIG_EMT',                  7,
    'SIG_FPE',                  8,
    'SIG_KILL',                 9,
    'SIG_BUS',                  10,
    'SIG_SEGV',                 11,
    'SIG_SYS',                  12,
    'SIG_PIPE',                 13,
    'SIG_ALRM',                 14,
    'SIG_TERM',                 15,
    'SIG_URG',                  16,
    'SIG_STOP',                 17,
    'SIG_TSTP',                 18,
    'SIG_CONT',                 19,
    'SIG_CHLD',                 20,
    'SIG_TTIN',                 21,
    'SIG_TTOU',                 22,
    'SIG_IO',                   23,
    'SIG_XCPU',                 24,
    'SIG_XFSZ',                 25,
    'SIG_VTALRM',               26,
    'SIG_PROF',                 27,
    'SIG_WINCH',                28,
    'SIG_INFO',                 29,
    'SIG_USR1',                 30,
    'SIG_USR2',                 31,
    'SIG_THR',                  32,
    'SIG_STKFLT',               116,
    'SIG_PWR',                  130,
    'SIG_BREAK',                221,
);
