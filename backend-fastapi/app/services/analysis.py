from sqlalchemy import text
from utils.database import engine

def analyze_institution(
    institution,
    age,
    gender,
    tenure_years,
    performance_grade,
    workload_level,
    flexible_work
):

    query = text("""
        SELECT institution_name, avg_salary, hire_rate
        FROM institution_table
        WHERE institution_name = :institution
    """)

    with engine.connect() as conn:
        row = conn.execute(query, {
            "institution": institution
        }).mappings().first()

    if not row:
        raise Exception("기관 데이터를 찾을 수 없습니다")

    # 입력값 기반 점수 계산 (예시)
    score = 0

    score += age * 0.1
    score += tenure_years * 2

    if performance_grade == "A":
        score += 20
    elif performance_grade == "B":
        score += 10

    if workload_level == "높음":
        score -= 5

    if flexible_work == "가능":
        score += 10

    final_score = score + row["avg_salary"] * 0.01

    return {
        "institution": row["institution_name"],
        "input_score": score,
        "salary_factor": row["avg_salary"],
        "final_score": final_score
    }