CREATE DATABASE football;

SET TIMEZONE TO 'UTC';
-- show timezone;

DO
$do$
BEGIN
IF NOT EXISTS (SELECT * FROM   pg_catalog.pg_user
                WHERE usename = 'apiuser') THEN

    CREATE ROLE apiuser LOGIN PASSWORD 'apiuser';

END IF;
END
$do$;

REVOKE CONNECT ON DATABASE football FROM PUBLIC;
GRANT CONNECT ON DATABASE football TO apiuser;

REVOKE ALL ON ALL TABLES IN SCHEMA public FROM PUBLIC;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO apiuser;

ALTER DEFAULT PRIVILEGES FOR ROLE football_admin IN SCHEMA public
    GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO apiuser;

/* Other */

CREATE EXTENSION IF NOT EXISTS citext;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

/* Tables */
DROP TABLE IF EXISTS picks;

CREATE TABLE IF NOT EXISTS picks
(
  id uuid NOT NULL,
  game_id uuid NOT NULL,
  user_id uuid NOT NULL,
  home_score integer,
  away_score integer,
  is_bonus boolean DEFAULT false,
  created_at timestamp with time zone NOT NULL,
  updated_at timestamp with time zone NOT NULL,
  deleted_at timestamp with time zone,
  CONSTRAINT picks_id PRIMARY KEY (id)
)
WITH (OIDS=FALSE);
