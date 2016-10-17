/**
 * Conversation.js
 *
 */

const uuid = require('uuid');

module.exports = {

  attributes: {

    uid: {
      type: 'string',
      required: 'true'
    },
    messages: {
      collection: "message",
      via: "conversation"
    },
  },

  beforeCreate(values, cb){
    if (values.uid) {
      cb();
    }
    values.uid = uuid.v4()
    cb();
  }
};

