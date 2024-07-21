import * as fs from 'fs';
import { Fleet, Vehicle } from '../domain/entities';

class InMemoryDatabase {
  private data: {
    fleets: Fleet[];
    vehicles: Vehicle[]
  };

  constructor(private filename: string) {
    if (fs.existsSync(this.filename)) {
      this.data = JSON.parse(fs.readFileSync(this.filename, 'utf-8'));
    } else {
      this.data = { fleets: [], vehicles: [] };
      this.save();
    }
  }

  private save() {
    fs.writeFileSync(this.filename, JSON.stringify(this.data));
  }

  public getFleets() {
    return this.data.fleets;
  }

  public getVehicles() {
    return this.data.vehicles;
  }
}

export const database = new InMemoryDatabase('data.json');