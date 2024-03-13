const express = require("express");
const app = express();
const connect = require("./database/connexion");
const cors = require("cors");

//middlewearesx 
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));

//Router
const DigitsR = require("./routes/DigitsRoute.js");
const ImagesR = require("./routes/ImagesRoute.js");

//connection database
connect();

//Utilisation des routes
app.use("/apiDigit", DigitsR);
app.use("/apiImage", DigitsR);

//lancement du server

app.listen(8000, () => {
    console.log("Serveur ouvert port 8000");
});
