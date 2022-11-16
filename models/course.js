const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");

const CourseSchema = mongoose.Schema({
  title: String,
  miniature: String,
  description: String,
  url: String,
  precio: String,
  score: String,
});

CourseSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Course", CourseSchema);
