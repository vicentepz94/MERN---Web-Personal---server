async function getMe(req, res) {
  res.status(200).send({ msg: "OK (controllers/user.js)" });
}

module.exports = {
  getMe,
};
