var CardUtils = {
  isComplete: function(card) {
    return card.owned >= 2 || (card.rarity === 'Legendary' && card.owned >= 1);
  }
};

module.exports = CardUtils;
