var EventEmitter = require('events');
var util = require('util');

var AppDispatcher = require('../dispatcher/AppDispatcher');

function CardStore() {
  EventEmitter.call(this);
}

util.inherits(CardStore, EventEmitter);

var cardStoreInstance = new CardStore();

var dispatchCallback = function(action) {
};

cardStoreInstance.dispatchToken = AppDispatcher.register(dispatchCallback);

module.exports = cardStoreInstance;
