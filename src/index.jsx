document.addEventListener('DOMContentLoaded', function () {
  var React = require('react');
  var ReactDOM = require('react-dom');

  var AllSets = require('./AllSets');
  console.log(AllSets);

  ReactDOM.render(
    <h1>Hearthstone Checklist</h1>,
    document.getElementById('app')
  );
});
