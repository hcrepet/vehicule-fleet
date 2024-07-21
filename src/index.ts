import express from 'express';
import { VehicleController } from './app/controllers/VehicleController';
import { VehicleService } from './app/services/VehicleService';
import { VehicleRepository } from './infra/repositories/VehicleRepository';
import { FleetController } from './app/controllers/FleetController';
import { FleetService } from './app/services/FleetService';
import { FleetRepository } from './infra/repositories/FleetRepository';

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