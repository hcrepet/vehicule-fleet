const assert = require('assert');
const { Given, When, Then } = require('@cucumber/cucumber');

const parkVehicleToLocation = (vehicle, location) => {
  if(vehicle && location && vehicle.location != location) {
    vehicle.location = location;
  }
}

Given('a location', function () {
  this.location = {
    latitude: 15,
    longitude: 30,
  };
})

Given('my vehicle has been parked into this location', function () {
  parkVehicleToLocation(this.vehicle, this.location);
})

When('I park my vehicle at this location', function () {
  parkVehicleToLocation(this.vehicle, this.location);
})

When('I try to park my vehicle at this location', function () {
  parkVehicleToLocation(this.vehicle, this.location);
})

Then(
  'the known location of my vehicle should verify this location',
  function () {
    assert(this.vehicle.location == this.location);
  }
)

Then(
  'I should be informed that my vehicle is already parked at this location',
  function () {
    assert(this.vehicle.location == this.location);
  }
)