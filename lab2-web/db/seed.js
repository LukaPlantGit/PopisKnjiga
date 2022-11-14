const {Pool} = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'PopisKnjiga2',
    password: 'bazepodataka',
    port: 5432,
});

const sql_create_autor = `DROP TABLE IF EXISTS autor;
    CREATE TABLE autor (
    nazivautora character varying NOT NULL
)`;

const sql_create_knjiga = `DROP TABLE IF EXISTS knjiga;
    CREATE TABLE knjiga (
    nazivknjige character varying NOT NULL,
    sifraknjige integer NOT NULL,
    brojpreostalihprimjeraka integer NOT NULL,
    brojstranica integer NOT NULL,
    uvez character varying NOT NULL,
    posudjenaod date NOT NULL,
    posudjenado date NOT NULL,
    bestseler character varying NOT NULL,
    vrstadjela character varying NOT NULL,
    nazivautora character varying NOT NULL,
    nazivizdavackekuce character varying NOT NULL
)`;

const sql_create_lik = `DROP TABLE IF EXISTS lik;
    CREATE TABLE public.lik (
    imelika character varying NOT NULL,
    prezimelika character varying NOT NULL
)`;

const sql_create_izdavackakuca = `DROP TABLE IF EXISTS izdavackakuca;
    CREATE TABLE public.izdavackakuca (
    nazivizdavackekuce character varying NOT NULL
)`;

const sql_create_sadrzi = `DROP TABLE IF EXISTS sadrzi;
    CREATE TABLE public.sadrzi (
    sifraknjige integer NOT NULL,
    imelika character varying NOT NULL
)`;

const sql_insert_autor = `INSERT INTO autor (nazivautora) VALUES ('Fjodor Mihajlovič Dostojevski'), ('August Šenoa'), 
    ('Mark Twain'), ('Mato Lovrak'), ('Douglas Adams'), ('J. R. Ward'), ('Ivana Brlić-Mažuranić'), 
    ('Gustave Flaubert'), ('Miroslav Krleža'), ('Apostolos K. Doxiades'), ('Nora Roberts'), ('Albert Camus');
`;

const sql_insert_knjiga = `INSERT INTO knjiga (nazivknjige, sifraknjige, brojpreostalihprimjeraka, brojstranica, uvez, posudjenaod, posudjenado, bestseler, vrstadjela, nazivautora, nazivizdavackekuce) VALUES 
    ('Zločin i kazna', 1426, 37, 828, 'meki', '2022-10-21', '2022-11-11', 'da', 'roman', 'Fjodor Mihajlovič Dostojevski', 'Školska knjiga'),
    ('Zlatarovo zlato', 2522, 28, 475, 'tvrdi', '2022-10-20', '2022-11-10', 'ne', 'roman', 'August Šenoa', 'Školska knjiga'),
    ('Pustolovine Toma Sawyera', 9834, 18, 432, 'tvrdi', '2022-10-18', '2022-11-08', 'da', 'roman', 'Mark Twain', 'Školska knjiga'),
    ('Pustolovine Huckleberryja Finna', 4325, 19, 398, 'tvrdi', '2022-10-18', '2022-11-08', 'da', 'roman', 'Mark Twain', 'Znanje'),
    ('Družba Pere Kvržice', 2908, 23, 136, 'meki', '2022-10-26', '2022-11-16', 'da', 'roman', 'Mato Lovrak', 'Mozaik knjiga'),
    ('Vodič kroz galaksiju za autostopere', 7006, 7, 200, 'meki', '2022-10-25', '2022-11-15', 'ne', 'roman', 'Douglas Adams', 'Školska knjiga'),
    ('Bratstvo crnog bodeža - Kraljica tame', 2376, 3, 248, 'meki', '2022-10-27', '2022-11-17', 'da', 'roman', 'J. R. Ward', 'Znanje'),
    ('Bratstvo crnog bodeža - Noćni lov', 2097, 2, 256, 'meki', '2022-10-26', '2022-11-16', 'da', 'roman', 'J. R. Ward', 'Znanje'),
    ('Čudnovate zgode šegrta Hlapića', 1372, 21, 168, 'tvrdi', '2022-10-13', '2022-11-03', 'da', 'roman', 'Ivana Brlić-Mažuranić', 'Školska knjiga'),
    ('Gospođa Bovary', 9650, 17, 362, 'meki', '2022-10-19', '2022-11-09', 'ne', 'roman', 'Gustave Flaubert', 'Mozaik knjiga'),
    ('Povratak Filipa Latinovicza', 1327, 13, 257, 'meki', '2022-10-17', '2011-11-07', 'ne', 'roman', 'Miroslav Krleža', 'Večernji list'),
    ('Stric Petros i Goldbachova slutnja', 6125, 5, 205, 'meki', '2022-10-13', '2022-11-03', 'ne', 'roman', 'Apostolos K. Doxiades', 'Školska knjiga'),
    ('Sjeta u zaljevu Chesapeake', 9356, 4, 257, 'meki', '2022-10-21', '2022-11-11', 'da', 'roman', 'Nora Roberts', 'Znanje'),
    ('Stranac', 8264, 16, 128, 'tvrdi', '2022-10-28', '2011-11-18', 'ne', 'roman', 'Albert Camus', 'Znanje');
`;

const sql_insert_izdavackakuca = `INSERT INTO izdavackakuca (nazivizdavackekuce) VALUES ('Školska knjiga'),
    ('Znanje'), ('Mozaik knjiga'), ('Večernji list');
`;

const sql_insert_lik = `INSERT INTO lik (imelika, prezimelika) VALUES 
('Rodion', 'Romanovič Raskoljnikov'), ('Svidrigajlov', ''), ('Sonja', 'Marmeladova'), ('Razumihin', ''), ('Petar', 'Krupić'),
('Dora', 'Krupićeva'), ('Stjepko', 'Gregorijanec'), ('Pavao', 'Gregorijanec'), ('Grga', 'Čokolin'), ('Tom', 'Sawyer'), ('Huckleberry', 'Finn'),
('Becky', 'Thatcher'), ('Tetka', 'Polly'), ('Jim', ''), ('Huckov', 'Otac'), ('Pero', 'Kvržica'), ('Šilo', ''), ('Medo', ''), 
('Divljak', ''), ('Milo', 'Dijete'), ('Arthur', 'Dent'), ('Marvin', ''), ('Ford', 'Prefect'), ('Zaphod', 'Beeblebrox'), ('Trillian', ''), 
('Wrath', ''), ('Tohrment', ''), ('Darius', ''), ('Beth', ''), ('Phury', ''), ('Zsadist', ''), ('Rhage', ''), ('Vishous', ''),
('Hlapić', ''), ('Majstor', 'Mrkonja'), ('Majstorica', ''), ('Gita', ''), ('Crni', 'Štakor'), ('Emma', 'Bovary'), ('Charles', 'Bovary'),
('Ljekarnik', 'Homais'), ('Leopold', 'Dupuis'), ('Filip', 'Latinovicz'), ('Kanonik', 'Lovro'), ('Filipova', 'Majka'), ('Baločanski', ''),
('Bobočka', ''), ('Kyriales', ''), ('Petros', 'Papachristos'), ('Petrosov', 'Nećak'), ('Sammy', ''), ('Cameron', 'Quinn'), ('Phillip', 'Quinn'),
('Ethan', 'Quinn'), ('Seth', 'Quinn'), ('Drusilla', ''), ('Mersault', ''), ('Marie', ''), ('Salaman', ''), ('Raymond', ''), ('Masson', '');
`;

const sql_insert_sadrzi = `INSERT INTO sadrzi (sifraknjige, imelika) VALUES 
(1426, 'Rodion'), (1426, 'Svidrigajlov'), (1426, 'Sonja'), (1426, 'Razumihin'), (2522, 'Petar'), (2522, 'Dora'), (2522, 'Stjepko'),
(2522, 'Pavao'), (2522, 'Grga'), (9834, 'Tom'), (4325, 'Tom'), (4325, 'Huckleberry'), (9834, 'Huckleberry'), (9834, 'Becky'), (9834, 'Tetka'),
(4325, 'Tetka'), (4325, 'Jim'), (4325, 'Huckov'), (2908, 'Pero'), (2908, 'Šilo'), (2908, 'Medo'), (2908, 'Divljak'), (2908, 'Milo'),
(7006, 'Arthur'), (7006, 'Ford'), (7006, 'Zaphod'), (7006, 'Marvin'), (7006, 'Trillian'), (2376, 'Wrath'), (2376, 'Tohrment'), (2376, 'Beth'),
(2376, 'Phury'), (2376, 'Zsadist'), (2376, 'Rhage'), (2376, 'Vishous'), (2097, 'Darius'), (2097, 'Tohrment'), (2097, 'Wrath'), (2097, 'Beth'),
(1372, 'Hlapić'), (1372, 'Gita'), (1372, 'Majstor'), (1372, 'Majstorica'), (1372, 'Crni'), (9650, 'Emma'), (9650, 'Charles'),
(9650, 'Ljekarnik'), (9650, 'Leopold'), (1327, 'Filip'), (1327, 'Filipova'), (1327, 'Kanonik'), (1327, 'Baločanski'), (1327, 'Bobočka'),
(1327, 'Kyriales'), (6125, 'Petros'), (6125, 'Petrosov'), (6125, 'Sammy'), (9356, 'Cameron'), (9356, 'Phillip'), (9356, 'Ethan'), 
(9356, 'Seth'), (9356, 'Drusilla'), (8264, 'Mersault'), (8264, 'Marie'), (8264, 'Salaman'), (8264, 'Raymond'), (8264, 'Masson');
`;

pool.query(sql_create_autor, [], (err, result) => {
    if (err) {
        return console.error(err.message);
    }
    console.log("Successful creation of the 'autor' table");
    pool.query(sql_insert_autor, [], (err, result) => {
        if (err) {
            return console.error(err.message);
        }
    });
});

pool.query(sql_create_knjiga, [], (err, result) => {
    if (err) {
        return console.error(err.message);
    }
    console.log("Successful creation of the 'knjiga' table");
    pool.query(sql_insert_knjiga, [], (err, result) => {
        if (err) {
            return console.error(err.message);
        }
    });
});

pool.query(sql_create_izdavackakuca, [], (err, result) => {
    if (err) {
        return console.error(err.message);
    }
    console.log("Successful creation of the 'izdavackakuca' table");
    pool.query(sql_insert_izdavackakuca, [], (err, result) => {
        if (err) {
            return console.error(err.message);
        }
    });
});

pool.query(sql_create_lik, [], (err, result) => {
    if (err) {
        return console.error(err.message);
    }
    console.log("Successful creation of the 'lik' table");
    pool.query(sql_insert_lik, [], (err, result) => {
        if (err) {
            return console.error(err.message);
        }
    });
});

pool.query(sql_create_sadrzi, [], (err, result) => {
    if (err) {
        return console.error(err.message);
    }
    console.log("Successful creation of the 'sadrzi' table");
    pool.query(sql_insert_sadrzi, [], (err, result) => {
        if (err) {
            return console.error(err.message);
        }
    });
});

