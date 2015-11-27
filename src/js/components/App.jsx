var React = require('react');
var _ = require('lodash');

var CardStore = require('../stores/CardStore');
var OrderConstants = require('../constants/OrderConstants');

var CardOrganizeDropdown = require('./CardOrganizeDropdown');
var CardGroup = require('./CardGroup');

var CardList = React.createClass({
  getInitialState: function() {
    return {
      allCards: CardStore.getAllCards(),
      groupBy: 'playerClass',
      sortPrimary: 'cost',
      sortSecondary: 'type_order',
      sortTertiary: 'name'
    };
  },

  componentDidMount: function() {
    CardStore.addChangeListener(this._onCardChange);
  },

  componentWillUnmount: function() {
    CardStore.removeChangeListener(this._onCardChange);
  },

  _onCardChange: function() {
    this.setState({
      allCards: CardStore.getAllCards()
    });
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

    var allCards = this.state.allCards;

    if (groupBy) {
      cardGroups = _(allCards)
        .groupBy(groupBy)
        .map(function(group, groupName) {
          var groupOrder;

          switch (groupBy) {
          case 'playerClass':
            groupOrder = OrderConstants.Class[groupName];
            break;
          case 'set':
            groupOrder = OrderConstants.Set[groupName];
            break;
          default:
            groupOrder = groupName;
            break;
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
          cards: allCards
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
        <h1>Hearthstone Checklist</h1>
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
