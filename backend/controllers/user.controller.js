const UserData = require("../models/user.model");

const postSubmit = async (req, res) => {
    try {

        const { name, ancestor, age } = req.body;
        const newUser = new UserData({ name, ancestor, age });
        const result = await newUser.save();
        res.json(result);
    }
    catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

const putSubmit = async (req, res) => {
    try {
        const body = req.body;
        const filter = { name: body.name };
        const response = await UserData.findOneAndReplace(filter, body);
        res.send(response);
    }
    catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

const deleteData = async (req, res) => {
    try {
        const body = req.body;
        const filter = { name: body.name };
        const response = await UserData.findOneAndDelete(filter, function (err, docs) {
            if (err) {
                console.log(err);
            }
            else {
                res.send("Deleted User", response);
            }
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}


module.exports = { postSubmit, putSubmit, deleteData };