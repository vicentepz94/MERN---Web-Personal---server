const Course = require("../models/course");
const image = require("../utils/image");

function createCourse(req, res) {
  const course = new Course(req.body);
  const imagePath = image.getFilePath(req.files.miniature);
  course.miniature = imagePath;

  course.save((error, courseStored) => {
    if (error) {
      res.status(400).send({ msg: "Error al crear el curso" });
    } else {
      res.status(200).send(courseStored);
    }
  });
}
function getCourse(req, res) {
  Course.find((error, courses) => {
    if (error) {
      res.status(400).send({ msg: "Error al obtener los cursos" });
    } else {
      res.status(200).send(courses);
    }
  });
}
module.exports = {
  createCourse,
  getCourse,
};
