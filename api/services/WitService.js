/**
 * WitService.js
 */

const Wit = require('node-wit').Wit
const token = "7DO5OGFBNMKCLW57NIIO5I7CS27RAJCU"
let conversation = {}
const actions = {
    send(request, response) {
      // do something when bot sends message
    },
    findTheatre(request) {
      return new Promise(function(resolve, reject){
        const {sessionId, context, entities} = request;
        const showTime = firstEntityValue(entities, "datetime")
        const movie = firstEntityValue(entities, "movie")

        if (showTime && movie){
          const theatre = searchTheatres(showTime, movie)
          context.showTime = showTime
          context.movie = movie
          context.theatre = theatre
        } else if (!showTime){
          context.missingTime = true
        }
        return resolve(context)
      });
    }
  }

const firstEntityValue = (entities, entity) => {
  const val = entities && entities[entity] &&
      Array.isArray(entities[entity]) &&
      entities[entity].length > 0 &&
      entities[entity][0].value
    ;
  if (!val) {
    return null;
  }
  return typeof val === 'object' ? val.value : val;
};

const searchTheatres = (showTime, movie) => {
  // perform query magic
  console.log("Searching for Theatre")
  return "Random Theatre"
}


module.exports = {
  client: new Wit({accessToken: token, actions}),
  setConversation(id){
    // set conversation
  }
}
