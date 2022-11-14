const mongoose = require("mongoose");

const CourseSchema = mongoose.Schema({
  title: String,
  miniature: String,
  description: String,
  url: String,
  precio: String,
  score: String,
});

module.exports = mongoose.model("Course", CourseSchema);
