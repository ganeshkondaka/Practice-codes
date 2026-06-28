const mysql = require("mysql2/promise")
const dotenv = require("dotenv")

dotenv.config()

async function connectDB(){
    const db = await mysql.createConnection({
        host:process.env.localhost,
        user:process.env.user,
        password:process.env.password,
        database:process.env.database
    })
    console.log("db conncted succesfullyy👍👍")
    return db;
}

module.exports = connectDB;  