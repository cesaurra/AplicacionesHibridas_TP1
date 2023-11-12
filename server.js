import express from 'express'
import GamesRoute from './routes/games.js'
//import GamesService from './services/games.js'
import JudgesRoute from './routes/judges.js'
//import JudgesService from './services/judges.js'
import VotesRoute from './routes/votes.js'
//import VotesService from './services/votes.js'

const app = express()
app.use(express.json()) // interpreta el body cuando viene un JSON
app.use (GamesRoute)
app.use (JudgesRoute)
app.use (VotesRoute)

app.listen(2023, function () {
  console.log("El servidor esta levantado! http://localhost:2023")
})