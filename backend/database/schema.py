from sqlalchemy import Column, Integer, String, Float

from database.database import Base


class VehicleRecord(Base):
    __tablename__ = "vehicles"

    id = Column(String, primary_key=True, index=True)
    status = Column(String, nullable=False)
    speed = Column(Float, default=0.0)
    fuel = Column(Float, default=0.0)
    route = Column(String, nullable=True)


class AlertRecord(Base):
    __tablename__ = "alerts"

    id = Column(String, primary_key=True, index=True)
    type = Column(String, nullable=False)
    severity = Column(String, nullable=False)
    zone = Column(String, nullable=False)
    message = Column(String, nullable=True)


class RiskRecord(Base):
    __tablename__ = "risk_assessments"

    id = Column(Integer, primary_key=True, index=True)
    risk_index = Column(Integer, nullable=False)
    slope_stability = Column(Integer, nullable=False)
    ventilation_flow = Column(Integer, nullable=False)
    road_friction = Column(Integer, nullable=False)
    blast_clearance = Column(Integer, nullable=False)
    risk_class = Column(String, nullable=False)
