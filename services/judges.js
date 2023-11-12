import { MongoClient, ObjectId } from "mongodb"

const client = new MongoClient('mongodb://127.0.0.1:27017')
const db = client.db("GOTOGameJAM")
const JudgeCollection = db.collection('judges')
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
 * Obtiene los jueces
 * @param {{string}} id Id del juez
 * @returns {[Object]}
 */
async function getJudges(filter = {}) {
  await client.connect()
  const filterMongo = filterQueryToMongo(filter)
  return JudgeCollection.find(filterMongo).toArray()
}

/**
 * Obtiene los datos de un juez
 * @param {{string}} id Id del juez
 * @returns {[Object]}
 */
async function getJudgeByID(id) {
  await client.connect()
  console.log('service getJudgeByID id',id) 
  const resp= await JudgeCollection.findOne({ _id: new ObjectId(id) })
  console.log('service getJudgeByID resp', resp) 
  return resp
}

//-----------------------------------------------------------------------
//-----------------------------------------------------------------------

/**
 * Controla que exista el juez
 * @param {{string}} id Id del juez
 * @returns Boolean
 */
async function existJudge(id) {  
  await client.connect();
  const resp=await JudgeCollection.findOne({ _id: new ObjectId(id) });  
  if(resp){
    return true
  }  
  return false;
}

//-----------------------------------------------------------------------
//-----------------------------------------------------------------------

/**
 * Obtiene a partir de un id de juez, obtiene el nombre de los juegos y puntos de cada categoría que votó
 * @param {{string}} id Id del juez
 * @returns {[Object]}
 */
async function getVotesByJudges(id) {
  await client.connect()
  let votes= await VoteCollection.find({ id_judge: new ObjectId(id) }).toArray()
  let respArray=[]
  for  (let item of votes)
    {
    //busco el nombre del juez que corresponda a ese id
    let voto={
      nameGame : item.game_name,
      gamePlay : item.gameplay,
      art : item.art,
      sound : item.sound ,
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
  getJudges,
  getJudgeByID,
  existJudge,
  getVotesByJudges
}

export default {
  getJudges,
  getJudgeByID,
  existJudge,
  getVotesByJudges
}