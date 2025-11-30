const express = require('express')
const router = express.Router()
const postsController = require('../controllers/postsController')

router.get('/', postsController.listPosts);
router.get('/:id', postsController.getPost);

router.post('/', postsController.createPost);

module.exports = router