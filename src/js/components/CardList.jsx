var React = require('react');
var _ = require('lodash');

var RarityOrder = {
  'Free': 0,
  'Common': 1,
  'Rare': 2,
  'Epic': 3,
  'Legendary': 4
};

var TypeOrder = {
  'Weapon': 0,
  'Spell': 1,
  'Minion': 2
};

var AllSets = require('../../static/AllSets');
// Delete non-card sets
delete AllSets['Credits'];
delete AllSets['Debug'];
delete AllSets['Hero Skins'];
delete AllSets['Missions'];
delete AllSets['System'];
delete AllSets['Tavern Brawl'];

// Attach set, ordered rarity, and 'Neutral' class to cards
_.keys(AllSets).forEach(function(setName) {
  AllSets[setName] = _.forEach(AllSets[setName], function(item) {
    item.set = setName;
    item.rarity_order = RarityOrder[item.rarity];
    item.type_order = TypeOrder[item.type];
    if (!item.playerClass) {
      item.playerClass = 'Neutral';
    }
  });
});

var AllCards = _(AllSets)
  .map()
  .flatten()
  .filter(function(card) {
    return !!card.collectible && card.type !== 'Hero';
  })
  .value();

var CardOrganizeDropdown = require('./CardOrganizeDropdown');
var CardGroup = require('./CardGroup');

var CardList = React.createClass({
  getInitialState: function() {
    return {
      groupBy: '',
      sortByPrimary: 'playerClass',
      sortBySecondary: 'cost',
      sortByTertiary: 'name'
    };
  },

  _setGroupBy: function(event) {
    this.setState({
      groupBy: event.target.value || ''
    });
  },

  _setSortPrimary: function(event) {
    var newValue = event.target.value;
    if (newValue) {
      this.setState({
        sortByPrimary: newValue
      });
    }
  },

  _setSortSecondary: function(event) {
    var newValue = event.target.value;
    if (newValue) {
      this.setState({
        sortBySecondary: newValue
      });
    }
  },

  _setSortTertiary: function(event) {
    var newValue = event.target.value;
    if (newValue) {
      this.setState({
        sortByTertiary: newValue
      });
    }
  },

  render: function render() {
    var sortByPrimary = this.state.sortByPrimary;
    var sortBySecondary = this.state.sortBySecondary;
    var sortByTertiary = this.state.sortByTertiary;

    var sortedCards = AllCards
      .sort(function(cardA, cardB) {
        var a1 = cardA[sortByPrimary];
        var b1 = cardB[sortByPrimary];

        if (a1 < b1) {
          return -1;
        } else if (a1 > b1) {
          return 1;
        } else {
          var a2 = cardA[sortBySecondary];
          var b2 = cardB[sortBySecondary];

          if (a2 < b2) {
            return -1;
          } else if (a2 > b2) {
            return 1;
          } else {
            var a3 = cardA[sortByTertiary];
            var b3 = cardB[sortByTertiary];

            if (a3 < b3) {
              return -1;
            } else if (a3 > b3) {
              return 1;
            }
          }
        }

        return 0;
      });

    var cardGroups;
    if (this.state.groupBy) {
      cardGroups = _(sortedCards)
        .groupBy(this.state.groupBy)
        .map(function(group, groupName) {
          return (<CardGroup key={groupName} groupName={groupName} cards={group} />);
        })
        .value();
    } else {
      cardGroups = (<CardGroup groupName="All Cards" cards={sortedCards} />);
    }

    return (
      <div>
        <CardOrganizeDropdown type="group" label="Group By" defaultValue={this.state.groupBy} onChange={this._setGroupBy} />
        <CardOrganizeDropdown type="sort" label="Primary Sort" defaultValue={this.state.sortByPrimary} onChange={this._setSortPrimary} />
        <CardOrganizeDropdown type="sort" label="Secondary Sort" defaultValue={this.state.sortBySecondary} onChange={this._setSortSecondary} />
        <CardOrganizeDropdown type="sort" label="Tertiary Sort" defaultValue={this.state.sortByTertiary} onChange={this._setSortTertiary} />
        {cardGroups}
      </div>
    );
  }
});

module.exports = CardList;
