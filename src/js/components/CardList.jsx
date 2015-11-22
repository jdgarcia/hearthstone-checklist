var React = require('react');

var AllSets = require('../../static/AllSets');

var Card = require('./Card');

var CardList = React.createClass({
  render: function render() {
    var cards = AllSets.Basic
      .filter(function(card) {
        return !!card.collectible && card.type !== 'Hero';
      })
      .map(function(card) {
        return (
          <Card
            key={card.id}
            id={card.id}
            name={card.name}
            playerClass={card.playerClass}
            />
        );
      });

    return (
      <table>
        <tbody>
          {cards}
        </tbody>
      </table>
    );
  }
});

module.exports = CardList;
