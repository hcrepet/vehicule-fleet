import { Vehicle } from './Vehicle';
import {v4 as uuidv4} from 'uuid'

export class Fleet {
  public id: string;
  public ownerId: string;
  private vehicles: Vehicle[];

  constructor(ownerId: string) {
    this.id = uuidv4();
    this.ownerId = ownerId;
    this.vehicles = [];
  }

  public addVehicle(vehicle: Vehicle) {
    this.vehicles.push(vehicle);
  }

  public getVehicles() {
    return this.vehicles;
  }

  public static fromJSON(json: any): Fleet {
    const fleet = new Fleet(json.ownerId);
    fleet.id = json.id;
    fleet.vehicles = json.vehicles.map((v: Vehicle) => Vehicle.fromJSON(v));
    return fleet;
  }
}