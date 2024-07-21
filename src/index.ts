import express from 'express';
import { FleetController, VehicleController } from './app/controllers';
import { FleetService, VehicleService } from './app/services';
import { FleetRepository, VehicleRepository } from './infra/repositories';

export const app = express();
app.use(express.json());

const PORT = 3000;

const fleetRepository = new FleetRepository();
const vehicleRepository = new VehicleRepository();

const fleetService = new FleetService(fleetRepository);
const vehicleService = new VehicleService(
  vehicleRepository,
  fleetRepository,
  fleetService
);

const fleetController = new FleetController(fleetService);
const vehicleController = new VehicleController(vehicleService);

app.post('/fleet/create', (req, res) => fleetController.create(req, res));

app.post('/vehicles/register', (req, res) => vehicleController.registerVehicle(req, res));
app.post('/vehicles/localize', (req, res) => vehicleController.localizeVehicle(req, res));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});