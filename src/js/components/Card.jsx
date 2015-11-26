var React = require('react');

var Card = React.createClass({
  _setCount: function(count) {
    localStorage.setItem(this.props.card.id, count);
    this.setState({
      count: count
    });
  },

  _addOne: function() {
    this._setCount(this.state.count + 1);
  },

  _subtractOne: function() {
    this._setCount(this.state.count - 1);
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
