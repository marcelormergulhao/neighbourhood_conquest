//Google Maps API Scope
var map;
function initMap(){
  map = new google.maps.Map(document.getElementById("map"), {
      center: {lat: -22.852477, lng: -47.053922},
      zoom: 15,
      mapTypeControl: false
  });
}

//Knockout Framework Scope
//Model Object
var Restaurant = function(name, location, food){
  this.name = name;
  this.location = location;
  this.food = food;
};


//Main controller
var ViewModel = function() {
  var self = this;

  self.restaurants = ko.observableArray([
    new Restaurant("Supermarket", {lat: -22.850176, lng: -47.054178}, "Market"),
    new Restaurant("Pizza Shop", {lat: -22.847813, lng: -47.052837}, "Pizza"),
    new Restaurant("Japanese Shop", {lat: -22.854882, lng: -47.051490}, "Japanese")
  ]);
};

ko.applyBindings(new ViewModel());
