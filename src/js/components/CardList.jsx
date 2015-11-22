var React = require('react');

var AllSets = require('../../static/AllSets');

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
          <Card
            cost={card.cost}
            key={card.id}
            id={card.id}
            name={card.name}
            playerClass={card.playerClass}
            />
        );
      });

    return (
      <div>
        Sort:
        <select defaultValue="name" onChange={this._sortBy}>
          <option value="name">Name</option>
          <option value="cost">Cost</option>
          <option value="playerClass">Class</option>
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
