var EventEmitter = require('events');
var objectAssign = require('object-assign');
var _ = require('lodash');

var AppDispatcher = require('../dispatcher/AppDispatcher');

var OrderConstants = require('../constants/OrderConstants');

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
      _cardMap[card.id] = card;
      return true;
    }
  })
  .value();

var CardStore = {
  getAllCards: function() {
    return _cards;
  }
};

var dispatchCallback = function(action) {
};

CardStore.dispatchToken = AppDispatcher.register(dispatchCallback);

module.exports = objectAssign({}, EventEmitter.prototype, CardStore);
