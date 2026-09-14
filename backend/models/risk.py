from pydantic import BaseModel


class RiskAssessment(BaseModel):
    risk_index: int
    slope_stability: int
    ventilation_flow: int
    road_friction: int
    blast_clearance: int
    risk_class: str
