import { Fleet } from '../entities';

export interface IFleetRepository {
  save(fleet: Fleet): Promise<void>;
  findById(id: string): Promise<Fleet | null>;
}