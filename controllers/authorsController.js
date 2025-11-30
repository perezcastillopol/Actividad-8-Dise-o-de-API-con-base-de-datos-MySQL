const authorsModel = require('../models/authorsModel');
const postsModel = require('../models/postsModel');

async function listAuthors(req, res) {
    try {
        const authors = await authorsModel.getAllAuthors()
        res.json(authors)
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Error al recuperar los autores'})
    }
}

async function getAuthor(req, res) {
    try {
        const author = await authorsModel.getAuthorById(req.params.id);
        if (!author) return res.status(404).json({ error: 'Autor no encontrado' });
        res.json(author);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al recuperar el autor' });
    }
}

async function createAuthor(req, res) {
    try {
        const { nombre, email, imagen } = req.body;
        if (!nombre || !email) return res.status(400).json({ error: 'nombre y email son obligatorios' });

        const newAuthor = await authorsModel.createAuthor({ nombre, email, imagen });
        res.status(201).json(newAuthor);
    } catch (err) {
        console.error(err);
        if (err.code === 'ER_DUP_ENTRY') return res.status(400).json({ error: 'Email ya registrado' });
        res.status(500).json({ error: 'Error al crear el autor' });
    }
}

async function getAuthorPosts(req, res) {
    try {
        const authorId = req.params.id;
        const author = await authorsModel.getAuthorById(authorId);
        if (!author) return res.status(404).json({ error: 'Autor no encontrado' });

        const posts = await postsModel.getPostsByAuthorId(authorId);
        res.json({ autor: author, posts });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al recuperar posts del autor' });
    }
}

module.exports = {
    listAuthors,
    getAuthor,
    createAuthor,
    getAuthorPosts
}