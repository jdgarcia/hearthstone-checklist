var React = require('react');

var Card = React.createClass({
  getInitialState: function() {
    return {
      count: Number(localStorage.getItem(this.props.card.id))
    };
  },

  _setCount: function(count) {
    localStorage.setItem(this.props.card.id, count);
    this.setState({
      count: count
    });
  },

  _addOne: function() {
    if (this.state.count < 2) {
      this._setCount(this.state.count + 1);
    }
  },

  _subtractOne: function() {
    if (this.state.count > 0) {
      this._setCount(this.state.count - 1);
    }
  },

  render: function() {
    var card = this.props.card;

    return (
      <tr className={"card " + card.playerClass}>
        <td>{card.cost}</td>
        <td>{card.name}</td>
        <td>{card.set}</td>
        <td><button disabled={this.state.count < 1} onClick={this._subtractOne}>-1</button></td>
        <td>{this.state.count}</td>
        <td><button disabled={this.state.count > 1} onClick={this._addOne}>+1</button></td>
      </tr>
    );
  }
});

module.exports = Card;
