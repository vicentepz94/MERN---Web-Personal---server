const express = require("express");
const MenuCoontroller = require("../controllers/menu");
const md_auth = require("../middlewares/authenticated");

const api = express.Router();

api.post("/menu", [md_auth.asureAuth], MenuCoontroller.createMenu);

module.exports = api;
