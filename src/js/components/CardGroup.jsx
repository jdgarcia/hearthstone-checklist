var React = require('react');
var _ = require('lodash');

var OrderConstants = require('../constants/OrderConstants');
var Card = require('./Card');

var CardGroup = React.createClass({
  render: function() {
    var groupName = this.props.groupName;

    var rarities = ['All'].concat(_.keys(OrderConstants.Rarity));
    var stats = {};
    _.forEach(rarities, function(rarity) {
      stats[rarity] = { total: 0, owned: 0 };
    });

    var cards = _.map(this.props.cards, function(card) {
      stats.All.total += card.target;
      stats.All.owned += card.owned;
      stats[card.rarity].total += card.target;
      stats[card.rarity].owned += card.owned;

      return (
        <Card card={card} key={card.id} />
      );
    });

    var rarityStats = _.map(stats, function(stat, rarity) {
      if (stat.total === 0) {
        return null;
      }

      return (
        <div key={groupName + '-' + rarity}>
          {rarity} {stat.owned}/{stat.total} ({Math.round(stat.owned/stat.total*100)}%)
        </div>
      );
    });

    return (
      <div>
        <h2>{groupName}</h2>
        {rarityStats}
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
