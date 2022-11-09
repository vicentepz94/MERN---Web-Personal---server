const bcrypt = require("bcryptjs");
const User = require("../models/user");

async function getMe(req, res) {
  const { user_id } = req.user;

  const response = await User.findById(user_id);

  if (!response) {
    res.status(400).send({ msg: "No se ha encontrado el usuario" });
  } else {
    res.status(200).send(response);
  }
}

async function getUsers(req, res) {
  // Query para obtener usuarios: activos, desactivos o el estado que uno cree
  const { active } = req.query;

  let response = null;

  if (active == undefined) {
    response = await User.find();
  } else {
    response = await User.find({ active });
  }
  res.status(200).send(response);
}

async function createUser(req, res) {
  const { password } = req.body;
  // la funcion de '...req.body', es traer toda la informacion del body
  const user = new User({ ...req.body, active: false });

  const salt = bcrypt.genSaltSync(10);
  const hashPassword = bcrypt.hashSync(password, salt);
  user.password = hashPassword;

  if (req.files.avatar) {
    //TODO:
    console.log("Procesar avatar");
  }

  user.save((error, userStored) => {
    if (error) {
      res.status(400).send({ msg: "Error al crear usuario" });
    } else {
      res.status(201).send(userStored);
    }
  });
}

module.exports = {
  getMe,
  getUsers,
  createUser,
};
