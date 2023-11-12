import { MongoClient, ObjectId } from "mongodb"
import GameService from "./games.js";
import JudgeService from "./judges.js";

const client = new MongoClient('mongodb://127.0.0.1:27017')
const db = client.db("GOTOGameJAM")
const VoteCollection = db.collection('votes')

//-----------------------------------------------------------------------
//-----------------------------------------------------------------------

/**
 * Consulta a la BD
 * @param {{Object}} filter Filtros
 * @returns {[Object]}
 */
function filterQueryToMongo(filter) {
  const filterMongo = {}
  for (const filed in filter) {
    if (isNaN(filter[filed])) {
      filterMongo[filed] = filter[filed]
    }
    else {
      const [field, op] = filed.split('_')
      if (!op) {
        filterMongo[filed] = parseInt(filter[filed])
      }
      else {
        if (op === 'min') {
          filterMongo[field] = {
            $gte: parseInt(filter[filed])
          }
        }
        else if (op === 'max') {
          filterMongo[field] = {
            $lte: parseInt(filter[filed])
          }
        }
      }
    }
  }
  return filterMongo
}

/**
 * Obtiene los votos
 * @param {{string}} id Id del voto
 * @returns {[Object]}
 */
async function getVotes(filter = {}) {
  await client.connect()
  const filterMongo = filterQueryToMongo(filter)
  return VoteCollection.find(filterMongo).toArray()
}

/**
 * Obtiene un voto en particular
 * @param {{string}} id Id del voto
 * @returns {[Object]}
 */
async function getVoteByID(id) {
  await client.connect()
  return VoteCollection.findOne({ _id: new ObjectId(id) })
}

/**
 * Busca los votos de un juego
 * @param {{string}} id_game Id del juego
 * @returns {[Object]}
 */
async function  findVotes(id_game) {
  await client.connect();
  return VoteCollection.find({id_game: new ObjectId(id_game)}).toArray();
}

//-----------------------------------------------------------------------
//-----------------------------------------------------------------------

/**
 * Crea un voto
 * @param {{string}} vote Datos del voto
 * @returns {[Object]}
 */
async function  createVote(vote) {
  await client.connect()
  const game=await GameService.getGameByID(vote.id_game)
  const judge=await JudgeService.getJudgeByID(vote.id_judge)
  const newVote = { ...vote,
    ...{ //Reference + Embebed   
    id_judge: new ObjectId(vote.id_judge),
    judge_name: judge.name,
    id_game: new ObjectId(vote.id_game),
    game_name: game.name,
  }
}
  await VoteCollection.insertOne(newVote)
  return newVote
}

//-----------------------------------------------------------------------
//-----------------------------------------------------------------------

/**
 * Controla el juez haya votado ese juego
 * @param {{string}} id_judge Id del juez
 * @param {{string}} id_game Id del juego
 * @returns Boolean
 */
async function judgeVoteExist(id_judge, id_game) {
  await client.connect();
  const resp = await VoteCollection.findOne({
    id_judge: new ObjectId(id_judge),
    id_game: new ObjectId(id_game),
  });
  return resp
}

//-----------------------------------------------------------------------
//-----------------------------------------------------------------------

export {
  createVote,
  getVotes,
  getVoteByID,
  findVotes,
  judgeVoteExist
}

export default {
  createVote,
  getVotes,
  getVoteByID,
  findVotes,
  judgeVoteExist
}