import VotesService from "../services/votes.js"

//-----------------------------------------------------------------------
//-----------------------------------------------------------------------

/**
 * Obtiene todos los votos
 * @param {Object} req Express request object
 * @param {Object} res Express response object
 */
function getVotes(req, res) {
  VotesService.getVotes(req.query)
    .then(function (votes) {
      res.status(200).json(votes)
    })
}

/**
 * Obtiene un voto en particular
 * @param {Object} req Express request object
 * @param {Object} res Express response object
 */
function getVoteByID(req, res) {
  const { id_vote } = req.params
  VotesService.getVoteByID(id_vote)
    .then(function (vote) {
      return res.status(200).json(vote)
    })
    .catch(function (err) {
      if (err?.code) {
        res.status(err.code).json({ msg: err.msg })
      }
      else {
        res.status(500).json({ msg: "No se pudo obtener el voto" })
      }
    })
}

/**
 * Crea los votos
 * @param {Object} req Express request object
 * @param {Object} res Express response object
 */
function createVote(req, res) {
    //creo el id del juego  
    //const {id_game} = req.params;
    //paso el id y el body
    VotesService.createVote(/* id_game, */ req.body)
    .then(function (vote) {
      res.status(201).json(vote)
    })
    .catch(function (err) {
      res.status(500).json({ msg: err.msg })
    })
}

//-----------------------------------------------------------------------
//-----------------------------------------------------------------------

export {
  getVotes,
  getVoteByID,
  createVote
}

export default {
  getVotes,
  getVoteByID,
  createVote
}