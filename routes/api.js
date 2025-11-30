const express = require('express')
const router = express.Router()

const authorsRouter = require('./authors')
const postsRouter = require('./posts')

router.use('/authors', authorsRouter)
router.use('/posts', postsRouter)

module.exports = router