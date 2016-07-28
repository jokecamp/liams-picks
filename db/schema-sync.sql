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

ALTER DEFAULT PRIVILEGES FOR ROLE joekampschmidt IN SCHEMA public
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
  points_earned decimal NULL,
  created_at timestamp with time zone NOT NULL,
  updated_at timestamp with time zone NOT NULL,
  deleted_at timestamp with time zone,
  CONSTRAINT picks_id PRIMARY KEY (id)
)
WITH (OIDS=FALSE);


DROP TABLE IF EXISTS users;
CREATE TABLE IF NOT EXISTS users
(
  id uuid NOT NULL,
  username character varying(100) NOT NULL,
  created_at timestamp with time zone NOT NULL,
  updated_at timestamp with time zone NOT NULL,
  deleted_at timestamp with time zone,
  CONSTRAINT users_id PRIMARY KEY (id)
)
WITH (OIDS=FALSE);

DROP TABLE IF EXISTS games;
CREATE TABLE IF NOT EXISTS games
(
  id uuid NOT NULL,
  round_id uuid,
  scheduled_at timestamp with time zone,
  home_team character varying(100) NOT NULL,
  home_score integer,
  away_team character varying(100) NOT NULL,
  away_score integer,
  is_final boolean DEFAULT false,
  created_at timestamp with time zone NOT NULL,
  updated_at timestamp with time zone NOT NULL,
  deleted_at timestamp with time zone,
  CONSTRAINT games_id PRIMARY KEY (id)
)
WITH (OIDS=FALSE);

DROP TABLE IF EXISTS rounds;
CREATE TABLE IF NOT EXISTS rounds
(
  id uuid NOT NULL,
  league_id uuid NOT NULL,
  num integer NOT NULL,
  created_at timestamp with time zone NOT NULL,
  updated_at timestamp with time zone NOT NULL,
  deleted_at timestamp with time zone,
  CONSTRAINT rounds_id PRIMARY KEY (id)
)
WITH (OIDS=FALSE);

DROP TABLE IF EXISTS leagues;
CREATE TABLE IF NOT EXISTS leagues
(
  id uuid NOT NULL,
  league_name character varying(100) NOT NULL,
  created_at timestamp with time zone NOT NULL,
  updated_at timestamp with time zone NOT NULL,
  deleted_at timestamp with time zone,
  CONSTRAINT leagues_id PRIMARY KEY (id)
)
WITH (OIDS=FALSE);

DROP TABLE IF EXISTS round_games;
CREATE TABLE IF NOT EXISTS round_games
(
  id uuid NOT NULL,
  round_id uuid NOT NULL,
  game_id uuid NOT NULL,
  created_at timestamp with time zone NOT NULL,
  updated_at timestamp with time zone NOT NULL,
  deleted_at timestamp with time zone,
  CONSTRAINT round_games_id PRIMARY KEY (id)
)
WITH (OIDS=FALSE);
