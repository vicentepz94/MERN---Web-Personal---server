const express = require("express");
const UserController = require("../controllers/user");
// Middleware de autenticacion
const md_auth = require("../middlewares/authenticated");

const api = express.Router();
// se implementa middleware para autenticar usuario (puede haber middleware para lo que se quiera)

api.get("/user/me", [md_auth.asureAuth], UserController.getMe);
api.get("/users", [md_auth.asureAuth], UserController.getUsers);

module.exports = api;
