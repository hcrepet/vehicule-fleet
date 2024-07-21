import { IVehicleRepository, IFleetRepository } from '../../domain/repositories'
import { FleetService } from './FleetService';
import { Vehicle, Location, Fleet } from '../../domain/entities';

export class VehicleService {
  constructor(
    private vehicleRepository: IVehicleRepository,
    private fleetRepository: IFleetRepository,
    private fleetService: FleetService
  ) {}

  isSameLocation(vehicle: Vehicle, location: Location) {
    return (
      vehicle.getLocation()?.latitude === location.latitude
      && vehicle.getLocation()?.longitude === location.longitude
    )
  }

  isAlreadyRegistered(fleet: Fleet, vehiclePlateNumber: string) {
    return fleet.getVehicles().find(
      vehicle => vehicle.getPlateNumber() === vehiclePlateNumber
    );
  }

  async register(fleetId: string, vehiclePlateNumber: string) {
    const fleet = await this.fleetRepository.findById(fleetId);

    if (!fleet) {
      throw new Error('Fleet not found');
    }
    if (this.isAlreadyRegistered(fleet, vehiclePlateNumber)) {
      throw new Error('Vehicle already registered on this fleet');
    }

    try {
      const vehicle = new Vehicle(vehiclePlateNumber);
      
      await this.fleetService.addVehicleToFleet(fleet, vehicle);
      await this.vehicleRepository.save(vehicle);
      await this.fleetRepository.save(fleet);

      return vehicle;
    } catch(e) {
      throw new Error(`Could not add vehicle to fleet : ${(e as Error).message}`);
    }
  }

  async localize(fleetId: string, vehiclePlateNumber: string, location: Location) {
    const fleet = await this.fleetRepository.findById(fleetId);
    const vehicle = await this.vehicleRepository.findByPlateNumber(vehiclePlateNumber);

    if (!fleet || !vehicle) {
      throw new Error('Fleet or vehicle not found');
    }
    if (this.isSameLocation(vehicle, location)) {
      throw new Error('Vehicle already parked at this location');
    }

    try {
      vehicle.setLocation(location);

      await this.vehicleRepository.save(vehicle);

      return vehicle;
    } catch(e) {
      throw new Error(`Could not add vehicle to fleet : ${(e as Error).message}`);
    }
  }
}