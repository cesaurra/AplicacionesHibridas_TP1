import { existJudge } from "../services/judges.js";
import { getJudgeByID } from "../services/judges.js";
//-----------------------------------------------------------------------
//-----------------------------------------------------------------------

/**
 * Valida que exista el juez
 * @param {Object} req Express request object
 * @param {Object} res Express response object
 * @param {Function} next Express next middleware function
 */
async function validateExistJudge(req, res, next) {
  console.log('middleware validateExistJudge',req.body.id_judge)   
  getJudgeByID(req.body.id_judge)
  .then(function (judge) {    
  next() 
    })
    .catch(function (err) {
      res.status(500).json({ msg: "No existe el juez" })
    }) 
}

//-----------------------------------------------------------------------
//-----------------------------------------------------------------------

export {
  validateExistJudge
}

export default {
  validateExistJudge
}