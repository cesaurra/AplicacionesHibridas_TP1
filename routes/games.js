import express from 'express'
import GamesController from '../controllers/games.js'
import {validateCreateGame, validateUpdateGame, validateExistGame} from '../middlewares/games.js'

const route = express.Router()

//-----------------------------------------------------------------------
//-----------------------------------------------------------------------

//CRUD Games
route.get('/games/:id_game', GamesController.getGameByID)  //read x ID
route.get( '/games', [], GamesController.getGames) //read
route.post( '/games', [validateCreateGame], GamesController.createGame) //create
route.patch('/games/:id_game',[validateUpdateGame], GamesController.updateGame) //update
route.delete('/games/:id_game', GamesController.deleteGame) //delete

route.get( '/edition/:year', [], GamesController.getGamesByEdition)  

route.get("/games/:id_game/votes", GamesController.getVotesByGames);

export default route



