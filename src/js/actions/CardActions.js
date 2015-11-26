var AppDispatcher = require('../dispatcher/AppDispatcher');
var CardConstants = require('../constants/CardConstants');

var CardActions = {
  addOne: function(cardId) {
    AppDispatcher.dispatch({
      type: CardConstants.actions.ADD_ONE,
      cardId: cardId
    });
  },

  subtractOne: function(cardId) {
    AppDispatcher.dispatch({
      type: CardConstants.actions.SUBTRACT_ONE,
      cardId: cardId
    });
  }
};

module.exports = CardActions;
