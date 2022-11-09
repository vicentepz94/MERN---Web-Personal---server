const express = require("express");
const UserController = require("../controllers/user");
// Middleware de autenticacion
const md_auth = require("../middlewares/authenticated");
// Middleware de Multyparty
const multiparty = require("connect-multiparty");
// OJO con la ruta, debe ser solo un punto en "./"
const md_upload = multiparty({ uploadDir: "./uploads/avatar" });
const api = express.Router();

// se implementa middleware '[md_auth.asureAuth]' para autenticar usuario (puede haber middleware para lo que se quiera)
api.get("/user/me", [md_auth.asureAuth], UserController.getMe);
api.get("/users", [md_auth.asureAuth], UserController.getUsers);
// como se envian datos por el body, la peticion es de tipo post
api.post("/user", [md_auth.asureAuth, md_upload], UserController.createUser);

module.exports = api;
