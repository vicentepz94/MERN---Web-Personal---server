const express = require("express");
const AuthController = require("../controllers/auth");

const api = express.Router();

// Solo se coloca la ruta en Insomnia para probar los Endpoints
api.post("/auth/register", AuthController.register);

module.exports = api;
