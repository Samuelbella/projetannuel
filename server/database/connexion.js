const mongoose = require("mongoose");
require("dotenv").config();

const connect = async () => {
    try {
        mongoose.set("strictQuery", true);
        await mongoose.connect(process.env.ATLAS);
        console.log("connexion reussi");
    } catch (err) {
        console.log(err.message);
        process.exit(1);
    }
};

module.exports = connect;