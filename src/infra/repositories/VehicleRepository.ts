import * as fs from 'fs';
import { IVehicleRepository } from '../../domain/repositories';
import { Vehicle } from '../../domain/entities';
import { database } from '../InMemoryDatabase';

export class VehicleRepository implements IVehicleRepository {
  private filename: string = 'data.json';

  async save(vehicle: Vehicle): Promise<void> {
    const data = JSON.parse(fs.readFileSync(this.filename, 'utf-8'));
    const index = data.vehicles.findIndex((f: any) => f.id === vehicle.id);

    if (index >= 0) {
      data.vehicles[index] = vehicle;
    } else {
      data.vehicles.push(vehicle);
    }

    fs.writeFileSync(this.filename, JSON.stringify(data));
  }

  async findById(id: string): Promise<Vehicle | null> {
    const vehicle = database.getVehicles().find(vehicle => vehicle.id === id) || null;
    return vehicle ? Vehicle.fromJSON(vehicle) : null;
  }

  async findByPlateNumber(plateNumber: string): Promise<Vehicle | null> {
    const vehicle = database.getVehicles().find(
      vehicle => Vehicle.fromJSON(vehicle).getPlateNumber() === plateNumber
    );

    return vehicle ? Vehicle.fromJSON(vehicle) : null;
  }
}