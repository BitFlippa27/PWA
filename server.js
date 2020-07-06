const express = require("express");
const app = express();
const connectDB = require("./config/db");


connectDB();
app.get("/", (req, res) => res.send("Server läuft!"));
const PORT = process.env.PORT || 5555;
app.listen(PORT, () => console.log(`Server gestartet auf Port ${PORT}`));
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/posts", require("./routes/api/posts"));

//BodyParser Middleware um auf req.body zuzugreifen
app.use(express.json({ extended : false}));
