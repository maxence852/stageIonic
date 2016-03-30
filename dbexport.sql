--
-- PostgreSQL database dump
--

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


--
-- Name: pgcrypto; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA public;


--
-- Name: EXTENSION pgcrypto; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pgcrypto IS 'cryptographic functions';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: admins; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE admins (
    idadmin integer NOT NULL,
    nom character varying(45) NOT NULL,
    adresse character varying(100) NOT NULL,
    cp integer NOT NULL,
    tel character varying(20),
    gsm character varying(20),
    login character varying(50) NOT NULL,
    password character varying(100) NOT NULL,
    type_admin integer NOT NULL,
    desact boolean DEFAULT false,
    domaine character varying,
    num_licence character varying,
    date_sign timestamp without time zone DEFAULT now(),
    date_valid timestamp without time zone,
    delivre_par integer
);


ALTER TABLE admins OWNER TO postgres;

--
-- Name: admins_idadmin_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE admins_idadmin_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE admins_idadmin_seq OWNER TO postgres;

--
-- Name: admins_idadmin_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE admins_idadmin_seq OWNED BY admins.idadmin;


--
-- Name: bonustrajets; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE bonustrajets (
    idbonustrajet integer NOT NULL,
    dom_bonustrajet character varying(5) NOT NULL,
    station_depart integer,
    station_arriver integer,
    date_valable timestamp without time zone NOT NULL,
    montant_bonus integer,
    desact_bonustrajet boolean DEFAULT false
);


ALTER TABLE bonustrajets OWNER TO postgres;

--
-- Name: bonustrajets_idbonustrajet_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE bonustrajets_idbonustrajet_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE bonustrajets_idbonustrajet_seq OWNER TO postgres;

--
-- Name: bonustrajets_idbonustrajet_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE bonustrajets_idbonustrajet_seq OWNED BY bonustrajets.idbonustrajet;


--
-- Name: camions; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE camions (
    idcamion integer NOT NULL,
    dom_camion character varying(5) NOT NULL,
    type_camion integer NOT NULL,
    statut_camion integer NOT NULL,
    date_statut timestamp without time zone DEFAULT now(),
    capacite_camion integer NOT NULL,
    gps_camion character varying(20) NOT NULL,
    desact_camion boolean DEFAULT false,
    immatriculation character varying(8) NOT NULL
);


ALTER TABLE camions OWNER TO postgres;

--
-- Name: camions_idcamion_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE camions_idcamion_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE camions_idcamion_seq OWNER TO postgres;

--
-- Name: camions_idcamion_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE camions_idcamion_seq OWNED BY camions.idcamion;


--
-- Name: clients; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE clients (
    idclient integer NOT NULL,
    nom_client character varying(45) NOT NULL,
    prenom_client character varying(45) NOT NULL,
    cp_client integer NOT NULL,
    adresse_client character varying(60) NOT NULL,
    gsm_client character varying(20) NOT NULL,
    pin_code character varying(60),
    login_client character varying(25) NOT NULL,
    password_client character varying(60) NOT NULL,
    statut_client integer NOT NULL,
    solde_montant double precision,
    solde_bonus integer,
    solde_date timestamp without time zone DEFAULT now(),
    modif_par integer NOT NULL,
    date_modif timestamp without time zone DEFAULT now(),
    date_creation timestamp without time zone DEFAULT now(),
    desact_client boolean DEFAULT false
);


ALTER TABLE clients OWNER TO postgres;

--
-- Name: clients_idclient_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE clients_idclient_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE clients_idclient_seq OWNER TO postgres;

--
-- Name: clients_idclient_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE clients_idclient_seq OWNED BY clients.idclient;


--
-- Name: commentaires; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE commentaires (
    idcommentaire integer NOT NULL,
    post_admin integer,
    post_par integer,
    post_pour integer NOT NULL,
    commentaire text,
    date_post timestamp without time zone DEFAULT now(),
    dom_commentaire character varying(5),
    desact_commentaire boolean DEFAULT false
);


ALTER TABLE commentaires OWNER TO postgres;

--
-- Name: commentaires_idcommentaire_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE commentaires_idcommentaire_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE commentaires_idcommentaire_seq OWNER TO postgres;

--
-- Name: commentaires_idcommentaire_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE commentaires_idcommentaire_seq OWNED BY commentaires.idcommentaire;


--
-- Name: depots; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE depots (
    iddepot integer NOT NULL,
    capacite_camion integer NOT NULL,
    capacite_velo integer,
    position_depot point,
    adresse character varying(50),
    tel character varying(20),
    dom_depot character varying(5) NOT NULL
);


ALTER TABLE depots OWNER TO postgres;

--
-- Name: depots_iddepot_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE depots_iddepot_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE depots_iddepot_seq OWNER TO postgres;

--
-- Name: depots_iddepot_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE depots_iddepot_seq OWNED BY depots.iddepot;


--
-- Name: domaines; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE domaines (
    iddomaine character varying(5) NOT NULL,
    zone_domaine polygon,
    tel_service character varying(20),
    activ_ecadenas boolean DEFAULT false NOT NULL,
    activ_pucegps boolean DEFAULT false NOT NULL,
    activ_gpscamion boolean DEFAULT false NOT NULL,
    descript_domaine text,
    desact_domaine boolean DEFAULT false
);


ALTER TABLE domaines OWNER TO postgres;

--
-- Name: gpscamions; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE gpscamions (
    idgpscamion integer NOT NULL,
    gps character varying(20) NOT NULL,
    date_position timestamp without time zone DEFAULT now(),
    "position" point
);


ALTER TABLE gpscamions OWNER TO postgres;

--
-- Name: gpscamions_idposition_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE gpscamions_idposition_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE gpscamions_idposition_seq OWNER TO postgres;

--
-- Name: gpscamions_idposition_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE gpscamions_idposition_seq OWNED BY gpscamions.idgpscamion;


--
-- Name: gpsvelos; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE gpsvelos (
    idgpsvelo integer NOT NULL,
    pucegps character varying(20) NOT NULL,
    date_position timestamp without time zone DEFAULT now(),
    "position" point
);


ALTER TABLE gpsvelos OWNER TO postgres;

--
-- Name: gpsvelos_idgpsvelo_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE gpsvelos_idgpsvelo_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE gpsvelos_idgpsvelo_seq OWNER TO postgres;

--
-- Name: gpsvelos_idgpsvelo_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE gpsvelos_idgpsvelo_seq OWNED BY gpsvelos.idgpsvelo;


--
-- Name: locations; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE locations (
    idlocation integer NOT NULL,
    dom_location character varying(5) NOT NULL,
    client_location integer,
    velo_location integer,
    position_debut point,
    station_debut integer,
    date_debut timestamp without time zone DEFAULT now(),
    position_fin point,
    station_fin integer,
    date_fin timestamp without time zone
);


ALTER TABLE locations OWNER TO postgres;

--
-- Name: locations_idlocation_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE locations_idlocation_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE locations_idlocation_seq OWNER TO postgres;

--
-- Name: locations_idlocation_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE locations_idlocation_seq OWNED BY locations.idlocation;


--
-- Name: pays; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE pays (
    idpays character varying(2) NOT NULL,
    nom_en character varying(45) NOT NULL,
    nom_fr character varying(45) NOT NULL
);


ALTER TABLE pays OWNER TO postgres;

--
-- Name: stations; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE stations (
    idstation integer NOT NULL,
    dom_station character varying(5) NOT NULL,
    nom_station character varying(45) NOT NULL,
    fixe_virtuelle boolean DEFAULT false,
    rayon integer DEFAULT 5,
    zone_station polygon,
    capacite_optimum integer NOT NULL,
    limite_vide integer,
    bonus_ajouter integer DEFAULT 0,
    limite_pleine integer,
    bonus_enlever integer DEFAULT 0,
    descript_station text,
    desact_station boolean DEFAULT false
);


ALTER TABLE stations OWNER TO postgres;

--
-- Name: stations_idstation_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE stations_idstation_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE stations_idstation_seq OWNER TO postgres;

--
-- Name: stations_idstation_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE stations_idstation_seq OWNED BY stations.idstation;


--
-- Name: statutcamions; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE statutcamions (
    idstatutcamion integer NOT NULL,
    nom_statut_fr character varying(45),
    nom_statut_en character varying(45)
);


ALTER TABLE statutcamions OWNER TO postgres;

--
-- Name: statutcamions_idstatutcamion_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE statutcamions_idstatutcamion_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE statutcamions_idstatutcamion_seq OWNER TO postgres;

--
-- Name: statutcamions_idstatutcamion_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE statutcamions_idstatutcamion_seq OWNED BY statutcamions.idstatutcamion;


--
-- Name: statutclients; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE statutclients (
    idstatutclient integer NOT NULL,
    nom_statut_fr character varying(45),
    nom_statut_en character varying(45)
);


ALTER TABLE statutclients OWNER TO postgres;

--
-- Name: statutclients_idstatutclient_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE statutclients_idstatutclient_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE statutclients_idstatutclient_seq OWNER TO postgres;

--
-- Name: statutclients_idstatutclient_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE statutclients_idstatutclient_seq OWNED BY statutclients.idstatutclient;


--
-- Name: statutvelos; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE statutvelos (
    idstatutvelo integer NOT NULL,
    nom_statut_fr character varying(45),
    nom_statut_en character varying(45)
);


ALTER TABLE statutvelos OWNER TO postgres;

--
-- Name: statutvelos_idstatutvelo_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE statutvelos_idstatutvelo_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE statutvelos_idstatutvelo_seq OWNER TO postgres;

--
-- Name: statutvelos_idstatutvelo_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE statutvelos_idstatutvelo_seq OWNED BY statutvelos.idstatutvelo;


--
-- Name: tarifs; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE tarifs (
    idtarif integer NOT NULL,
    dom_tarif character varying(5) NOT NULL,
    nom_tarif character varying(45) NOT NULL,
    duree_gratuit integer,
    prix_1 double precision,
    duree_1 integer,
    prix_2 double precision,
    duree_2 integer,
    prix_3 double precision,
    duree_3 integer,
    prix_plus double precision,
    prix_reservation double precision,
    descript_tarif text,
    desact_tarif boolean DEFAULT false
);


ALTER TABLE tarifs OWNER TO postgres;

--
-- Name: tarifs_idtarif_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE tarifs_idtarif_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE tarifs_idtarif_seq OWNER TO postgres;

--
-- Name: tarifs_idtarif_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE tarifs_idtarif_seq OWNED BY tarifs.idtarif;


--
-- Name: transactions; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE transactions (
    idtransaction integer NOT NULL,
    dom_transaction character varying(5) NOT NULL,
    client_transaction integer NOT NULL,
    location integer,
    date_transaction timestamp without time zone DEFAULT now(),
    montant double precision NOT NULL,
    bonus integer,
    nature_transaction boolean DEFAULT false,
    justification text,
    auteur integer
);


ALTER TABLE transactions OWNER TO postgres;

--
-- Name: transactions_idtransaction_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE transactions_idtransaction_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE transactions_idtransaction_seq OWNER TO postgres;

--
-- Name: transactions_idtransaction_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE transactions_idtransaction_seq OWNED BY transactions.idtransaction;


--
-- Name: typeadmins; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE typeadmins (
    idtype integer NOT NULL,
    niveau numeric NOT NULL,
    nom_fr character varying(20),
    nom_en character varying(20),
    nom_nl character varying(20)
);


ALTER TABLE typeadmins OWNER TO postgres;

--
-- Name: typeadmins_idtype_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE typeadmins_idtype_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE typeadmins_idtype_seq OWNER TO postgres;

--
-- Name: typeadmins_idtype_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE typeadmins_idtype_seq OWNED BY typeadmins.idtype;


--
-- Name: typecamions; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE typecamions (
    idtypecamion integer NOT NULL,
    nom_type_fr character varying(45),
    nom_type_en character varying(45)
);


ALTER TABLE typecamions OWNER TO postgres;

--
-- Name: typecamions_idtypecamion_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE typecamions_idtypecamion_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE typecamions_idtypecamion_seq OWNER TO postgres;

--
-- Name: typecamions_idtypecamion_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE typecamions_idtypecamion_seq OWNED BY typecamions.idtypecamion;


--
-- Name: typevelos; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE typevelos (
    idtypevelo integer NOT NULL,
    tarif integer NOT NULL,
    dom_typevelo character varying(5) NOT NULL,
    nom_type_fr character varying(45),
    nom_type_en character varying(45),
    reservation_possible boolean DEFAULT false,
    avertir_sidisponible boolean DEFAULT false,
    deposer_station boolean DEFAULT true,
    descript_type text,
    desact_type boolean DEFAULT false,
    uri_photovelo character varying
);


ALTER TABLE typevelos OWNER TO postgres;

--
-- Name: typevelos_idtypevelo_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE typevelos_idtypevelo_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE typevelos_idtypevelo_seq OWNER TO postgres;

--
-- Name: typevelos_idtypevelo_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE typevelos_idtypevelo_seq OWNED BY typevelos.idtypevelo;


--
-- Name: velos; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE velos (
    idvelo integer NOT NULL,
    station_velo integer NOT NULL,
    type_velo integer NOT NULL,
    statut_velo integer NOT NULL,
    date_statut timestamp without time zone DEFAULT now(),
    dom_velo character varying(5) NOT NULL,
    tarif_velo integer NOT NULL,
    position_velo point,
    code_cadenas character varying(60),
    code_ecadenas character varying(60),
    pucegps_velo character varying(20),
    desact_velo boolean DEFAULT false
);


ALTER TABLE velos OWNER TO postgres;

--
-- Name: velos_idvelo_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE velos_idvelo_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE velos_idvelo_seq OWNER TO postgres;

--
-- Name: velos_idvelo_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE velos_idvelo_seq OWNED BY velos.idvelo;


--
-- Name: villes; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE villes (
    idville integer NOT NULL,
    cpville character varying(5) NOT NULL,
    nomville character varying(45) NOT NULL,
    codepays character varying(2) DEFAULT 'BE'::character varying NOT NULL
);


ALTER TABLE villes OWNER TO postgres;

--
-- Name: villes_idville_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE villes_idville_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE villes_idville_seq OWNER TO postgres;

--
-- Name: villes_idville_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE villes_idville_seq OWNED BY villes.idville;


--
-- Name: idadmin; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY admins ALTER COLUMN idadmin SET DEFAULT nextval('admins_idadmin_seq'::regclass);


--
-- Name: idbonustrajet; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY bonustrajets ALTER COLUMN idbonustrajet SET DEFAULT nextval('bonustrajets_idbonustrajet_seq'::regclass);


--
-- Name: idcamion; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY camions ALTER COLUMN idcamion SET DEFAULT nextval('camions_idcamion_seq'::regclass);


--
-- Name: idclient; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY clients ALTER COLUMN idclient SET DEFAULT nextval('clients_idclient_seq'::regclass);


--
-- Name: idcommentaire; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY commentaires ALTER COLUMN idcommentaire SET DEFAULT nextval('commentaires_idcommentaire_seq'::regclass);


--
-- Name: iddepot; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY depots ALTER COLUMN iddepot SET DEFAULT nextval('depots_iddepot_seq'::regclass);


--
-- Name: idgpscamion; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY gpscamions ALTER COLUMN idgpscamion SET DEFAULT nextval('gpscamions_idposition_seq'::regclass);


--
-- Name: idgpsvelo; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY gpsvelos ALTER COLUMN idgpsvelo SET DEFAULT nextval('gpsvelos_idgpsvelo_seq'::regclass);


--
-- Name: idlocation; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY locations ALTER COLUMN idlocation SET DEFAULT nextval('locations_idlocation_seq'::regclass);


--
-- Name: idstation; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY stations ALTER COLUMN idstation SET DEFAULT nextval('stations_idstation_seq'::regclass);


--
-- Name: idstatutvelo; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY statutvelos ALTER COLUMN idstatutvelo SET DEFAULT nextval('statutvelos_idstatutvelo_seq'::regclass);


--
-- Name: idtarif; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY tarifs ALTER COLUMN idtarif SET DEFAULT nextval('tarifs_idtarif_seq'::regclass);


--
-- Name: idtransaction; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY transactions ALTER COLUMN idtransaction SET DEFAULT nextval('transactions_idtransaction_seq'::regclass);


--
-- Name: idtype; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY typeadmins ALTER COLUMN idtype SET DEFAULT nextval('typeadmins_idtype_seq'::regclass);


--
-- Name: idtypevelo; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY typevelos ALTER COLUMN idtypevelo SET DEFAULT nextval('typevelos_idtypevelo_seq'::regclass);


--
-- Name: idvelo; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY velos ALTER COLUMN idvelo SET DEFAULT nextval('velos_idvelo_seq'::regclass);


--
-- Name: idville; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY villes ALTER COLUMN idville SET DEFAULT nextval('villes_idville_seq'::regclass);


--
-- Data for Name: admins; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY admins (idadmin, nom, adresse, cp, tel, gsm, login, password, type_admin, desact, domaine, num_licence, date_sign, date_valid, delivre_par) FROM stdin;
2	Ville de Mons	Grand-Place	1663	 065405904	0488888888	test@mons.be	$2a$08$AjCp4Wo7vdgyvc7.pUL0KexsxKuFETDe0tF.mTtJY4p1EWz/40mcO	2	f	mons	ShareAbike Test	2015-11-22 12:00:37.542	2018-12-31 21:00:00	1
1	UMONS	9, rue de Houdain	1663	065374030	0488777777	test@shareabike.com	$2a$08$HDbF1FNWew4H2vnoO90qhOgn/xMAZXnCv/Up6Gltva.KIiZQ0.uji	1	f	\N	\N	2015-11-22 12:00:37.542	\N	\N
23	Testeur	100, rue test	533	065656565	0488111111	test@test.com	$2a$08$cUWkTIJkrqW30SaAvgnWWedY/qYoB8KWBD7vx1AqdmRh9LprS6SjS	2	f	test	Test-2016-exp	2015-11-22 12:00:37.542	2017-12-31 21:00:00	1
\.


--
-- Name: admins_idadmin_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('admins_idadmin_seq', 33, true);


--
-- Data for Name: bonustrajets; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY bonustrajets (idbonustrajet, dom_bonustrajet, station_depart, station_arriver, date_valable, montant_bonus, desact_bonustrajet) FROM stdin;
2	mons	43	2	2016-01-31 21:00:00	1	f
1	mons	2	3	2016-01-31 21:00:00	1	f
4	test	36	37	2016-02-01 00:00:00	2	f
5	test	40	37	2016-02-29 22:00:00	-1	f
6	test	40	44	2016-02-01 00:00:00	1	t
\.


--
-- Name: bonustrajets_idbonustrajet_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('bonustrajets_idbonustrajet_seq', 6, true);


--
-- Data for Name: camions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY camions (idcamion, dom_camion, type_camion, statut_camion, date_statut, capacite_camion, gps_camion, desact_camion, immatriculation) FROM stdin;
1	test	1	1	2015-12-16 19:27:48.123	25	0488555555	f	ABC123
2	test	1	1	2015-12-16 19:27:57.156	30	0	t	BUT1720
\.


--
-- Name: camions_idcamion_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('camions_idcamion_seq', 7, true);


--
-- Data for Name: clients; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY clients (idclient, nom_client, prenom_client, cp_client, adresse_client, gsm_client, pin_code, login_client, password_client, statut_client, solde_montant, solde_bonus, solde_date, modif_par, date_modif, date_creation, desact_client) FROM stdin;
5	Toulemonde	Bob	1166	Rue Université	0489999999	$2a$05$12nNdYfmV.gZid5u9nHJWuDgiSrYWUkhIfH6clcna.WBKXo8/ywZK	student@umons.be	$2a$06$FrV4.GCAlT1LgPm8P2766uIUpQ5BU9hIwWvpn5c5VKcOiT17R9Mp.	1	111.5	2	2015-12-17 09:37:18.775	1	2015-12-24 18:13:48.423	2015-12-17 09:37:18.775	f
1	Test	partout	1787	Rue Test	0478123456	1234	test@client.com	12345678	1	68.5	0	2015-12-24 16:45:21.996	23	2015-12-26 22:13:10.165	2015-12-16 22:17:35.79	f
6	Del Rapido	Leo	1201	Rue Progres 110	0488521345	$2a$05$vEJuYadsC7GVm7xXb3Ic1OKCTUrINQvVdcdi9LolJAasiaZ1y8ISG	leo@gmail.com	$2a$06$wJXh5g3iNTmjfLuVOGi0.uNGCVvkh2SxZhsFcLG.1kk5669T./UJC	2	\N	\N	2015-12-26 22:26:19.203	23	2015-12-26 22:26:37.327	2015-12-26 22:26:19.203	f
\.


--
-- Name: clients_idclient_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('clients_idclient_seq', 6, true);


--
-- Data for Name: commentaires; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY commentaires (idcommentaire, post_admin, post_par, post_pour, commentaire, date_post, dom_commentaire, desact_commentaire) FROM stdin;
5	1	\N	5	ok	2015-12-20 11:59:15.404	\N	f
4	2	\N	1	bravo!	2015-12-20 11:30:15.775	mons	f
8	1	\N	1	Félicitations!	2015-12-20 22:43:36.02	\N	f
10	23	\N	1	encore à tester	2015-12-26 22:29:54.53	test	t
11	23	\N	1	et encore un test	2015-12-26 23:03:12.771	test	t
1	\N	1	5	super!	2015-12-20 11:27:01.93	\N	f
9	23	\N	1	ça tourne!	2015-12-26 22:29:16.331	test	f
\.


--
-- Name: commentaires_idcommentaire_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('commentaires_idcommentaire_seq', 11, true);


--
-- Data for Name: depots; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY depots (iddepot, capacite_camion, capacite_velo, position_depot, adresse, tel, dom_depot) FROM stdin;
3	1	100	(50.434693133088963,3.9239028096199036)	Rue de la Liberté 4, 7033 Guesmes	065333333	test
\.


--
-- Name: depots_iddepot_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('depots_iddepot_seq', 4, true);


--
-- Data for Name: domaines; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY domaines (iddomaine, zone_domaine, tel_service, activ_ecadenas, activ_pucegps, activ_gpscamion, descript_domaine, desact_domaine) FROM stdin;
Bike7	((50.4620939053341,3.9303159713745099),(50.462312460172598,3.9388132095336901),(50.460072225199298,3.9459371566772501),(50.454225258495804,3.93683910369873),(50.453842721468199,3.9216470718383798),(50.4582143888844,3.92224788665771))	065555555	t	t	f	Domaine avec une seule station. Couverture de zoning.	f
mons	((50.459580452099829,3.9479970932006836),(50.461001115992318,3.9527177810668945),(50.460782555094021,3.9566659927368164),(50.459962942730193,3.9600992202758789),(50.453460181347275,3.9615583419799805),(50.446082016790292,3.9516019821166992),(50.445699413919527,3.9477396011352539),(50.449197382160641,3.9392423629760742),(50.450563705773583,3.9392423629760742))	065065065	f	f	f	Prototype ShareABike. Test 2017-2018	f
test	((50.437199366805899,3.9263033866882302),(50.437664039048499,3.9249730110168501),(50.438730034604802,3.92583131790161),(50.440451976714698,3.92149686813354),(50.440916617027703,3.92196893692017),(50.441873215074203,3.9198231697082502),(50.4414085841521,3.91939401626587),(50.442501826120299,3.91776323318481),(50.4413539213908,3.91643285751343),(50.441873215074203,3.9152312278747599),(50.436352011561802,3.91402959823608),(50.435203957680002,3.9189648628234899),(50.434793931688901,3.9183640480041499),(50.434301895811899,3.9189219474792498),(50.430830164016101,3.9148020744323699),(50.430338086942903,3.9157462120056201),(50.430010032719601,3.9163899421691899),(50.4308028265351,3.91776323318481),(50.4301193843799,3.9199090003967298),(50.4290805334103,3.92149686813354),(50.428479082957601,3.9229989051818799),(50.427139461310396,3.92291307449341),(50.426018524279101,3.9231705665588401),(50.4257177805612,3.9239859580993701),(50.425772461379204,3.92548799514771),(50.428068998723298,3.9290928840637198),(50.427631571625497,3.9301228523254399),(50.428397066394801,3.9310669898986799),(50.428588438153596,3.93055200576782),(50.429025856412103,3.9310669898986799),(50.429490608884201,3.93055200576782),(50.4304747755317,3.93196821212769),(50.428752470474002,3.9350152015686),(50.430720813997297,3.93522977828979),(50.432060334325001,3.9349722862243701),(50.435723318837098,3.9341998100280802),(50.434465908339099,3.9338135719299299),(50.433126456071903,3.9327836036682098),(50.432470383991898,3.9320111274719198),(50.433181128334901,3.9305949211120601),(50.433755183284099,3.9298653602600102),(50.434274560335503,3.9287924766540501),(50.4348486020263,3.9278912544250502),(50.434711926064502,3.9272904396057098),(50.4353132973444,3.92600297927856),(50.436078667924797,3.9273762702941899))	065223344	t	t	t	\N	f
\.


--
-- Data for Name: gpscamions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY gpscamions (idgpscamion, gps, date_position, "position") FROM stdin;
1	0488555555	2015-12-11 13:37:28.533	(50.448542000000003,3.962631)
5	0488555555	2015-12-11 16:19:26.288	(50.121212,3.5646599999999999)
\.


--
-- Name: gpscamions_idposition_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('gpscamions_idposition_seq', 5, true);


--
-- Data for Name: gpsvelos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY gpsvelos (idgpsvelo, pucegps, date_position, "position") FROM stdin;
2	0488555555	2015-12-15 00:00:00	(50.436780985861773,3.9246867729187001)
3	0488555555	2015-12-14 00:00:00	(50.4366098586177,3.9247867729186998)
1	0488555555	2015-12-16 19:14:26.42	(50.4368098586177,3.9245867729186998)
\.


--
-- Name: gpsvelos_idgpsvelo_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('gpsvelos_idgpsvelo_seq', 6, true);


--
-- Data for Name: locations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY locations (idlocation, dom_location, client_location, velo_location, position_debut, station_debut, date_debut, position_fin, station_fin, date_fin) FROM stdin;
1	test	5	1	(50.436511424554901,3.9257374405860901)	36	2015-12-22 13:15:00	(50.4368098586177,3.9245867729186998)	37	2015-12-22 14:20:00
2	test	5	3	(50.436525920697399,3.9243346452712999)	37	2015-12-22 09:00:00	(50.436511424554901,3.9257374405860901)	36	2015-12-22 09:15:56.164
3	test	5	2	(50.436525920697399,3.9243346452712999)	37	2015-12-22 14:41:46.509	\N	\N	\N
\.


--
-- Name: locations_idlocation_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('locations_idlocation_seq', 3, true);


--
-- Data for Name: pays; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY pays (idpays, nom_en, nom_fr) FROM stdin;
AF	Afghanistan	Afghanistan
AL	Albania	Albanie
AQ	Antarctica	Antarctique
DZ	Algeria	Algérie
AS	American Samoa	Samoa Américaines
AD	Andorra	Andorre
AO	Angola	Angola
AG	Antigua and Barbuda	Antigua-et-Barbuda
AU	Australia	Australie
AT	Austria	Autriche
BS	Bahamas	Bahamas
BH	Bahrain	Bahreïn
BD	Bangladesh	Bangladesh
AM	Armenia	Arménie
BB	Barbados	Barbade
BE	Belgium	Belgique
BM	Bermuda	Bermudes
BT	Bhutan	Bhoutan
BO	Bolivia	Bolivie
BA	Bosnia and Herzegovina	Bosnie-Herzégovine
BW	Botswana	Botswana
BV	Bouvet Island	Île Bouvet
BR	Brazil	Brésil
BZ	Belize	Belize
IO	British Indian Ocean Territory	Territoire Britannique de l'Océan Indien
SB	Solomon Islands	Îles Salomon
VG	British Virgin Islands	Îles Vierges Britanniques
BN	Brunei Darussalam	Brunéi Darussalam
BG	Bulgaria	Bulgarie
MM	Myanmar	Myanmar
BI	Burundi	Burundi
BY	Belarus	Bélarus
KH	Cambodia	Cambodge
CM	Cameroon	Cameroun
CA	Canada	Canada
CV	Cape Verde	Cap-vert
KY	Cayman Islands	Îles Caïmanes
CF	Central African	République Centrafricaine
LK	Sri Lanka	Sri Lanka
TD	Chad	Tchad
CL	Chile	Chili
CN	China	Chine
TW	Taiwan	Taïwan
CX	Christmas Island	Île Christmas
CC	Cocos (Keeling) Islands	Îles Cocos (Keeling)
CO	Colombia	Colombie
KM	Comoros	Comores
YT	Mayotte	Mayotte
CG	Republic of the Congo	République du Congo
CD	The Democratic Republic Of The Congo	République Démocratique du Congo
CK	Cook Islands	Îles Cook
CR	Costa Rica	Costa Rica
HR	Croatia	Croatie
CU	Cuba	Cuba
CY	Cyprus	Chypre
CZ	Czech Republic	République Tchèque
BJ	Benin	Bénin
DK	Denmark	Danemark
DM	Dominica	Dominique
DO	Dominican Republic	République Dominicaine
EC	Ecuador	Équateur
SV	El Salvador	El Salvador
GQ	Equatorial Guinea	Guinée Équatoriale
ET	Ethiopia	Éthiopie
ER	Eritrea	Érythrée
EE	Estonia	Estonie
FO	Faroe Islands	Îles Féroé
FK	Falkland Islands	Îles (malvinas) Falkland
GS	South Georgia and the South Sandwich Islands	Géorgie du Sud et les Îles Sandwich du Sud
FJ	Fiji	Fidji
FI	Finland	Finlande
AX	Åland Islands	Îles Åland
FR	France	France
GF	French Guiana	Guyane Française
PF	French Polynesia	Polynésie Française
TF	French Southern Territories	Terres Australes Françaises
DJ	Djibouti	Djibouti
GA	Gabon	Gabon
GE	Georgia	Géorgie
GM	Gambia	Gambie
PS	Occupied Palestinian Territory	Territoire Palestinien Occupé
DE	Germany	Allemagne
GH	Ghana	Ghana
GI	Gibraltar	Gibraltar
KI	Kiribati	Kiribati
GR	Greece	Grèce
GL	Greenland	Groenland
GD	Grenada	Grenade
GP	Guadeloupe	Guadeloupe
GU	Guam	Guam
GT	Guatemala	Guatemala
GN	Guinea	Guinée
GY	Guyana	Guyana
HT	Haiti	Haïti
HM	Heard Island and McDonald Islands	Îles Heard et Mcdonald
VA	Vatican City State	Saint-Siège (état de la Cité du Vatican)
HN	Honduras	Honduras
HK	Hong Kong	Hong-Kong
HU	Hungary	Hongrie
IS	Iceland	Islande
IN	India	Inde
ID	Indonesia	Indonésie
IR	Islamic Republic of Iran	République Islamique d'Iran
IQ	Iraq	Iraq
IE	Ireland	Irlande
IL	Israel	Israël
IT	Italy	Italie
CI	Côte d'Ivoire	Côte d'Ivoire
JM	Jamaica	Jamaïque
JP	Japan	Japon
KZ	Kazakhstan	Kazakhstan
JO	Jordan	Jordanie
KE	Kenya	Kenya
KP	Democratic People's Republic of Korea	République Populaire Démocratique de Corée
KR	Republic of Korea	République de Corée
KW	Kuwait	Koweït
KG	Kyrgyzstan	Kirghizistan
LA	Lao People's Democratic Republic	République Démocratique Populaire Lao
LB	Lebanon	Liban
LS	Lesotho	Lesotho
LV	Latvia	Lettonie
LR	Liberia	Libéria
LY	Libyan Arab Jamahiriya	Jamahiriya Arabe Libyenne
LI	Liechtenstein	Liechtenstein
LT	Lithuania	Lituanie
LU	Luxembourg	Luxembourg
MO	Macao	Macao
MG	Madagascar	Madagascar
MW	Malawi	Malawi
MY	Malaysia	Malaisie
MV	Maldives	Maldives
ML	Mali	Mali
MT	Malta	Malte
MQ	Martinique	Martinique
MR	Mauritania	Mauritanie
MU	Mauritius	Maurice
MX	Mexico	Mexique
MC	Monaco	Monaco
MN	Mongolia	Mongolie
MD	Republic of Moldova	République de Moldova
MS	Montserrat	Montserrat
MA	Morocco	Maroc
MZ	Mozambique	Mozambique
OM	Oman	Oman
NA	Namibia	Namibie
NR	Nauru	Nauru
NP	Nepal	Népal
NL	Netherlands	Pays-Bas
AN	Netherlands Antilles	Antilles Néerlandaises
AW	Aruba	Aruba
NC	New Caledonia	Nouvelle-Calédonie
VU	Vanuatu	Vanuatu
NZ	New Zealand	Nouvelle-Zélande
NI	Nicaragua	Nicaragua
NE	Niger	Niger
NG	Nigeria	Nigéria
NU	Niue	Niué
NF	Norfolk Island	Île Norfolk
NO	Norway	Norvège
MP	Northern Mariana Islands	Îles Mariannes du Nord
UM	United States Minor Outlying Islands	Îles Mineures Éloignées des États-Unis
FM	Federated States of Micronesia	États Fédérés de Micronésie
MH	Marshall Islands	Îles Marshall
PW	Palau	Palaos
PK	Pakistan	Pakistan
PA	Panama	Panama
PG	Papua New Guinea	Papouasie Nouvelle Guinée
PY	Paraguay	Paraguay
PE	Peru	Pérou
PH	Philippines	Philippines
PN	Pitcairn	Pitcairn
PL	Poland	Pologne
PT	Portugal	Portugal
GW	Guinea-Bissau	Guinée-Bissau
TL	Timor-Leste	Timor-Leste
PR	Puerto Rico	Porto Rico
QA	Qatar	Qatar
RE	Réunion	Réunion
RO	Romania	Roumanie
RU	Russian Federation	Fédération de Russie
RW	Rwanda	Rwanda
SH	Saint Helena	Sainte-Hélène
AI	Anguilla	Anguilla
LC	Saint Lucia	Sainte-Lucie
PM	Saint-Pierre and Miquelon	Saint-Pierre-et-Miquelon
VC	Saint Vincent and the Grenadines	Saint-Vincent-et-les Grenadines
SM	San Marino	Saint-Marin
ST	Sao Tome and Principe	Sao Tomé-et-Principe
SA	Saudi Arabia	Arabie Saoudite
SN	Senegal	Sénégal
SC	Seychelles	Seychelles
SL	Sierra Leone	Sierra Leone
SG	Singapore	Singapour
SK	Slovakia	Slovaquie
VN	Vietnam	Viet Nam
SI	Slovenia	Slovénie
SO	Somalia	Somalie
ZA	South Africa	Afrique du Sud
ZW	Zimbabwe	Zimbabwe
ES	Spain	Espagne
EH	Western Sahara	Sahara Occidental
SD	Sudan	Soudan
SR	Suriname	Suriname
SJ	Svalbard and Jan Mayen	Svalbard etÎle Jan Mayen
SZ	Swaziland	Swaziland
SE	Sweden	Suède
CH	Switzerland	Suisse
SY	Syrian Arab Republic	République Arabe Syrienne
TJ	Tajikistan	Tadjikistan
TH	Thailand	Thaïlande
TG	Togo	Togo
TK	Tokelau	Tokelau
TO	Tonga	Tonga
TT	Trinidad and Tobago	Trinité-et-Tobago
AE	United Arab Emirates	Émirats Arabes Unis
TN	Tunisia	Tunisie
TR	Turkey	Turquie
TM	Turkmenistan	Turkménistan
TC	Turks and Caicos Islands	Îles Turks et Caïques
TV	Tuvalu	Tuvalu
UG	Uganda	Ouganda
UA	Ukraine	Ukraine
MK	The Former Yugoslav Republic of Macedonia	L'ex-République Yougoslave de Macédoine
EG	Egypt	Égypte
GB	United Kingdom	Royaume-Uni
IM	Isle of Man	Île de Man
TZ	United Republic Of Tanzania	République-Unie de Tanzanie
US	United States	États-Unis
VI	U.S. Virgin Islands	Îles Vierges des États-Unis
BF	Burkina Faso	Burkina Faso
UY	Uruguay	Uruguay
UZ	Uzbekistan	Ouzbékistan
VE	Venezuela	Venezuela
WF	Wallis and Futuna	Wallis et Futuna
WS	Samoa	Samoa
YE	Yemen	Yémen
CS	Serbia and Montenegro	Serbie-et-Monténégro
ZM	Zambia	Zambie
\.


--
-- Data for Name: stations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY stations (idstation, dom_station, nom_station, fixe_virtuelle, rayon, zone_station, capacite_optimum, limite_vide, bonus_ajouter, limite_pleine, bonus_enlever, descript_station, desact_station) FROM stdin;
4	mons	parc	t	5	((50.458610551278603,3.9518406987190202),(50.458631042346703,3.9526775479316698),(50.458094856476002,3.9533749222755401),(50.457497189902803,3.95265072584152),(50.457927510596697,3.95151346921921))	15	4	1	11	2	Parc	f
1	Bike7	univer	t	5	((50.4620939053341,3.9303159713745099),(50.462312460172598,3.9388132095336901),(50.460072225199298,3.9459371566772501),(50.454225258495804,3.93683910369873),(50.453842721468199,3.9216470718383798),(50.4582143888844,3.92224788665771))	25	0	0	0	0	zoning Mons	f
2	mons	gare	t	5	((50.453757333316503,3.9427050948143001),(50.454126209026498,3.9430323243141201),(50.454167195038998,3.9433702826499899),(50.454068145448097,3.9436438679695098),(50.453733424606398,3.9437296986579899),(50.453200598789302,3.9432093501090999),(50.4530708069762,3.9426138997077902),(50.453180105368801,3.9423349499702498),(50.4533645458338,3.9423242211341898))	20	3	1	17	2	Gare de Mons	f
10	mons	chr	f	5	((50.454015205064501,3.95904377102852),(50.453899077563896,3.9602722227573399),(50.453683899382803,3.9602158963680298),(50.453808566226002,3.9589847624301902))	5	2	1	4	0	test	f
35	mons	nervienne	f	5	((50.448608996901299,3.9454590529203402),(50.448582523662502,3.94555695354939),(50.4486346161505,3.9455877989530599),(50.448661089360201,3.9454925805330299))	10	3	0	7	0	\N	f
37	test	wapi	t	5	((50.437441953619221,3.924691379070282),(50.437045613956549,3.9261719584465027),(50.436365678702195,3.9244821667671204),(50.436413513662565,3.9242729544639587),(50.436519433759969,3.9241978526115417))	25	5	0	20	0	\N	f
36	test	sos+	f	5	((50.4318433482728,3.9248509705066699),(50.431809177150299,3.9250226318836199),(50.431764754654203,3.9249958097934701),(50.431804051479801,3.9247865974903098))	20	5	0	15	0	\N	f
41	Bike7	testB	f	5	((50.457859205986026,3.9351895451545715),(50.457746503162795,3.9354953169822693),(50.457609893320054,3.9353397488594055),(50.457715765982591,3.9350447058677673))	10	3	1	7	2	\N	f
42	mons	test	f	5	\N	10	3	1	7	2	test	t
43	mons	grand place	t	5	((50.455021062222791,3.9527365565299988),(50.454894690851262,3.9530101418495178),(50.454211596512422,3.952307403087616),(50.454242335969596,3.9519587159156799),(50.454262828929977,3.9518353343009949),(50.454669270809859,3.9520284533500671),(50.454932260753729,3.9523932337760925),(50.455072293763713,3.9526346325874329))	20	3	0	18	1	\N	t
40	test	quick	f	5	((50.437527371215303,3.9198137819766998),(50.437464162208997,3.91976550221443),(50.437445370326003,3.9198942482471502),(50.437493204195398,3.9199210703373))	10	10	1	0	2	\N	f
44	test	barre	t	5	((50.429094202649956,3.9229881763458252),(50.428561099378243,3.92386794090271),(50.428068998723262,3.923417329788208),(50.426305596046319,3.9233958721160889),(50.425936503454508,3.9236319065093994),(50.425840812312956,3.9241254329681396),(50.42929924077167,3.9295756816864014),(50.430420100143529,3.9266788959503174),(50.430092046488461,3.9245331287384033))	25	0	0	0	0	\N	f
3	mons	polytech	f	5	((50.452177624711297,3.95291827619076),(50.452151153469103,3.95293168723583),(50.452220320232001,3.95356468856335),(50.4522519148925,3.95355395972729))	25	5	1	20	2	Campus Polytech UMONS	f
\.


--
-- Name: stations_idstation_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('stations_idstation_seq', 44, true);


--
-- Data for Name: statutcamions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY statutcamions (idstatutcamion, nom_statut_fr, nom_statut_en) FROM stdin;
1	en redistribution	\N
2	en dépôt	\N
3	en entretien	\N
\.


--
-- Name: statutcamions_idstatutcamion_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('statutcamions_idstatutcamion_seq', 1, false);


--
-- Data for Name: statutclients; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY statutclients (idstatutclient, nom_statut_fr, nom_statut_en) FROM stdin;
1	actif	\N
2	en attente	\N
3	suspendu	\N
\.


--
-- Name: statutclients_idstatutclient_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('statutclients_idstatutclient_seq', 1, false);


--
-- Data for Name: statutvelos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY statutvelos (idstatutvelo, nom_statut_fr, nom_statut_en) FROM stdin;
1	disponible	\N
2	location	\N
3	réservé	\N
4	distribution	\N
5	en panne	\N
6	en entretient	\N
7	volé	\N
\.


--
-- Name: statutvelos_idstatutvelo_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('statutvelos_idstatutvelo_seq', 1, false);


--
-- Data for Name: tarifs; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY tarifs (idtarif, dom_tarif, nom_tarif, duree_gratuit, prix_1, duree_1, prix_2, duree_2, prix_3, duree_3, prix_plus, prix_reservation, descript_tarif, desact_tarif) FROM stdin;
6	Bike7	mobil+	10	0.050000000000000003	60	0.070000000000000007	90	0.080000000000000002	120	0.10000000000000001	1	tarif zoning	f
1	test	normal	10	0.14999999999999999	30	0.10000000000000001	60	0.5	90	0.29999999999999999	2	tarif normal	f
5	test	tarif+	20	0.050000000000000003	60	0.10000000000000001	120	0.14999999999999999	180	0.20000000000000001	2	tarif croissant	f
7	test	tee	5	0.050000000000000003	30	\N	\N	\N	\N	\N	\N	\N	t
\.


--
-- Name: tarifs_idtarif_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('tarifs_idtarif_seq', 7, true);


--
-- Data for Name: transactions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY transactions (idtransaction, dom_transaction, client_transaction, location, date_transaction, montant, bonus, nature_transaction, justification, auteur) FROM stdin;
5	test	1	\N	2015-12-24 01:33:00.993	50	0	t	paiement en cashe	1
1	test	5	1	2015-12-22 14:20:00	-7	2	t	enregistrement de location 1 pour client 5	23
2	test	5	2	2015-12-22 09:16:00	-1.5	0	f	enregistrement automatique	\N
6	test	1	\N	2015-12-24 14:46:38.061	8.5	0	t	payement bancaire	1
7	test	1	\N	2015-12-24 16:45:22.157	10	0	t	Virement bancaire	1
\.


--
-- Name: transactions_idtransaction_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('transactions_idtransaction_seq', 7, true);


--
-- Data for Name: typeadmins; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY typeadmins (idtype, niveau, nom_fr, nom_en, nom_nl) FROM stdin;
1	-1	exploitant	\N	\N
2	1	operateur	\N	\N
4	3	testeur	\N	\N
\.


--
-- Name: typeadmins_idtype_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('typeadmins_idtype_seq', 11, true);


--
-- Data for Name: typecamions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY typecamions (idtypecamion, nom_type_fr, nom_type_en) FROM stdin;
1	diesel	\N
2	essence	\N
3	gaz	\N
4	électrique	\N
\.


--
-- Name: typecamions_idtypecamion_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('typecamions_idtypecamion_seq', 1, false);


--
-- Data for Name: typevelos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY typevelos (idtypevelo, tarif, dom_typevelo, nom_type_fr, nom_type_en, reservation_possible, avertir_sidisponible, deposer_station, descript_type, desact_type, uri_photovelo) FROM stdin;
1	1	test	ville	\N	f	f	t	vélo classique	f	/image/bike-city.jpg
5	1	test	sport	\N	t	f	t	vélo de sport tout terrain	f	/image/tout_terrain.jpg
4	6	Bike7	mobizone	\N	f	f	f	\N	f	/image/TheCity.png
6	5	test	occasion	\N	f	f	t	vélo d'occasion, blanc	t	/image/globelive.jpg
7	5	test	élecrique	\N	f	f	t	vélo électrique	f	/image/electrique.png
\.


--
-- Name: typevelos_idtypevelo_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('typevelos_idtypevelo_seq', 7, true);


--
-- Data for Name: velos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY velos (idvelo, station_velo, type_velo, statut_velo, date_statut, dom_velo, tarif_velo, position_velo, code_cadenas, code_ecadenas, pucegps_velo, desact_velo) FROM stdin;
7	44	5	1	2015-12-26 17:56:27.055	test	1	(50.427479464864199,3.9256489276886)	\N	\N	\N	f
8	44	7	1	2015-12-26 17:56:43.345	test	5	(50.427658910937502,3.9263033866882302)	\N	\N	\N	f
9	40	7	1	2015-12-26 17:56:54.585	test	5	(50.437486370788498,3.91984730958939)	\N	\N	\N	f
14	37	7	6	2015-12-26 18:00:54.965	test	5	(50.436912482861402,3.9251500368118299)	\N	\N	\N	f
16	40	5	5	2015-12-26 18:00:25.303	test	1	(50.437511141883903,3.9198245108127598)	\N	\N	\N	t
2	37	1	2	2015-12-25 17:16:23.894	test	1	(50.433584334324351,3.9202308654785156)	9877	\N	0488777777	f
3	36	1	1	2015-12-16 18:48:37.647	test	1	(50.431801915783609,3.9249146729707718)	\N	\N	\N	f
10	40	1	1	2015-12-25 22:43:34.241	test	1	(50.437486370788456,3.9198794960975647)	\N	\N	\N	f
11	36	1	1	2015-12-25 22:44:41.647	test	1	(50.431784403071106,3.9249823987483978)	\N	\N	\N	f
12	36	1	1	2015-12-25 22:45:09.909	test	1	(50.431810885707023,3.9248321950435638)	\N	\N	\N	f
13	37	1	1	2015-12-25 22:46:02.394	test	1	(50.43708643480533,3.9256086945533752)	\N	\N	\N	f
15	37	1	1	2015-12-25 22:47:27.392	test	1	(50.436662938029997,3.9247356355190277)	\N	\N	\N	f
1	37	1	1	2015-12-26 17:54:56.301	test	1	(50.4368098586177,3.9245867729186998)	1234	\N	0488555555	f
4	44	5	1	2015-12-26 17:55:38.842	test	1	(50.428189906146102,3.9257186651229898)	\N	\N	\N	f
5	44	5	1	2015-12-26 17:55:59.818	test	1	(50.429340121813297,3.9266842603683498)	\N	\N	\N	f
6	44	5	1	2015-12-26 17:56:10.775	test	1	(50.429251398622696,3.9290070533752401)	\N	\N	\N	f
\.


--
-- Name: velos_idvelo_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('velos_idvelo_seq', 16, true);


--
-- Data for Name: villes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY villes (idville, cpville, nomville, codepays) FROM stdin;
1	9420	Aaigem	BE
2	8511	Aalbeke	BE
3	9300	Aalst	BE
4	3800	Aalst (Limb.)	BE
5	9880	Aalter	BE
6	3200	Aarschot	BE
7	8700	Aarsele	BE
8	8211	Aartrijke	BE
9	2630	Aartselaar	BE
10	4557	Abée	BE
11	4280	Abolens	BE
12	3930	Achel	BE
13	5590	Achêne	BE
14	5362	Achet	BE
15	4219	Acosse	BE
16	6280	Acoz	BE
17	9991	Adegem	BE
18	8660	Adinkerke	BE
19	1790	Affligem	BE
20	9051	Afsnee	BE
21	5544	Agimont	BE
22	4317	Aineffe	BE
23	5310	Aische-en-Refail	BE
24	6250	Aiseau	BE
25	6250	Aiseau-Presles	BE
26	5070	Aisemont	BE
27	3570	Alken	BE
28	5550	Alle	BE
29	4432	Alleur	BE
30	1652	Alsemberg	BE
31	8690	Alveringem	BE
32	4540	Amay	BE
33	6680	Amberloup	BE
34	4770	Amblève	BE
35	6953	Ambly	BE
36	4219	Ambresin	BE
37	4770	Amel	BE
38	6997	Amonines	BE
39	7750	Amougies	BE
40	4540	Ampsin	BE
41	5300	Andenne	BE
42	1070	Anderlecht	BE
43	6150	Anderlues	BE
44	4821	Andrimont	BE
45	4031	Angleur	BE
46	7387	Angre	BE
47	7387	Angreau	BE
48	5537	Anhée	BE
49	6721	Anlier	BE
50	6890	Anloy	BE
51	5537	Annevoie-Rouillon	BE
52	4430	Ans	BE
53	5500	Anseremme	BE
54	7750	Anseroeul	BE
55	5520	Anthée	BE
56	4520	Antheit	BE
57	4160	Anthisnes	BE
58	7640	Antoing	BE
59	2000	Antwerpen 1	BE
60	2018	Antwerpen 1	BE
61	2020	Antwerpen 2	BE
62	2030	Antwerpen 3	BE
63	2040	Antwerpen 4	BE
64	2050	Antwerpen 5	BE
65	2060	Antwerpen 6	BE
66	7910	Anvaing	BE
67	8570	Anzegem	BE
68	9200	Appels	BE
69	9400	Appelterre-Eichem	BE
70	7811	Arbre (Ht.)	BE
71	5170	Arbre (Nam.)	BE
72	4990	Arbrefontaine	BE
73	7910	Arc-Ainières	BE
74	1390	Archennes	BE
75	7910	Arc-Wattripont	BE
76	8850	Ardooie	BE
77	2370	Arendonk	BE
78	4601	Argenteau	BE
79	6700	Arlon	BE
80	7181	Arquennes	BE
81	5060	Arsimont	BE
82	6870	Arville	BE
83	3665	As	BE
84	9404	Aspelare	BE
85	9890	Asper	BE
86	7040	Asquillies	BE
87	1730	Asse	BE
88	8310	Assebroek	BE
89	9960	Assenede	BE
90	6860	Assenois	BE
91	3460	Assent	BE
92	5330	Assesse	BE
93	9800	Astene	BE
94	7800	Ath	BE
95	7387	Athis	BE
96	6791	Athus	BE
97	3404	Attenhoven	BE
98	3384	Attenrode	BE
99	6717	Attert	BE
100	7941	Attre	BE
101	6790	Aubange	BE
102	7972	Aubechies	BE
103	4880	Aubel	BE
104	5660	Aublain	BE
105	6880	Auby-sur-Semois	BE
106	1160	Auderghem	BE
107	7382	Audregnies	BE
108	7040	Aulnois	BE
109	6706	Autelbas	BE
110	1367	Autre-Eglise	BE
111	7387	Autreppe	BE
112	5060	Auvelais	BE
113	5580	Ave-et-Auffe	BE
114	8630	Avekapelle	BE
115	8580	Avelgem	BE
116	4260	Avennes	BE
117	3271	Averbode	BE
118	4280	Avernas-le-Bauduin	BE
119	4280	Avin	BE
120	4340	Awans	BE
121	6870	Awenne	BE
122	4400	Awirs	BE
123	6900	Aye	BE
124	4630	Ayeneux	BE
125	4920	Aywaille	BE
126	9890	Baaigem	BE
127	3128	Baal	BE
128	9310	Baardegem	BE
129	2387	Baarle-Hertog	BE
130	9200	Baasrode	BE
131	9800	Bachte-Maria-Leerne	BE
132	4837	Baelen (Lg.)	BE
133	5550	Bagimont	BE
134	6464	Baileux	BE
135	6460	Bailièvre	BE
136	5555	Baillamont	BE
137	7730	Bailleul	BE
138	5377	Baillonville	BE
139	7380	Baisieux	BE
140	1470	Baisy-thy	BE
141	5190	Balâtre	BE
142	9860	Balegem	BE
143	2490	Balen	BE
144	9420	Bambrugge	BE
145	6951	Bande	BE
146	6500	Barbençon	BE
147	4671	Barchon	BE
148	5570	Baronville	BE
149	7534	Barry	BE
150	5370	Barvaux-Condroz	BE
151	6940	Barvaux-sur-Ourthe	BE
152	7971	Basècles	BE
153	4520	Bas-Oha	BE
154	4983	Basse-Bodeux	BE
155	4690	Bassenge	BE
156	9968	Bassevelde	BE
157	7830	Bassilly	BE
158	6600	Bastogne	BE
159	7784	Bas-Warneton	BE
160	3870	Batsheers	BE
161	4651	Battice	BE
162	7130	Battignies	BE
163	7331	Baudour	BE
164	7870	Bauffe	BE
165	7604	Baugnies	BE
166	1401	Baulers	BE
167	9520	Bavegem	BE
168	8531	Bavikhove	BE
169	9150	Bazel	BE
170	4052	Beaufays	BE
171	6500	Beaumont	BE
172	5570	Beauraing	BE
173	6980	Beausaint	BE
174	1320	Beauvechain	BE
175	6594	Beauwelz	BE
176	7532	Beclers	BE
177	3960	Beek	BE
178	9630	Beerlegem	BE
179	8730	Beernem	BE
180	2340	Beerse	BE
181	1650	Beersel	BE
182	8600	Beerst	BE
183	1673	Beert	BE
184	9080	Beervelde	BE
185	2580	Beerzel	BE
186	5000	Beez	BE
187	6987	Beffe	BE
188	3130	Begijnendijk	BE
189	6672	Beho	BE
190	1852	Beigem	BE
191	8480	Bekegem	BE
192	1730	Bekkerzeel	BE
193	3460	Bekkevoort	BE
194	5001	Belgrade	BE
195	4610	Bellaire	BE
196	7170	Bellecourt	BE
197	6730	Bellefontaine (Lux.)	BE
198	5555	Bellefontaine (Nam.)	BE
199	8510	Bellegem	BE
200	9881	Bellem	BE
201	6834	Bellevaux	BE
202	4960	Bellevaux-Ligneuville	BE
203	1674	Bellingen	BE
204	7970	Beloeil	BE
205	9111	Belsele	BE
206	4500	Ben-Ahin	BE
207	6941	Bende	BE
208	3540	Berbroek	BE
209	2600	Berchem (Antwerpen)	BE
210	9690	Berchem (O.-Vl.)	BE
211	1082	Berchem-Sainte-Agathe	BE
212	2040	Berendrecht	BE
213	1910	Berg (Bt.)	BE
214	3700	Berg (Limb.)	BE
215	4360	Bergilers	BE
216	3580	Beringen	BE
217	2590	Berlaar	BE
218	9290	Berlare	BE
219	3830	Berlingen	BE
220	4257	Berloz	BE
221	4607	Berneau	BE
222	7320	Bernissart	BE
223	6560	Bersillies-l'Abbaye	BE
224	3060	Bertem	BE
225	6687	Bertogne	BE
226	4280	Bertrée	BE
227	6880	Bertrix	BE
228	5651	Berzée	BE
229	8980	Beselare	BE
230	3130	Betekom	BE
231	4300	Bettincourt	BE
232	5030	Beuzet	BE
233	2560	Bevel	BE
234	1547	Bever	BE
235	4960	Bevercé	BE
236	9700	Bevere	BE
237	8791	Beveren (Leie)	BE
238	8800	Beveren (Roeselare)	BE
239	8691	Beveren-aan-den-Ijzer	BE
240	9120	Beveren-Waas	BE
241	3581	Beverlo	BE
242	3740	Beverst	BE
243	4610	Beyne-Heusay	BE
244	6543	Bienne-lez-Happart	BE
245	3360	Bierbeek	BE
246	6533	Biercée	BE
247	1301	Bierges	BE
248	1430	Bierghes	BE
249	4460	Bierset	BE
250	5380	Bierwart	BE
251	5640	Biesme	BE
252	5640	Biesmerée	BE
253	6531	Biesme-sous-Thuin	BE
254	1547	Biévène	BE
255	5555	Bièvre	BE
256	1390	Biez	BE
257	6690	Bihain	BE
258	8920	Bikschote	BE
259	4831	Bilstain	BE
260	3740	Bilzen	BE
261	7130	Binche	BE
262	3850	Binderveld	BE
263	3211	Binkom	BE
264	5537	Bioul	BE
265	8501	Bissegem	BE
266	7783	Bizet	BE
267	2830	Blaasveld	BE
268	5542	Blaimont	BE
269	7522	Blandain	BE
270	3052	Blanden	BE
271	8370	Blankenberge	BE
272	7040	Blaregnies	BE
273	7321	Blaton	BE
274	7370	Blaugies	BE
275	4670	Blégny	BE
276	7620	Bléharies	BE
277	4280	Blehen	BE
278	6760	Bleid	BE
279	4300	Bleret	BE
280	7903	Blicquy	BE
281	3950	Bocholt	BE
282	2530	Boechout	BE
283	3890	Boekhout	BE
284	9961	Boekhoute	BE
285	4250	Boëlhe	BE
286	8904	Boezinge	BE
287	1670	Bogaarden	BE
288	5550	Bohan	BE
289	5140	Boignée	BE
290	4690	Boirs	BE
291	7866	Bois-de-Lessines	BE
292	5170	Bois-de-Villers	BE
293	7170	Bois-d'Haine	BE
294	4560	Bois-et-Borsu	BE
295	5310	Bolinne	BE
296	4653	Bolland	BE
297	1367	Bomal (Bt.)	BE
298	6941	Bomal-sur-Ourthe	BE
299	4607	Bombaye	BE
300	3840	Bommershoven	BE
301	4100	Boncelles	BE
302	5310	Boneffe	BE
303	2820	Bonheiden	BE
304	5021	Boninne	BE
305	1325	Bonlez	BE
306	6700	Bonnert	BE
307	5300	Bonneville	BE
308	7603	Bon-Secours	BE
309	5377	Bonsin	BE
310	2221	Booischot	BE
311	8630	Booitshoeke	BE
312	2850	Boom	BE
313	3631	Boorsem	BE
314	3190	Boortmeerbeek	BE
315	1761	Borchtlombeek	BE
316	2140	Borgerhout (Antwerpen)	BE
317	3840	Borgloon	BE
318	4317	Borlez	BE
319	3891	Borlo	BE
320	6941	Borlon	BE
321	2880	Bornem	BE
322	1404	Bornival	BE
323	2150	Borsbeek (Antw.)	BE
324	9552	Borsbeke	BE
325	5032	Bossière	BE
326	8583	Bossuit	BE
327	1390	Bossut-Gottechain	BE
328	3300	Bost	BE
329	5032	Bothey	BE
330	9820	Bottelare	BE
331	6200	Bouffioulx	BE
332	5004	Bouge	BE
333	7040	Bougnies	BE
334	6830	Bouillon	BE
335	6464	Bourlers	BE
336	5575	Bourseigne-Neuve	BE
337	5575	Bourseigne-Vieille	BE
338	7110	Boussoit	BE
339	7300	Boussu	BE
340	5660	Boussu-en-Fagne	BE
341	6440	Boussu-lez-Walcourt	BE
342	1470	Bousval	BE
343	3370	Boutersem	BE
344	5500	Bouvignes-sur-Meuse	BE
345	7803	Bouvignies	BE
346	2288	Bouwel	BE
347	8680	Bovekerke	BE
348	3870	Bovelingen	BE
349	4300	Bovenistier	BE
350	5081	Bovesse	BE
351	6671	Bovigny	BE
352	4990	Bra	BE
353	7604	Braffe	BE
354	5590	Braibant	BE
355	1420	Braine-l'Alleud	BE
356	1440	Braine-le-Château	BE
357	7090	Braine-le-Comte	BE
358	4260	Braives	BE
359	9660	Brakel	BE
360	5310	Branchon	BE
361	6800	Bras	BE
362	7604	Brasmenil	BE
363	2930	Brasschaat	BE
364	7130	Bray	BE
365	2960	Brecht	BE
366	8450	Bredene	BE
367	3960	Bree	BE
368	2870	Breendonk	BE
369	4020	Bressoux	BE
370	8900	Brielen	BE
371	2520	Broechem	BE
372	3840	Broekom	BE
373	1931	Brucargo	BE
374	7940	Brugelette	BE
375	8000	Brugge	BE
376	5660	Brûly	BE
377	5660	Brûly-de-Pesche	BE
378	7620	Brunehaut	BE
379	1785	Brussegem	BE
380	1000	Brussel 1	BE
381	1120	Brussel 12	BE
382	1130	Brussel 13	BE
383	1140	Brussel 14	BE
384	1150	Brussel 15	BE
385	1160	Brussel 16	BE
386	1170	Brussel 17	BE
387	1180	Brussel 18	BE
388	1190	Brussel 19	BE
389	1020	Brussel 2	BE
390	1200	Brussel 20	BE
391	1210	Brussel 21	BE
392	1030	Brussel 3	BE
393	1040	Brussel 4	BE
394	1050	Brussel 5	BE
395	1060	Brussel 6	BE
396	1070	Brussel 7	BE
397	1080	Brussel 8	BE
398	1090	Brussel 9	BE
399	3800	Brustem	BE
400	1000	Bruxelles 1	BE
401	1120	Bruxelles 12	BE
402	1130	Bruxelles 13	BE
403	1140	Bruxelles 14	BE
404	1150	Bruxelles 15	BE
405	1160	Bruxelles 16	BE
406	1170	Bruxelles 17	BE
407	1180	Bruxelles 18	BE
408	1190	Bruxelles 19	BE
409	1020	Bruxelles 2	BE
410	1200	Bruxelles 20	BE
411	1210	Bruxelles 21	BE
412	1030	Bruxelles 3	BE
413	1040	Bruxelles 4	BE
414	1050	Bruxelles 5	BE
415	1060	Bruxelles 6	BE
416	1070	Bruxelles 7	BE
417	1080	Bruxelles 8	BE
418	1090	Bruxelles 9	BE
419	7641	Bruyelle	BE
420	6222	Brye	BE
421	3440	Budingen	BE
422	9255	Buggenhout	BE
423	7911	Buissenal	BE
424	5580	Buissonville	BE
425	1501	Buizingen	BE
426	1910	Buken	BE
427	4760	Bullange	BE
428	4760	Büllingen	BE
429	8630	Bulskamp	BE
430	3380	Bunsbeek	BE
431	2070	Burcht	BE
432	4210	Burdinne	BE
433	6927	Bure	BE
434	4790	Burg-Reuland	BE
435	9420	Burst	BE
436	7602	Bury	BE
437	4750	Butgenbach	BE
438	4750	Bütgenbach	BE
439	3891	Buvingen	BE
440	7133	Buvrinnes	BE
441	6743	Buzenol	BE
442	6230	Buzet	BE
443	7604	Callenelle	BE
444	7642	Calonne	BE
445	7940	Cambron-Casteau	BE
446	7870	Cambron-Saint-Vincent	BE
447	6850	Carlsbourg	BE
448	7141	Carnières	BE
449	7020	Casteau (Mons)	BE
450	7061	Casteau (Soignies)	BE
451	5650	Castillon	BE
452	7760	Celles (Ht.)	BE
453	4317	Celles (Lg.)	BE
454	5561	Celles (Nam.)	BE
455	4632	Cerexhe-Heuseux	BE
456	5630	Cerfontaine	BE
457	1341	Céroux-Mousty	BE
458	7063	Ch.-Notre-Dame-Louvignies	BE
459	4650	Chaineux	BE
460	5550	Chairière	BE
461	5020	Champion	BE
462	6971	Champlon	BE
463	6921	Chanly	BE
464	6742	Chantemelle	BE
465	7903	Chapelle-à-Oie	BE
466	7903	Chapelle-à-Wattines	BE
467	7160	Chapelle-lez-Herlaimont	BE
468	4537	Chapon-Seraing	BE
469	6000	Charleroi	BE
470	4654	Charneux	BE
471	6824	Chassepierre	BE
472	1450	Chastre	BE
473	5650	Chastrès	BE
474	1450	Chastre-Villeroux-Blanmont	BE
475	6200	Châtelet	BE
476	6200	Châtelineau	BE
477	6747	Châtillon	BE
478	4050	Chaudfontaine	BE
479	1325	Chaumont-Gistoux	BE
480	4032	Chênée	BE
481	6673	Cherain	BE
482	4602	Cheratte	BE
483	7521	Chercq	BE
484	5590	Chevetogne	BE
485	4987	Chevron	BE
486	7950	Chièvres	BE
487	6460	Chimay	BE
488	6810	Chiny	BE
489	4400	Chokier	BE
490	5560	Ciergnon	BE
491	5590	Ciney	BE
492	4260	Ciplet	BE
493	7024	Ciply	BE
494	1480	Clabecq	BE
495	4560	Clavier	BE
496	4890	Clermont (Lg.)	BE
497	5650	Clermont (Nam.)	BE
498	4480	Clermont-sous-Huy	BE
499	5022	Cognelée	BE
500	7340	Colfontaine	BE
501	4170	Comblain-au-Pont	BE
502	4180	Comblain-Fairon	BE
503	4180	Comblain-la-Tour	BE
504	7780	Comines	BE
505	7780	Comines-Warneton	BE
506	5590	Conneux	BE
507	1435	Corbais	BE
508	6838	Corbion	BE
509	7910	Cordes	BE
510	5620	Corenne	BE
511	4860	Cornesse	BE
512	5555	Cornimont	BE
513	5032	Corroy-le-Château	BE
514	1325	Corroy-le-Grand	BE
515	4257	Corswarem	BE
516	1450	Cortil-Noirmont	BE
517	5380	Cortil-Wodon	BE
518	6010	Couillet	BE
519	6180	Courcelles	BE
520	5336	Courrière	BE
521	6120	Cour-sur-Heure	BE
522	1490	Court-Saint-Etienne	BE
523	4218	Couthuin	BE
524	5300	Coutisse	BE
525	1380	Couture-Saint-Germain	BE
526	5660	Couvin	BE
527	4280	Cras-Avernas	BE
528	4280	Crehen	BE
529	4367	Crisnée	BE
530	7120	Croix-lez-Rouveroy	BE
531	4784	Crombach	BE
532	5332	Crupet	BE
533	7033	Cuesmes	BE
534	6880	Cugnon	BE
535	5660	Cul-des-Sarts	BE
536	5562	Custinne	BE
537	8890	Dadizele	BE
538	5660	Dailly	BE
539	9160	Daknam	BE
540	4607	Dalhem	BE
541	8340	Damme	BE
542	6767	Dampicourt	BE
543	6020	Dampremy	BE
544	4253	Darion	BE
545	5630	Daussois	BE
546	5020	Daussoulx	BE
547	5100	Dave	BE
548	6929	Daverdisse	BE
549	8420	De Haan	BE
550	9170	De Klinge	BE
551	8630	De Moeren	BE
552	8660	De Panne	BE
553	9840	De Pinte	BE
554	8540	Deerlijk	BE
555	9570	Deftinge	BE
556	9800	Deinze	BE
557	9280	Denderbelle	BE
558	9450	Denderhoutem	BE
559	9470	Denderleeuw	BE
560	9200	Dendermonde	BE
561	9400	Denderwindeke	BE
562	5537	Denée	BE
563	8720	Dentergem	BE
564	7912	Dergneau	BE
565	2480	Dessel	BE
566	8792	Desselgem	BE
567	9070	Destelbergen	BE
568	9831	Deurle	BE
569	2100	Deurne (Antwerpen)	BE
570	3290	Deurne (Bt.)	BE
571	7864	Deux-Acren	BE
572	5310	Dhuy	BE
573	1831	Diegem	BE
574	3590	Diepenbeek	BE
575	3290	Diest	BE
576	3700	Diets-Heur	BE
577	8900	Dikkebus	BE
578	9630	Dikkele	BE
579	9890	Dikkelvenne	BE
580	8600	Diksmuide	BE
581	1700	Dilbeek	BE
582	3650	Dilsen	BE
583	5500	Dinant	BE
584	5570	Dion	BE
585	1325	Dion-Valmont	BE
586	4820	Dison	BE
587	6960	Dochamps	BE
588	9130	Doel	BE
589	6836	Dohan	BE
590	5680	Doische	BE
591	4140	Dolembreux	BE
592	4357	Donceel	BE
593	1370	Dongelberg	BE
594	3540	Donk	BE
595	6536	Donstiennes	BE
596	5530	Dorinne	BE
597	3440	Dormaal	BE
598	7711	Dottenijs	BE
599	7711	Dottignies	BE
600	7370	Dour	BE
601	5670	Dourbes	BE
602	8951	Dranouter	BE
603	5500	Dréhance	BE
604	8600	Driekapellen	BE
605	3350	Drieslinter	BE
606	1620	Drogenbos	BE
607	9031	Drongen	BE
608	8380	Dudzele	BE
609	2570	Duffel	BE
610	3080	Duisburg	BE
611	3803	Duras	BE
612	6940	Durbuy	BE
613	5530	Durnal	BE
614	1653	Dworp	BE
615	4690	Eben-Emael	BE
616	6860	Ebly	BE
617	7190	Ecaussinnes	BE
618	7190	Ecaussinnes-d'Enghien	BE
619	7191	Ecaussinnes-Lalaing	BE
620	2650	Edegem	BE
621	9700	Edelare	BE
622	7850	Edingen	BE
623	9900	Eeklo	BE
624	8480	Eernegem	BE
625	8740	Egem	BE
626	8630	Eggewaartskapelle	BE
627	5310	Eghezée	BE
628	4480	Ehein (Engis)	BE
629	4120	Ehein (Neupré)	BE
630	3740	Eigenbilzen	BE
631	2430	Eindhout	BE
632	9700	Eine	BE
633	3630	Eisden	BE
634	9810	Eke	BE
635	2180	Ekeren (Antwerpen)	BE
636	9160	Eksaarde	BE
637	3941	Eksel	BE
638	3650	Elen	BE
639	9620	Elene	BE
640	1982	Elewijt	BE
641	3400	Eliksem	BE
642	1671	Elingen	BE
643	4590	Ellemelle	BE
644	7890	Ellezelles	BE
645	7910	Ellignies-lez-Frasnes	BE
646	7972	Ellignies-Sainte-Anne	BE
647	3670	Ellikom	BE
648	7370	Elouges	BE
649	9790	Elsegem	BE
650	4750	Elsenborn	BE
651	1050	Elsene	BE
652	9660	Elst	BE
653	8906	Elverdinge	BE
654	9140	Elversele	BE
655	2520	Emblem	BE
656	4053	Embourg	BE
657	8870	Emelgem	BE
658	5080	Emines	BE
659	5363	Emptinne	BE
660	9700	Ename	BE
661	3800	Engelmanshoven	BE
662	7850	Enghien	BE
663	4480	Engis	BE
664	1350	Enines	BE
665	4800	Ensival	BE
666	7134	Epinois	BE
667	1980	Eppegem	BE
668	5580	Eprave	BE
669	7050	Erbaut	BE
670	7050	Erbisoeul	BE
671	7500	Ere	BE
672	9320	Erembodegem	BE
673	6997	Erezée	BE
674	5644	Ermeton-sur-Biert	BE
675	5030	Ernage	BE
676	6972	Erneuville	BE
677	4920	Ernonheid	BE
678	9420	Erondegem	BE
679	9420	Erpe	BE
680	9420	Erpe-Mere	BE
681	5101	Erpent	BE
682	6441	Erpion	BE
683	3071	Erps-kwerps	BE
684	6560	Erquelinnes	BE
685	7387	Erquennes	BE
686	9940	Ertvelde	BE
687	9620	Erwetegem	BE
688	7760	Escanaffles	BE
689	8600	Esen	BE
690	4130	Esneux	BE
691	8587	Espierres	BE
692	8587	Espierres-Helchin	BE
693	7502	Esplechin	BE
694	7743	Esquelmes	BE
695	2910	Essen	BE
696	1790	Essene	BE
697	7730	Estaimbourg	BE
698	7730	Estaimpuis	BE
699	7120	Estinnes	BE
700	7120	Estinnes-au-Mont	BE
701	7120	Estinnes-au-Val	BE
702	6740	Etalle	BE
703	6760	Ethe	BE
704	9680	Etikhove	BE
705	8460	Ettelgem	BE
706	1040	Etterbeek	BE
707	7340	Eugies (Colfontaine)	BE
708	7080	Eugies (Frameries)	BE
709	4700	Eupen	BE
710	4631	Evegnée	BE
711	5350	Evelette	BE
712	9660	Everbeek	BE
713	3078	Everberg	BE
714	1140	Evere	BE
715	9940	Evergem	BE
716	7730	Evregnies	BE
717	5530	Evrehailles	BE
718	4731	Eynatten	BE
719	3400	Ezemaal	BE
720	5600	Fagnolle	BE
721	4317	Faimes	BE
722	5522	Falaën	BE
723	5060	Falisolle	BE
724	4260	Fallais	BE
725	5500	Falmagne	BE
726	5500	Falmignoul	BE
727	7181	Familleureux	BE
728	6240	Farciennes	BE
729	5340	Faulx-les-Tombes	BE
730	7120	Fauroeulx	BE
731	6637	Fauvillers	BE
732	4950	Faymonville	BE
733	6856	Fays-les-Veneurs	BE
734	7387	Fayt-le-Franc	BE
735	7170	Fayt-lez-Manage	BE
736	5570	Felenne	BE
737	7181	Feluy	BE
738	4607	Feneur	BE
739	5380	Fernelmont	BE
740	4190	Ferrières	BE
741	5570	Feschaux	BE
742	4347	Fexhe-le-Haut-Clocher	BE
743	4458	Fexhe-Slins	BE
744	4181	Filot	BE
745	5560	Finnevaux	BE
746	4530	Fize-Fontaine	BE
747	4367	Fize-le-Marsal	BE
748	6686	Flamierge	BE
749	5620	Flavion	BE
750	5020	Flawinne	BE
751	4400	Flémalle	BE
752	4400	Flémalle-Grande	BE
753	4400	Flémalle-Haute	BE
754	7012	Flénu	BE
755	4620	Fléron	BE
756	6220	Fleurus	BE
757	7880	Flobecq	BE
758	4540	Flône	BE
759	5334	Florée	BE
760	5150	Floreffe	BE
761	5620	Florennes	BE
762	6820	Florenville	BE
763	5150	Floriffoux	BE
764	5370	Flostoy	BE
765	5572	Focant	BE
766	1350	Folx-les-Caves	BE
767	6140	Fontaine-l'Evêque	BE
768	6567	Fontaine-Valmont	BE
769	5650	Fontenelle	BE
770	6820	Fontenoille	BE
771	7643	Fontenoy	BE
772	4340	Fooz	BE
773	6141	Forchies-la-Marche	BE
774	1190	Forest	BE
775	7910	Forest (Ht.)	BE
776	4870	Forêt	BE
777	6596	Forge-Philippe	BE
778	6464	Forges	BE
779	6953	Forrières	BE
780	5380	Forville	BE
781	4980	Fosse (Lg.)	BE
782	5070	Fosses-la-Ville	BE
783	7830	Fouleng	BE
784	6440	Fourbechies	BE
785	3798	Fouron-le-Comte	BE
786	3790	Fourons	BE
787	3790	Fouron-Saint-Martin	BE
788	3792	Fouron-Saint-Pierre	BE
789	5504	Foy-Notre-Dame	BE
790	4870	Fraipont	BE
791	5650	Fraire	BE
792	4557	Fraiture	BE
793	7080	Frameries	BE
794	6853	Framont	BE
795	5600	Franchimont	BE
796	4970	Francorchamps	BE
797	5380	Franc-Waret	BE
798	5150	Franière	BE
799	5660	Frasnes (Nam.)	BE
800	7911	Frasnes-lez-Buissenal	BE
801	6210	Frasnes-lez-Gosselies	BE
802	4347	Freloux	BE
803	6800	Freux	BE
804	6440	Froidchapelle	BE
805	5576	Froidfontaine	BE
806	7504	Froidmont	BE
807	6990	Fronville	BE
808	7503	Froyennes	BE
809	4260	Fumal	BE
810	5500	Furfooz	BE
811	5641	Furnaux	BE
812	1750	Gaasbeek	BE
813	7943	Gages	BE
814	7906	Gallaix	BE
815	1570	Galmaarden	BE
816	1083	Ganshoren	BE
817	7530	Gaurain-Ramecroix	BE
818	9890	Gavere	BE
819	5575	Gedinne	BE
820	2440	Geel	BE
821	4250	Geer	BE
822	1367	Geest-Gérompont-Pt-Rosière	BE
823	3450	Geetbets	BE
824	5024	Gelbressée	BE
825	3800	Gelinden	BE
826	3620	Gellik	BE
827	3200	Gelrode	BE
828	8980	Geluveld	BE
829	8940	Geluwe	BE
830	6929	Gembes	BE
831	5030	Gembloux	BE
832	4851	Gemmenich	BE
833	1470	Genappe	BE
834	3600	Genk	BE
835	7040	Genly	BE
836	3770	Genoelselderen	BE
837	9000	Gent	BE
838	9050	Gentbrugge	BE
839	1450	Gentinnes	BE
840	1332	Genval	BE
841	9500	Geraardsbergen	BE
842	3960	Gerdingen	BE
843	5524	Gerin	BE
844	1367	Gérompont	BE
845	6769	Gérouville	BE
846	6280	Gerpinnes	BE
847	2590	Gestel	BE
848	5340	Gesves	BE
849	7822	Ghislenghien	BE
850	7011	Ghlin	BE
851	7863	Ghoy	BE
852	7823	Gibecq	BE
853	2275	Gierle	BE
854	8691	Gijverinkhove	BE
855	9308	Gijzegem	BE
856	8570	Gijzelbrechtegem	BE
857	9860	Gijzenzele	BE
858	6060	Gilly (Charleroi)	BE
859	5680	Gimnée	BE
860	3890	Gingelom	BE
861	8470	Gistel	BE
862	8830	Gits	BE
863	7041	Givry	BE
864	1473	Glabais	BE
865	3380	Glabbeek(Zuurbemde)	BE
866	4000	Glain	BE
867	4400	Gleixhe	BE
868	1315	Glimes	BE
869	4690	Glons	BE
870	5680	Gochenée	BE
871	7160	Godarville	BE
872	5530	Godinne	BE
873	9620	Godveerdegem	BE
874	4834	Goé	BE
875	9500	Goeferdinge	BE
876	7040	Goegnies-Chaussée	BE
877	5353	Goesnes	BE
878	3300	Goetsenhoven	BE
879	4140	Gomze-Andoumont	BE
880	7830	Gondregnies	BE
881	5660	Gonrieux	BE
882	9090	Gontrode	BE
883	1755	Gooik	BE
884	3803	Gorsem	BE
885	3840	Gors-Opleeuw	BE
886	6041	Gosselies	BE
887	3840	Gotem	BE
888	9800	Gottem	BE
889	7070	Gottignies	BE
890	6280	Gougnies	BE
891	5651	Gourdinne	BE
892	6030	Goutroux	BE
893	6670	Gouvy	BE
894	6181	Gouy-lez-Piéton	BE
895	6534	Gozée	BE
896	4460	Grâce-Berleur	BE
897	4460	Grâce-Hollogne	BE
898	5555	Graide	BE
899	9800	Grammene	BE
900	4300	Grand-Axhe	BE
901	7973	Grandglise	BE
902	4280	Grand-Hallet	BE
903	6698	Grand-Halleux	BE
904	6940	Grandhan	BE
905	5031	Grand-Leez	BE
906	5030	Grand-Manil	BE
907	6960	Grandmenil	BE
908	7900	Grandmetz	BE
909	4650	Grand-Rechain	BE
910	6560	Grand-Reng	BE
911	6470	Grandrieu	BE
912	1367	Grand-Rosière-Hottomont	BE
913	4360	Grandville	BE
914	6840	Grandvoir	BE
915	6840	Grapfontaine	BE
916	7830	Graty	BE
917	5640	Graux	BE
918	3450	Grazen	BE
919	9200	Grembergen	BE
920	1390	Grez-Doiceau	BE
921	1850	Grimbergen	BE
922	9506	Grimminge	BE
923	4030	Grivegnée (Liège)	BE
924	2280	Grobbendonk	BE
925	1702	Groot-Bijgaarden	BE
926	3800	Groot-Gelmen	BE
927	3840	Groot-Loon	BE
928	7950	Grosage	BE
929	5555	Gros-Fays	BE
930	3990	Grote-Brogel	BE
931	9620	Grotenberge	BE
932	3740	Grote-Spouwen	BE
933	3670	Gruitrode	BE
934	6952	Grune	BE
935	6927	Grupont	BE
936	7620	Guignies	BE
937	3723	Guigoven	BE
938	6704	Guirsch	BE
939	8560	Gullegem	BE
940	3870	Gutschoven	BE
941	3150	Haacht	BE
942	9450	Haaltert	BE
943	9120	Haasdonk	BE
944	3053	Haasrode	BE
945	6720	Habay	BE
946	6720	Habay-la-Neuve	BE
947	6723	Habay-la-Vieille	BE
948	6782	Habergy	BE
949	4684	Haccourt	BE
950	6720	Hachy	BE
951	7911	Hacquegnies	BE
952	5351	Haillot	BE
953	7100	Haine-Saint-Paul	BE
954	7100	Haine-Saint-Pierre	BE
955	7350	Hainin	BE
956	3300	Hakendover	BE
957	6792	Halanzy	BE
958	3545	Halen	BE
959	2220	Hallaar	BE
960	1500	Halle	BE
961	2980	Halle (Kempen)	BE
962	3440	Halle-Booienhoven	BE
963	6986	Halleux	BE
964	6922	Halma	BE
965	3800	Halmaal	BE
966	5340	Haltinne	BE
967	3945	Ham	BE
968	6840	Hamipré	BE
969	1785	Hamme (Bt.)	BE
970	9220	Hamme (O.-Vl.)	BE
971	1320	Hamme-Mille	BE
972	4180	Hamoir	BE
973	5360	Hamois	BE
974	3930	Hamont	BE
975	3930	Hamont-Achel	BE
976	6990	Hampteau	BE
977	6120	Ham-sur-Heure	BE
978	6120	Ham-sur-Heure/Nalinnes	BE
979	5190	Ham-sur-Sambre	BE
980	8610	Handzame	BE
981	4357	Haneffe	BE
982	4210	Hannêche	BE
983	4280	Hannut	BE
984	5310	Hanret	BE
985	9850	Hansbeke	BE
986	5580	Han-sur-Lesse	BE
987	6560	Hantes-Wihéries	BE
988	5621	Hanzinelle	BE
989	5621	Hanzinne	BE
990	7321	Harchies	BE
991	8530	Harelbeke	BE
992	3840	Haren (Borgloon)	BE
993	3700	Haren (Tongeren)	BE
994	6900	Hargimont	BE
995	7022	Harmignies	BE
996	6767	Harnoncourt	BE
997	6960	Harre	BE
998	6950	Harsin	BE
999	7022	Harveng	BE
1000	4920	Harzé	BE
1001	3500	Hasselt	BE
1002	5540	Hastière	BE
1003	5540	Hastière-Lavaux	BE
1004	5541	Hastière-par-Delà	BE
1005	6870	Hatrival	BE
1006	7120	Haulchin	BE
1007	4730	Hauset	BE
1008	6929	Haut-Fays	BE
1009	1461	Haut-Ittre	BE
1010	5537	Haut-le-Wastia	BE
1011	7334	Hautrage	BE
1012	7041	Havay	BE
1013	5370	Havelange	BE
1014	5590	Haversin	BE
1015	7531	Havinnes	BE
1016	7021	Havré	BE
1017	3940	Hechtel	BE
1018	5543	Heer	BE
1019	3870	Heers	BE
1020	3740	Hees	BE
1021	8551	Heestert	BE
1022	2801	Heffen	BE
1023	1670	Heikruis	BE
1024	2830	Heindonk	BE
1025	6700	Heinsch	BE
1026	8301	Heist-aan-Zee	BE
1027	2220	Heist-Op-Den-Berg	BE
1028	1790	Hekelgem	BE
1029	3870	Heks	BE
1030	8587	Helchin	BE
1031	3530	Helchteren	BE
1032	9450	Heldergem	BE
1033	1357	Hélécine	BE
1034	3440	Helen-Bos	BE
1035	8587	Helkijn	BE
1036	7830	Hellebecq	BE
1037	9571	Hemelveerdegem	BE
1038	2620	Hemiksem	BE
1039	5380	Hemptinne (Fernelmont)	BE
1040	5620	Hemptinne-lez-Florennes	BE
1041	3840	Hendrieken	BE
1042	3700	Henis	BE
1043	7090	Hennuyères	BE
1044	4841	Henri-Chapelle	BE
1045	7090	Henripont	BE
1046	7350	Hensies	BE
1047	3971	Heppen	BE
1048	4771	Heppenbach	BE
1049	6220	Heppignies	BE
1050	6887	Herbeumont	BE
1051	7050	Herchies	BE
1052	3770	Herderen	BE
1053	9310	Herdersem	BE
1054	3020	Herent	BE
1055	2200	Herentals	BE
1056	2270	Herenthout	BE
1057	1540	Herfelingen	BE
1058	4728	Hergenrath	BE
1059	7742	Hérinnes-lez-Pecq	BE
1060	3540	Herk-de-Stad	BE
1061	4681	Hermalle-sous-Argenteau	BE
1062	4480	Hermalle-sous-Huy	BE
1063	4680	Hermée	BE
1064	5540	Hermeton-sur-Meuse	BE
1065	1540	Herne	BE
1066	4217	Héron	BE
1067	7911	Herquegies	BE
1068	7712	Herseaux	BE
1069	2230	Herselt	BE
1070	4040	Herstal	BE
1071	3717	Herstappe	BE
1072	7522	Hertain	BE
1073	3831	Herten	BE
1074	8020	Hertsberge	BE
1075	4650	Herve	BE
1076	9550	Herzele	BE
1077	8501	Heule	BE
1078	5377	Heure (Nam.)	BE
1079	4682	Heure-le-Romain	BE
1080	9700	Heurne	BE
1081	3550	Heusden (Limb.)	BE
1082	9070	Heusden (O.-Vl.)	BE
1083	3550	Heusden-Zolder	BE
1084	4802	Heusy	BE
1085	3191	Hever	BE
1086	3001	Heverlee	BE
1087	1435	Hévillers	BE
1088	6941	Heyd	BE
1089	9550	Hillegem	BE
1090	2880	Hingene	BE
1091	5380	Hingeon	BE
1092	6984	Hives	BE
1093	2660	Hoboken (Antwerpen)	BE
1094	4351	Hodeige	BE
1095	6987	Hodister	BE
1096	4162	Hody	BE
1097	3320	Hoegaarden	BE
1098	1560	Hoeilaart	BE
1099	8340	Hoeke	BE
1100	3746	Hoelbeek	BE
1101	3471	Hoeleden	BE
1102	3840	Hoepertingen	BE
1103	3730	Hoeselt	BE
1104	2940	Hoevenen	BE
1105	1981	Hofstade (Bt.)	BE
1106	9308	Hofstade (O.-Vl.)	BE
1107	5377	Hogne	BE
1108	4342	Hognoul	BE
1109	7620	Hollain	BE
1110	6637	Hollange	BE
1111	8902	Hollebeke	BE
1112	4460	Hollogne-aux-Pierres	BE
1113	4250	Hollogne-sur-Geer	BE
1114	3220	Holsbeek	BE
1115	2811	Hombeek	BE
1116	4852	Hombourg	BE
1117	6640	Hompré	BE
1118	6780	Hondelange	BE
1119	5570	Honnay	BE
1120	7387	Honnelles	BE
1121	8830	Hooglede	BE
1122	8690	Hoogstade	BE
1123	2320	Hoogstraten	BE
1124	9667	Horebeke	BE
1125	4460	Horion-Hozémont	BE
1126	7301	Hornu	BE
1127	3870	Horpmaal	BE
1128	7060	Horrues	BE
1129	6990	Hotton	BE
1130	6724	Houdemont	BE
1131	7110	Houdeng-Aimeries	BE
1132	7110	Houdeng-Goegnies	BE
1133	5575	Houdremont	BE
1134	6660	Houffalize	BE
1135	5563	Hour	BE
1136	4671	Housse	BE
1137	7812	Houtaing	BE
1138	1476	Houtain-le-Val	BE
1139	4682	Houtain-Saint-Siméon	BE
1140	8377	Houtave	BE
1141	8630	Houtem (W.-Vl.)	BE
1142	3530	Houthalen	BE
1143	3530	Houthalen-Helchteren	BE
1144	7781	Houthem (Comines)	BE
1145	8650	Houthulst	BE
1146	2235	Houtvenne	BE
1147	3390	Houwaart	BE
1148	5530	Houx	BE
1149	5560	Houyet	BE
1150	2540	Hove	BE
1151	7830	Hoves (Ht.)	BE
1152	7624	Howardries	BE
1153	4520	Huccorgne	BE
1154	9750	Huise	BE
1155	7950	Huissignies	BE
1156	1654	Huizingen	BE
1157	3040	Huldenberg	BE
1158	2235	Hulshout	BE
1159	5560	Hulsonniaux	BE
1160	8531	Hulste	BE
1161	6900	Humain	BE
1162	1851	Humbeek	BE
1163	9630	Hundelgem	BE
1164	1367	Huppaye	BE
1165	4500	Huy	BE
1166	7022	Hyon	BE
1167	8480	Ichtegem	BE
1168	9472	Iddergem	BE
1169	9506	Idegem	BE
1170	8900	Ieper	BE
1171	9340	Impe	BE
1172	1315	Incourt	BE
1173	8770	Ingelmunster	BE
1174	8570	Ingooigem	BE
1175	7801	Irchonwelz	BE
1176	7822	Isières	BE
1177	5032	Isnes	BE
1178	2222	Itegem	BE
1179	1701	Itterbeek	BE
1180	1460	Ittre	BE
1181	4400	Ivoz-Ramet	BE
1182	1050	Ixelles	BE
1183	8870	Izegem	BE
1184	6810	Izel	BE
1185	8691	Izenberge	BE
1186	6941	Izier	BE
1187	8490	Jabbeke	BE
1188	4845	Jalhay	BE
1189	5354	Jallet	BE
1190	5600	Jamagne	BE
1191	5100	Jambes (Namur)	BE
1192	5600	Jamiolle	BE
1193	6120	Jamioulx	BE
1194	6810	Jamoigne	BE
1195	1350	Jandrain-Jandrenouille	BE
1196	1350	Jauche	BE
1197	1370	Jauchelette	BE
1198	5570	Javingue	BE
1199	4540	Jehay	BE
1200	6880	Jehonville	BE
1201	7012	Jemappes	BE
1202	5580	Jemelle	BE
1203	4101	Jemeppe-sur-Meuse	BE
1204	5190	Jemeppe-sur-Sambre	BE
1205	4357	Jeneffe (Lg.)	BE
1206	5370	Jeneffe (Nam.)	BE
1207	3840	Jesseren	BE
1208	1090	Jette	BE
1209	3890	Jeuk	BE
1210	1370	Jodoigne	BE
1211	1370	Jodoigne-Souveraine	BE
1212	7620	Jollain-Merlin	BE
1213	6280	Joncret	BE
1214	4650	Julémont	BE
1215	6040	Jumet (Charleroi)	BE
1216	4020	Jupille-sur-Meuse	BE
1217	4450	Juprelle	BE
1218	7050	Jurbise	BE
1219	6642	Juseret	BE
1220	8600	Kaaskerke	BE
1221	8870	Kachtem	BE
1222	3293	Kaggevinne	BE
1223	7540	Kain (Tournai)	BE
1224	9270	Kalken	BE
1225	9120	Kallo (Beveren-Waas)	BE
1226	9130	Kallo (Kieldrecht)	BE
1227	2920	Kalmthout	BE
1228	1910	Kampenhout	BE
1229	8700	Kanegem	BE
1230	3770	Kanne	BE
1231	2950	Kapellen (Antw.)	BE
1232	3381	Kapellen (Bt.)	BE
1233	1880	Kapelle-op-den-Bos	BE
1234	9970	Kaprijke	BE
1235	8572	Kaster	BE
1236	2460	Kasterlee	BE
1237	3950	Kaulille	BE
1238	3140	Keerbergen	BE
1239	8600	Keiem	BE
1240	4720	Kelmis	BE
1241	4367	Kemexhe	BE
1242	8956	Kemmel	BE
1243	9190	Kemzeke	BE
1244	8581	Kerkhove	BE
1245	3370	Kerkom	BE
1246	3800	Kerkom-bij-Sint-Truiden	BE
1247	9451	Kerksken	BE
1248	3510	Kermt	BE
1249	3840	Kerniel	BE
1250	3472	Kersbeek-Miskom	BE
1251	2560	Kessel	BE
1252	3010	Kessel-Lo	BE
1253	3640	Kessenich	BE
1254	1755	Kester	BE
1255	4701	Kettenis	BE
1256	5060	Keumiée	BE
1257	9130	Kieldrecht (Beveren)	BE
1258	3640	Kinrooi	BE
1259	3990	Kleine-Brogel	BE
1260	3740	Kleine-Spouwen	BE
1261	3870	Klein-Gelmen	BE
1262	8420	Klemskerke	BE
1263	8650	Klerken	BE
1264	9690	Kluisbergen	BE
1265	9940	Kluizen	BE
1266	9910	Knesselare	BE
1267	8300	Knokke	BE
1268	8300	Knokke-Heist	BE
1269	1730	Kobbegem	BE
1270	8680	Koekelare	BE
1271	1081	Koekelberg	BE
1272	3582	Koersel	BE
1273	8670	Koksijde	BE
1274	3840	Kolmont (Borgloon)	BE
1275	3700	Kolmont (Tongeren)	BE
1276	7780	Komen	BE
1277	7780	Komen-Waasten	BE
1278	2500	Koningshooikt	BE
1279	3700	Koninksem	BE
1280	2550	Kontich	BE
1281	8510	Kooigem	BE
1282	8000	Koolkerke	BE
1283	8851	Koolskamp	BE
1284	3060	Korbeek-Dijle	BE
1285	3360	Korbeek-Lo	BE
1286	8610	Kortemark	BE
1287	3470	Kortenaken	BE
1288	3070	Kortenberg	BE
1289	3720	Kortessem	BE
1290	3890	Kortijs	BE
1291	8500	Kortrijk	BE
1292	3220	Kortrijk-Dutsel	BE
1293	3850	Kozen	BE
1294	1950	Kraainem	BE
1295	8972	Krombeke	BE
1296	9150	Kruibeke	BE
1297	9770	Kruishoutem	BE
1298	3300	Kumtich	BE
1299	3511	Kuringen	BE
1300	3840	Kuttekoven	BE
1301	8520	Kuurne	BE
1302	3945	Kwaadmechelen	BE
1303	9690	Kwaremont	BE
1304	7080	La Bouverie	BE
1305	4720	La Calamine	BE
1306	7611	La Glanerie	BE
1307	4987	La Gleize	BE
1308	7170	La Hestre	BE
1309	1310	La Hulpe	BE
1310	7100	La Louvière	BE
1311	4910	La Reid	BE
1312	6980	La Roche-en-Ardenne	BE
1313	3400	Laar	BE
1314	9270	Laarne	BE
1315	6567	Labuissière	BE
1316	6821	Lacuisine	BE
1317	7950	Ladeuze	BE
1318	1020	Laeken	BE
1319	5550	Laforêt	BE
1320	7890	Lahamaide	BE
1321	7522	Lamain	BE
1322	4800	Lambermont	BE
1323	6220	Lambusart	BE
1324	4350	Lamine	BE
1325	4210	Lamontzée	BE
1326	6767	Lamorteau	BE
1327	8600	Lampernisse	BE
1328	3620	Lanaken	BE
1329	4600	Lanaye	BE
1330	9850	Landegem	BE
1331	6111	Landelies	BE
1332	3400	Landen	BE
1333	5300	Landenne	BE
1334	9860	Landskouter	BE
1335	5651	Laneffe	BE
1336	3201	Langdorp	BE
1337	8920	Langemark	BE
1338	8920	Langemark-Poelkapelle	BE
1339	3650	Lanklaar	BE
1340	7800	Lanquesaint	BE
1341	4450	Lantin	BE
1342	4300	Lantremange	BE
1343	7622	Laplaigne	BE
1344	8340	Lapscheure	BE
1345	1380	Lasne	BE
1346	1380	Lasne-Chapelle-St-Lambert	BE
1347	1370	Lathuy	BE
1348	4261	Latinne	BE
1349	6761	Latour	BE
1350	3700	Lauw	BE
1351	8930	Lauwe	BE
1352	6681	Lavacherie	BE
1353	5580	Lavaux-Sainte-Anne	BE
1354	4217	Lavoir	BE
1355	5670	Le Mesnil	BE
1356	7070	Le Roeulx	BE
1357	5070	Le Roux	BE
1358	9280	Lebbeke	BE
1359	1320	L'Ecluse	BE
1360	9340	Lede	BE
1361	9050	Ledeberg (Gent)	BE
1362	8880	Ledegem	BE
1363	3061	Leefdaal	BE
1364	1755	Leerbeek	BE
1365	6142	Leernes	BE
1366	6530	Leers-et-Fosteau	BE
1367	7730	Leers-Nord	BE
1368	2811	Leest	BE
1369	9620	Leeuwergem	BE
1370	8432	Leffinge	BE
1371	6860	Léglise	BE
1372	5590	Leignon	BE
1373	8691	Leisele	BE
1374	8600	Leke	BE
1375	1502	Lembeek	BE
1376	9971	Lembeke	BE
1377	9820	Lemberge	BE
1378	8860	Lendelede	BE
1379	1750	Lennik	BE
1380	7870	Lens	BE
1381	4280	Lens-Saint-Remy	BE
1382	4250	Lens-Saint-Servais	BE
1383	4360	Lens-sur-Geer	BE
1384	3970	Leopoldsburg	BE
1385	4560	Les Avins	BE
1386	6811	Les Bulles	BE
1387	6830	Les Hayons	BE
1388	4317	Les Waleffes	BE
1389	6464	L'Escaillère	BE
1390	7621	Lesdain	BE
1391	7860	Lessines	BE
1392	5580	Lessive	BE
1393	6953	Lesterny	BE
1394	5170	Lesve	BE
1395	7850	Lettelingen	BE
1396	9521	Letterhoutem	BE
1397	6500	Leugnies	BE
1398	9700	Leupegem	BE
1399	3630	Leut	BE
1400	3000	Leuven	BE
1401	5310	Leuze (Nam.)	BE
1402	7900	Leuze-en-Hainaut	BE
1403	6500	Leval-Chaudeville	BE
1404	7134	Leval-Trahegnies	BE
1405	6238	Liberchies	BE
1406	6890	Libin	BE
1407	6800	Libramont-Chevigny	BE
1408	2460	Lichtaart	BE
1409	8810	Lichtervelde	BE
1410	1770	Liedekerke	BE
1411	9400	Lieferinge	BE
1412	4000	Liège 1	BE
1413	4020	Liège 2	BE
1414	2500	Lier	BE
1415	9570	Lierde	BE
1416	4990	Lierneux	BE
1417	5310	Liernu	BE
1418	4042	Liers	BE
1419	2870	Liezele	BE
1420	7812	Ligne	BE
1421	4254	Ligney	BE
1422	5140	Ligny	BE
1423	2275	Lille	BE
1424	2040	Lillo	BE
1425	1428	Lillois-Witterzée	BE
1426	1300	Limal	BE
1427	4830	Limbourg	BE
1428	1342	Limelette	BE
1429	6670	Limerlé	BE
1430	4357	Limont	BE
1431	4287	Lincent	BE
1432	3210	Linden	BE
1433	1630	Linkebeek	BE
1434	3560	Linkhout	BE
1435	1357	Linsmeau	BE
1436	2547	Lint	BE
1437	3350	Linter	BE
1438	2890	Lippelo	BE
1439	5501	Lisogne	BE
1440	8380	Lissewege	BE
1441	5101	Lives-sur-Meuse	BE
1442	4600	Lixhe	BE
1443	8647	Lo	BE
1444	6540	Lobbes	BE
1445	9080	Lochristi	BE
1446	6042	Lodelinsart	BE
1447	2990	Loenhout	BE
1448	8958	Loker	BE
1449	9160	Lokeren	BE
1450	3545	Loksbergen	BE
1451	8434	Lombardsijde	BE
1452	7870	Lombise	BE
1453	3920	Lommel	BE
1454	4783	Lommersweiler	BE
1455	6463	Lompret	BE
1456	6924	Lomprez	BE
1457	4431	Loncin	BE
1458	1840	Londerzeel	BE
1459	6688	Longchamps (Lux.)	BE
1460	5310	Longchamps (Nam.)	BE
1461	6840	Longlier	BE
1462	1325	Longueville	BE
1463	6600	Longvilly	BE
1464	4710	Lontzen	BE
1465	5030	Lonzée	BE
1466	3040	Loonbeek	BE
1467	8210	Loppem	BE
1468	4987	Lorcé	BE
1469	8647	Lo-Reninge	BE
1470	1651	Lot	BE
1471	9880	Lotenhulle	BE
1472	5575	Louette-Saint-Denis	BE
1473	5575	Louette-Saint-Pierre	BE
1474	1471	Loupoigne	BE
1475	1348	Louvain-la-Neuve	BE
1476	4920	Louveigné (Aywaille)	BE
1477	4141	Louveigné (Sprimont)	BE
1478	9920	Lovendegem	BE
1479	3360	Lovenjoel	BE
1480	6280	Loverval	BE
1481	5101	Loyers	BE
1482	3210	Lubbeek	BE
1483	7700	Luingne	BE
1484	3560	Lummen	BE
1485	5170	Lustin	BE
1486	6238	Luttre	BE
1488	9680	Maarkedal	BE
1489	9680	Maarke-Kerkem	BE
1490	3680	Maaseik	BE
1491	3630	Maasmechelen	BE
1492	6663	Mabompré	BE
1493	1830	Machelen (Bt)	BE
1494	9870	Machelen (O.-Vl.)	BE
1495	6591	Macon	BE
1496	6593	Macquenoise	BE
1497	5374	Maffe	BE
1498	7810	Maffle	BE
1499	4623	Magnée	BE
1500	5330	Maillen	BE
1501	7812	Mainvault	BE
1502	7020	Maisières	BE
1503	6852	Maissin	BE
1504	5300	Maizeret	BE
1505	3700	Mal	BE
1506	9990	Maldegem	BE
1507	1840	Malderen	BE
1508	6960	Malempré	BE
1509	1360	Malèves-Ste-Marie-Wastines	BE
1510	2390	Malle	BE
1511	4960	Malmédy	BE
1512	5020	Malonne	BE
1513	5575	Malvoisin	BE
1514	7170	Manage	BE
1515	4760	Manderfeld	BE
1516	6960	Manhay	BE
1517	8433	Mannekensvere	BE
1518	1380	Maransart	BE
1519	1495	Marbais (Bt.)	BE
1520	6120	Marbaix (Ht.)	BE
1521	6900	Marche-en-Famenne	BE
1522	5024	Marche-les-Dames	BE
1523	7190	Marche-lez-Ecaussinnes	BE
1524	6030	Marchienne-au-Pont	BE
1525	4570	Marchin	BE
1526	7387	Marchipont	BE
1527	5380	Marchovelette	BE
1528	6001	Marcinelle	BE
1529	6987	Marcourt	BE
1530	7850	Marcq	BE
1531	6990	Marenne	BE
1532	9030	Mariakerke (Gent)	BE
1533	2880	Mariekerke (Bornem)	BE
1534	5660	Mariembourg	BE
1535	1350	Marilles	BE
1536	7850	Mark	BE
1537	8510	Marke (Kortrijk)	BE
1538	8720	Markegem	BE
1539	4210	Marneffe	BE
1540	7522	Marquain	BE
1541	6630	Martelange	BE
1542	3742	Martenslinde	BE
1543	5573	Martouzin-Neuville	BE
1544	6953	Masbourg	BE
1545	7020	Masnuy-Saint-Jean (Mons)	BE
1546	7050	Masnuy-Saint-Pierre	BE
1547	7050	Masnuy-St-Jean (Jurbise)	BE
1548	9230	Massemen	BE
1549	2240	Massenhoven	BE
1550	5680	Matagne-la-Grande	BE
1551	5680	Matagne-la-Petite	BE
1552	9700	Mater	BE
1553	7640	Maubray	BE
1554	7534	Maulde	BE
1555	7110	Maurage	BE
1556	5670	Mazée	BE
1557	1745	Mazenzele	BE
1558	5032	Mazy	BE
1559	5372	Méan	BE
1560	2800	Mechelen	BE
1561	3630	Mechelen-aan-de-Maas	BE
1562	3870	Mechelen-Bovelingen	BE
1563	4219	Meeffe	BE
1564	3391	Meensel-Kiezegem	BE
1565	2321	Meer	BE
1566	3078	Meerbeek	BE
1567	9402	Meerbeke	BE
1568	9170	Meerdonk	BE
1569	2450	Meerhout	BE
1570	2328	Meerle	BE
1571	3630	Meeswijk	BE
1572	8377	Meetkerke	BE
1573	3670	Meeuwen	BE
1574	3670	Meeuwen-Gruitrode	BE
1575	5310	Mehaigne	BE
1576	9800	Meigem	BE
1577	9630	Meilegem	BE
1578	1860	Meise	BE
1579	6769	Meix-devant-Virton	BE
1580	6747	Meix-le-Tige	BE
1581	9700	Melden	BE
1582	3320	Meldert (Bt.)	BE
1583	3560	Meldert (Limb.)	BE
1584	9310	Meldert (O.-Vl.)	BE
1585	4633	Melen	BE
1586	1370	Mélin	BE
1587	3350	Melkwezer	BE
1588	9090	Melle	BE
1589	1495	Mellery	BE
1590	7540	Melles	BE
1591	6211	Mellet	BE
1592	6860	Mellier	BE
1593	1820	Melsbroek	BE
1594	9120	Melsele	BE
1595	9820	Melsen	BE
1596	4837	Membach	BE
1597	5550	Membre	BE
1598	3770	Membruggen	BE
1599	9042	Mendonk	BE
1600	8930	Menen	BE
1601	6567	Merbes-le-Château	BE
1602	6567	Merbes-Sainte-Marie	BE
1603	1785	Merchtem	BE
1604	4280	Merdorp	BE
1605	9420	Mere	BE
1606	9820	Merelbeke	BE
1607	9850	Merendree	BE
1608	8650	Merkem	BE
1609	2170	Merksem (Antwerpen)	BE
1610	2330	Merksplas	BE
1611	5600	Merlemont	BE
1612	8957	Mesen	BE
1613	7822	Meslin-l'Evêque	BE
1614	5560	Mesnil-Eglise	BE
1615	5560	Mesnil-Saint-Blaise	BE
1616	9200	Mespelare	BE
1617	6780	Messancy	BE
1618	3272	Messelbroek	BE
1619	8957	Messines	BE
1620	7022	Mesvin	BE
1621	3870	Mettekoven	BE
1622	5640	Mettet	BE
1623	8760	Meulebeke	BE
1624	5081	Meux	BE
1625	7942	Mévergnies-lez-Lens	BE
1626	4770	Meyrode	BE
1627	9660	Michelbeke	BE
1628	4630	Micheroux	BE
1629	9992	Middelburg	BE
1630	8430	Middelkerke	BE
1631	5376	Miécret	BE
1632	3891	Mielen-boven-Aalst	BE
1633	7070	Mignault	BE
1634	3770	Millen	BE
1635	4041	Milmort	BE
1636	2322	Minderhout	BE
1637	6870	Mirwart	BE
1638	4577	Modave	BE
1639	3790	Moelingen	BE
1640	8552	Moen	BE
1641	9500	Moerbeke	BE
1642	9180	Moerbeke-Waas	BE
1643	8470	Moere	BE
1644	8340	Moerkerke	BE
1645	9220	Moerzeke	BE
1646	7700	Moeskroen	BE
1647	4520	Moha	BE
1648	5361	Mohiville	BE
1649	5060	Moignelée	BE
1650	6800	Moircy	BE
1651	2400	Mol	BE
1652	7760	Molenbaix	BE
1653	1080	Molenbeek-Saint-Jean	BE
1654	3461	Molenbeek-Wersbeek	BE
1655	3640	Molenbeersel	BE
1656	3294	Molenstede	BE
1657	1730	Mollem	BE
1658	4350	Momalle	BE
1659	6590	Momignies	BE
1660	5555	Monceau-en-Ardenne	BE
1661	6592	Monceau-Imbrechies	BE
1662	6031	Monceau-sur-Sambre	BE
1663	7000	Mons	BE
1664	4400	Mons-lez-Liège	BE
1665	1400	Monstreux	BE
1666	6661	Mont (Lux.)	BE
1667	5530	Mont (Nam.)	BE
1668	6470	Montbliart	BE
1669	7750	Mont-de-l'Enclus	BE
1670	4420	Montegnée	BE
1671	3890	Montenaken	BE
1672	5580	Mont-Gauthier	BE
1673	7870	Montignies-lez-Lens	BE
1674	6560	Montignies-St-Christophe	BE
1675	7387	Montignies-sur-Roc	BE
1676	6061	Montignies-sur-Sambre	BE
1677	6110	Montigny-le-Tilleul	BE
1678	6674	Montleban	BE
1679	7911	Montroeul-au-Bois	BE
1680	7350	Montroeul-sur-Haine	BE
1681	1367	Mont-Saint-André	BE
1682	7542	Mont-Saint-Aubert	BE
1683	7141	Mont-Sainte-Aldegonde	BE
1684	6540	Mont-Sainte-Geneviève	BE
1685	1435	Mont-Saint-Guibert	BE
1686	6032	Mont-sur-Marchienne	BE
1687	4850	Montzen	BE
1688	9310	Moorsel	BE
1689	8560	Moorsele	BE
1690	8890	Moorslede	BE
1691	9860	Moortsele	BE
1692	3740	Mopertingen	BE
1693	9790	Moregem	BE
1694	4850	Moresnet	BE
1695	6640	Morhet	BE
1696	5621	Morialmé	BE
1697	2200	Morkhoven	BE
1698	7140	Morlanwelz	BE
1699	7140	Morlanwelz-Mariemont	BE
1700	6997	Mormont	BE
1701	5190	Mornimont	BE
1702	4670	Mortier	BE
1703	4607	Mortroux	BE
1704	2640	Mortsel	BE
1705	5620	Morville	BE
1706	3790	Mouland	BE
1707	7812	Moulbaix	BE
1708	7543	Mourcourt	BE
1709	7700	Mouscron	BE
1710	7911	Moustier (Ht.)	BE
1711	5190	Moustier-sur-Sambre	BE
1712	5550	Mouzaive	BE
1713	4280	Moxhe	BE
1714	5340	Mozet	BE
1715	3891	Muizen (Limb.)	BE
1716	2812	Muizen (Mechelen)	BE
1717	9700	Mullem	BE
1718	9630	Munkzwalm	BE
1719	6820	Muno	BE
1720	3740	Munsterbilzen	BE
1721	9820	Munte	BE
1722	6750	Musson	BE
1723	6750	Mussy-la-Ville	BE
1724	4190	My	BE
1725	7062	Naast	BE
1726	6660	Nadrin	BE
1727	5550	Nafraiture	BE
1728	6120	Nalinnes	BE
1729	5300	Namêche	BE
1730	5000	Namur	BE
1731	4550	Nandrin	BE
1732	5100	Naninne	BE
1733	5555	Naomé	BE
1734	6950	Nassogne	BE
1735	5360	Natoye	BE
1736	9810	Nazareth	BE
1737	7730	Néchin	BE
1738	1120	Neder-over-Heembeek	BE
1739	9500	Nederboelare	BE
1740	9660	Nederbrakel	BE
1741	9700	Nederename	BE
1742	9400	Nederhasselt	BE
1743	1910	Nederokkerzeel	BE
1744	9636	Nederzwalm-Hermelgem	BE
1745	3670	Neerglabbeek	BE
1746	3620	Neerharen	BE
1747	3350	Neerhespen	BE
1748	1357	Neerheylissem	BE
1749	3040	Neerijse	BE
1750	3404	Neerlanden	BE
1751	3350	Neerlinter	BE
1752	3680	Neeroeteren	BE
1753	3910	Neerpelt	BE
1754	3700	Neerrepen	BE
1755	3370	Neervelp	BE
1756	7784	Neerwaasten	BE
1757	3400	Neerwinden	BE
1758	9403	Neigem	BE
1759	3700	Nerem	BE
1760	4870	Nessonvaux	BE
1761	1390	Nethen	BE
1762	5377	Nettinne	BE
1763	6840	Neufchâteau	BE
1764	4608	Neufchâteau (Lg.)	BE
1765	7332	Neufmaison	BE
1766	7063	Neufvilles	BE
1767	4721	Neu-Moresnet	BE
1768	4120	Neupré	BE
1769	5600	Neuville (Philippeville)	BE
1770	4121	Neuville-en-Condroz	BE
1771	9850	Nevele	BE
1772	2845	Niel	BE
1773	3668	Niel-bij-As	BE
1774	3890	Niel-bij-Sint-Truiden	BE
1775	9506	Nieuwenhove	BE
1776	1880	Nieuwenrode	BE
1777	9320	Nieuwerkerken (Aalst)	BE
1778	3850	Nieuwerkerken (Limb.)	BE
1779	8600	Nieuwkapelle	BE
1780	8950	Nieuwkerke	BE
1781	9100	Nieuwkerken-Waas	BE
1782	8377	Nieuwmunster	BE
1783	8620	Nieuwpoort	BE
1784	3221	Nieuwrode	BE
1785	2560	Nijlen	BE
1786	1457	Nil-St-Vincent-St-Martin	BE
1787	7020	Nimy (Mons)	BE
1788	9400	Ninove	BE
1789	5670	Nismes	BE
1790	1400	Nivelles	BE
1791	5680	Niverlée	BE
1792	6640	Nives	BE
1793	6717	Nobressart	BE
1794	1320	Nodebais	BE
1795	1350	Noduwez	BE
1796	7080	Noirchain	BE
1797	6831	Noirefontaine	BE
1798	5377	Noiseux	BE
1799	9771	Nokere	BE
1800	6851	Nollevaux	BE
1801	2200	Noorderwijk	BE
1802	8647	Noordschote	BE
1803	1930	Nossegem	BE
1804	6717	Nothomb	BE
1805	7022	Nouvelles	BE
1806	4347	Noville (Lg.)	BE
1807	6600	Noville (Lux.)	BE
1808	5380	Noville-les-Bois	BE
1809	5310	Noville-sur-Méhaigne	BE
1810	9681	Nukerke	BE
1811	6230	Obaix	BE
1812	7743	Obigies	BE
1813	7034	Obourg	BE
1814	6890	Ochamps	BE
1815	4560	Ocquier	BE
1816	6960	Odeigne	BE
1817	4367	Odeur	BE
1818	8730	Oedelem	BE
1819	8800	Oekene	BE
1820	2520	Oelegem	BE
1821	8690	Oeren	BE
1822	8720	Oeselgem	BE
1823	1755	Oetingen	BE
1824	7911	Oeudeghien	BE
1825	2260	Oevel	BE
1826	6850	Offagne	BE
1827	7862	Ogy	BE
1828	1380	Ohain	BE
1829	5350	Ohey	BE
1830	5670	Oignies-en-Thiérache	BE
1831	1480	Oisquercq	BE
1832	5555	Oizy	BE
1833	9400	Okegem	BE
1834	2250	Olen	BE
1835	4300	Oleye	BE
1836	7866	Ollignies	BE
1837	5670	Olloy-sur-Viroin	BE
1838	2491	Olmen	BE
1839	4877	Olne	BE
1840	9870	Olsene	BE
1841	4252	Omal	BE
1842	4540	Ombret	BE
1843	5600	Omezée	BE
1844	6900	On	BE
1845	5520	Onhaye	BE
1846	9500	Onkerzele	BE
1847	7387	Onnezies	BE
1848	5190	Onoz	BE
1849	1760	Onze-Lieve-Vrouw-Lombeek	BE
1850	2861	Onze-Lieve-Vrouw-Waver	BE
1851	8710	Ooigem	BE
1852	9700	Ooike (Oudenaarde)	BE
1853	9790	Ooike (Wortegem-Petegem)	BE
1854	9520	Oomb.(St-Lievens-Houtem)	BE
1855	9620	Oombergen (Zottegem)	BE
1856	3300	Oorbeek	BE
1857	9340	Oordegem	BE
1858	9041	Oostakker	BE
1859	8670	Oostduinkerke	BE
1860	9968	Oosteeklo	BE
1861	8400	Oostende	BE
1862	9860	Oosterzele	BE
1863	3945	Oostham	BE
1864	8020	Oostkamp	BE
1865	8340	Oostkerke (Damme)	BE
1866	8600	Oostkerke (Diksmuide)	BE
1867	2390	Oostmalle	BE
1868	8840	Oostnieuwkerke	BE
1869	8780	Oostrozebeke	BE
1870	8640	Oostvleteren	BE
1871	9931	Oostwinkel	BE
1872	9660	Opbrakel	BE
1873	9255	Opdorp	BE
1874	3660	Opglabbeek	BE
1875	3630	Opgrimbie	BE
1876	1421	Ophain-Bois-Seigneur-Isaac	BE
1877	9500	Ophasselt	BE
1878	3870	Opheers	BE
1879	1357	Opheylissem	BE
1880	3640	Ophoven	BE
1881	3960	Opitter	BE
1882	3300	Oplinter	BE
1883	3680	Opoeteren	BE
1884	6852	Opont	BE
1885	1315	Opprebais	BE
1886	2890	Oppuurs	BE
1887	3360	Opvelp	BE
1888	1745	Opwijk	BE
1889	1360	Orbais	BE
1890	5550	Orchimont	BE
1891	7501	Orcq	BE
1892	3800	Ordingen	BE
1893	5640	Oret	BE
1894	4360	Oreye	BE
1895	6880	Orgeo	BE
1896	7802	Ormeignies	BE
1897	1350	Orp-Jauche	BE
1898	1350	Orp-le-Grand	BE
1899	7750	Orroir	BE
1900	3350	Orsmaal-Gussenhoven	BE
1901	6983	Ortho	BE
1902	7804	Ostiches	BE
1903	8553	Otegem	BE
1904	4210	Oteppe	BE
1905	4340	Othée	BE
1906	4360	Otrange	BE
1907	3040	Ottenburg	BE
1908	9420	Ottergem	BE
1909	1340	Ottignies	BE
1910	9200	Oudegem	BE
1911	8600	Oudekapelle	BE
1912	9700	Oudenaarde	BE
1913	1600	Oudenaken	BE
1914	8460	Oudenburg	BE
1915	1160	Oudergem	BE
1916	3050	Oud-Heverlee	BE
1917	2360	Oud-Turnhout	BE
1918	4590	Ouffet	BE
1919	4102	Ougrée	BE
1920	4680	Oupeye	BE
1921	9406	Outer	BE
1922	3321	Outgaarden	BE
1923	4577	Outrelouxhe	BE
1924	8582	Outrijve	BE
1925	9750	Ouwegem	BE
1926	9500	Overboelare	BE
1927	3350	Overhespen	BE
1928	3090	Overijse	BE
1929	9290	Overmere	BE
1930	3900	Overpelt	BE
1931	3700	Overrepen	BE
1932	3400	Overwinden	BE
1933	3583	Paal	BE
1934	4452	Paifve	BE
1935	4560	Pailhe	BE
1936	6850	Paliseul	BE
1937	1760	Pamel	BE
1938	7861	Papignies	BE
1939	9661	Parike	BE
1940	7500	PARIS	BE
1941	8980	Passendale	BE
1942	5575	Patignies	BE
1943	7340	Pâturages	BE
1944	9630	Paulatem	BE
1945	7740	Pecq	BE
1946	3990	Peer	BE
1947	7120	Peissant	BE
1948	4287	Pellaines	BE
1949	3212	Pellenberg	BE
1950	1670	Pepingen	BE
1951	4860	Pepinster	BE
1952	1820	Perk	BE
1953	7640	Péronnes-lez-Antoing	BE
1954	7134	Péronnes-lez-Binche	BE
1955	7600	Péruwelz	BE
1956	8600	Pervijze	BE
1957	1360	Perwez	BE
1958	5352	Perwez-Haillot	BE
1959	5660	Pesche	BE
1960	5590	Pessoux	BE
1961	9800	Petegem-aan-de-Leie	BE
1962	9790	Petegem-aan-de-Schelde	BE
1963	5660	Petigny	BE
1964	5660	Petite-Chapelle	BE
1965	7850	Petit-Enghien	BE
1966	5555	Petit-Fays	BE
1967	4280	Petit-Hallet	BE
1968	4800	Petit-Rechain	BE
1969	7090	Petit-Roeulx-lez-Braine	BE
1970	7181	Petit-Roeulx-lez-Nivelles	BE
1971	6692	Petit-Thier	BE
1972	1800	Peutie	BE
1973	5600	Philippeville	BE
1974	7160	Piéton	BE
1975	1370	Piétrain	BE
1976	1315	Piètrebais	BE
1977	7904	Pipaix	BE
1978	3700	Piringen	BE
1979	6240	Pironchamps	BE
1980	8740	Pittem	BE
1981	4122	Plainevaux	BE
1982	1380	Plancenoit	BE
1983	7782	Ploegsteert	BE
1984	4850	Plombières	BE
1985	2275	Poederlee	BE
1986	9880	Poeke	BE
1987	8920	Poelkapelle	BE
1988	9850	Poesele	BE
1989	9401	Pollare	BE
1990	4910	Polleur (Theux)	BE
1991	4800	Polleur (Verviers)	BE
1992	8647	Pollinkhove	BE
1993	7322	Pommeroeul	BE
1994	5574	Pondrôme	BE
1995	6230	Pont-à-Celles	BE
1996	6250	Pont-de-Loup	BE
1997	5380	Pontillas	BE
1998	8970	Poperinge	BE
1999	2382	Poppel	BE
2000	7760	Popuelles	BE
2001	6929	Porcheresse (Lux.)	BE
2002	5370	Porcheresse (Nam.)	BE
2003	7760	Pottes	BE
2004	4280	Poucet	BE
2005	4171	Poulseur	BE
2006	6830	Poupehan	BE
2007	4350	Pousset	BE
2008	5660	Presgaux	BE
2009	6250	Presles	BE
2010	5170	Profondeville	BE
2011	8972	Proven	BE
2012	5650	Pry	BE
2013	2242	Pulderbos	BE
2014	2243	Pulle	BE
2015	5530	Purnode	BE
2016	5550	Pussemange	BE
2017	2580	Putte	BE
2018	2870	Puurs	BE
2019	7390	Quaregnon	BE
2020	7540	Quartes	BE
2021	1430	Quenast	BE
2022	4610	Queue-du-Bois	BE
2023	7972	Quevaucamps	BE
2024	7040	Quévy-le-Grand	BE
2025	7040	Quévy-le-Petit	BE
2026	7380	Quiévrain	BE
2027	6792	Rachecourt	BE
2028	4287	Racour	BE
2029	4730	Raeren	BE
2030	6532	Ragnies	BE
2031	4987	Rahier	BE
2032	7971	Ramegnies	BE
2033	7520	Ramegnies-Chin	BE
2034	4557	Ramelot	BE
2035	1367	Ramillies	BE
2036	1880	Ramsdonk	BE
2037	2230	Ramsel	BE
2038	8301	Ramskapelle (Knokke-Heist)	BE
2039	8620	Ramskapelle (Nieuwpoort)	BE
2040	6470	Rance	BE
2041	6043	Ransart	BE
2042	3470	Ransberg	BE
2043	2520	Ranst	BE
2044	2380	Ravels	BE
2045	7804	Rebaix	BE
2046	1430	Rebecq	BE
2047	1430	Rebecq-Rognon	BE
2048	4780	Recht	BE
2049	6800	Recogne	BE
2050	6890	Redu	BE
2051	2840	Reet	BE
2052	3621	Rekem	BE
2053	8930	Rekkem	BE
2054	1731	Relegem	BE
2055	6800	Remagne	BE
2056	3791	Remersdaal	BE
2057	4350	Remicourt	BE
2058	9600	Renaix	BE
2059	6987	Rendeux	BE
2060	8647	Reninge	BE
2061	8970	Reningelst	BE
2062	6500	Renlies	BE
2063	3950	Reppel	BE
2064	7134	Ressaix	BE
2065	9551	Ressegem	BE
2066	6927	Resteigne	BE
2067	2470	Retie	BE
2068	4621	Retinne	BE
2069	4790	Reuland	BE
2070	6210	Rèves	BE
2071	5080	Rhisnes	BE
2072	1640	Rhode-Saint-Genèse	BE
2073	4600	Richelle	BE
2074	3770	Riemst	BE
2075	5575	Rienne	BE
2076	6464	Rièzes	BE
2077	3840	Rijkel	BE
2078	2310	Rijkevorsel	BE
2079	3740	Rijkhoven	BE
2080	2820	Rijmenam	BE
2081	3700	Riksingen	BE
2082	3202	Rillaar	BE
2083	5170	Rivière	BE
2084	1330	Rixensart	BE
2085	6460	Robechies	BE
2086	6769	Robelmont	BE
2087	4950	Robertville	BE
2088	9630	Roborst	BE
2089	5580	Rochefort	BE
2090	6830	Rochehaut	BE
2091	4761	Rocherath	BE
2092	4690	Roclenge-sur-Geer	BE
2093	4000	Rocourt	BE
2094	8972	Roesbrugge-Haringe	BE
2095	8800	Roeselare	BE
2096	5651	Rognée	BE
2097	7387	Roisin	BE
2098	8460	Roksem	BE
2099	8510	Rollegem	BE
2100	8880	Rollegem-Kapelle	BE
2101	4347	Roloux	BE
2102	5600	Roly	BE
2103	5600	Romedenne	BE
2104	5680	Romerée	BE
2105	3730	Romershoven	BE
2106	4624	Romsée	BE
2107	7623	Rongy	BE
2108	7090	Ronquières	BE
2109	9600	Ronse	BE
2110	9932	Ronsele	BE
2111	3370	Roosbeek	BE
2112	1760	Roosdaal	BE
2113	4012	ROQUEFORT	BE
2114	5620	Rosée	BE
2115	6250	Roselies	BE
2116	1331	Rosières	BE
2117	3740	Rosmeer	BE
2118	4257	Rosoux-Crenwick	BE
2119	6730	Rossignol	BE
2120	3650	Rotem	BE
2121	4120	Rotheux-Rimière	BE
2122	3110	Rotselaar	BE
2123	7601	Roucourt	BE
2124	7120	Rouveroy (Ht.)	BE
2125	4140	Rouvreux	BE
2126	6767	Rouvroy	BE
2127	6044	Roux	BE
2128	1315	Roux-Miroir	BE
2129	6900	Roy	BE
2130	9630	Rozebeke	BE
2131	8020	Ruddervoorde	BE
2132	6760	Ruette	BE
2133	9690	Ruien	BE
2134	2870	Ruisbroek (Antw.)	BE
2135	1601	Ruisbroek (Bt.)	BE
2136	8755	Ruiselede	BE
2137	3870	Rukkelingen-Loon	BE
2138	6724	Rulles	BE
2139	8800	Rumbeke	BE
2140	7610	Rumes	BE
2141	7540	Rumillies	BE
2142	3454	Rummen	BE
2143	3400	Rumsdorp	BE
2144	2840	Rumst	BE
2145	3803	Runkelen	BE
2146	9150	Rupelmonde	BE
2147	7750	Russeignies	BE
2148	3700	Rutten	BE
2149	3798	's Gravenvoeren	BE
2150	2970	's Gravenwezel	BE
2151	3700	's Herenelderen	BE
2152	6221	Saint-Amand	BE
2153	4606	Saint-André	BE
2154	5620	Saint-Aubin	BE
2155	7034	Saint-Denis (Ht.)	BE
2156	5081	Saint-Denis-Bovesse	BE
2157	6820	Sainte-Cécile	BE
2158	6800	Sainte-Marie-Chevigny	BE
2159	6740	Sainte-Marie-sur-Semois	BE
2160	6680	Sainte-Ode	BE
2161	1480	Saintes	BE
2162	4470	Saint-Georges-sur-Meuse	BE
2163	5640	Saint-Gérard	BE
2164	5310	Saint-Germain	BE
2165	1450	Saint-Géry	BE
2166	7330	Saint-Ghislain	BE
2167	1060	Saint-Gilles	BE
2168	6870	Saint-Hubert	BE
2169	1370	Saint-Jean-Geest	BE
2170	1210	Saint-Josse-ten-Noode	BE
2171	7730	Saint-Léger (Ht.)	BE
2172	6747	Saint-Léger (Lux.)	BE
2173	5003	Saint-Marc	BE
2174	6762	Saint-Mard	BE
2175	5190	Saint-Martin	BE
2176	7500	Saint-Maur	BE
2177	6887	Saint-Médard	BE
2178	4420	Saint-Nicolas (Lg.)	BE
2179	6800	Saint-Pierre	BE
2180	6460	Saint-Remy (Ht.)	BE
2181	4672	Saint-Remy (Lg.)	BE
2182	1370	Saint-Remy-Geest	BE
2183	7912	Saint-Sauveur	BE
2184	5002	Saint-Servais	BE
2185	4550	Saint-Séverin	BE
2186	7030	Saint-Symphorien	BE
2187	7100	Saint-Vaast	BE
2188	6730	Saint-Vincent	BE
2189	4780	Saint-Vith	BE
2190	4671	Saive	BE
2191	6460	Salles	BE
2192	5600	Samart	BE
2193	5060	Sambreville	BE
2194	6982	Samrée	BE
2195	4780	Sankt Vith	BE
2196	7080	Sars-la-Bruyère	BE
2197	6542	Sars-la-Buissière	BE
2198	5330	Sart-Bernard	BE
2199	5575	Sart-Custinne	BE
2200	1495	Sart-Dames-Avelines	BE
2201	5600	Sart-en-Fagne	BE
2202	5070	Sart-Eustache	BE
2203	4845	Sart-lez-Spa	BE
2204	5070	Sart-Saint-Laurent	BE
2205	6470	Sautin	BE
2206	5600	Sautour	BE
2207	5030	Sauvenière	BE
2208	1030	Schaarbeek	BE
2209	1030	Schaerbeek	BE
2210	3290	Schaffen	BE
2211	3732	Schalkhoven	BE
2212	5364	Schaltin	BE
2213	9820	Schelderode	BE
2214	9860	Scheldewindeke	BE
2215	2627	Schelle	BE
2216	9260	Schellebelle	BE
2217	9506	Schendelbeke	BE
2218	1703	Schepdaal	BE
2219	3270	Scherpenheuvel	BE
2220	2970	Schilde	BE
2221	4782	Schoenberg	BE
2222	4782	Schönberg	BE
2223	9200	Schoonaarde	BE
2224	8433	Schore	BE
2225	9688	Schorisse	BE
2226	2900	Schoten	BE
2227	2223	Schriek	BE
2228	8700	Schuiferskapelle	BE
2229	3540	Schulen	BE
2230	5300	Sclayn	BE
2231	5361	Scy	BE
2232	5300	Seilles	BE
2233	6781	Sélange	BE
2234	6596	Seloignes	BE
2235	9890	Semmerzake	BE
2236	7180	Seneffe	BE
2237	6832	Sensenruth	BE
2238	4557	Seny	BE
2239	5630	Senzeille	BE
2240	6940	Septon	BE
2241	4100	Seraing	BE
2242	4537	Seraing-le-Château	BE
2243	5590	Serinchamps	BE
2244	9260	Serskamp	BE
2245	5521	Serville	BE
2246	6640	Sibret	BE
2247	6750	Signeulx	BE
2248	8340	Sijsele	BE
2249	5630	Silenrieux	BE
2250	7830	Silly	BE
2251	9112	Sinaai-Waas	BE
2252	5377	Sinsin	BE
2253	1080	Sint-Agatha-Berchem	BE
2254	3040	Sint-Agatha-Rode	BE
2255	2890	Sint-Amands	BE
2256	9040	Sint-Amandsberg	BE
2257	8200	Sint-Andries	BE
2258	9550	Sint-Antelinks	BE
2259	8710	Sint-Baafs-Vijve	BE
2260	9630	Sint-Blasius-Boekel	BE
2261	8554	Sint-Denijs	BE
2262	9630	Sint-Denijs-Boekel	BE
2263	9051	Sint-Denijs-Westrem	BE
2264	8793	Sint-Eloois-Vijve	BE
2265	8880	Sint-Eloois-Winkel	BE
2266	1640	Sint-Genesius-Rode	BE
2267	1060	Sint-Gillis	BE
2268	9170	Sint-Gillis-Waas	BE
2269	9620	Sint-Goriks-Oudenhove	BE
2270	3730	Sint-Huibrechts-Hern	BE
2271	3910	Sint-Huibrechts-Lille	BE
2272	8600	Sint-Jacobs-Kapelle	BE
2273	8900	Sint-Jan	BE
2274	9982	Sint-Jan-in-Eremo	BE
2275	1080	Sint-Jans-Molenbeek	BE
2276	2960	Sint-Job-in-'t-Goor	BE
2277	1210	Sint-Joost-ten-Node	BE
2278	8730	Sint-Joris (Beernem)	BE
2279	8620	Sint-Joris (Nieuwpoort)	BE
2280	3051	Sint-Joris-Weert	BE
2281	3390	Sint-Joris-Winge	BE
2282	2860	Sint-Katelijne-Waver	BE
2283	1742	Sint-Katherina-lombeek	BE
2284	9667	Sint-Kornelis-Horebeke	BE
2285	8310	Sint-Kruis (Brugge)	BE
2286	9042	Sint-Kruis-Winkel	BE
2287	1750	Sint-Kwintens-Lennik	BE
2288	3500	Sint-Lambrechts-Herk	BE
2289	1200	Sint-Lambrechts-Woluwe	BE
2290	9980	Sint-Laureins	BE
2291	1600	Sint-Laureins-Berchem	BE
2292	2960	Sint-Lenaerts	BE
2293	9550	Sint-Lievens-Esse	BE
2294	9520	Sint-Lievens-Houtem	BE
2295	9981	Sint-Margriete	BE
2296	9667	Sint-Maria-Horebeke	BE
2297	9630	Sint-Maria-Latem	BE
2298	9570	Sint-Maria-Lierde	BE
2299	1700	Sint-Martens-Bodegem	BE
2300	9830	Sint-Martens-Latem	BE
2301	9800	Sint-Martens-Leerne	BE
2302	1750	Sint-Martens-Lennik	BE
2303	9572	Sint-Martens-Lierde	BE
2304	3790	Sint-Martens-Voeren	BE
2305	8200	Sint-Michiels	BE
2306	9100	Sint-Niklaas	BE
2307	9170	Sint-Pauwels	BE
2308	1541	Sint-Pieters-Kapelle (Bt.)	BE
2309	1600	Sint-Pieters-Leeuw	BE
2310	3220	Sint-Pieters-Rode	BE
2311	3792	Sint-Pieters-Voeren	BE
2312	1150	Sint-Pieters-Woluwe	BE
2313	8690	Sint-Rijkers	BE
2314	1932	Sint-Stevens-Woluwe	BE
2315	3800	Sint-Truiden	BE
2316	1700	Sint-Ulriks-Kapelle	BE
2317	4851	Sippenaeken	BE
2318	7332	Sirault	BE
2319	6470	Sivry	BE
2320	6470	Sivry-Rance	BE
2321	9940	Sleidinge	BE
2322	8433	Slijpe	BE
2323	4450	Slins	BE
2324	3700	Sluizen	BE
2325	9506	Smeerebbe-Vloerzegem	BE
2326	9340	Smetlede	BE
2327	6890	Smuid	BE
2328	8470	Snaaskerke	BE
2329	8490	Snellegem	BE
2330	4557	Soheit-Tinlot	BE
2331	6920	Sohier	BE
2332	7060	Soignies	BE
2333	4861	Soiron	BE
2334	6500	Solre-Saint-Géry	BE
2335	6560	Solre-sur-Sambre	BE
2336	5140	Sombreffe	BE
2337	5377	Somme-Leuze	BE
2338	6769	Sommethonne	BE
2339	5523	Sommière	BE
2340	5651	Somzée	BE
2341	5340	Sorée	BE
2342	5333	Sorinne-la-Longue	BE
2343	5503	Sorinnes	BE
2344	5537	Sosoye	BE
2345	4920	Sougné-Remouchamps	BE
2346	5680	Soulme	BE
2347	4630	Soumagne	BE
2348	5630	Soumoy	BE
2349	4950	Sourbrodt	BE
2350	6182	Souvret	BE
2351	5590	Sovet	BE
2352	6997	Soy	BE
2353	5150	Soye (Nam.)	BE
2354	4900	Spa	BE
2355	3510	Spalbeek	BE
2356	7032	Spiennes	BE
2357	8587	Spiere	BE
2358	8587	Spiere-Helkijn	BE
2359	5530	Spontin	BE
2360	4140	Sprimont	BE
2361	5190	Spy	BE
2362	2940	Stabroek	BE
2363	8840	Staden	BE
2364	8490	Stalhille	BE
2365	7973	Stambruges	BE
2366	5646	Stave	BE
2367	8691	Stavele	BE
2368	4970	Stavelot	BE
2369	9140	Steendorp	BE
2370	1840	Steenhuffel	BE
2371	9550	Steenhuize-Wijnhuize	BE
2372	8630	Steenkerke (W.-VL.)	BE
2373	7090	Steenkerque (Ht.)	BE
2374	1820	Steenokkerzeel	BE
2375	9190	Stekene	BE
2376	4801	Stembert	BE
2377	8400	Stene	BE
2378	1933	Sterrebeek	BE
2379	3512	Stevoort	BE
2380	9200	St-Gillis-bij-Dendermonde	BE
2381	3470	St-Margriete (Kortenaken)	BE
2382	3300	St-Margriete-Houtem(Tien.)	BE
2383	9660	St-Maria-Oudenhove(Brakel)	BE
2384	9620	St-Maria-Oudenhove(Zott.)	BE
2385	3650	Stokkem	BE
2386	3511	Stokrooie	BE
2387	4987	Stoumont	BE
2388	8433	St-Pieters-Kapelle(W.-Vl.)	BE
2389	6887	Straimont	BE
2390	6511	Strée (Ht.)	BE
2391	4577	Strée-lez-Huy	BE
2392	7110	Strépy-Bracquegnies	BE
2393	9620	Strijpen	BE
2394	1760	Strijtem	BE
2395	1853	Strombeek-Bever	BE
2396	8600	Stuivekenskerke	BE
2397	5020	Suarlée	BE
2398	5550	Sugny	BE
2399	5600	Surice	BE
2400	6812	Suxy	BE
2401	6661	Tailles	BE
2402	7618	Taintignies	BE
2403	5060	Tamines	BE
2404	5651	Tarcienne	BE
2405	4163	Tavier	BE
2406	5310	Taviers (Nam.)	BE
2407	6662	Tavigny	BE
2408	6927	Tellin	BE
2409	7520	Templeuve	BE
2410	5020	Temploux	BE
2411	9140	Temse	BE
2412	6970	Tenneville	BE
2413	1790	Teralfene	BE
2414	2840	Terhagen	BE
2415	6813	Termes	BE
2416	1740	Ternat	BE
2417	7333	Tertre	BE
2418	3080	Tervuren	BE
2419	4560	Terwagne	BE
2420	3980	Tessenderlo	BE
2421	3272	Testelt	BE
2422	3793	Teuven	BE
2423	4910	Theux	BE
2424	6717	Thiaumont	BE
2425	7070	Thieu	BE
2426	7901	Thieulain	BE
2427	7061	Thieusies	BE
2428	6230	Thiméon	BE
2429	4890	Thimister	BE
2430	4890	Thimister-Clermont	BE
2431	7533	Thimougies	BE
2432	1402	Thines	BE
2433	6500	Thirimont	BE
2434	4280	Thisnes	BE
2435	4791	Thommen	BE
2436	5300	Thon	BE
2437	1360	Thorembais-les-Béguines	BE
2438	1360	Thorembais-Saint-Trond	BE
2439	7830	Thoricourt	BE
2440	6536	Thuillies	BE
2441	6530	Thuin	BE
2442	7350	Thulin	BE
2443	7971	Thumaide	BE
2444	5621	Thy-le-Bauduin	BE
2445	5651	Thy-le-Château	BE
2446	5502	Thynes	BE
2447	4367	Thys	BE
2448	8573	Tiegem	BE
2449	2460	Tielen	BE
2450	9140	Tielrode	BE
2451	8700	Tielt	BE
2452	3390	Tielt (Bt.)	BE
2453	3300	Tienen	BE
2454	4630	Tignée	BE
2455	4500	Tihange	BE
2456	3150	Tildonk	BE
2457	4130	Tilff	BE
2458	6680	Tillet	BE
2459	4420	Tilleur	BE
2460	5380	Tillier	BE
2461	1495	Tilly	BE
2462	4557	Tinlot	BE
2463	6637	Tintange	BE
2464	6730	Tintigny	BE
2465	2830	Tisselt	BE
2466	6700	Toernich	BE
2467	6941	Tohogne	BE
2468	1570	Tollembeek	BE
2469	3700	Tongeren	BE
2470	2260	Tongerlo (Antw.)	BE
2471	3960	Tongerlo (Limb.)	BE
2472	7951	Tongre-Notre-Dame	BE
2473	7950	Tongre-Saint-Martin	BE
2474	5140	Tongrinne	BE
2475	6717	Tontelange	BE
2476	6767	Torgny	BE
2477	8820	Torhout	BE
2478	4263	Tourinne (Lg.)	BE
2479	1320	Tourinnes-la-Grosse	BE
2480	1457	Tourinnes-Saint-Lambert	BE
2481	7500	Tournai	BE
2482	6840	Tournay	BE
2483	7904	Tourpes	BE
2484	6890	Transinne	BE
2485	6183	Trazegnies	BE
2486	5670	Treignes	BE
2487	4670	Trembleur	BE
2488	3120	Tremelo	BE
2489	7100	Trivières	BE
2490	4280	Trognée	BE
2491	4980	Trois-Ponts	BE
2492	4870	Trooz	BE
2493	1480	Tubize	BE
2494	2300	Turnhout	BE
2495	1180	Uccle	BE
2496	6833	Ucimont	BE
2497	3631	Uikhoven	BE
2498	9290	Uitbergen	BE
2499	8370	Uitkerke	BE
2500	1180	Ukkel	BE
2501	3832	Ulbeek	BE
2502	5310	Upigny	BE
2503	9910	Ursel	BE
2504	3054	Vaalbeek	BE
2505	3770	Val-Meer	BE
2506	6741	Vance	BE
2507	2431	Varendonk	BE
2508	8490	Varsenare	BE
2509	5680	Vaucelles	BE
2510	7536	Vaulx (Tournai)	BE
2511	6462	Vaulx-lez-Chimay	BE
2512	6960	Vaux-Chavanne	BE
2513	4530	Vaux-et-Borset	BE
2514	6640	Vaux-lez-Rosières	BE
2515	4051	Vaux-sous-Chèvremont	BE
2516	6640	Vaux-sur-Sûre	BE
2517	3870	Vechmaal	BE
2518	5020	Vedrin	BE
2519	2431	Veerle	BE
2520	7760	Velaines	BE
2521	5060	Velaine-sur-Sambre	BE
2522	8210	Veldegem	BE
2523	3620	Veldwezelt	BE
2524	7120	Vellereille-les-Brayeux	BE
2525	7120	Vellereille-le-Sec	BE
2526	3806	Velm	BE
2527	4460	Velroux	BE
2528	3020	Veltem-Beisem	BE
2529	9620	Velzeke-Ruddershove	BE
2530	5575	Vencimont	BE
2531	6440	Vergnies	BE
2532	4537	Verlaine	BE
2533	5370	Verlée	BE
2534	9130	Verrebroek	BE
2535	3370	Vertrijk	BE
2536	4800	Verviers	BE
2537	6870	Vesqueville	BE
2538	3870	Veulen	BE
2539	8630	Veurne	BE
2540	5300	Vezin	BE
2541	7538	Vezon	BE
2542	9500	Viane	BE
2543	8570	Vichte	BE
2544	6690	Vielsalm	BE
2545	4317	Viemme	BE
2546	2240	Viersel	BE
2547	4577	Vierset-Barse	BE
2548	5670	Vierves-sur-Viroin	BE
2549	6230	Viesville	BE
2550	1472	Vieux-Genappe	BE
2551	4190	Vieuxville	BE
2552	4530	Vieux-Waleffe	BE
2553	6890	Villance	BE
2554	4260	Ville-en-Hesbaye	BE
2555	7322	Ville-Pommeroeul	BE
2556	7334	Villerot	BE
2557	4161	Villers-aux-Tours	BE
2558	5630	Villers-Deux-Eglises	BE
2559	6823	Villers-devant-Orval	BE
2560	5600	Villers-en-Fagne	BE
2561	6600	Villers-la-Bonne-Eau	BE
2562	6769	Villers-la-Loue	BE
2563	6460	Villers-la-Tour	BE
2564	1495	Villers-la-Ville	BE
2565	4530	Villers-le-Bouillet	BE
2566	5600	Villers-le-Gambon	BE
2567	4280	Villers-le-Peuplier	BE
2568	4550	Villers-le-Temple	BE
2569	4340	Villers-l'Evêque	BE
2570	5080	Villers-lez-Heest	BE
2571	7812	Villers-Notre-Dame	BE
2572	6210	Villers-Perwin	BE
2573	6280	Villers-Poterie	BE
2574	7812	Villers-Saint-Amand	BE
2575	6941	Villers-Sainte-Gertrude	BE
2576	7031	Villers-Saint-Ghislain	BE
2577	4453	Villers-Saint-Siméon	BE
2578	5580	Villers-sur-Lesse	BE
2579	6740	Villers-sur-Semois	BE
2580	7021	Ville-sur-Haine (Mons)	BE
2581	7070	Ville-sur-Haine(Le Roeulx)	BE
2582	1800	Vilvoorde	BE
2583	4520	Vinalmont	BE
2584	9921	Vinderhoute	BE
2585	8630	Vinkem	BE
2586	9800	Vinkt	BE
2587	6461	Virelles	BE
2588	1460	Virginal-Samme	BE
2589	5670	Viroinval	BE
2590	6760	Virton	BE
2591	4600	Visé	BE
2592	3300	Vissenaken	BE
2593	5070	Vitrival	BE
2594	4683	Vivegnis	BE
2595	6833	Vivy	BE
2596	8600	Vladslo	BE
2597	8908	Vlamertinge	BE
2598	9420	Vlekkem	BE
2599	8640	Vleteren	BE
2600	1602	Vlezenbeek	BE
2601	3724	Vliermaal	BE
2602	3721	Vliermaalroot	BE
2603	9520	Vlierzele	BE
2604	3770	Vlijtingen	BE
2605	2340	Vlimmeren	BE
2606	8421	Vlissegem	BE
2607	7880	Vloesberg	BE
2608	5600	Vodecée	BE
2609	5680	Vodelée	BE
2610	3790	Voeren	BE
2611	5650	Vogenée	BE
2612	9700	Volkegem	BE
2613	1570	Vollezele	BE
2614	5570	Vonêche	BE
2615	9400	Voorde	BE
2616	8902	Voormezele	BE
2617	3840	Voort	BE
2618	4347	Voroux-Goreux	BE
2619	4451	Voroux-lez-Liers	BE
2620	2290	Vorselaar	BE
2621	3890	Vorsen	BE
2622	1190	Vorst	BE
2623	2430	Vorst (Kempen)	BE
2624	2350	Vosselaar	BE
2625	9850	Vosselare	BE
2626	3080	Vossem	BE
2627	4041	Vottem	BE
2628	9120	Vrasene	BE
2629	2531	Vremde	BE
2630	3700	Vreren	BE
2631	5550	Vresse-sur-Semois	BE
2632	3770	Vroenhoven	BE
2633	3630	Vucht	BE
2634	9890	Vurste	BE
2635	4570	Vyle-et-Tharoul	BE
2636	3473	Waanrode	BE
2637	9506	Waarbeke	BE
2638	8020	Waardamme	BE
2639	2550	Waarloos	BE
2640	8581	Waarmaarde	BE
2641	9950	Waarschoot	BE
2642	3401	Waasmont	BE
2643	9250	Waasmunster	BE
2644	7784	Waasten	BE
2645	9185	Wachtebeke	BE
2646	7971	Wadelincourt	BE
2647	6223	Wagnelée	BE
2648	6900	Waha	BE
2649	5377	Waillet	BE
2650	4950	Waimes	BE
2651	8720	Wakken	BE
2652	5650	Walcourt	BE
2653	2800	Walem	BE
2654	1457	Walhain	BE
2655	1457	Walhain-Saint-Paul	BE
2656	4711	Walhorn	BE
2657	3401	Walsbets	BE
2658	3401	Walshoutem	BE
2659	3740	Waltwilder	BE
2660	1741	Wambeek	BE
2661	5570	Wancennes	BE
2662	4020	Wandre	BE
2663	6224	Wanfercée-Baulet	BE
2664	3400	Wange	BE
2665	6220	Wangenies	BE
2666	5564	Wanlin	BE
2667	4980	Wanne	BE
2668	7861	Wannebecq	BE
2669	9772	Wannegem-Lede	BE
2670	4280	Wansin	BE
2671	4520	Wanze	BE
2672	9340	Wanzele	BE
2673	7548	Warchin	BE
2674	7740	Warcoing	BE
2675	6600	Wardin	BE
2676	8790	Waregem	BE
2677	4300	Waremme	BE
2678	5310	Waret-la-Chaussée	BE
2679	4217	Waret-l'Evêque	BE
2680	5080	Warisoulx	BE
2681	5537	Warnant	BE
2682	4530	Warnant-Dreye	BE
2683	7784	Warneton	BE
2684	7340	Warquignies	BE
2685	4608	Warsage	BE
2686	4590	Warzée	BE
2687	7340	Wasmes	BE
2688	7604	Wasmes-Audemez-Briffoeil	BE
2689	7390	Wasmuel	BE
2690	4219	Wasseiges	BE
2691	9988	Waterland-Oudeman	BE
2692	1410	Waterloo	BE
2693	1170	Watermaal-Bosvoorde	BE
2694	1170	Watermael-Boitsfort	BE
2695	9988	Watervliet	BE
2696	8978	Watou	BE
2697	7910	Wattripont	BE
2698	7131	Waudrez	BE
2699	5540	Waulsort	BE
2700	1440	Wauthier-Braine	BE
2701	1300	Wavre	BE
2702	5580	Wavreille	BE
2703	6210	Wayaux	BE
2704	1474	Ways	BE
2705	3290	Webbekom	BE
2706	2275	Wechelderzande	BE
2707	2381	Weelde	BE
2708	1982	Weerde	BE
2709	2880	Weert	BE
2710	4860	Wegnez	BE
2711	5523	Weillen	BE
2712	4950	Weismes	BE
2713	9700	Welden	BE
2714	4840	Welkenraedt	BE
2715	9473	Welle	BE
2716	3830	Wellen	BE
2717	6920	Wellin	BE
2718	1780	Wemmel	BE
2719	8420	Wenduine	BE
2720	5100	Wépion	BE
2721	4190	Werbomont	BE
2722	3118	Werchter	BE
2723	6940	Wéris	BE
2724	8610	Werken	BE
2725	3730	Werm	BE
2726	8940	Wervik	BE
2727	3150	Wespelaar	BE
2728	8434	Westende	BE
2729	2260	Westerlo	BE
2730	8300	Westkapelle	BE
2731	8460	Westkerke	BE
2732	2390	Westmalle	BE
2733	2235	Westmeerbeek	BE
2734	8954	Westouter	BE
2735	9230	Westrem	BE
2736	8840	Westrozebeke	BE
2737	8640	Westvleteren	BE
2738	9230	Wetteren	BE
2739	8560	Wevelgem	BE
2740	3111	Wezemaal	BE
2741	1970	Wezembeek-Oppem	BE
2742	3401	Wezeren	BE
2743	7620	Wez-Velvain	BE
2744	6666	Wibrin	BE
2745	9260	Wichelen	BE
2746	3700	Widooie	BE
2747	2222	Wiekevorst	BE
2748	8710	Wielsbeke	BE
2749	5100	Wierde	BE
2750	7608	Wiers	BE
2751	5571	Wiesme	BE
2752	9280	Wieze	BE
2753	7370	Wihéries	BE
2754	4452	Wihogne	BE
2755	3990	Wijchmaal	BE
2756	3850	Wijer	BE
2757	3018	Wijgmaal (Bt.)	BE
2758	2110	Wijnegem	BE
2759	3670	Wijshagen	BE
2760	8953	Wijtschate	BE
2761	3803	Wilderen	BE
2762	7904	Willaupuis	BE
2763	3370	Willebringen	BE
2764	2830	Willebroek	BE
2765	7506	Willemeau	BE
2766	5575	Willerzie	BE
2767	2610	Wilrijk (Antwerpen)	BE
2768	3012	Wilsele	BE
2769	8431	Wilskerke	BE
2770	3501	Wimmertingen	BE
2771	5570	Winenne	BE
2772	8750	Wingene	BE
2773	3020	Winksele	BE
2774	3722	Wintershoven	BE
2775	6860	Witry	BE
2776	7890	Wodecq	BE
2777	8640	Woesten	BE
2778	6780	Wolkrange	BE
2779	1200	Woluwé-Saint-Lambert	BE
2780	1150	Woluwé-Saint-Pierre	BE
2781	1861	Wolvertem	BE
2782	2160	Wommelgem	BE
2783	3350	Wommersom	BE
2784	4690	Wonck	BE
2785	9032	Wondelgem	BE
2786	9800	Wontergem	BE
2787	9790	Wortegem	BE
2788	9790	Wortegem-Petegem	BE
2789	2323	Wortel	BE
2790	9550	Woubrechtegem	BE
2791	8600	Woumen	BE
2792	8670	Wulpen	BE
2793	8952	Wulvergem	BE
2794	8630	Wulveringem	BE
2795	2990	Wuustwezel	BE
2796	4652	Xhendelesse	BE
2797	4432	Xhendremael	BE
2798	4190	Xhoris	BE
2799	4550	Yernée-Fraineux	BE
2800	5650	Yves-Gomezée	BE
2801	5530	Yvoir	BE
2802	9080	Zaffelare	BE
2803	9506	Zandbergen	BE
2804	8680	Zande	BE
2805	2240	Zandhoven	BE
2806	2040	Zandvliet	BE
2807	8400	Zandvoorde (Oostende)	BE
2808	8980	Zandvoorde (Zonnebeke)	BE
2809	9500	Zarlardinge	BE
2810	8610	Zarren	BE
2811	1930	Zaventem	BE
2812	8210	Zedelgem	BE
2813	8380	Zeebrugge (Brugge)	BE
2814	9660	Zegelsem	BE
2815	9240	Zele	BE
2816	3545	Zelem	BE
2817	1731	Zellik	BE
2818	9060	Zelzate	BE
2819	1980	Zemst	BE
2820	3800	Zepperen	BE
2821	8490	Zerkegem	BE
2822	1370	Zétrud-Lumay	BE
2823	8470	Zevekote	BE
2824	9080	Zeveneken	BE
2825	9800	Zeveren	BE
2826	9840	Zevergem	BE
2827	3271	Zichem	BE
2828	3770	Zichen-Zussen-Bolder	BE
2829	8902	Zillebeke	BE
2830	9750	Zingem	BE
2831	2260	Zoerle-Parwijs	BE
2832	2980	Zoersel	BE
2833	3550	Zolder	BE
2834	9930	Zomergem	BE
2835	3520	Zonhoven	BE
2836	8980	Zonnebeke	BE
2837	9520	Zonnegem	BE
2838	9620	Zottegem	BE
2839	8630	Zoutenaaie	BE
2840	3440	Zoutleeuw	BE
2841	8904	Zuidschote	BE
2842	8377	Zuienkerke	BE
2843	9870	Zulte	BE
2844	9690	Zulzeke	BE
2845	3690	Zutendaal	BE
2846	9630	Zwalm	BE
2847	8550	Zwevegem	BE
2848	8750	Zwevezele	BE
2849	9052	Zwijnaarde	BE
2850	2070	Zwijndrecht	BE
2852	59000	Lille	FR
\.


--
-- Name: villes_idville_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('villes_idville_seq', 2852, true);


--
-- Name: admins_login_key; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY admins
    ADD CONSTRAINT admins_login_key UNIQUE (login);


--
-- Name: admins_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY admins
    ADD CONSTRAINT admins_pkey PRIMARY KEY (idadmin);


--
-- Name: bonustrajets_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY bonustrajets
    ADD CONSTRAINT bonustrajets_pkey PRIMARY KEY (idbonustrajet);


--
-- Name: camions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY camions
    ADD CONSTRAINT camions_pkey PRIMARY KEY (idcamion);


--
-- Name: clients_login_client_key; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY clients
    ADD CONSTRAINT clients_login_client_key UNIQUE (login_client);


--
-- Name: clients_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY clients
    ADD CONSTRAINT clients_pkey PRIMARY KEY (idclient);


--
-- Name: commentaires_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY commentaires
    ADD CONSTRAINT commentaires_pkey PRIMARY KEY (idcommentaire);


--
-- Name: depots_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY depots
    ADD CONSTRAINT depots_pkey PRIMARY KEY (iddepot);


--
-- Name: domaines_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY domaines
    ADD CONSTRAINT domaines_pkey PRIMARY KEY (iddomaine);


--
-- Name: gpscamions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY gpscamions
    ADD CONSTRAINT gpscamions_pkey PRIMARY KEY (idgpscamion);


--
-- Name: gpsvelos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY gpsvelos
    ADD CONSTRAINT gpsvelos_pkey PRIMARY KEY (idgpsvelo);


--
-- Name: locations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY locations
    ADD CONSTRAINT locations_pkey PRIMARY KEY (idlocation);


--
-- Name: pays_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY pays
    ADD CONSTRAINT pays_pkey PRIMARY KEY (idpays);


--
-- Name: stations_nom_station_key; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY stations
    ADD CONSTRAINT stations_nom_station_key UNIQUE (nom_station);


--
-- Name: stations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY stations
    ADD CONSTRAINT stations_pkey PRIMARY KEY (idstation);


--
-- Name: statutcamions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY statutcamions
    ADD CONSTRAINT statutcamions_pkey PRIMARY KEY (idstatutcamion);


--
-- Name: statutclients_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY statutclients
    ADD CONSTRAINT statutclients_pkey PRIMARY KEY (idstatutclient);


--
-- Name: statutvelos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY statutvelos
    ADD CONSTRAINT statutvelos_pkey PRIMARY KEY (idstatutvelo);


--
-- Name: tarifs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY tarifs
    ADD CONSTRAINT tarifs_pkey PRIMARY KEY (idtarif);


--
-- Name: transactions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY transactions
    ADD CONSTRAINT transactions_pkey PRIMARY KEY (idtransaction);


--
-- Name: typeadmins_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY typeadmins
    ADD CONSTRAINT typeadmins_pkey PRIMARY KEY (idtype);


--
-- Name: typecamions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY typecamions
    ADD CONSTRAINT typecamions_pkey PRIMARY KEY (idtypecamion);


--
-- Name: typevelos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY typevelos
    ADD CONSTRAINT typevelos_pkey PRIMARY KEY (idtypevelo);


--
-- Name: uniqueniveau; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY typeadmins
    ADD CONSTRAINT uniqueniveau UNIQUE (niveau);


--
-- Name: velos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY velos
    ADD CONSTRAINT velos_pkey PRIMARY KEY (idvelo);


--
-- Name: villes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY villes
    ADD CONSTRAINT villes_pkey PRIMARY KEY (idville);


--
-- Name: admins_cp_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY admins
    ADD CONSTRAINT admins_cp_fkey FOREIGN KEY (cp) REFERENCES villes(idville);


--
-- Name: admins_delivrepar_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY admins
    ADD CONSTRAINT admins_delivrepar_fkey FOREIGN KEY (delivre_par) REFERENCES admins(idadmin);


--
-- Name: admins_domaine_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY admins
    ADD CONSTRAINT admins_domaine_fkey FOREIGN KEY (domaine) REFERENCES domaines(iddomaine);


--
-- Name: admins_type_admin_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY admins
    ADD CONSTRAINT admins_type_admin_fkey FOREIGN KEY (type_admin) REFERENCES typeadmins(idtype);


--
-- Name: bonustrajets_station_arriver_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY bonustrajets
    ADD CONSTRAINT bonustrajets_station_arriver_fkey FOREIGN KEY (station_arriver) REFERENCES stations(idstation);


--
-- Name: bonustrajets_station_depart_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY bonustrajets
    ADD CONSTRAINT bonustrajets_station_depart_fkey FOREIGN KEY (station_depart) REFERENCES stations(idstation);


--
-- Name: camions_dom_camion_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY camions
    ADD CONSTRAINT camions_dom_camion_fkey FOREIGN KEY (dom_camion) REFERENCES domaines(iddomaine);


--
-- Name: camions_statut_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY camions
    ADD CONSTRAINT camions_statut_fkey FOREIGN KEY (statut_camion) REFERENCES statutcamions(idstatutcamion);


--
-- Name: camions_typecamion_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY camions
    ADD CONSTRAINT camions_typecamion_fkey FOREIGN KEY (type_camion) REFERENCES typecamions(idtypecamion);


--
-- Name: clients_cp_client_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY clients
    ADD CONSTRAINT clients_cp_client_fkey FOREIGN KEY (cp_client) REFERENCES villes(idville);


--
-- Name: clients_modif_par_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY clients
    ADD CONSTRAINT clients_modif_par_fkey FOREIGN KEY (modif_par) REFERENCES admins(idadmin);


--
-- Name: clients_statut_client_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY clients
    ADD CONSTRAINT clients_statut_client_fkey FOREIGN KEY (statut_client) REFERENCES statutclients(idstatutclient);


--
-- Name: commentaires_post_par_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY commentaires
    ADD CONSTRAINT commentaires_post_par_fkey FOREIGN KEY (post_par) REFERENCES clients(idclient);


--
-- Name: commentaires_post_pour_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY commentaires
    ADD CONSTRAINT commentaires_post_pour_fkey FOREIGN KEY (post_pour) REFERENCES clients(idclient);


--
-- Name: depots_dom_depot_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY depots
    ADD CONSTRAINT depots_dom_depot_fkey FOREIGN KEY (dom_depot) REFERENCES domaines(iddomaine);


--
-- Name: locations_client_location_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY locations
    ADD CONSTRAINT locations_client_location_fkey FOREIGN KEY (client_location) REFERENCES clients(idclient);


--
-- Name: locations_velo_location_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY locations
    ADD CONSTRAINT locations_velo_location_fkey FOREIGN KEY (velo_location) REFERENCES velos(idvelo);


--
-- Name: stations_dom_station_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY stations
    ADD CONSTRAINT stations_dom_station_fkey FOREIGN KEY (dom_station) REFERENCES domaines(iddomaine);


--
-- Name: tarifs_dom_tarif_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY tarifs
    ADD CONSTRAINT tarifs_dom_tarif_fkey FOREIGN KEY (dom_tarif) REFERENCES domaines(iddomaine);


--
-- Name: transactions_client_transaction_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY transactions
    ADD CONSTRAINT transactions_client_transaction_fkey FOREIGN KEY (client_transaction) REFERENCES clients(idclient);


--
-- Name: transactions_dom_transaction_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY transactions
    ADD CONSTRAINT transactions_dom_transaction_fkey FOREIGN KEY (dom_transaction) REFERENCES domaines(iddomaine);


--
-- Name: transactions_location_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY transactions
    ADD CONSTRAINT transactions_location_fkey FOREIGN KEY (location) REFERENCES locations(idlocation);


--
-- Name: typevelos_tarif_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY typevelos
    ADD CONSTRAINT typevelos_tarif_fkey FOREIGN KEY (tarif) REFERENCES tarifs(idtarif);


--
-- Name: velos_station_velo_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY velos
    ADD CONSTRAINT velos_station_velo_fkey FOREIGN KEY (station_velo) REFERENCES stations(idstation);


--
-- Name: velos_statut_velo_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY velos
    ADD CONSTRAINT velos_statut_velo_fkey FOREIGN KEY (statut_velo) REFERENCES statutvelos(idstatutvelo);


--
-- Name: velos_type_velo_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY velos
    ADD CONSTRAINT velos_type_velo_fkey FOREIGN KEY (type_velo) REFERENCES typevelos(idtypevelo);


--
-- Name: villes_codepays_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY villes
    ADD CONSTRAINT villes_codepays_fkey FOREIGN KEY (codepays) REFERENCES pays(idpays);


--
-- Name: public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

