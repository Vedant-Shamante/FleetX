from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api import digital_twin

from api.vehicles import router as vehicles_router
from api.alerts import router as alerts_router
from api.risk import router as risk_router
from api.operations import router as operations_router
from api.adaptation import router as adaptation_router


app = FastAPI(
    title="MineGuard Digital Twin API",
    description="Operational API for vehicle telemetry, alerts, risk, operations, and adaptive workflows.",
    version="1.0.0",
)


# --------------------------------------------------
# CORS
# --------------------------------------------------

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# --------------------------------------------------
# API ROUTERS
# --------------------------------------------------

app.include_router(
    vehicles_router,
    prefix="/api/vehicles",
    tags=["Vehicles"]
)

app.include_router(
    alerts_router,
    prefix="/api/alerts",
    tags=["Alerts"]
)

app.include_router(
    risk_router,
    prefix="/api/risk",
    tags=["Risk"]
)

app.include_router(
    operations_router,
    prefix="/api/operations",
    tags=["Operations"]
)

app.include_router(
    adaptation_router,
    prefix="/api/adaptation",
    tags=["Adaptation"]
)
app.include_router(
    digital_twin.router,
    prefix="/api/digital-twin"
)

# --------------------------------------------------
# ROOT
# --------------------------------------------------

@app.get("/")
def root():
    return {
        "service": "MineGuard Digital Twin API",
        "status": "online",
        "version": "1.0.0"
    }


# --------------------------------------------------
# HEALTH CHECK
# --------------------------------------------------

@app.get("/health")
def health_check():
    return {
        "status": "ok",
        "service": "MineGuard Digital Twin API"
    }


# --------------------------------------------------
# SERVER
# --------------------------------------------------

if __name__ == "__main__":
    import uvicorn

    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True
    )