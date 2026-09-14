from fastapi import APIRouter

router = APIRouter()


@router.get("/")
def get_operations_summary():
    return {
        "ore_moved": "18.4k t",
        "cycle_efficiency": 89,
        "throughput": "1,640 t/h",
        "downtime": 3.4,
        "status": "live",
    }