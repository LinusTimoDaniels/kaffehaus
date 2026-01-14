const pool = require("../config/database");

exports.getAll = async (req, res) => {
    try {
        const conn = await pool.getConnection();
        const [rows] = await conn.query('SELECT * FROM Kaffeehaus');
        conn.release();
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: 'Datenbankfehler', details: err.message });
    }
};

exports.getById = async (req, res) => {
    const id = req.params.id;
    
    // Validierung: ID muss eine Zahl sein
    if (!id || isNaN(id)) {
        return res.status(400).json({ error: 'Ungültige Kaffeehaus-ID' });
    }
    
    try {
        const conn = await pool.getConnection();
        const [rows] = await conn.query('SELECT * FROM Kaffeehaus WHERE id = ?', [id]);
        conn.release();
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Kaffeehaus nicht gefunden' });
        }
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: 'Datenbankfehler', details: err.message });
    }
};

exports.create = async (req, res) => {
    const { name, adresse, getraenk, bewertung, kommentar, gemeindeid_fk } = req.body;
    
    // Validierung: Pflichtfelder
    if (!name || !adresse || !gemeindeid_fk) {
        return res.status(400).json({ 
            error: 'Pflichtfelder fehlen', 
            required: ['name', 'adresse', 'gemeindeid_fk']
        });
    }
    
    // Validierung: Bewertung zwischen 1-5
    if (bewertung && (bewertung < 1 || bewertung > 5)) {
        return res.status(400).json({ 
            error: 'Bewertung muss zwischen 1 und 5 liegen' 
        });
    }
    
    try {
        const conn = await pool.getConnection();
        
        // Überprüfe, ob Gemeinde existiert
        const [gemeinde] = await conn.query('SELECT id FROM Gemeinde WHERE id = ?', [gemeindeid_fk]);
        if (gemeinde.length === 0) {
            conn.release();
            return res.status(404).json({ error: 'Gemeinde nicht gefunden' });
        }
        
        const [result] = await conn.query(
            'INSERT INTO Kaffeehaus (name, adresse, getraenk, bewertung, kommentar, gemeindeid_fk) VALUES (?, ?, ?, ?, ?, ?)',
            [name, adresse, getraenk, bewertung, kommentar, gemeindeid_fk]
        );
        conn.release();
        res.status(201).json({ id: result.insertId, message: 'Kaffeehaus erstellt' });
    } catch (err) {
        res.status(500).json({ error: 'Datenbankfehler', details: err.message });
    }
};

exports.update = async (req, res) => {
    const { name, adresse, getraenk, bewertung, kommentar, gemeindeid_fk } = req.body;
    const id = req.params.id;
    
    // Validierung: ID muss eine Zahl sein
    if (!id || isNaN(id)) {
        return res.status(400).json({ error: 'Ungültige Kaffeehaus-ID' });
    }
    
    // Validierung: Mindestens ein Feld muss vorhanden sein
    if (!name && !adresse && !getraenk && !bewertung && !kommentar && !gemeindeid_fk) {
        return res.status(400).json({ 
            error: 'Mindestens ein Feld zum Aktualisieren erforderlich' 
        });
    }
    
    // Validierung: Bewertung zwischen 1-5
    if (bewertung && (bewertung < 1 || bewertung > 5)) {
        return res.status(400).json({ 
            error: 'Bewertung muss zwischen 1 und 5 liegen' 
        });
    }
    
    try {
        const conn = await pool.getConnection();
        
        // Überprüfe, ob Kaffeehaus existiert
        const [kaffeehaus] = await conn.query('SELECT id FROM Kaffeehaus WHERE id = ?', [id]);
        if (kaffeehaus.length === 0) {
            conn.release();
            return res.status(404).json({ error: 'Kaffeehaus nicht gefunden' });
        }
        
        // Überprüfe, ob Gemeinde existiert (falls angegeben)
        if (gemeindeid_fk) {
            const [gemeinde] = await conn.query('SELECT id FROM Gemeinde WHERE id = ?', [gemeindeid_fk]);
            if (gemeinde.length === 0) {
                conn.release();
                return res.status(404).json({ error: 'Gemeinde nicht gefunden' });
            }
        }
        
        await conn.query(
            'UPDATE Kaffeehaus SET name = ?, adresse = ?, getraenk = ?, bewertung = ?, kommentar = ?, gemeindeid_fk = ? WHERE id = ?',
            [name, adresse, getraenk, bewertung, kommentar, gemeindeid_fk, id]
        );
        conn.release();
        res.json({ message: 'Kaffeehaus aktualisiert' });
    } catch (err) {
        res.status(500).json({ error: 'Datenbankfehler', details: err.message });
    }
};

exports.delete = async (req, res) => {
    const id = req.params.id;
    
    // Validierung: ID muss eine Zahl sein
    if (!id || isNaN(id)) {
        return res.status(400).json({ error: 'Ungültige Kaffeehaus-ID' });
    }
    
    try {
        const conn = await pool.getConnection();
        
        // Überprüfe, ob Kaffeehaus existiert
        const [kaffeehaus] = await conn.query('SELECT id FROM Kaffeehaus WHERE id = ?', [id]);
        if (kaffeehaus.length === 0) {
            conn.release();
            return res.status(404).json({ error: 'Kaffeehaus nicht gefunden' });
        }
        
        await conn.query('DELETE FROM Kaffeehaus WHERE id = ?', [id]);
        conn.release();
        res.json({ message: 'Kaffeehaus gelöscht' });
    } catch (err) {
        res.status(500).json({ error: 'Datenbankfehler', details: err.message });
    }
};

exports.getAllDetail = async (req, res) => {
    try {
        const conn = await pool.getConnection();
        const [rows] = await conn.query(`
            SELECT 
                k.id,
                k.name,
                k.adresse,
                k.getraenk,
                k.bewertung,
                k.kommentar,
                g.name AS gemeinde,
                g.plz_bereich,
                ka.name AS kanton,
                ka.abk
            FROM Kaffeehaus k
            JOIN Gemeinde g ON k.gemeindeid_fk = g.id
            JOIN Kanton ka ON g.kantonid_fk = ka.id
            ORDER BY ka.name, g.name, k.name
        `);
        conn.release();
        
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Keine Kaffeehäuser vorhanden' });
        }
        
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: 'Datenbankfehler', details: err.message });
    }
};
