import { gameCreateSchema, gameUpdateSchema/* , existGame */ } from "../schemas/games.js";
import { getGameByID } from "../services/games.js";

//-----------------------------------------------------------------------
//-----------------------------------------------------------------------

/**
 * Valida los datos al crear el juego
 * @param {Object} req Express request object
 * @param {Object} res Express response object
 * @param {Function} next Express next middleware function
 */
function validateCreateGame(req, res, next) {
  gameCreateSchema.validate(req.body, {
    stripUnknown: true,
    abortEarly: false
  })
    .then(async function (game) {
      req.body = game
      next()
    })
    .catch(function (err) {
      res.status(400).json(err)
    })
}

/**
 * Valida la edición de los datos del juego
 * @param {Object} req Express request object
 * @param {Object} res Express response object
 * @param {Function} next Express next middleware function
 */
function validateUpdateGame(req, res, next) {
  gameUpdateSchema.validate(req.body, {
    stripUnknown: true,
    abortEarly: false
  })
    .then(async function (game) {
      req.body = game
      next()
    })
    .catch(function (err) {
      res.status(400).json(err)
    })
}

/**
 * Valida que exista el juego
 * @param {Object} req Express request object
 * @param {Object} res Express response object
 * @param {Function} next Express next middleware function
 */
async function validateExistGame(req, res, next) {
  getGameByID(req.body.id_game)
  .then(function (game) {    
  if (game._id===undefined){
  res.status(400).json({ msg: "No existe el juego" }); }
  else{
  next() }
    })
    .catch(function (err) {
      res.status(500).json({ msg: "El id del juego ingresado es incorrecto" })
    }) 
}


//-----------------------------------------------------------------------
//-----------------------------------------------------------------------

export {
  validateCreateGame,
  validateUpdateGame,
  validateExistGame
}

export default {
  validateCreateGame,
  validateUpdateGame,
  validateExistGame
}