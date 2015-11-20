var React = require('react');

var AllSets = require('../AllSets');

var Card = require('./Card');

var CardList = React.createClass({
  render: function render() {
    var cards = AllSets.Basic
      .filter(function(card) {
        return !!card.collectible;
      })
      .map(function(card) {
        return (
          <Card
            key={card.id}
            name={card.name}
            />
        );
      });

    return (
      <ul>
        {cards}
      </ul>
    );
  }
});

module.exports = CardList;
