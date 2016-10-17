/**
 * ChatController
 *
 */

const _ = require('lodash');

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
    Conversation.findOne({uid: data.uid})
      .then((conversation) => {
        WitService.setConversation(conversation)
        createIncomingMessage(data.message, conversation).then((message) => {
          WitService.client.runActions(conversation.uid, message.body, conversation.context)
          console.log(`SENDING TO WIT: ${message.body}`)
          response.status(204)
        })
      })
  }
};


const createIncomingMessage = (body, conversation) => {
  return Message.create({
    conversation: conversation,
    body: body,
    kind: "incoming"
  })
}
