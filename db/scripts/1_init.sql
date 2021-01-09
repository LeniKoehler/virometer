DROP TABLE IF EXISTS "Cases";

CREATE TABLE "public"."Cases" (
    "countyID" integer NOT NULL,
    "recovered" integer NOT NULL,
    "id" integer NOT NULL,
    "date" date NOT NULL,
    "dead" integer NOT NULL,
    "cases" integer NOT NULL,
    "lastUpdate" text NOT NULL
) WITH (oids = false);

DROP TABLE IF EXISTS "Counties";

CREATE TABLE "public"."Counties" (
    "id" integer NOT NULL,
    "name" text NOT NULL,
    "lat" double precision NOT NULL,
    "long" double precision NOT NULL,
    "population" integer NOT NULL,
    "state" text NOT NULL
) WITH (oids = false);

DROP TABLE IF EXISTS "States";

CREATE TABLE "public"."States" (
    "name" text NOT NULL,
    "lat" double precision NOT NULL,
    "long" double precision NOT NULL
) WITH (oids = false);