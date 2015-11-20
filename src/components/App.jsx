var React = require('react');

var CardList = require('./CardList');

var App = React.createClass({
  render: function render() {
    return (
      <div>
        <h1>Hearthstone Checklist</h1>
        <CardList />
      </div>
    );
  }
});

module.exports = App;
