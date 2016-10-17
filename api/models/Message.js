/**
 * Message.js
 *
 */

module.exports = {

  attributes: {
    body: {
      type: 'string',
      required: true
    },
    kind: {
      type: 'string',
      required: true,
      enum: ["outgoing", "incoming"]
    },
    conversation: {
      model: "conversation"
    }
  }
};

