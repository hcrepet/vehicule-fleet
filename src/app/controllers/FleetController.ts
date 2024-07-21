import { Request, Response } from 'express';
import { FleetService } from '../services';

export class FleetController {
  constructor(private fleetService: FleetService) {}

  async create(req: Request, res: Response) {
    const { userId } = req.body;
    
    if (!userId) {
      res.status(400).send({ message: 'Please provide a correct user ID' });
      return;
    }

    try {
      const fleet = await this.fleetService.create(userId);
      res.status(200).send({ message: `Fleet ID : ${fleet.id}` });
    } catch (e) {
      res.status(400).send({ error: (e as Error).message });
    }
  }
}