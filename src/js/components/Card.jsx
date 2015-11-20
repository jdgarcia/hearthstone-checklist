var React = require('react');

var Card = React.createClass({
  propTypes: {
    name: React.PropTypes.string
  },

  render: function() {
    return (
      <div>{this.props.name}</div>
    );
  }
});

module.exports = Card;
