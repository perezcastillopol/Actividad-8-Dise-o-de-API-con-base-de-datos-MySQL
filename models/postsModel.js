const pool = require('../config/db')

async function getAllPostsWithAuthor() {
    const sql = `
    SELECT p.id, p.titulo, p.descripcion, p.fecha_creacion, p.categoria,
           a.id AS autor_id, a.nombre AS autor_nombre, a.email AS autor_email, a.imagen AS autor_imagen
    FROM posts p
    JOIN autores a ON p.autor_id = a.id
    ORDER BY p.fecha_creacion DESC
  `;
    const [rows] = await pool.query(sql);
    return rows.map(r => ({
        id: r.id,
        titulo: r.titulo,
        descripcion: r.descripcion,
        fecha_creacion: r.fecha_creacion,
        categoria: r.categoria,
        autor: {
            id: r.autor_id,
            nombre: r.autor_nombre,
            email: r.autor_email,
            imagen: r.autor_imagen
        }
    }));
}

async function getPostById(id) {
    const sql = `
    SELECT p.id, p.titulo, p.descripcion, p.fecha_creacion, p.categoria,
           a.id AS autor_id, a.nombre AS autor_nombre, a.email AS autor_email, a.imagen AS autor_imagen
    FROM posts p
    JOIN autores a ON p.autor_id = a.id
    WHERE p.id = ?
  `;
    const [rows] = await pool.query(sql, [id]);
    if (rows.length === 0) return null;
    const r = rows[0];
    return {
        id: r.id,
        titulo: r.titulo,
        descripcion: r.descripcion,
        fecha_creacion: r.fecha_creacion,
        categoria: r.categoria,
        autor: {
            id: r.autor_id,
            nombre: r.autor_nombre,
            email: r.autor_email,
            imagen: r.autor_imagen
        }
    };
}

async function createPost({ titulo, descripcion, categoria, autor_id }) {
    const [result] = await pool.query(
        'INSERT INTO posts (titulo, descripcion, categoria, autor_id) VALUES (?, ?, ?, ?)',
        [titulo, descripcion, categoria || null, autor_id]
    );
    return getPostById(result.insertId);
}

async function getPostsByAuthorId(autorId) {
    const [rows] = await pool.query(
        'SELECT id, titulo, descripcion, fecha_creacion, categoria FROM posts WHERE autor_id = ? ORDER BY fecha_creacion DESC',
        [autorId]
    );
    return rows;
}

module.exports = {
    getAllPostsWithAuthor,
    getPostById,
    createPost,
    getPostsByAuthorId
};