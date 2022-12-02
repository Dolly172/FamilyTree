const router = require("express").Router();
const { postSubmit, putSubmit, deleteData } = require("../controllers/user.controller");

router.post("/submit", postSubmit);
router.put("/submit", putSubmit);
router.delete("/submit", deleteData)

module.exports = router;