from fastapi.responses import JSONResponse
from fastapi import status
from services.analysis import analyze_institution

from schemas.analysis import AnalysisRequest
def analysis_controller(req: AnalysisRequest):
    try:
        print(req)
        result = analyze_institution(
            req.institution,
            req.age,
            req.gender,
            req.tenure_years,
            req.performance_grade,
            req.workload_level,
            req.flexible_work
        )

        return JSONResponse(
            status_code=status.HTTP_200_OK,
            content={
                "message": "분석 데이터 수집 완료",
                "data": result
            }
        )

    except Exception as e:
        return JSONResponse(
            status_code=status.HTTP_400_BAD_REQUEST,
            content={
                "message": f"분석 실패: {str(e)}"
            }
        )