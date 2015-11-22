var React = require('React');

var SortDropdown = React.createClass({
  render: function() {
    return (
      <div>
        <div>{this.props.label + ":"}</div>
        <select defaultValue={this.props.defaultValue} onChange={this.props.onChange}>
          <option value="name">Name</option>
          <option value="playerClass">Class</option>
          <option value="cost">Cost</option>
          <option value="set">Set</option>
          <option value="rarity_ordered">Rarity</option>
        </select>
      </div>
    );
  }
});

module.exports = SortDropdown;
