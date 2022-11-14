const express = require("express");
const CourseController = require("../controllers/course");
// Middleware de Multyparty
const multiparty = require("connect-multiparty");
// Middleware de autenticacion
const md_auth = require("../middlewares/authenticated");
// OJO con la ruta, debe ser solo un punto en "./"
const md_upload = multiparty({ uploadDir: "./uploads/course" });
const api = express.Router();

api.post(
  "/course",
  [md_auth.asureAuth, md_upload],
  CourseController.createCourse
);
api.get("/course", CourseController.getCourse);

module.exports = api;
