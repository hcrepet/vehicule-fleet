import * as fs from 'fs';
import { IFleetRepository } from '../../domain/repositories';
import { Fleet } from '../../domain/entities';
import { database } from '../InMemoryDatabase';

export class FleetRepository implements IFleetRepository {
  private filename: string = 'data.json';

  async save(fleet: Fleet): Promise<void> {
    const data = JSON.parse(fs.readFileSync(this.filename, 'utf-8'));
    const index = data.fleets.findIndex((f: any) => f.id === fleet.id);

    if (index >= 0) {
      data.fleets[index] = fleet;
    } else {
      data.fleets.push(fleet);
    }

    fs.writeFileSync(this.filename, JSON.stringify(data));
  }

  async findById(id: string): Promise<Fleet | null> {
    const fleet = database.getFleets().find(fleet => fleet.id === id) || null;
    return fleet ? Fleet.fromJSON(fleet) : null;
  }
}