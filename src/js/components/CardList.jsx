var React = require('react');

var AllSets = require('../../static/AllSets');
Object.keys(AllSets).forEach(function(setName) {
  AllSets[setName].forEach(function(item) {
    item.set = setName;
    if (!item.playerClass) {
      item.playerClass = 'Neutral';
    }
  });
});

var Card = require('./Card');

var CardList = React.createClass({
  getInitialState: function() {
    return {
      sortByPrimary: 'playerClass',
      sortBySecondary: 'cost',
      sortByTertiary: 'name'
    };
  },

  _sortByPrimary: function(event) {
    var newValue = event.target.value;
    if (newValue) {
      this.setState({
        sortByPrimary: newValue
      });
    }
  },

  _sortBySecondary: function(event) {
    var newValue = event.target.value;
    if (newValue) {
      this.setState({
        sortBySecondary: newValue
      });
    }
  },

  _sortByTertiary: function(event) {
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

    var cards = AllSets['Basic']
      .concat(AllSets['Classic'])
      .concat(AllSets['Reward'])
      .concat(AllSets['Promotion'])
      .concat(AllSets['Curse of Naxxramas'])
      .concat(AllSets['Goblins vs Gnomes'])
      .concat(AllSets['Blackrock Mountain'])
      .concat(AllSets['The Grand Tournament'])
      .concat(AllSets['League of Explorers'])
      .filter(function(card) {
        return !!card.collectible && card.type !== 'Hero';
      })
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
      })
      .map(function(card) {
        return (
          <Card card={card} key={card.id} />
        );
      });

    return (
      <div>
        Primary Sort:
        <select defaultValue={this.state.sortByPrimary} onChange={this._sortByPrimary}>
          <option value="name">Name</option>
          <option value="cost">Cost</option>
          <option value="playerClass">Class</option>
          <option value="set">Set</option>
        </select>
        Secondary Sort:
        <select defaultValue={this.state.sortBySecondary} onChange={this._sortBySecondary}>
          <option value="name">Name</option>
          <option value="cost">Cost</option>
          <option value="playerClass">Class</option>
          <option value="set">Set</option>
        </select>
        Tertiary Sort:
        <select defaultValue={this.state.sortByTertiary} onChange={this._sortByTertiary}>
          <option value="name">Name</option>
          <option value="cost">Cost</option>
          <option value="playerClass">Class</option>
          <option value="set">Set</option>
        </select>
        <table>
          <tbody>
            {cards}
          </tbody>
        </table>
      </div>
    );
  }
});

module.exports = CardList;
