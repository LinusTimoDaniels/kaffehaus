const pool = require("../config/database");

exports.avgBewertungGemeinde = async (req, res) => {
    try {
        const conn = await pool.getConnection();
        const [rows] = await conn.query(`
            SELECT 
                g.name AS gemeinde,
                ka.name AS kanton,
                ROUND(AVG(k.bewertung), 2) AS durchschnitt_bewertung,
                COUNT(k.id) AS anzahl_kaffeehaeuser
            FROM Kaffeehaus k
            JOIN Gemeinde g ON k.gemeindeid_fk = g.id
            JOIN Kanton ka ON g.kantonid_fk = ka.id
            GROUP BY g.id, g.name, ka.id, ka.name
            ORDER BY ka.name, g.name
        `);
        conn.release();
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.countKanton = async (req, res) => {
    try {
        const conn = await pool.getConnection();
        const [rows] = await conn.query(`
            SELECT 
                ka.name AS kanton,
                ka.abk,
                COUNT(k.id) AS anzahl_kaffeehaeuser,
                ROUND(AVG(k.bewertung), 2) AS durchschnitt_bewertung
            FROM Kaffeehaus k
            JOIN Gemeinde g ON k.gemeindeid_fk = g.id
            JOIN Kanton ka ON g.kantonid_fk = ka.id
            GROUP BY ka.id, ka.name, ka.abk
            ORDER BY anzahl_kaffeehaeuser DESC
        `);
        conn.release();
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
