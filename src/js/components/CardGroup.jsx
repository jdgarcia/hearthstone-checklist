var React = require('react');
var _ = require('lodash');

var Card = require('./Card');

var CardGroup = React.createClass({
  render: function() {
    var total = 0;
    var owned = 0;
    var cards = _.map(this.props.cards, function(card) {
      total += card.target;
      owned += card.owned;
      return (
        <Card card={card} key={card.id} />
      );
    });

    return (
      <div>
        {this.props.groupName} {owned}/{total} ({Math.round(owned/total*100)}%)
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
