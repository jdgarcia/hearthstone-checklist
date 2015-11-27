var CardUtils = {
  isComplete: function(card) {
    return card.owned >= card.target;
  }
};

module.exports = CardUtils;
