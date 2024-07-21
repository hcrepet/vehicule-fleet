const assert = require('assert');
const { Given, When, Then } = require('@cucumber/cucumber');

const addVehicleToFleet = (fleet, vehicle) => {
  if(fleet && !fleet.vehicle.includes(vehicle) && vehicle) {
    fleet.vehicle.push(vehicle);
  }
}

Given('my fleet', function () {
  this.myFleet = {
    id: 1,
    vehicle: [],
  };
})

Given('a vehicle', function () {
  this.vehicle = {
    id: 1,
    type: 'car',
    location: {
      latitude: null,
      longitude: null,
    }
  };
})

Given('I have registered this vehicle into my fleet', function () {
  addVehicleToFleet(this.myFleet, this.vehicle);
})

Given('the fleet of another user', function () {
  this.otherUserFleet = {
    id: 2,
    vehicle: [],
  };
})

Given("this vehicle has been registered into the other user's fleet", function () {
  addVehicleToFleet(this.otherUserFleet, this.vehicle);
})

When('I register this vehicle into my fleet', function () {
  addVehicleToFleet(this.myFleet, this.vehicle);
})

When('I try to register this vehicle into my fleet', function () {
  addVehicleToFleet(this.myFleet, this.vehicle);
})

Then('this vehicle should be part of my vehicle fleet', function () {
  assert(this.myFleet.vehicle.includes(this.vehicle));
})

Then(
  'I should be informed that this vehicle has already been registered into my fleet',
  function () {
    assert(this.myFleet.vehicle.includes(this.vehicle));
  }
)
