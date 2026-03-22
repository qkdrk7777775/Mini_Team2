from fastapi import APIRouter
from schemas.analysis import AnalysisRequest
from controllers.analysis import analysis_controller

router = APIRouter(tags=["analysis"])

# @router.post("/analysis")
# def analyze(request: AnalysisRequest):
#     return analysis_controller(request)

router.add_api_route("/analysis", analysis_controller, methods=["POST"])