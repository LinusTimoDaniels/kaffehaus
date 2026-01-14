-- Datenbank und Tabellen für Lieblings-Kaffeehäuser Projekt

CREATE DATABASE IF NOT EXISTS kaffehaus;
USE kaffehaus;

-- Tabelle: Kanton
CREATE TABLE IF NOT EXISTS Kanton (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    abk VARCHAR(2)
);

-- Tabelle: Gemeinde
CREATE TABLE IF NOT EXISTS Gemeinde (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    plz_bereich VARCHAR(50),
    kantonid_fk INT NOT NULL,
    FOREIGN KEY (kantonid_fk) REFERENCES Kanton(id) ON DELETE CASCADE
);

-- Tabelle: Kaffeehaus
CREATE TABLE IF NOT EXISTS Kaffeehaus (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    adresse VARCHAR(255) NOT NULL,
    getraenk VARCHAR(100),
    bewertung INT CHECK (bewertung >= 1 AND bewertung <= 5),
    kommentar TEXT,
    gemeindeid_fk INT NOT NULL,
    FOREIGN KEY (gemeindeid_fk) REFERENCES Gemeinde(id) ON DELETE CASCADE
);
