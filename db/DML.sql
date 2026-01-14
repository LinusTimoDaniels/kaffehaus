-- Beispieldaten für Kaffeehäuser Projekt

USE kaffehaus;

-- Einfügen von Kantonen
INSERT INTO Kanton (name, abk) VALUES
('Zürich', 'ZH'),
('Bern', 'BE'),
('Aargau', 'AG');

-- Einfügen von Gemeinden
INSERT INTO Gemeinde (name, plz_bereich, kantonid_fk) VALUES
('Zürich', '8000-8099', 1),
('Winterthur', '8400-8410', 1),
('Aarau', '5000-5010', 3);

-- Einfügen von Kaffeehäusern
INSERT INTO Kaffeehaus (name, adresse, getraenk, bewertung, kommentar, gemeindeid_fk) VALUES
('Café Zürichberg', 'Zurichbergstr. 66, Zürich', 'Cappuccino', 5, 'Wunderbar mit Aussicht!', 1),
('Starbucks Downtown', 'Bahnhofstr. 10, Zürich', 'Latte Macchiato', 3, 'Günstig gelegen aber laut', 1),
('Café Central', 'Hauptstr. 45, Winterthur', 'Espresso', 4, 'Gemütlich, gutes Personal', 2),
('Kaffeerösterei Berg', 'Schulhausstr. 12, Aarau', 'Filterkaffee', 5, 'Beste Bohnen in der Region!', 3),
('Morning Glory', 'Marktpl. 8, Aarau', 'Cappuccino', 4, 'Frische Pasteteien', 3);
