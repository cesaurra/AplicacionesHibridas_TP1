import { MongoClient, ObjectId } from "mongodb"
import JudgeService from "./judges.js";
import VoteService from "./votes.js";

const client = new MongoClient('mongodb://127.0.0.1:27017')
const db = client.db("GOTOGameJAM")
const GameCollection = db.collection('games')
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

//-----------------------------------------------------------------------
//-----------------------------------------------------------------------

//CRUD services

/**
 * Obtiene la totalidad de juegos
 * @param {{Object}} filter Filtros
 * @returns {[Object]}
 */
//Read game
async function getGames(filter = {}) {
  await client.connect()
  const filterMongo = filterQueryToMongo(filter)
  return GameCollection.find(filterMongo).toArray()
}

/**
 * Crea los juegos
 * @param {{Object}} game Datos del juego
 * @returns {[Object]}
 */
async function  createGame(game) {
  await client.connect()
  const newGame = { ...game }
  /// side effect
  await GameCollection.insertOne(newGame)
  return newGame
}

/**
 * Actualiza un juego
 * @param {{Object}} game Datos a modificar
 * @param {{String}} id Id del juego
 * @returns {[Object]}
 */
async function  updateGame(game,id) {
  await client.connect()
  const updGame = { ...game }
  await GameCollection.updateOne(
    { _id: new ObjectId(`${id}`) },
    {
      $set: updGame
    }
  )
  return updGame
}

/**
 * Borra un juego (borrado lógico)
 * @param {{String}} id Id del juego
 * @returns {[Object]}
 */
async function  deleteGame(id) {
  await client.connect()
  return GameCollection.updateOne(
    { _id: new ObjectId(`${id}`) },
    {
      $set:  {delete:"true"}
    }
  )
}

//-----------------------------------------------------------------------
//-----------------------------------------------------------------------

/**
 * Obtiene a partir de la edición, un listado de juegos ordenados de mayor a menor puntaje (filtrado por género)
 * @param {{integer}} edition Año de edición del juego
 * @param {{Object}} condition Filtro
 * @returns {[Object]}
 */
async function getGamesByEdition(edition, condition) {
  const year= parseInt(edition)
  //Filtrar por género (year?genre=Arte)
  let filter  
  if (JSON.stringify(condition)=='{}') {
  filter = { edition: { $eq: year}}
  }else{
    //entro por genero y edicion... si condition (genre) no esta vacio
    filter= { edition: { $eq: year}, genre: condition.genre}
  }  
   //busco un juego dentro del y calculo el totalCategories
  let resArray=[]
  await client.connect()
  const listGames = await GameCollection.find(filter).toArray()
  for (let game of listGames) {
    let totalCategories=0
    let votes= await VoteCollection.find({ id_game: new ObjectId(game._id) }).toArray()
    for  (let item of votes)
      {
      totalCategories += item.gameplay + item.art + item.sound + item.theme
      }
    resArray.push({
    "position": totalCategories,
    "game": game
    })    
  }
  //listado por puntaje para una edicion en particular, ordenados de + a - puntaje ....
  resArray.sort((a, b) => {
    return b.position - a.position;
  });
  let result=[]
  for (let item of resArray)
  {
    result.push(item.game)
  }
  return result
}

//-----------------------------------------------------------------------
//-----------------------------------------------------------------------

/**
 * Obtiene a partir de un id de juego, los datos, y calcula el promedio de las puntuaciones en cada categoría
 * @param {{string}} id Id del juego
 * @returns {[Object]}
 */
async function getGameByID(id) {
  await client.connect()
  const searchedGame = await GameCollection.findOne({ _id: new ObjectId(id) })
  let avgGamePlay =0
  let avgArt =0
  let avgSound =0
  let avgTheme =0
  let votes= await VoteCollection.find({ id_game: new ObjectId(id) }).toArray()
  for  (let item of votes)
    {
    avgGamePlay += item.gameplay
    avgArt += item.art 
    avgSound += item.sound 
    avgTheme += item.theme
    }
  //promedio de puntuaciones de ese juego en c/categoría, 
  avgGamePlay = avgGamePlay/votes.length
  avgArt = avgArt/votes.length
  avgSound = avgSound/votes.length
  avgTheme = avgTheme/votes.length
  //devuelve todos los datos del juego
  let res= {...searchedGame,
  gameplay: avgGamePlay, 
  art: avgArt,
  sound: avgSound,
  theme: avgTheme
}
return res
}

//-----------------------------------------------------------------------
//-----------------------------------------------------------------------

/**
 * Obtiene a partir de un id de juego, visualiza los nombres de los jueces y puntos por cada categoría
 * @param {{string}} id Id del juego
 * @returns {[Object]}
 */
async function getVotesByGame(id) {
  await client.connect()
  let votes= await VoteCollection.find({ id_game: new ObjectId(id) }).toArray()
  let respArray=[]
  for  (let item of votes)
    {    //busco el nombre del juez que corresponda a ese id
    let voto={
      nameJudge : item.judge_name,
      gamePlay : item.gameplay,
      art : item.art,
      sound : item.sound,
      theme : item.theme    
      }
    respArray.push(voto)
  }
  //devuelve todos los datos del juego
return respArray
}

//-----------------------------------------------------------------------
//-----------------------------------------------------------------------

export {
  getGames,
  createGame,
  updateGame,
  deleteGame,
  getGamesByEdition,
  getGameByID,
  getVotesByGame
}

export default {
  getGames,
  createGame,
  updateGame,
  deleteGame,
  getGamesByEdition,
  getGameByID,
  getVotesByGame
}