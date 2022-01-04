\echo 'Delete and recreate boonelist db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE boonelist;
CREATE DATABASE boonelist;
\connect boonelist

\i boonelist-schema.sql
\i boonelist-seed.sql

\echo 'Delete and recreate boonelist_test db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE boonelist_test;
CREATE DATABASE boonelist_test;
\connect boonelist_test

\i boonelist-schema.sql
