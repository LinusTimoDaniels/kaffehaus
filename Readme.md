und das isch euses thema

Projekt D – Lieblings-Kaffeehäuser im Kanton
Ausgangslage
Sie sind gerne in Cafés unterwegs (z.B. im Kanton Zürich oder Ihrem Heimatkanton) und möchten Ihre Lieblingsorte mit Notizen und Bewertungen speichern. Online-Karten zeigen zwar Standorte, aber nicht Ihre persönliche Meinung.

Vorgehen
Modellieren Sie mindestens folgende Entitäten
Kaffeehaus (Name, Adresse, Gemeinde, Lieblingsgetränk, eigene Sterne-Bewertung, Kommentar)
Ort Gemeinde Kanton (Name, ggf. PLZ-Bereich)
Beziehung 1n (eine Gemeindeein Kantonein Stadtkreis – viele Kaffeehäuser).


Legen Sie Daten mit mehreren Kaffeehäusern in verschiedenen GemeindenKantonenStadtkreisen an.

Implementieren Sie CRUD-Routen für Kaffeehäuser (z.B. apikaffeehaeuser).
Implementieren Sie
eine JOIN-Route (z.B. „Alle Kaffeehäuser inkl. Gemeindename und Kanton anzeigen“)
eine Aggregat-Route (z.B. „Durchschnittliche Bewertung pro Gemeinde“, „Anzahl Kaffeehäuser pro Kanton“)