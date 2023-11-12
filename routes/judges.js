import express from 'express'
import JudgesController from '../controllers/judges.js'
import {validateExistJudge} from '../middlewares/judges.js'

const route = express.Router()

//-----------------------------------------------------------------------
//-----------------------------------------------------------------------

route.get( '/judges', JudgesController.getJudges) //read
route.get('/judges/:id_judge', JudgesController.getJudgeByID) //read x id
route.get( '/judges/:id_judge/votes', [], JudgesController.getVotesByJudges) 

export default route
 