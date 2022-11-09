const jwt = require("../utils/jwt");
// AUTENTICACIÓN DE USUARIOS
//  Ejecutar next avisa al sistema que puede continuar con la funcion siguiente
function asureAuth(req, res, next) {
  if (!req.headers.authorization) {
    return res
      .status(403)
      .send({ msg: "La pericion no tiene la cabecera de autenticación" });
  }

  const token = req.headers.authorization.replace("Bearer ", "");

  // Se obtiene la informacion de la expiracion del token dentro del payload y se compara con el tiempo actual
  try {
    const payload = jwt.decoded(token);

    const { exp } = payload;
    const currentDate = new Date().getTime();

    if (exp <= currentDate) {
      return res
        .status(400)
        .send({ msg: "El token ha expirado (middleware/authenticated.js)" });
    }

    // Si la información es valida se envia la información a la función getMe de controllers/user.js
    req.user = payload;
    next();
  } catch (error) {
    return res.status(400).send({ msg: "Token inválido" });
  }
}

module.exports = {
  asureAuth,
};
