from fastapi import APIRouter

from services.risk_service import RiskService
from digital_twin import digital_twin


router = APIRouter()

risk_service = RiskService()


@router.get("/")
def get_risk_summary():

    # Get the CURRENT vehicles stored in the Digital Twin
    vehicles = digital_twin.get_all_vehicles()

    # Calculate risk from current telemetry
    risk = risk_service.get_summary(vehicles)

    return {
        "risk_index": risk.risk_index,
        "slope_stability": risk.slope_stability,
        "ventilation_flow": risk.ventilation_flow,
        "road_friction": risk.road_friction,
        "blast_clearance": risk.blast_clearance,
        "risk_class": risk.risk_class,
    }