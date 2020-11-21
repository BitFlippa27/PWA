const concurrently = require("concurrently");
const express = require("express");
const app = express();
const connectDB = require("./config/db");
const zips = require("./models/Zips");




app.get("/", (req, res) => res.send("Server läuft!"));

connectDB();

const PORT = process.env.PORT || 5555;
app.listen(PORT, () => console.log(`Server gestartet auf Port ${PORT}`));

//BodyParser Middleware um auf req.body zuzugreifen
app.use(express.json({ extended : false}));

app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/zips", require("./routes/api/zips"));
