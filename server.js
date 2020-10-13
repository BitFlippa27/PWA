const concurrently = require("concurrently");
const express = require("express");
const app = express();
const connectDB = require("./config/db");
const Customers = require("./models/Customers");




app.get("/", (req, res) => res.send("Server läuft!"));

connectDB();

const PORT = process.env.PORT || 5555;
app.listen(PORT, () => console.log(`Server gestartet auf Port ${PORT}`));

//BodyParser Middleware um auf req.body zuzugreifen
app.use(express.json({ extended : false}));

app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/customers", require("./routes/api/customers"));
//Customers.update({}, { $unset: { "accounts": 1 }}, { multi: true });
 /*const deleteKey = async () =>  {
    try {
        await Customers.find({}, async (docs, err) => {
            if(err) {
                throw err;
            }
            docs.forEach(doc => console.log(doc.name));
        }); 
    } 
    catch(err){
        console.error(err);
    }

    
}
deleteKey();
*/






