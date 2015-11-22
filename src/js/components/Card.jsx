var React = require('react');

var Card = React.createClass({
  propTypes: {
    name: React.PropTypes.string
  },

  getInitialState: function() {
    return {
      count: Number(localStorage.getItem(this.props.id))
    };
  },

  _setCount: function(count) {
    localStorage.setItem(this.props.id, count);
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
        <td>{this.state.count}</td>
        <td><button onClick={this._addOne}>+1</button></td>
        <td><button onClick={this._subtractOne}>-1</button></td>
      </tr>
    );
  }
});

module.exports = Card;
