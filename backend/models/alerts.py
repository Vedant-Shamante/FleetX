from fastapi import APIRouter

router = APIRouter()


@router.get("/")
def list_alerts():

    alerts = [
        {
            "id": "A-1001",
            "type": "High slope instability detected",
            "severity": "high",
            "zone": "North wall",
            "time": "2 min ago"
        },
        {
            "id": "A-1002",
            "type": "Low ventilation flow",
            "severity": "medium",
            "zone": "Zone B",
            "time": "8 min ago"
        },
        {
            "id": "A-1003",
            "type": "Reduced road friction",
            "severity": "medium",
            "zone": "Haul road 03",
            "time": "12 min ago"
        }
    ]

    high_count = sum(
        1
        for alert in alerts
        if alert["severity"].lower() == "high"
    )

    medium_count = sum(
        1
        for alert in alerts
        if alert["severity"].lower() == "medium"
    )

    return {
        "alerts": alerts,
        "total": len(alerts),
        "high": high_count,
        "medium": medium_count
    }