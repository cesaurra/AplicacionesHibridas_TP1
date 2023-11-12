import GamesService from "../services/games.js"

//-----------------------------------------------------------------------
//-----------------------------------------------------------------------

//CRUD Controllers

/**
 * Obtiene la totalidad de juegos
 * @param {Object} req Express request object
 * @param {Object} res Express response object
 */
function getGames(req, res) {
  GamesService.getGames(req.query)
    .then(function (games) {
      res.status(200).json(games)
    })
}

/**
 * Obtiene un juego en particular
 * @param {Object} req Express request object
 * @param {Object} res Express response object
 */ 
function getGameByID(req, res) {
  const { id_game } = req.params
  GamesService.getGameByID(id_game)
    .then(function (game) {
      return res.status(200).json(game)
    })
    .catch(function (err) {
      if (err?.code) {
        res.status(err.code).json({ msg: err.msg })
      }
      else {
        res.status(500).json({ msg: "No se pudo obtener el id del juego" })
      }
    })
}

/**
 * Crea los juegos
 * @param {Object} req Express request object
 * @param {Object} res Express response object
 */
async function createGame(req, res) {
  return GamesService.createGame(req.body)
    .then(function (game) {
      res.status(201).json(game)
    })
    .catch(function (err) {
      res.status(500).json({ msg: err.msg })
    })
}

/**
 * Edita los juegos
 * @param {Object} req Express request object
 * @param {Object} res Express response object
 */
async function updateGame(req, res) {
  return GamesService.updateGame(req.body,req.params.id_game)
    .then(function (game) {
      res.status(201).json(game)
    })
    .catch(function (err) {
      res.status(500).json({ msg: err.msg })
    })
}

/**
 * Borra los juegos
 * @param {Object} req Express request object
 * @param {Object} res Express response object
 */
async function deleteGame(req, res) {
  return GamesService.deleteGame(req.params.id_game)
    .then(function (game) {
      res.status(201).json(game)
    })
    .catch(function (err) {
      res.status(500).json({ msg: err.msg })
    })
}

//-----------------------------------------------------------------------
//-----------------------------------------------------------------------

/**
 * Obtiene los juegos de una edición en particular
 * @param {Object} req Express request object
 * @param {Object} res Express response object
 */
function getGamesByEdition(req, res) {
    const edition  = req.params.year
  GamesService.getGamesByEdition(edition, req.query)
    .then(function (year) {
      return res.status(200).json(year)
    })
    .catch(function (err) {
      if (err?.code) {
        res.status(err.code).json({ msg: err.msg })
      }
      else {
        res.status(500).json({ msg: "No se pudo obtener la edición del juego" })
      }
    })
}

/**
 * Obtiene los datos de un juego (nombre de jueces y untos por cada categoría)
 * @param {Object} req Express request object
 * @param {Object} res Express response object
 */
function getVotesByGames(req, res) {
  const { id_game } = req.params
  GamesService.getVotesByGame(id_game)
    .then(function (vote) {
      return res.status(200).json(vote)
    })
    .catch(function (err) {
      if (err?.code) {
        res.status(err.code).json({ msg: err.msg })
      }
      else {
        res.status(500).json({ msg: "No se pudo obtener los votos de ese juego" })
      }
    })
}

//-----------------------------------------------------------------------
//-----------------------------------------------------------------------

export {
  getGames,
  getGameByID,
  createGame,
  updateGame,
  deleteGame,
  getGamesByEdition,
  getVotesByGames
}

export default {
  getGames,
  getGameByID,
  createGame,
  updateGame,
  deleteGame,
  getGamesByEdition,
  getVotesByGames
}