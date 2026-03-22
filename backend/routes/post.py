from fastapi import APIRouter
from controllers.post import get_dashboard_controller

router = APIRouter(prefix="/dashboard", tags=["dashboard"])

router.add_api_route("/{institution}", get_dashboard_controller, methods=["GET"])