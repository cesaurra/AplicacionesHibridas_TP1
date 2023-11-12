import JudgesService from "../services/judges.js"

//-----------------------------------------------------------------------
//-----------------------------------------------------------------------

/**
 * Obtiene los datos de los jueces
 * @param {Object} req Express request object
 * @param {Object} res Express response object
 */
function getJudges(req, res) {
  JudgesService.getJudges(req.query)
    .then(function (judges) {
      res.status(200).json(judges)
    })
}

/**
 * Obtiene un juez en particular
 * @param {Object} req Express request object
 * @param {Object} res Express response object
 */
function getJudgeByID(req, res) {
  const { id_judge } = req.params
  JudgesService.getJudgeByID(id_judge)
    .then(function (judge) {
      return res.status(200).json(judge)
    })
    .catch(function (err) {
      if (err?.code) {
        res.status(err.code).json({ msg: err.msg })
      }
      else {
        res.status(500).json({ msg: "No se pudo obtener el id del juez" })
      }
    })
}

//-----------------------------------------------------------------------
//-----------------------------------------------------------------------

/**
 * Obtiene a partir de un id de juez, los nombres de juegos y puntos por cada categoria
 * @param {Object} req Express request object
 * @param {Object} res Express response object
 */
function getVotesByJudges(req, res) {
  JudgesService.getVotesByJudges(req.params.id_judge)
    .then(function (vote) {
      return res.status(200).json(vote)
    })
    .catch(function (err) {
      if (err?.code) {
        res.status(err.code).json({ msg: err.msg })
      }
      else {
        res.status(500).json({ msg: "No se pudo obtener los votos de ese juez" })
      }
    })
}

//-----------------------------------------------------------------------
//-----------------------------------------------------------------------

export {
  getJudges,
  getJudgeByID,
  getVotesByJudges
}

export default {
  getJudges,
  getJudgeByID,
  getVotesByJudges
}