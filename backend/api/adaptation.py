from fastapi import APIRouter

router = APIRouter()


@router.get("/")
def get_adaptation_summary():
    return {
        "scenarios": 12,
        "optimized_routes": 8,
        "fuel_savings": 6.2,
        "response_time_minutes": 4.2,
        "recommended_action": "Shift dump timing and reroute truck dispatch"
    }