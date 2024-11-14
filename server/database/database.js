const sqlite3 = require('sqlite3').verbose();

// Connect to db
const db = new sqlite3.Database('./test.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        return console.error(err.message);
    } else {
        console.log("Database connection successful");
    }
});

db.run(
    `CREATE TABLE IF NOT EXISTS users(id INTEGER PRIMARY KEY,first_name,last_name,password,email)`,
    (err) => {
        if (err) return console.error(err.message);
    }
);

module.exports = db;