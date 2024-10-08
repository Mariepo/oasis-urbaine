const express = require("express");
const UsersController = require("../Controllers/UsersController");
const AuthenticateController = require('../Controllers/AuthenticateController');

const router = express.Router();

router.get("/", (request, result) => {UsersController.getAllUsers(request, result)});
router.get("/:id", AuthenticateController.authenticateToken, (request, result) => {UsersController.getUserById(request, result)});
router.post("/signup", (request, result) => {UsersController.addUser(request, result)});
router.post("/login", (request, result) => {UsersController.loginUser(request, result)});
router.patch("/:id", AuthenticateController.authenticateToken, (request, result) => {UsersController.updateUser(request, result)});
router.delete("/:id", AuthenticateController.authenticateToken, AuthenticateController.authenticateAdmin, (request, result) => {UsersController.deleteUser(request, result)});

module.exports = router;