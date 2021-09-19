-- Database generated with pgModeler (PostgreSQL Database Modeler).
-- pgModeler  version: 0.9.2
-- PostgreSQL version: 12.0
-- Project Site: pgmodeler.io
-- Model Author: ---


-- Database creation must be done outside a multicommand file.
-- These commands were put in this file only as a convenience.
-- -- object: rss | type: DATABASE --
-- -- DROP DATABASE IF EXISTS rss;
-- CREATE DATABASE rss;
-- -- ddl-end --
-- 

-- object: shop | type: SCHEMA --
-- DROP SCHEMA IF EXISTS shop CASCADE;
CREATE SCHEMA shop;
-- ddl-end --
-- ALTER SCHEMA shop OWNER TO postgres;
-- ddl-end --

SET search_path TO pg_catalog,public,shop;
-- ddl-end --

-- object: shop.products | type: TABLE --
-- DROP TABLE IF EXISTS shop.products CASCADE;
CREATE TABLE shop.products (
	id uuid NOT NULL DEFAULT uuid_generate_v4(),
	title text NOT NULL,
	description text,
	price integer,
	CONSTRAINT products_pk PRIMARY KEY (id)

);
-- ddl-end --
-- ALTER TABLE shop.products OWNER TO postgres;
-- ddl-end --

-- object: shop.stocks | type: TABLE --
-- DROP TABLE IF EXISTS shop.stocks CASCADE;
CREATE TABLE shop.stocks (
	product_id uuid,
	count integer
);
-- ddl-end --
COMMENT ON COLUMN shop.stocks.count IS E'There are no more products than this count in stock';
-- ddl-end --
-- ALTER TABLE shop.stocks OWNER TO postgres;
-- ddl-end --

-- object: stocks_product_id_fkey | type: CONSTRAINT --
-- ALTER TABLE shop.stocks DROP CONSTRAINT IF EXISTS stocks_product_id_fkey CASCADE;
ALTER TABLE shop.stocks ADD CONSTRAINT stocks_product_id_fkey FOREIGN KEY (product_id)
REFERENCES shop.products (id) MATCH FULL
ON DELETE CASCADE ON UPDATE NO ACTION;
-- ddl-end --


