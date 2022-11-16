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
  const { page = 1, limit = 10 } = req.query;
  const options = {
    page: parseInt(page),
    limit: parseInt(limit),
  };

  Course.paginate({}, options, (error, courses) => {
    if (error) {
      res.status(400).send({ msg: "Error al obtener los cursos" });
    } else {
      res.status(200).send(courses);
    }
  });
}

function updateCourse(req, res) {
  const { id } = req.params;
  const courseData = req.body;

  if (req.files.miniature) {
    const imagePath = image.getFilePath(req.files.miniature);
    courseData = imagePath;
  }

  Course.findByIdAndUpdate({ _id: id }, courseData, (error) => {
    if (error) {
      res.status(400).send({ msg: "Error al actualizar menu" });
    } else {
      res.status(200).send({ msg: "Menu actualizado!" });
    }
  });
}

function deleteCourse(req, res) {
  const { id } = req.params;

  Course.findByIdAndDelete(id, (error) => {
    if (error) {
      res.status(400).send({ msg: "Error al eliminar el curso" });
    } else {
      res.status(200).send({ msg: "Curso eliminado correctamente" });
    }
  });
}

module.exports = {
  createCourse,
  getCourse,
  updateCourse,
  deleteCourse,
};
