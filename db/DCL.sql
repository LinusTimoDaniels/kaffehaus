-- Data Control Language (DCL) - Benutzer und Rechte für Kaffeehäuser-Datenbank

-- Benutzer erstellen
CREATE USER IF NOT EXISTS 'kaffehaus_app'@'localhost' IDENTIFIED BY 'secure_password123!';

-- Rechte für den Benutzer gewähren
-- SELECT, INSERT, UPDATE, DELETE für alle Tabellen in der kaffehaus Datenbank
GRANT SELECT, INSERT, UPDATE, DELETE ON kaffehaus.* TO 'kaffehaus_app'@'localhost';

-- Rechte anwenden
FLUSH PRIVILEGES;

-- Benutzer und Rechte überprüfen
SHOW GRANTS FOR 'kaffehaus_app'@'localhost';

