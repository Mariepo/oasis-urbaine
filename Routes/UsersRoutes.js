const express = require("express");
const UsersController = require("../Controllers/UsersController");

const router = express.Router();

router.get("/", (request, result) => {UsersController.getAllUser(request, result)});

module.exports = router;