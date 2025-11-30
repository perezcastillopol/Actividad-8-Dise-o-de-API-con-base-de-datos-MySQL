const pool = require('../config/db')

async function getAllAuthors() {
    const [rows] = await pool.query('SELECT * FROM autores');
    return rows;
}

async function getAuthorById(id) {
    const [rows] = await pool.query('SELECT * FROM autores WHERE id = ?', [id]);
    return rows[0] || null;
}

async function createAuthor({ nombre, email, imagen }) {
    const [result] = await pool.query(
        'INSERT INTO autores (nombre, email, imagen) VALUES (?, ?, ?)',
        [nombre, email, imagen || null]
    );
    const [rows] = await pool.query('SELECT * FROM autores WHERE id = ?', [result.insertId]);
    return rows[0];
}

module.exports = {
    getAllAuthors,
    getAuthorById,
    createAuthor
}