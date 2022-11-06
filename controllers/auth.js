function register(req, res) {
  console.log("Se ha ejecutado el registro");
  res.status(200).send({ msg: "TODO OK" });
}

module.exports = {
  register,
};
