const mysql = require('mysql2/promise')
require('dotenv').config()

const config = {
    host: process.env.DB_HOST || 'localhost',
    port:process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'blog_api',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
};

const pool = mysql.createPool(config);

module.exports = pool