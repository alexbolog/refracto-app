
SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;


CREATE EXTENSION IF NOT EXISTS "pgsodium" WITH SCHEMA "pgsodium";

CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";

CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgjwt" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";

CREATE ROLE "aws_lambda" WITH INHERIT;
CREATE ROLE "frontend_app" WITH INHERIT;

CREATE TYPE "public"."assetclass" AS ENUM (
    'Residential',
    'Industrial',
    'Commercial'
);

ALTER TYPE "public"."assetclass" OWNER TO "postgres";

CREATE TYPE "public"."capital_structure_item" AS (
	"type" "text",
	"source" "text",
	"amount" numeric
);

ALTER TYPE "public"."capital_structure_item" OWNER TO "postgres";

CREATE TYPE "public"."investmenteventtype" AS ENUM (
    'payout',
    'invest',
    'deposit',
    'withdraw'
);

ALTER TYPE "public"."investmenteventtype" OWNER TO "postgres";

CREATE TYPE "public"."investmenttype" AS ENUM (
    'Development',
    'Refurbish'
);

ALTER TYPE "public"."investmenttype" OWNER TO "postgres";

CREATE TYPE "public"."paymentstatuses" AS ENUM (
    'claimed',
    'expected',
    'pending'
);

ALTER TYPE "public"."paymentstatuses" OWNER TO "postgres";

CREATE TYPE "public"."projectstatus" AS ENUM (
    'planned',
    'crowdfunding',
    'cancelled',
    'active',
    'delayed',
    'finished'
);

ALTER TYPE "public"."projectstatus" OWNER TO "postgres";

CREATE TYPE "public"."refracto_rating_item" AS (
	"category" "text",
	"assessments" "text"
);

ALTER TYPE "public"."refracto_rating_item" OWNER TO "postgres";

CREATE TYPE "public"."riskratinglevel" AS ENUM (
    'Low',
    'Medium',
    'High'
);

ALTER TYPE "public"."riskratinglevel" OWNER TO "postgres";

CREATE TYPE "public"."swot_analysis" AS (
	"strengths" "text"[],
	"weaknesses" "text"[],
	"opportunities" "text"[],
	"threats" "text"[]
);

ALTER TYPE "public"."swot_analysis" OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."check_nonce_string"("input_nonce" "uuid") RETURNS boolean
    LANGUAGE "plpgsql"
    AS $$
BEGIN
  IF EXISTS (SELECT 1 FROM auth_nonces WHERE nonce = input_nonce AND expiration > NOW()) THEN
    DELETE FROM auth_nonces WHERE nonce = input_nonce;
    RETURN TRUE;
  END IF;

  RETURN FALSE;
END
$$;

ALTER FUNCTION "public"."check_nonce_string"("input_nonce" "uuid") OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."check_nonce_string"("input_address" "text", "input_hashed_message" "text") RETURNS boolean
    LANGUAGE "plpgsql"
    AS $$
DECLARE 
  latest_nonce numeric;
  generated_hashed_message text;
BEGIN
  -- Get the latest nonce for the given address
  SELECT nonce INTO latest_nonce
  FROM auth_nonces
  WHERE address = input_address
  ORDER BY created_at DESC
  LIMIT 1;

  -- If there is no nonce for the address, return false
  IF latest_nonce IS NULL THEN
    RETURN false;
  END IF;

  -- Generate the hashed message with the address and the latest nonce
  generated_hashed_message := encode(digest(concat(input_address, latest_nonce::text), 'sha256'), 'hex');

  -- Compare the generated hashed message with the input one
  IF generated_hashed_message = input_hashed_message THEN
    RETURN true;
  ELSE
    RETURN false;
  END IF;
  
END;
$$;

ALTER FUNCTION "public"."check_nonce_string"("input_address" "text", "input_hashed_message" "text") OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."generate_nonce_string"() RETURNS "uuid"
    LANGUAGE "plpgsql"
    AS $$
DECLARE
  new_nonce UUID;
BEGIN
  new_nonce := uuid_generate_v4();

  INSERT INTO auth_nonces(nonce)
  VALUES (new_nonce);

  RETURN new_nonce;
END
$$;

ALTER FUNCTION "public"."generate_nonce_string"() OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."generate_nonce_string"("address" "text") RETURNS "text"
    LANGUAGE "plpgsql"
    AS $$
DECLARE 
  latest_nonce numeric;
  new_nonce numeric;
  nonce_string text;
BEGIN
  -- Get the latest nonce for the given address
  SELECT nonce INTO latest_nonce
  FROM public."auth_nonces"
  WHERE auth_nonces.address = generate_nonce_string.address
  ORDER BY created_at DESC
  LIMIT 1;

  -- If there is no nonce, start with 1, otherwise increment the latest one
  IF latest_nonce IS NULL THEN
    new_nonce := 1;
  ELSE
    new_nonce := latest_nonce + 1;
  END IF;

  -- Insert the new nonce into the table
  INSERT INTO auth_nonces (address, nonce) VALUES (generate_nonce_string.address, new_nonce);

  -- Generate the nonce string in a deterministic manner
  nonce_string := encode(digest(concat(generate_nonce_string.address, new_nonce::text), 'sha256'), 'hex');

  RETURN nonce_string;
END;
$$;

ALTER FUNCTION "public"."generate_nonce_string"("address" "text") OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";

CREATE TABLE IF NOT EXISTS "public"."MarketplaceListings" (
    "id" bigint NOT NULL,
    "projectId" bigint,
    "listingExpiration" timestamp with time zone NOT NULL,
    "pricePerUnit" real NOT NULL,
    "amount" "text" NOT NULL
);

ALTER TABLE "public"."MarketplaceListings" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."ProjectDevelopers" (
    "id" bigint NOT NULL,
    "Name" "text" NOT NULL,
    "Links" "text"[] NOT NULL
);

ALTER TABLE "public"."ProjectDevelopers" OWNER TO "postgres";

ALTER TABLE "public"."ProjectDevelopers" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."ProjectDevelopers_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

CREATE TABLE IF NOT EXISTS "public"."Projects" (
    "id" bigint NOT NULL,
    "title" "text" NOT NULL,
    "returnPercentage" real NOT NULL,
    "crowdfundingDeadline" timestamp with time zone NOT NULL,
    "crowdfundingTarget" numeric NOT NULL,
    "crowdfundedAmount" numeric NOT NULL,
    "colorCodeHex" "text" NOT NULL,
    "thumbnailSrc" "text" NOT NULL,
    "loanDeadline" timestamp with time zone NOT NULL,
    "images" "text"[] NOT NULL,
    "ProjectDeveloperId" bigint NOT NULL,
    "RiskRatingLevel" "public"."riskratinglevel" DEFAULT 'High'::"public"."riskratinglevel" NOT NULL,
    "assetClass" "public"."assetclass" NOT NULL,
    "investmentType" "public"."investmenttype" NOT NULL,
    "shortDescription" "text" NOT NULL,
    "executiveSummary" "text" NOT NULL,
    "details" "text" NOT NULL,
    "location" "point",
    "sponsorInfo" "text" NOT NULL,
    "analysis" "public"."swot_analysis",
    "refractoRating" "public"."refracto_rating_item"[],
    "capitalStructure" "public"."capital_structure_item"[],
    "financingDetails" "text" NOT NULL,
    "attachmentUrls" "text"[] NOT NULL
);

ALTER TABLE "public"."Projects" OWNER TO "postgres";

ALTER TABLE "public"."Projects" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."Projects_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

CREATE TABLE IF NOT EXISTS "public"."QandAs" (
    "id" bigint NOT NULL,
    "parentId" bigint,
    "ownerAddress" "text",
    "value" "text" NOT NULL,
    "createdAt" timestamp with time zone DEFAULT "now"() NOT NULL,
    "isPendingModeration" boolean DEFAULT false
);

ALTER TABLE "public"."QandAs" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."auth_nonces" (
    "id" bigint NOT NULL,
    "nonce" "uuid" NOT NULL,
    "expiration" timestamp with time zone DEFAULT ("now"() + '01:00:00'::interval) NOT NULL
);

ALTER TABLE "public"."auth_nonces" OWNER TO "postgres";

ALTER TABLE "public"."auth_nonces" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."auth_nonces_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

CREATE SEQUENCE IF NOT EXISTS "public"."marketplacelisting_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE "public"."marketplacelisting_id_seq" OWNER TO "postgres";

ALTER SEQUENCE "public"."marketplacelisting_id_seq" OWNED BY "public"."MarketplaceListings"."id";

CREATE SEQUENCE IF NOT EXISTS "public"."questionandanswer_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE "public"."questionandanswer_id_seq" OWNER TO "postgres";

ALTER SEQUENCE "public"."questionandanswer_id_seq" OWNED BY "public"."QandAs"."id";

CREATE TABLE IF NOT EXISTS "public"."repaymentSchedules" (
    "id" bigint NOT NULL,
    "projectid" bigint,
    "date" timestamp with time zone NOT NULL,
    "paymentStatus" "public"."paymentstatuses" NOT NULL,
    "lateFees" real NOT NULL,
    "principalAmount" real NOT NULL,
    "interestAmount" real NOT NULL
);

ALTER TABLE "public"."repaymentSchedules" OWNER TO "postgres";

CREATE SEQUENCE IF NOT EXISTS "public"."repaymentscheduleentry_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE "public"."repaymentscheduleentry_id_seq" OWNER TO "postgres";

ALTER SEQUENCE "public"."repaymentscheduleentry_id_seq" OWNED BY "public"."repaymentSchedules"."id";

ALTER TABLE ONLY "public"."ProjectDevelopers"
    ADD CONSTRAINT "ProjectDevelopers_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."Projects"
    ADD CONSTRAINT "Projects_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."auth_nonces"
    ADD CONSTRAINT "auth_nonces_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."MarketplaceListings"
    ADD CONSTRAINT "marketplacelisting_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."QandAs"
    ADD CONSTRAINT "questionandanswer_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."repaymentSchedules"
    ADD CONSTRAINT "repaymentscheduleentry_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."MarketplaceListings"
    ADD CONSTRAINT "MarketplaceListings_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "public"."Projects"("id");

ALTER TABLE ONLY "public"."Projects"
    ADD CONSTRAINT "Projects_ProjectDeveloperId_fkey" FOREIGN KEY ("ProjectDeveloperId") REFERENCES "public"."ProjectDevelopers"("id");

ALTER TABLE ONLY "public"."QandAs"
    ADD CONSTRAINT "QandAs_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "public"."QandAs"("id");

ALTER TABLE ONLY "public"."repaymentSchedules"
    ADD CONSTRAINT "repaymentSchedules_projectid_fkey" FOREIGN KEY ("projectid") REFERENCES "public"."Projects"("id");

ALTER TABLE "public"."ProjectDevelopers" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."Projects" ENABLE ROW LEVEL SECURITY;

REVOKE USAGE ON SCHEMA "public" FROM PUBLIC;
GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";

GRANT ALL ON FUNCTION "public"."check_nonce_string"("input_nonce" "uuid") TO "anon";
GRANT ALL ON FUNCTION "public"."check_nonce_string"("input_nonce" "uuid") TO "authenticated";
GRANT ALL ON FUNCTION "public"."check_nonce_string"("input_nonce" "uuid") TO "service_role";

GRANT ALL ON FUNCTION "public"."check_nonce_string"("input_address" "text", "input_hashed_message" "text") TO "anon";
GRANT ALL ON FUNCTION "public"."check_nonce_string"("input_address" "text", "input_hashed_message" "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."check_nonce_string"("input_address" "text", "input_hashed_message" "text") TO "service_role";
GRANT ALL ON FUNCTION "public"."check_nonce_string"("input_address" "text", "input_hashed_message" "text") TO "aws_lambda";

GRANT ALL ON FUNCTION "public"."generate_nonce_string"() TO "anon";
GRANT ALL ON FUNCTION "public"."generate_nonce_string"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."generate_nonce_string"() TO "service_role";

GRANT ALL ON FUNCTION "public"."generate_nonce_string"("address" "text") TO "anon";
GRANT ALL ON FUNCTION "public"."generate_nonce_string"("address" "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."generate_nonce_string"("address" "text") TO "service_role";
GRANT ALL ON FUNCTION "public"."generate_nonce_string"("address" "text") TO "frontend_app";

GRANT ALL ON TABLE "public"."MarketplaceListings" TO "anon";
GRANT ALL ON TABLE "public"."MarketplaceListings" TO "authenticated";
GRANT ALL ON TABLE "public"."MarketplaceListings" TO "service_role";

GRANT ALL ON TABLE "public"."ProjectDevelopers" TO "anon";
GRANT ALL ON TABLE "public"."ProjectDevelopers" TO "authenticated";
GRANT ALL ON TABLE "public"."ProjectDevelopers" TO "service_role";

GRANT ALL ON SEQUENCE "public"."ProjectDevelopers_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."ProjectDevelopers_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."ProjectDevelopers_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."Projects" TO "anon";
GRANT ALL ON TABLE "public"."Projects" TO "authenticated";
GRANT ALL ON TABLE "public"."Projects" TO "service_role";

GRANT ALL ON SEQUENCE "public"."Projects_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."Projects_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."Projects_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."QandAs" TO "anon";
GRANT ALL ON TABLE "public"."QandAs" TO "authenticated";
GRANT ALL ON TABLE "public"."QandAs" TO "service_role";

GRANT ALL ON TABLE "public"."auth_nonces" TO "anon";
GRANT ALL ON TABLE "public"."auth_nonces" TO "authenticated";
GRANT ALL ON TABLE "public"."auth_nonces" TO "service_role";

GRANT ALL ON SEQUENCE "public"."auth_nonces_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."auth_nonces_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."auth_nonces_id_seq" TO "service_role";

GRANT ALL ON SEQUENCE "public"."marketplacelisting_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."marketplacelisting_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."marketplacelisting_id_seq" TO "service_role";

GRANT ALL ON SEQUENCE "public"."questionandanswer_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."questionandanswer_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."questionandanswer_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."repaymentSchedules" TO "anon";
GRANT ALL ON TABLE "public"."repaymentSchedules" TO "authenticated";
GRANT ALL ON TABLE "public"."repaymentSchedules" TO "service_role";

GRANT ALL ON SEQUENCE "public"."repaymentscheduleentry_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."repaymentscheduleentry_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."repaymentscheduleentry_id_seq" TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "service_role";

RESET ALL;
