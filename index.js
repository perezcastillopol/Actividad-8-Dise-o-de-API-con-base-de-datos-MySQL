require('dotenv').config()
const express = require('express')
const app = express()

app.use(express.json())

const apiRouter = require('./routes/api')
app.use('/api', apiRouter)

app.use((req, res, next) => {
    res.status(404).json({
        error: 'Ruta no encontrada',
        path: req.originalUrl
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on ${PORT}!`))