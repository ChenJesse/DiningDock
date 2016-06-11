   /** @jsx React.DOM */

var React = require('react');
var LocationHalls = require('./LocationHalls.react');
var $ = require('jquery');

var AllHalls = React.createClass ({

  parseJSON: function() {
    var eateries = this.state.eaterydata.data.eateries;
    var eateryToTrafficData = {};
    this.state.trafficdata.forEach(function(eatery) {
      eateryToTrafficData[eatery.location] = eatery;
    });
    eateries.forEach(function(eatery) {
      $.extend(eatery, eateryToTrafficData[eatery.name])
    });
    return ([
            $.grep(eateries, (function(e) { return e.campusArea.descrshort == "North" })),
            $.grep(eateries, (function(e) { return e.campusArea.descrshort == "West" })),
            $.grep(eateries, (function(e) { return e.campusArea.descrshort == "Central" }))
            ]);
  },

  getInitialState: function(){
    return {
      eaterydata: [],
      trafficdata: [],
    };
  },

  onClick: function(location) {
    var div_id = '';
      if (location === "north") {
        div_id = "#locationDivsNorth";
      }
      else if (location === "central") {
        div_id = "#locationDivsCentral";
      }
      else if (location === "west") {
        div_id = "#locationDivsWest"
      }
      $(div_id).slideToggle(200);
    },

  componentDidMount: function() {
    $.ajax({
      url: this.props.eateryurl,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({eaterydata: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
    $.ajax({
      url: this.props.trafficurl,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({trafficdata: data.diners});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  render: function() {
    if (this.state.eaterydata.length == 0) {
      return (<div></div>);
    }
    var _this = this;
    var nestedEateries = this.parseJSON();
    return (
      <div className="alllocationDiv">
        <div className="campusDiv" id="North">
          <div className="locationheaderDiv" id="locationheaderDivNorth" onClick={_this.onClick.bind(_this, 'north')}> 
            <th className="campuslocation">North Campus <div className="cornelllogo"></div></th>
          </div>
          <LocationHalls eaterydata={nestedEateries[0]} location='North' />
        </div>
        <div className="campusDiv" id="Central">
          <div className="locationheaderDiv" id="locationheaderDivCentral" onClick={_this.onClick.bind(_this, 'central')}>
            <th className="campuslocation">Central Campus <div className="cornelllogo"></div></th>
          </div>
          <LocationHalls eaterydata={nestedEateries[1]} location='Central' />
        </div>
        <div className="campusDiv" id="West">
          <div className="locationheaderDiv" id="locationheaderDivWest" onClick={_this.onClick.bind(_this, 'west')}>
            <th className="campuslocation">West Campus <div className="cornelllogo"></div></th>
          </div>
          <LocationHalls eaterydata={nestedEateries[2]} location='West' />
        </div>
      </div>
    )
  }
});

React.render(
  <AllHalls eateryurl="https://now.dining.cornell.edu/api/1.0/dining/eateries.json" trafficurl="http://cornellpulse.com:3000/api"/>,
  document.getElementById('menus')
);

module.exports = AllHalls;
