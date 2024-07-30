const express = require("express");
const UsersController = require("../Controllers/UsersController");

const router = express.Router();

router.get("/", (request, result) => {UsersController.getAllUser(request, result)});
router.get("/:id", (request, result) => {UsersController.getUserById(request, result)});
router.post("/signup", (request, result) => {UsersController.addUser(request, result)});
router.post("/login", (request, result) => {UsersController.loginUser(request, result)});
router.patch("/:id", (request, result) => {UsersController.updateUser(request, result)});
router.delete("/:id", (request, result) => {UsersController.deleteUser(request, result)});

module.exports = router;