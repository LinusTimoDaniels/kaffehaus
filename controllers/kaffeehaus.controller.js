const pool = require("../config/database");

exports.getAll = async (req, res) => {
    try {
        const conn = await pool.getConnection();
        const [rows] = await conn.query('SELECT * FROM Kaffeehaus');
        conn.release();
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getById = async (req, res) => {
    try {
        const conn = await pool.getConnection();
        const [rows] = await conn.query('SELECT * FROM Kaffeehaus WHERE id = ?', [req.params.id]);
        conn.release();
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Kaffeehaus not found' });
        }
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.create = async (req, res) => {
    const { name, adresse, getraenk, bewertung, kommentar, gemeindeid_fk } = req.body;
    try {
        const conn = await pool.getConnection();
        const [result] = await conn.query(
            'INSERT INTO Kaffeehaus (name, adresse, getraenk, bewertung, kommentar, gemeindeid_fk) VALUES (?, ?, ?, ?, ?, ?)',
            [name, adresse, getraenk, bewertung, kommentar, gemeindeid_fk]
        );
        conn.release();
        res.status(201).json({ id: result.insertId, message: 'Kaffeehaus created' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.update = async (req, res) => {
    const { name, adresse, getraenk, bewertung, kommentar, gemeindeid_fk } = req.body;
    try {
        const conn = await pool.getConnection();
        await conn.query(
            'UPDATE Kaffeehaus SET name = ?, adresse = ?, getraenk = ?, bewertung = ?, kommentar = ?, gemeindeid_fk = ? WHERE id = ?',
            [name, adresse, getraenk, bewertung, kommentar, gemeindeid_fk, req.params.id]
        );
        conn.release();
        res.json({ message: 'Kaffeehaus updated' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.delete = async (req, res) => {
    try {
        const conn = await pool.getConnection();
        await conn.query('DELETE FROM Kaffeehaus WHERE id = ?', [req.params.id]);
        conn.release();
        res.json({ message: 'Kaffeehaus deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
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
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
