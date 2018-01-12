//Google Maps API Scope
function initMap(){
  vm.map = new google.maps.Map(document.getElementById("map"), {
      center: {lat: -22.852477, lng: -47.053922},
      zoom: 16,
      mapTypeControl: false
  });

  vm.createMarkers();
}

function refreshMarkers(){
  for(var i=0; i< vm.markers.length; i++){
    //Remove marker, but insert again if the item is on list
    vm.markers[i].setMap(null);
    var markerLocation = vm.markers[i].getPosition();
    var places = vm.filteredPlaces();
    var j;
    for(j=0; j < places.length; j++){
      var placeLocation = new google.maps.LatLng(places[j].location);
      if(placeLocation.equals(markerLocation)){
        vm.markers[i].setMap(vm.map);
        break;
      }
    }
  }
}

//Knockout Framework Scope
//Model Object
var Place = function(name, location, category, subcategory){
  this.name = name;
  this.location = location;
  this.category = category;
  this.subcategory = subcategory;
};


//Main controller
var ViewModel = function() {
  var self = this;

  self.places = ko.observableArray([
    new Place("Dalben", {lat: -22.850176, lng: -47.054178}, "Shop", "Market"),
    new Place("Monticelli", {lat: -22.852026, lng: -47.053182}, "Restaurant", "Pizza"),
    new Place("Sohan Temakeria", {lat: -22.855726, lng: -47.055999}, "Restaurant", "Japanese"),
    new Place("Oca Restaurante", {lat: -22.854973, lng: -47.049917}, "Restaurant", "Burgers"),
    new Place("Picanharia Jasmin", {lat: -22.855390, lng: -47.049047}, "Restaurant", "Barbecue"),
    new Place("Casa do Yakisoba", {lat: -22.856151, lng: -47.044981}, "Restaurant", "Chinese"),
    new Place("Pão da Primavera", {lat: -22.858820, lng: -47.046944}, "Shop", "Bakery"),
    new Place("CPFL", {lat: -22.858250, lng: -47.045292}, "Company", "Energy"),
    new Place("Mamas e Papas", {lat: -22.855609, lng: -47.043742}, "Restaurant", "Pizza"),
    new Place("Policamp", {lat: -22.851883, lng: -47.043622}, "Education", "College"),
    new Place("Elite", {lat: -22.850697, lng: -47.043289}, "Education", "High School"),
    new Place ("Correios", {lat: -22.849342, lng: -47.044072}, "Transportation", "Delivery"),
    new Place("Ministério do Trabalho", {lat: -22.848274, lng: -47.041197}, "Government", "Law")
  ]);

  self.currentPlace = ko.observable();

  self.selectPlace = function(place){
    //Set new current place to highlight in UI
    self.currentPlace(place);
    var placeLoc = new google.maps.LatLng(place.location);
    for(var i=0; i < self.markers.length; i++){
      var marker=self.markers[i];
      if(placeLoc.equals(marker.position)){
        marker.setIcon(self.markerHighlight);
      } else{
        marker.setIcon(self.markerSimple);
      }

    }
  };

  //Create Map markers for each of the places
  self.createMarkers = function(){
    //Create simple and highlighted marker icons
    var iconBase = 'https://maps.google.com/mapfiles/kml/paddle/';
    self.markerSimple = iconBase + 'red-square.png';
    self.markerHighlight = iconBase + 'blu-square.png';

    for(var i=0; i< self.places().length;i++){
      var marker = new google.maps.Marker({
          position: self.places()[i].location,
          title: self.places()[i].name,
          animation: google.maps.Animation.DROP,
          icon: self.markerSimple,
          id: i
      });
      marker.setMap(self.map);
      self.markers.push(marker);
    };
  };

  self.filter = ko.observable();

  self.filteredPlaces = ko.computed(function(){
    var filter = self.filter();
    if(!filter){
      return self.places();
    } else {
      return ko.utils.arrayFilter(self.places(), function(place){
        return (place.name.toLowerCase().indexOf(filter.toLowerCase()) != -1);
      });
    }
  });

  //Refresh map if user updates the input field 
  self.mapRefresh = function(){
    refreshMarkers();
  }

  self.markers = [];
};

//Save Viewmodel in variable to use data outside ViewModel
var vm = new ViewModel()
ko.applyBindings(vm);
