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
      in: ["outgoing", "incoming"]
    },
    conversation: {
      model: "conversation"
    }
  }
};

