/**
 * PubnubService.js
 */

const Pubnub = require('pubnub')
const publishKey = "pub-c-1c361ca2-73cf-4ea3-bdab-eefaa0d3187d"
const subscribeKey = "sub-c-f7a78ae4-829f-11e6-974e-0619f8945a4f"
const client = new Pubnub({
  publishKey: publishKey,
  subscribeKey: subscribeKey
})

module.exports = {
  client: client
}
