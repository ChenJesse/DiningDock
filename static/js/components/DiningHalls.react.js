/** @jsx React.DOM */

var React = require('react');
var Menu = require('./Menus.react');
var $ = require('jquery');

var defaultMenu = {
  "descr": "N/A",
  "start": "N/A",
  "food_items": [],
  "open_hours": "N/A"
}

var DiningHall = React.createClass({

  onClick: function(hall_name) {
    var divID = '#'.concat(hall_name.replace(/\s+/g, '').replace('!', '').replace("\'", '').replace("&", '').concat("Wrapper"));
    $(divID).slideToggle(200);
  },

  render: function() {
    var _this = this;
    var hall_name = this.props.data.name;
    var hall_name_class = "hallnameDiv " + this.props.data.status;
    var hall_name_id = hall_name.replace(/\s+/g, '').replace('!', '').replace("\'", '').replace("&", '').concat("Wrapper");
    var peak = this.props.data.peak;
    var currentDate = (new Date()).toISOString().slice(0, 10);    

    var menus = this.props.data.operatingHours.map(function(day) {
      if (day.date == currentDate) {
        if (day.events.length == 0) {
          return (
            <p>
              There is no menu information for today.
            </p>
          )
        }
        return day.events.map(function(event) {
          return (
            <Menu data={event}/>
          )
        });
      } 
    });

    return (
      <div className="dininghallDiv">
        <div className={hall_name_class} onClick={_this.onClick.bind(_this, hall_name)}>
          {hall_name} (peak: {peak})
        </div>
        <div className="menuDivWrapper" id={hall_name_id}>
          {menus}
        </div>
      </div>
    );
  }
});

module.exports = DiningHall;
