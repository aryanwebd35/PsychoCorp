const express = require('express');
const router = express.Router();

const {createChat , findChat,userChats} = require("../Controllers/ChatController.js")


router.post("/",createChat)
router.get("/:userId",userChats)
router.get("/find/:firstId/:secondId",findChat)

module.exports = router;