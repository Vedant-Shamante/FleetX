from fastapi import APIRouter
from telemetry import generate_vehicle_telemetry
from digital_twin import digital_twin

router = APIRouter()


vehicles = [
    {"id": "V01", "status": "Operating", "speed": 28, "fuel": 82},
    {"id": "V02", "status": "Operating", "speed": 31, "fuel": 76},
    {"id": "V03", "status": "Operating", "speed": 27, "fuel": 88},
    {"id": "V04", "status": "Operating", "speed": 29, "fuel": 71},
    {"id": "V05", "status": "Operating", "speed": 26, "fuel": 84},
    {"id": "V06", "status": "Operating", "speed": 30, "fuel": 79},
    {"id": "V07", "status": "Operating", "speed": 25, "fuel": 91},
    {"id": "V08", "status": "Operating", "speed": 28, "fuel": 68},
    {"id": "V09", "status": "Operating", "speed": 32, "fuel": 73},
    {"id": "V10", "status": "Operating", "speed": 27, "fuel": 86},
    {"id": "V11", "status": "Operating", "speed": 29, "fuel": 80},
    {"id": "V12", "status": "Operating", "speed": 24, "fuel": 65},
    {"id": "V13", "status": "Operating", "speed": 30, "fuel": 77},
    {"id": "V14", "status": "Maintenance", "speed": 0, "fuel": 43},
    {"id": "V15", "status": "Operating", "speed": 26, "fuel": 89},
    {"id": "V16", "status": "Operating", "speed": 28, "fuel": 75},
    {"id": "V17", "status": "Operating", "speed": 31, "fuel": 81},
    {"id": "V18", "status": "Operating", "speed": 27, "fuel": 83},
    {"id": "V19", "status": "Operating", "speed": 29, "fuel": 72},
    {"id": "V20", "status": "Operating", "speed": 25, "fuel": 87},
    {"id": "V21", "status": "Operating", "speed": 30, "fuel": 78},
    {"id": "V22", "status": "Operating", "speed": 28, "fuel": 85},
    {"id": "V23", "status": "Operating", "speed": 26, "fuel": 74},
    {"id": "V24", "status": "Operating", "speed": 32, "fuel": 69},
    {"id": "V25", "status": "Operating", "speed": 27, "fuel": 90},
    {"id": "V26", "status": "Idle", "speed": 0, "fuel": 62},
    {"id": "V27", "status": "Idle", "speed": 0, "fuel": 58},
    {"id": "V28", "status": "Idle", "speed": 0, "fuel": 71},
    {"id": "V29", "status": "Idle", "speed": 0, "fuel": 66},
    {"id": "V30", "status": "Maintenance", "speed": 0, "fuel": 38},
]


@router.get("/")
def list_vehicles():
    telemetry_data = []

    for vehicle in vehicles:
        telemetry = generate_vehicle_telemetry(vehicle)

        # Update Digital Twin with latest vehicle telemetry
        digital_twin.update_vehicle(telemetry)

        telemetry_data.append(telemetry)

    return {
        "vehicles": telemetry_data,
        "digital_twin": {
            "vehicle_count": len(digital_twin.vehicles),
            "last_update": digital_twin.last_update
        }
    }


@router.get("/{vehicle_id}")
def get_vehicle(vehicle_id: str):
    for vehicle in vehicles:

        if vehicle["id"].upper() == vehicle_id.upper():
            telemetry = generate_vehicle_telemetry(vehicle)

            # Update Digital Twin
            digital_twin.update_vehicle(telemetry)

            return telemetry

    return {
        "error": "Vehicle not found",
        "id": vehicle_id
    }