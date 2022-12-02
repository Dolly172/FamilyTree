const mongoose = require("mongoose");

const userData = new mongoose.Schema({
    name: { type: String, unique: true },
    ancestor: { type: String, sparse: true },
    age: { type: String },
    children: [
        {
            name: { type: String, unique: true, sparse: true },
            ancestor: { type: String, sparse: true },
            age: { type: String, sparse: true },
        }
    ]
});

const userDataModel = mongoose.model("UserData", userData);

module.exports = userDataModel;