var EventEmitter = require('events');
var objectAssign = require('object-assign');
var _ = require('lodash');

var AppDispatcher = require('../dispatcher/AppDispatcher');

var CardConstants = require('../constants/CardConstants');
var OrderConstants = require('../constants/OrderConstants');
var CardUtils = require('../utils/CardUtils');

var AllSets = require('../../static/AllSets');
// Delete non-card sets
delete AllSets['Credits'];
delete AllSets['Debug'];
delete AllSets['Hero Skins'];
delete AllSets['Missions'];
delete AllSets['System'];
delete AllSets['Tavern Brawl'];

// Attach set, ordered rarity, and 'Neutral' class to cards
_.keys(AllSets).forEach(function(setName) {
  AllSets[setName] = _.forEach(AllSets[setName], function(item) {
    item.set = setName;
    item.rarity_order = OrderConstants.Rarity[item.rarity];
    item.type_order = OrderConstants.Type[item.type];
    if (!item.playerClass) {
      item.playerClass = 'Neutral';
    }
  });
});

var _cardMap = {};
var _cards = _(AllSets)
  .map()
  .flatten()
  .filter(function(card) {
    if (!!card.collectible && card.type !== 'Hero') {
      card.owned = Number(localStorage.getItem(card.id));
      card.target = card.rarity === 'Legendary' ? 1 : 2;
      _cardMap[card.id] = card;
      return true;
    }
  })
  .value();

var CardStore = {};

var storeProps = {
  getAllCards: function() {
    return _cards;
  },

  addChangeListener: function(callback) {
    CardStore.on(CardConstants.events.CHANGE, callback);
  },

  removeChangeListener: function(callback) {
    CardStore.removeListener(CardConstants.events.CHANGE, callback);
  },

  emitChange: function() {
    CardStore.emit(CardConstants.events.CHANGE);
  }
};

function addOne(cardId) {
  var card = _cardMap[cardId];
  if (!CardUtils.isComplete(card)) {
    var newOwned = card.owned + 1;

    localStorage.setItem(cardId, newOwned);
    card.owned = newOwned;

    return true;
  }

  return false;
}

function subtractOne(cardId) {
  var card = _cardMap[cardId];
  if (card.owned > 0) {
    var newOwned = card.owned - 1;

    localStorage.setItem(cardId, newOwned);
    card.owned = newOwned;

    return true;
  }

  return false;
}

var dispatchCallback = function(action) {
  switch(action.type) {
  case CardConstants.actions.ADD_ONE:
    if (addOne(action.cardId)) {
      CardStore.emitChange();
      return true;
    }
    break;

  case CardConstants.actions.SUBTRACT_ONE:
    if (subtractOne(action.cardId)) {
      CardStore.emitChange();
      return true;
    }
    break;
  }

  return false;
};

CardStore.dispatchToken = AppDispatcher.register(dispatchCallback);

module.exports = objectAssign(CardStore, EventEmitter.prototype, storeProps);
