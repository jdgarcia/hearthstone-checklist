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
      sortBy: 'name'
    };
  },

  _sortBy: function(event) {
    var newValue = event.target.value;
    if (newValue) {
      this.setState({
        sortBy: newValue
      });
    }
  },

  render: function render() {
    var sortBy = this.state.sortBy;
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
        var aValue = cardA[sortBy];
        var bValue = cardB[sortBy];

        if (aValue < bValue) {
          return -1;
        } else if (aValue > bValue) {
          return 1;
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
        Sort:
        <select defaultValue="name" onChange={this._sortBy}>
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
