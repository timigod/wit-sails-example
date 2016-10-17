/**
 * WitService.js
 */

const Wit = require('node-wit').Wit
const token = "7DO5OGFBNMKCLW57NIIO5I7CS27RAJCU"
let conversation = {}
const actions = {
  send(request, response) {
    PubnubService.client.publish({
        message: response.text,
        channel: conversation.uid,
      },
      function (status, response) {
        // handle status, response
      })
    Message.create({body: response.text, conversation: conversation, kind: "outgoing"})
    console.log(`sending... ${response.text}`)
    return Promise.resolve();
  },
  findTheatre({context, entities}) {

    const showTime = firstEntityValue(entities, "datetime") || context.showTime
    const movie = firstEntityValue(entities, "movie") || context.movie

    if (showTime != null) {
      context.showTime = showTime
      delete context.missingTime
    } else {
      context.missingTime = true
    }

    if (movie != null){
      context.movie = movie
    }

    if (movie && showTime){
      const theatre = searchTheatres(showTime, movie)
      context.theatre = theatre
      var newContext = {}
    }else{
      var newContext = context
    }

    return Conversation.update({uid: conversation.uid}, {context: newContext})
      .then((updated) => {
          return Promise.resolve(context)
        })
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

const client = new Wit({accessToken: token, actions})


module.exports = {
  client: client,
  setConversation(conv){
    conversation = conv
  }
}
