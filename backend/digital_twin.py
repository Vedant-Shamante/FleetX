from datetime import datetime


class DigitalTwinState:
    def __init__(self):
        self.vehicles = {}
        self.last_update = None

    def update_vehicle(self, telemetry):
        vehicle_id = telemetry["id"]

        self.vehicles[vehicle_id] = telemetry
        self.last_update = datetime.now().isoformat()

    def get_vehicle(self, vehicle_id):
        return self.vehicles.get(vehicle_id)

    def get_all_vehicles(self):
        return list(self.vehicles.values())

    def get_state(self):
        return {
            "vehicles": self.get_all_vehicles(),
            "vehicle_count": len(self.vehicles),
            "last_update": self.last_update,
        }


digital_twin = DigitalTwinState()