var React = require('react');

var CardActions = require('../actions/CardActions');

var Card = React.createClass({
  _addOne: function() {
    CardActions.addOne(this.props.card.id);
  },

  _subtractOne: function() {
    CardActions.subtractOne(this.props.card.id);
  },

  render: function() {
    var card = this.props.card;
    var isComplete = card.owned > 1 || (card.rarity === 'Legendary' && card.owned > 0);

    var classes = "card " + card.playerClass;
    if (isComplete) {
      classes += " complete";
    }

    return (
      <tr className={classes}>
        <td>{card.cost}</td>
        <td>{card.name}</td>
        <td>{card.type}</td>
        <td>{card.set}</td>
        <td>{card.rarity}</td>
        <td><button disabled={card.owned < 1} onClick={this._subtractOne}>-1</button></td>
        <td>{card.owned}</td>
        <td><button disabled={isComplete} onClick={this._addOne}>+1</button></td>
      </tr>
    );
  }
});

module.exports = Card;
