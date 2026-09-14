from fastapi import APIRouter
from datetime import datetime

from digital_twin import digital_twin


router = APIRouter()


def create_alert(
    alert_id,
    alert_type,
    severity,
    vehicle_id,
    message
):
    return {
        "id": alert_id,
        "type": alert_type,
        "severity": severity,
        "zone": vehicle_id,
        "time": message
    }


@router.get("/")
def list_alerts():

    alerts = []

    vehicles = digital_twin.get_all_vehicles()

    alert_number = 1000

    for vehicle in vehicles:

        vehicle_id = vehicle.get("id", "UNKNOWN")

        temperature = float(
            vehicle.get("temperature", 0)
        )

        brake_pressure = float(
            vehicle.get("brake_pressure", 100)
        )

        fuel = float(
            vehicle.get("fuel", 100)
        )

        # -----------------------------------------
        # HIGH TEMPERATURE
        # -----------------------------------------

        if temperature >= 80:

            alert_number += 1

            alerts.append(
                create_alert(
                    f"A-{alert_number}",
                    "High vehicle temperature",
                    "high",
                    vehicle_id,
                    "Live telemetry"
                )
            )

        # -----------------------------------------
        # LOW BRAKE PRESSURE
        # -----------------------------------------

        if brake_pressure < 50:

            alert_number += 1

            alerts.append(
                create_alert(
                    f"A-{alert_number}",
                    "Low brake pressure",
                    "high",
                    vehicle_id,
                    "Live telemetry"
                )
            )

        elif brake_pressure < 70:

            alert_number += 1

            alerts.append(
                create_alert(
                    f"A-{alert_number}",
                    "Reduced brake pressure",
                    "medium",
                    vehicle_id,
                    "Live telemetry"
                )
            )

        # -----------------------------------------
        # LOW FUEL
        # -----------------------------------------

        if fuel < 20:

            alert_number += 1

            alerts.append(
                create_alert(
                    f"A-{alert_number}",
                    "Low vehicle fuel",
                    "medium",
                    vehicle_id,
                    "Live telemetry"
                )
            )

    # -----------------------------------------
    # COUNTS
    # -----------------------------------------

    high_count = sum(
        1
        for alert in alerts
        if alert["severity"] == "high"
    )

    medium_count = sum(
        1
        for alert in alerts
        if alert["severity"] == "medium"
    )

    return {
        "alerts": alerts,
        "total": len(alerts),
        "high": high_count,
        "medium": medium_count
    }