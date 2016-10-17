/**
 * Conversation.js
 *
 */

const uuid = require('uuid');

module.exports = {

  attributes: {

    uid: {
      type: 'string',
      required: true,
      unique: true,
      defaultsTo() {
        return uuid.v4();
      }
    },
    messages: {
      collection: "message",
      via: "conversation"
    },
    context: {
      type: 'json',
      defaultsTo: {}
    }
  }
};

