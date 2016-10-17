/**
 * ChatController
 *
 */

const _ = require('lodash');
let messageConversation = {}


module.exports = {

  _config: {
    rest: false,
    shortcuts: false,
    actions: false
  },

  start(request, response){
    Conversation.create()
      .then((conversation) => {
        WitService.setConversation(conversation)
        response.status(201).json(conversation)
      })
  },

  message(request, response){
    const data = _.pick(request.body, ["uid", "message"])
    Conversation.find({uid: data.uid})
      .then((conversation) => {
        messageConversation = conversation
        WitService.setConversation(conversation)
      })

    createIncomingMessage(data.message).then((message) => {
      WitService.runActions(messageConversation.uid, message.body)
      console.log(`SENDING TO WIT: ${message.body}`)
      response.status(204)
    })
  }
};


const createIncomingMessage = (body) => {
  return Message.create({
    conversation: messageConversation,
    body: body,
    kind: "incoming"
  })
}
