const express = require('express');
const db = require('./database/database');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Server Listening on PORT:", PORT);
  });


app.get("/status", (request, response) => {
    const status = {
        "status" : "Running",
    };

    response.send(status);
    console.log("GET /status request");
});

app.post("/user", (request, response) => {
    const { first_name, last_name, password, email } = request.body;
    const sql = `INSERT INTO users (first_name, last_name, password, email) VALUES (?, ?, ?, ?)`;
    db.run(sql, [first_name, last_name, password, email], (err) => {
        if (err) {
            response.status(400).json({ error: err.message });
            console.log("POST /users request failed");
            return;
        }
        response.json({
            "status" : "Success",
            data : {first_name, last_name, email}
        });
    });
});
