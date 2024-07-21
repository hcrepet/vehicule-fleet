import { Command } from 'commander';
import { VehicleService } from './app/services/VehicleService';
import { VehicleRepository } from './infra/repositories/VehicleRepository';
import { FleetService } from './app/services/FleetService';
import { FleetRepository } from './infra/repositories/FleetRepository';


const program = new Command();

program
  .name('fleet')
  .description('Fleet CLI')
  .version('1.0.0');

program
  .command('create <userId>')
  .description('Create a fleet for a user')
  .action(async (userId: string) => {
    const fleetRepository = new FleetRepository();
    const fleetService = new FleetService(fleetRepository);

    const fleet = await fleetService.create(userId);
    console.log(`Fleet ID : ${fleet.id}`);
  });

program
  .command('register-vehicle <fleetId> <vehiclePlateNumber>')
  .description('Assign a vehicle to an existing fleet')
  .action(async (fleetId: string, vehiclePlateNumber: string) => {
    const fleetRepository = new FleetRepository();
    const fleetService = new FleetService(fleetRepository);
    const vehicleRepository = new VehicleRepository();
    const vehicleService = new VehicleService(
      vehicleRepository,
      fleetRepository,
      fleetService
    );

    await vehicleService.register(fleetId, vehiclePlateNumber);
    console.log(`Vehicle '${vehiclePlateNumber}' registered`);
  })

program
  .command('localize-vehicle <fleetId> <vehiclePlateNumber> <latitude> <longitude>')
  .description('Localizing a vehicle')
  .action(async (
      fleetId: string,
      vehiclePlateNumber: string,
      latitude: number,
      longitude: number
    ) => {
    const fleetRepository = new FleetRepository();
    const fleetService = new FleetService(fleetRepository);
    const vehicleRepository = new VehicleRepository();
    const vehicleService = new VehicleService(
      vehicleRepository,
      fleetRepository,
      fleetService
    );

    await vehicleService.localize(
      fleetId,
      vehiclePlateNumber,
      {
        latitude,
        longitude
      }
    );
    console.log(`The position of '${vehiclePlateNumber}' has been recorded`);
  })

program.parse(process.argv);