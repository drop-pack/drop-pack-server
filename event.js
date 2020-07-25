const event = require("events")
const eventEmitter = new event

function on(event, listener) {
    eventEmitter.on(event, listener)
}
function emit(event, listener) {
    eventEmitter.emit(event, listener)
}

module.exports ={
    on: on,
    emit: emit
}