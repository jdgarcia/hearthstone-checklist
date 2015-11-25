var React = require('react');
var _ = require('lodash');

var Card = require('./Card');

var CardGroup = React.createClass({
  render: function() {
    var cards = _.map(this.props.cards, function(card) {
      return (
        <Card card={card} key={card.id} />
      );
    });

    return (
      <div>
        {this.props.groupName}
        <table>
          <tbody>
            {cards}
          </tbody>
        </table>
      </div>
    )
  }
});

module.exports = CardGroup;
