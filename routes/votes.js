import express from 'express'
import VotesController from '../controllers/votes.js'
import {validateCreateVote, validateJudgeVoteExist} from '../middlewares/votes.js'
import {validateExistGame} from '../middlewares/games.js'
import {validateExistJudge} from '../middlewares/judges.js'

const route = express.Router()

//-----------------------------------------------------------------------
//-----------------------------------------------------------------------

route.get( '/votes', [], VotesController.getVotes) //read
route.get('/votes/:id_vote', VotesController.getVoteByID)
route.post("/votes", [validateCreateVote, validateExistGame, validateExistJudge, validateJudgeVoteExist] ,VotesController.createVote);

export default route

// 