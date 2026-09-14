from models.vehicle import Vehicle


class VehicleService:
    def get_all(self):
        return [
            Vehicle(id="V01", status="Operating", speed=28, fuel=82, route="North haul"),
            Vehicle(id="V08", status="Idle", speed=0, fuel=61, route="Service bay"),
            Vehicle(id="V14", status="Maintenance", speed=0, fuel=43, route="Workshop"),
        ]

    def get_by_id(self, vehicle_id: str):
        vehicles = self.get_all()
        for vehicle in vehicles:
            if vehicle.id == vehicle_id:
                return vehicle
        return None
