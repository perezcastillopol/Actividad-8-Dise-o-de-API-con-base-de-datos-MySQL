const express = require('express')
const router = express.Router()
const authorsController = require('../controllers/authorsController')

router.get('/', authorsController.listAuthors)
router.get('/:id', authorsController.getAuthor);
router.get('/:id/posts', authorsController.getAuthorPosts);

router.post('/', authorsController.createAuthor);

module.exports = router