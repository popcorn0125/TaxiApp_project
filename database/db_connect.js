const db=require('mysql')

const conn = db.createConnection({
    host: 'localhost',
    port: 3307,
    user: 'taxi',
    password : '1234',
    database : 'taxi'
})

module.exports = conn
