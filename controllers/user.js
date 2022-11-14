const bcrypt = require("bcryptjs");
const User = require("../models/user");
const image = require("../utils/image");

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

  if (active === undefined) {
    response = await User.find();
  } else {
    response = await User.find({ active });
  }
  if (!response) {
    send.status(400).send({ msg: "No se han encontrado usuarios" });
  } else {
    res.status(200).send(response);
  }
}

async function createUser(req, res) {
  // Se obtiene a traves de la url, la password del usuario
  const { password } = req.body;
  // la funcion de '...req.body', es traer toda la informacion del body
  const user = new User({ ...req.body, active: false });

  const salt = bcrypt.genSaltSync(10);
  const hashPassword = bcrypt.hashSync(password, salt);
  user.password = hashPassword;

  if (req.files.avatar) {
    const imagePath = image.getFilePath(req.files.avatar);
    user.avatar = imagePath;
  }

  user.save((error, userStored) => {
    if (error) {
      res.status(400).send({ msg: "Error al crear usuario" });
    } else {
      res.status(201).send(userStored);
    }
  });
}

async function updateUser(req, res) {
  // se obtiene a traves de la url, la id del usuario que se quiere actualizar
  const { id } = req.params;
  // Llenamos userData con los datos del body
  const userData = req.body;

  // Actualizacion de contraseña
  if (userData.password) {
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(userData.password, salt);
    userData.password = hashPassword;
  } else {
    // En caso de que el campo llegue vacio
    delete userData.password;
  }

  if (req.files.avatar) {
    const imagePath = image.getFilePath(req.files.avatar);
    userData.avatar = imagePath;
  }

  User.findByIdAndUpdate({ _id: id }, userData, (error) => {
    if (error) {
      res.status(400).send({ msg: "Error al actualizar el usuario" });
    } else {
      res.status(200).send({ msg: "Usuario actualizado correctamente" });
    }
  });
}

async function deleteUser(req, res) {
  const { id } = req.params;
  User.findByIdAndDelete(id, (error) => {
    if (error) {
      res.status(400).send({ msg: "Error al eliminar el usuario" });
    } else {
      res.status(200).send({ msg: "Usuario eliminado" });
    }
  });
}

module.exports = {
  getMe,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
};
