import { IFleetRepository } from '../../domain/repositories';
import { Fleet, Vehicle } from '../../domain/entities';

export class FleetService {
  constructor(
    private fleetRepository: IFleetRepository,
  ) {}

  async create(userId: string) {
    try {
      const fleet = new Fleet(userId);

      await this.fleetRepository.save(fleet);

      return fleet;
    } catch(e) {
      throw new Error(`Could not create fleet : ${(e as Error).message}`);
    }
  }

  async addVehicleToFleet(fleet: Fleet, vehicle: Vehicle) {
    try {
      fleet.addVehicle(vehicle);

      await this.fleetRepository.save(fleet);

      return fleet;
    } catch(e) {
      throw new Error((e as Error).message);
    }
  }
}