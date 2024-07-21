import {v4 as uuidv4} from 'uuid'

export interface Location {
  latitude: number;
  longitude: number;
}

export class Vehicle {
  public id: string;
  private plateNumber: string;
  private location: Location | null;

  constructor(plateNumber: string) {
    this.id = uuidv4();
    this.plateNumber = plateNumber;
    this.location = null;
  }

  public getLocation() {
    return this.location;
  }

  public getPlateNumber() {
    return this.plateNumber;
  }

  public setLocation(location: Location) {
    this.location = location;
  }

  public static fromJSON(json: any): Vehicle {
    const vehicle = new Vehicle(json.plateNumber);
    vehicle.id = json.id;
    vehicle.location = json.location;
    return vehicle;
  }
}