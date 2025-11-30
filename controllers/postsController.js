const postsModel = require('../models/postsModel')
const authorsModel = require('../models/authorsModel')

async function listPosts(req, res) {
    try {
        const posts = await postsModel.getAllPostsWithAuthor();
        res.json(posts);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al recuperar posts' });
    }
}

async function getPost(req, res) {
    try {
        const post = await postsModel.getPostById(req.params.id);
        if (!post) return res.status(404).json({ error: 'Post no encontrado' });
        res.json(post);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al recuperar post' });
    }
}

async function createPost(req, res) {
    try {
        const { titulo, descripcion, categoria, autor_id } = req.body;
        if (!titulo || !descripcion || !autor_id) return res.status(400).json({ error: 'titulo, descripcion y autor_id son obligatorios' });

        const author = await authorsModel.getAuthorById(autor_id);
        if (!author) return res.status(400).json({ error: 'Autor no existe' });

        const newPost = await postsModel.createPost({ titulo, descripcion, categoria, autor_id });
        res.status(201).json(newPost);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al crear post' });
    }
}

module.exports = {
    listPosts,
    getPost,
    createPost
};