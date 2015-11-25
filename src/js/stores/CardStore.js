var EventEmitter = require('events');
var objectAssign = require('object-assign');

var AppDispatcher = require('../dispatcher/AppDispatcher');

var CardStore = {};

var dispatchCallback = function(action) {
};

CardStore.dispatchToken = AppDispatcher.register(dispatchCallback);

module.exports = objectAssign({}, EventEmitter.prototype, CardStore);
