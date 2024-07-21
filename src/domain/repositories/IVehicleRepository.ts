import { Vehicle } from '../entities/Vehicle';

export interface IVehicleRepository {
  save(vehicle: Vehicle): Promise<void>;
  findById(id: string): Promise<Vehicle | null>;
  findByPlateNumber(plateNumber: string): Promise<Vehicle | null>;
}