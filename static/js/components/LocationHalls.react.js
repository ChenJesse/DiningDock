   /** @jsx React.DOM */

var React = require('react');
var DiningHall = require('./DiningHalls.react');
var $ = require('jquery');

var LocationHalls = React.createClass ({

  render: function() {
    var _this = this;
    var halls = this.props.eaterydata.map(function(hall) {
      return (
        <DiningHall data={hall} />
      );
    }.bind(this));

    var divID = "locationDivs".concat(this.props.location)
    return (
      <div className="locationDivs" id={divID}>
        {halls}
      </div>
    );
  }
});

module.exports = LocationHalls;
