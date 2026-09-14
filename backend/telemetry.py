import random
from datetime import datetime


def generate_vehicle_telemetry(vehicle):
    status = vehicle["status"]

    if status == "Operating":
        speed = random.randint(24, 32)
        fuel_change = random.uniform(0.1, 0.4)

        fuel = max(
            0,
            round(vehicle["fuel"] - fuel_change, 1)
        )

    elif status == "Idle":
        speed = 0
        fuel = vehicle["fuel"]

    else:
        speed = 0
        fuel = vehicle["fuel"]

    return {
        "id": vehicle["id"],
        "status": status,
        "speed": speed,
        "fuel": fuel,
        "temperature": random.randint(65, 85),
        "brake_pressure": random.randint(70, 95),
        "timestamp": datetime.now().isoformat()
    }