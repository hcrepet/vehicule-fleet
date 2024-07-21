import { Request, Response } from 'express';
import { VehicleService } from '../services/VehicleService';

export class VehicleController {
  constructor(private vehicleService: VehicleService) {}

  async registerVehicle(req: Request, res: Response) {
    const { fleetId, vehiclePlateNumber } = req.body;

    try {
      await this.vehicleService.register(fleetId, vehiclePlateNumber);
      res.status(200).send({
        message: `Vehicle ${vehiclePlateNumber} registered succesfully`
      });
    } catch (e) {
      res.status(400).send({ error: (e as Error).message });
    }
  }

  async localizeVehicle(req: Request, res: Response) {
    const { fleetId, vehiclePlateNumber, latitude, longitude } = req.body;

    try {
      await this.vehicleService.localize(
        fleetId,
        vehiclePlateNumber,
        {
          latitude,
          longitude
        }
      );
      res.status(200).send({
        message: `Vehicle ${vehiclePlateNumber} localized successfully`
      });
    } catch (e) {
      res.status(400).send({ error: (e as Error).message });
    }
  }
}