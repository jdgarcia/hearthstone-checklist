var React = require('React');
var _ = require('lodash');

var Options = {
  'group': [
    { label: 'None', value: '' },
    { label: 'Class', value: 'playerClass' }
  ],
  'sort': [
    { label: 'Name', value: 'name' },
    { label: 'Class', value: 'playerClass' },
    { label: 'Cost', value: 'cost' },
    { label: 'Set', value: 'set' },
    { label: 'Rarity', value: 'rarity_ordered' }
  ]
};

var CardOrganizeDropdown = React.createClass({
  render: function() {
    var options = _.map(Options[this.props.type], function(option) {
      return (
        <option key={option.value} value={option.value}>{option.label}</option>
      );
    });

    return (
      <div>
        <div>{this.props.label + ":"}</div>
        <select defaultValue={this.props.defaultValue} onChange={this.props.onChange}>
          {options}
        </select>
      </div>
    );
  }
});

module.exports = CardOrganizeDropdown;
