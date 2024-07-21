import { Fleet } from '../entities/Fleet';

export interface IFleetRepository {
  save(fleet: Fleet): Promise<void>;
  findById(id: string): Promise<Fleet | null>;
}