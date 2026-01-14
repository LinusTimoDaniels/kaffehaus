# ☕ Lieblings-Kaffeehäuser App

Eine einfache Node.js + Express + MySQL App, um deine Lieblingskaffeehäuser zu verwalten und zu bewerten.

---

## 📋 Inhaltsverzeichnis

1. [Projektübersicht](#projektübersicht)
2. [Datenbank-Schema (SQL)](#datenbank-schema-sql)
3. [Projektstruktur](#projektstruktur)
4. [API-Routen](#api-routen)
5. [Installation & Start](#installation--start)
6. [Beispiele](#beispiele)

---

## 🎯 Projektübersicht

Dieses Projekt speichert deine **Lieblingskaffeehäuser** mit:
- ✅ **Name, Adresse, Standort** (Gemeinde & Kanton)
- ✅ **Dein Lieblingsgetränk**
- ✅ **Bewertung** (1-5 Sterne)
- ✅ **Persönliche Kommentare**

Mit der API kannst du:
- 📝 Kaffeehäuser erstellen, lesen, ändern, löschen (CRUD)
- 🔗 Alle Kaffeehäuser mit Gemeinde & Kanton anzeigen (JOIN)
- 📊 Statistiken wie Durchschnittsbewertung pro Gemeinde (Aggregation)

---

## 🗄️ Datenbank-Schema (SQL)

### Tabellen-Struktur

```
┌─────────────────┐          ┌──────────────────┐
│     Kanton      │  1:n     │   Gemeinde       │
├─────────────────┤◄─────────┼──────────────────┤
│ id (PK)         │          │ id (PK)          │
│ name            │          │ name             │
│ abk (z.B. "ZH") │          │ plz_bereich      │
└─────────────────┘          │ kantonid_fk (FK) │
                             └──────────────────┘
                                     ▲
                                     │ 1:n
                                     │
                             ┌──────────────────┐
                             │   Kaffeehaus     │
                             ├──────────────────┤
                             │ id (PK)          │
                             │ name             │
                             │ adresse          │
                             │ getraenk         │
                             │ bewertung (1-5)  │
                             │ kommentar        │
                             │ gemeindeid_fk(FK)│
                             └──────────────────┘
```

### SQL Code

**1. Datenbank erstellen:**
```sql
CREATE DATABASE IF NOT EXISTS kaffehaus;
USE kaffehaus;
```

**2. Kanton-Tabelle** (z.B. Zürich, Bern):
```sql
CREATE TABLE Kanton (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,      -- z.B. "Zürich"
    abk VARCHAR(2)                   -- z.B. "ZH"
);
```

**3. Gemeinde-Tabelle** (z.B. Zürich-Stadt, Winterthur):
```sql
CREATE TABLE Gemeinde (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,              -- z.B. "Zürich"
    plz_bereich VARCHAR(50),                 -- z.B. "8000-8099"
    kantonid_fk INT NOT NULL,                -- Verknüpfung zu Kanton
    FOREIGN KEY (kantonid_fk) REFERENCES Kanton(id) ON DELETE CASCADE
);
```

**4. Kaffeehaus-Tabelle:**
```sql
CREATE TABLE Kaffeehaus (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,           -- z.B. "Café Zürichberg"
    adresse VARCHAR(255) NOT NULL,        -- z.B. "Zurichbergstr. 66"
    getraenk VARCHAR(100),                -- z.B. "Cappuccino"
    bewertung INT CHECK (bewertung >= 1 AND bewertung <= 5),  -- 1-5 Sterne
    kommentar TEXT,                       -- z.B. "Wunderbare Aussicht!"
    gemeindeid_fk INT NOT NULL,           -- Verknüpfung zu Gemeinde
    FOREIGN KEY (gemeindeid_fk) REFERENCES Gemeinde(id) ON DELETE CASCADE
);
```

### Was bedeuten diese Spalten?

| Begriff | Bedeutung |
|---------|-----------|
| **PK** (Primary Key) | Eindeutige ID für jede Zeile |
| **FK** (Foreign Key) | Verknüpfung zu einer anderen Tabelle |
| **AUTO_INCREMENT** | ID wird automatisch hochgezählt |
| **NOT NULL** | Feld muss immer einen Wert haben |
| **ON DELETE CASCADE** | Wenn Kanton gelöscht → alle Gemeinden + Kaffeehäuser gelöscht |

---

## 📁 Projektstruktur

```
Kaffehaeuser/
├── index.js                           # Haupt-Server
├── .env                               # Umgebungsvariablen (Passwort, DB-Info)
├── .gitignore                         # Dateien die nicht versioniert werden
├── package.json                       # Dependencies (npm Pakete)
│
├── config/
│   └── database.js                    # MySQL Pool (Datenbankverbindung)
│
├── routes/
│   ├── kaffeehaeuser.js              # CRUD-Routen für Kaffeehäuser
│   └── analytics.js                   # Statistik-Routen
│
├── controllers/
│   ├── kaffeehaus.controller.js      # CRUD-Logik
│   └── analytics.controller.js        # Aggregat-Logik
│
└── db/
    ├── DDL.sql                        # Datenbank erstellen (CREATE TABLE)
    ├── DML.sql                        # Beispieldaten einfügen (INSERT)
    └── DCL.sql                        # Benutzer & Rechte (CREATE USER)
```

### Wie arbeiten diese zusammen?

1. **index.js** → Startet Express Server auf Port 3000
2. **routes/** → Definiert API-Endpoints (z.B. `/api/kaffeehaeuser`)
3. **controllers/** → Enthält die Logik (SELECT, INSERT, UPDATE, DELETE)
4. **config/database.js** → Verbindung zu MySQL
5. **db/DDL.sql** → Erstellt die Tabellen

---

## 🔌 API-Routen

### CRUD - Kaffeehäuser verwalten

| Methode | Endpoint | Funktion |
|---------|----------|----------|
| **GET** | `/api/kaffeehaeuser` | Alle Kaffeehäuser auflisten |
| **GET** | `/api/kaffeehaeuser/:id` | Ein bestimmtes Kaffeehaus (nach ID) |
| **POST** | `/api/kaffeehaeuser` | Neues Kaffeehaus erstellen |
| **PUT** | `/api/kaffeehaeuser/:id` | Kaffeehaus bearbeiten |
| **DELETE** | `/api/kaffeehaeuser/:id` | Kaffeehaus löschen |

### JOIN - Mit verknüpften Daten

| Methode | Endpoint | Funktion |
|---------|----------|----------|
| **GET** | `/api/kaffeehaeuser/detail/all` | Alle Kaffeehäuser + **Gemeinde + Kanton Namen** |

### Aggregat - Statistiken

| Methode | Endpoint | Funktion |
|---------|----------|----------|
| **GET** | `/api/analytics/avg-bewertung-gemeinde` | Durchschnittliche Bewertung pro Gemeinde |
| **GET** | `/api/analytics/count-kanton` | Anzahl Kaffeehäuser pro Kanton |

---

## 🚀 Installation & Start

### Voraussetzungen
- **Node.js** installiert
- **MySQL** läuft (auf localhost:3306)

### Schritt 1: Setup
```bash
# Alle Dependencies installieren
npm install

# Datenbank vorbereiten (als MySQL User 'root'):
mysql -u root -p < db/DDL.sql
mysql -u root -p < db/DML.sql
mysql -u root -p < db/DCL.sql
```

### Schritt 2: Umgebungsvariablen (`.env`)
Stelle sicher, dass `.env` mit deinen Datenbank-Credentials existiert:
```
DB_HOST=localhost
DB_USER=kaffehaus_app
DB_PASSWORD=secure_password123!
DB_NAME=kaffehaus
PORT=3000
NODE_ENV=development
```

### Schritt 3: Server starten
```bash
node index.js
```

Server läuft dann auf: **http://localhost:3000**

---

## 📚 Beispiele

### 1️⃣ Alle Kaffeehäuser abrufen
```bash
curl http://localhost:3000/api/kaffeehaeuser
```

**Antwort:**
```json
[
  {
    "id": 1,
    "name": "Café Zürichberg",
    "adresse": "Zurichbergstr. 66, Zürich",
    "getraenk": "Cappuccino",
    "bewertung": 5,
    "kommentar": "Wunderbar mit Aussicht!",
    "gemeindeid_fk": 1
  }
]
```

### 2️⃣ Neues Kaffeehaus erstellen
```bash
curl -X POST http://localhost:3000/api/kaffeehaeuser \
  -H "Content-Type: application/json" \
  -d '{
    "name": "My Coffee Shop",
    "adresse": "Hauptstr. 10, Zürich",
    "getraenk": "Espresso",
    "bewertung": 4,
    "kommentar": "Gemütlich!",
    "gemeindeid_fk": 1
  }'
```

### 3️⃣ Alle Kaffeehäuser mit Gemeinde & Kanton
```bash
curl http://localhost:3000/api/kaffeehaeuser/detail/all
```

**Antwort:**
```json
[
  {
    "id": 1,
    "name": "Café Zürichberg",
    "adresse": "Zurichbergstr. 66, Zürich",
    "getraenk": "Cappuccino",
    "bewertung": 5,
    "kommentar": "Wunderbar mit Aussicht!",
    "gemeinde": "Zürich",          ← Gemeinde Name!
    "plz_bereich": "8000-8099",
    "kanton": "Zürich",            ← Kanton Name!
    "abk": "ZH"
  }
]
```

### 4️⃣ Durchschnittliche Bewertung pro Gemeinde
```bash
curl http://localhost:3000/api/analytics/avg-bewertung-gemeinde
```

**Antwort:**
```json
[
  {
    "gemeinde": "Zürich",
    "kanton": "Zürich",
    "durchschnitt_bewertung": 4.50,
    "anzahl_kaffeehaeuser": 2
  }
]
```

### 5️⃣ Anzahl Kaffeehäuser pro Kanton
```bash
curl http://localhost:3000/api/analytics/count-kanton
```

**Antwort:**
```json
[
  {
    "kanton": "Zürich",
    "abk": "ZH",
    "anzahl_kaffeehaeuser": 5,
    "durchschnitt_bewertung": 4.20
  }
]
```

---

## 🔒 Sicherheit

✅ **Passwörter in `.env`** - nicht im Code  
✅ **Prepared Statements** - schützt vor SQL-Injection  
✅ **`.gitignore`** - `.env` wird nicht in Git hochgeladen  
✅ **Benutzer mit Rechten** - `kaffehaus_app` hat nur CRUD-Rechte

---

## 🛠️ Technologie-Stack

- **Backend**: Node.js + Express.js
- **Datenbank**: MySQL
- **Driver**: mysql2/promise (Async)
- **Config**: dotenv (.env Variablen)

---

**Viel Spass mit der App! ☕✨**
