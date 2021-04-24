const express = require('express');
const router = express.Router();

const { login, register, deleteUser, modifyUser, checkIfUserValid, getAllUsers } = require("../Controllers/Authentication");

router.route("/login").post(login);

router.route("/register").post(register);

router.route("/delete").post(deleteUser);

router.route("/modify").post(modifyUser);

router.route("/validate").post(checkIfUserValid);

router.route("/getusers").post(getAllUsers);

module.exports = router;