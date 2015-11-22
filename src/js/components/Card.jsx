var React = require('react');

var Card = React.createClass({
  propTypes: {
    name: React.PropTypes.string
  },

  getInitialState: function() {
    return {
      count: localStorage.getItem(this.props.id) || 0
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
    var classes = "card";
    if (this.props.playerClass) {
      classes += (" " + this.props.playerClass);
    }

    return (
      <tr className={classes}>
        <td>{this.props.name}</td>
        <td>{this.state.count}</td>
        <td><button onClick={this._addOne}>+1</button></td>
        <td><button onClick={this._subtractOne}>-1</button></td>
      </tr>
    );
  }
});

module.exports = Card;
