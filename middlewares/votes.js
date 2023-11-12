import {voteCreateSchema} from "../schemas/votes.js";
import {judgeVoteExist} from "../services/votes.js";

//-----------------------------------------------------------------------
//-----------------------------------------------------------------------

/**
 * Valida los datos ingresados al crear el voto
 * @param {Object} req Express request object
 * @param {Object} res Express response object
 * @param {Function} next Express next middleware function
 */
function validateCreateVote(req, res, next) {
  voteCreateSchema.validate(req.body, {
    stripUnknown: true,
    abortEarly: false
  })
    .then(async function (vote) {
      req.body = vote
      next()
    })
    .catch(function (err) {
      res.status(400).json(err)
    })
}

/**
 * Valida que el juez no haya hecho votos para ese juego
 * @param {Object} req Express request object
 * @param {Object} res Express response object
 * @param {Function} next Express next middleware function
 */
async function validateJudgeVoteExist(req, res, next) {
  judgeVoteExist(req.body.id_judge, req.body.id_game)
  .then(function (vote) {    
    if (vote ===null)
    next()
    else
    res.status(400).json({ msg: "El juez ya voto ese juego" });
      })
      .catch(function (err) {
        res.status(500).json({ msg: "Error en el ingreso de datos" })
      }) 
}

//-----------------------------------------------------------------------
//-----------------------------------------------------------------------

export {
  validateCreateVote,
  validateJudgeVoteExist
}

export default {
  validateCreateVote,
  validateJudgeVoteExist
}