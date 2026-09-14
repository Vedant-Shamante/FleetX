from fastapi import APIRouter

from digital_twin import digital_twin


router = APIRouter()


@router.get("/")
def get_digital_twin():

    return digital_twin.get_state()