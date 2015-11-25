var React = require('react');
var _ = require('lodash');

var ClassOrder = {
  'Druid': 0,
  'Hunter': 1,
  'Mage': 2,
  'Paladin': 3,
  'Priest': 4,
  'Rogue': 5,
  'Shaman': 6,
  'Warlock': 7,
  'Warrior': 8,
  'Neutral': 9
};

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
      groupBy: 'playerClass',
      sortPrimary: 'cost',
      sortSecondary: 'type_order',
      sortTertiary: 'name'
    };
  },

  _setGroupBy: function(event) {
    this.setState({
      groupBy: event.target.value || ''
    });
  },

  _setSortPrimary: function(event) {
    this.setState({
      sortPrimary: event.target.value || ''
    });
  },

  _setSortSecondary: function(event) {
    this.setState({
      sortSecondary: event.target.value || ''
    });
  },

  _setSortTertiary: function(event) {
    this.setState({
      sortTertiary: event.target.value || ''
    });
  },

  render: function render() {
    var cardGroups;

    var groupBy = this.state.groupBy;
    var sortPrimary = this.state.sortPrimary;
    var sortSecondary = this.state.sortSecondary;
    var sortTertiary = this.state.sortTertiary;

    if (groupBy) {
      cardGroups = _(AllCards)
        .groupBy(groupBy)
        .map(function(group, groupName) {
          var groupOrder;
          if (groupBy === 'playerClass') {
            groupOrder = ClassOrder[groupName];
          } else {
            groupOrder = groupName;
          }

          return {
            groupName: groupName,
            groupOrder: groupOrder,
            cards: group
          };
        })
        .sortBy('groupOrder')
        .value();
    } else {
      cardGroups = [
        {
          groupName: 'All Cards',
          cards: AllCards
        }
      ];
    }

    _.forEach(cardGroups, function(group) {
      group.cards = _.sortByAll(group.cards, [sortPrimary, sortSecondary, sortTertiary]);
    });

    cardGroups = _.map(cardGroups, function(group) {
      return (<CardGroup groupName={group.groupName} key={group.groupName} cards={group.cards} />);
    });

    return (
      <div>
        <CardOrganizeDropdown type="group" label="Group By" defaultValue={this.state.groupBy} onChange={this._setGroupBy} />
        <CardOrganizeDropdown type="sort" label="Primary Sort" defaultValue={this.state.sortPrimary} onChange={this._setSortPrimary} />
        <CardOrganizeDropdown type="sort" label="Secondary Sort" defaultValue={this.state.sortSecondary} onChange={this._setSortSecondary} />
        <CardOrganizeDropdown type="sort" label="Tertiary Sort" defaultValue={this.state.sortTertiary} onChange={this._setSortTertiary} />
        {cardGroups}
      </div>
    );
  }
});

module.exports = CardList;
