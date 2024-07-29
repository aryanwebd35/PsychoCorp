const express = require('express');
const router = express.Router();

const {addmessage , getmessage}=require("../Controllers/messagecontroller")

router.post("/",addmessage)
router.get("/:chatId",getmessage)

module.exports = router;
