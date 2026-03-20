import React, { useState } from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import "../css/HRBalanceChartCard.css";

// 지표별 상세 로직
const descriptions = {
  임금: "(기관 평균 보수 / 공공기관 전체 평균 보수) 비율 점수",
  채용: "공시데이터 기반(지원 경쟁률 X 채용 달성도) 경쟁력 점수",
  건강도: "조직 리스크 및 운영 지표의 AI 머신러닝(ML) 종합 진단 점수",
  유연근무: "전체 임직원수 대비 유연근무(원격·시차 등) 실제 사용 비중점수",
  이탈방어: "나이·근속·성과 변수를 활용한 AI 머신러닝(ML) 확률 점수",
};

function HRBalanceCard({
  salaryData,
  recruitmentScore,
  healthScore,
  flexData,
  attritionRisk,
}) {
  // 마우스 이벤트
  const [hoveredDesc, setHoveredDesc] = useState("");
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  const CustomTick = ({ x, y, payload, index }) => {
    const [eng, kor] = payload.value.split("|");
    const anchor =
      index === 0 ? "middle" : index > 0 && index < 3 ? "start" : "end";

    // 0:임금(상), 1:채용(우상), 2:건강도(우하), 3:유연근무(좌하), 4:이탈방어(좌상)
    // 마이너스(-) 값이 커질수록 위로, 플러스(+) 값이 커질수록 아래로 내려갑니다.
    const verticalOffsets = ["-1.0em", "-0.2em", "0.8em", "0.8em", "-0.2em"];
    const verticalOffset = verticalOffsets[index];

    // 마우스 올렸을 때 함수
    const handleMouseEnter = (e) => {
      setHoveredDesc(descriptions[kor]);
      setTooltipPos({ x: e.pageX, y: e.pageY });
    };

    return (
      <text
        x={x}
        y={y}
        textAnchor={anchor}
        fontFamily="Pretendard"
        style={{ cursor: "help" }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => setHoveredDesc("")}
      >
        <tspan
          x={x}
          dy={verticalOffset}
          fontSize="15"
          fontWeight="700"
          fill="#333"
        >
          {eng}
        </tspan>
        <tspan x={x} dy="1.2em" fontSize="15" fontWeight="500" fill="#666">
          ({kor})
        </tspan>
      </text>
    );
  };

  // 1. 임금 경쟁력 (Wage): 우리 기관 / 전체 평균 비중 계산
  const wageIndex =
    salaryData.length > 1
      ? Math.min((salaryData[1].amount / salaryData[0].amount) * 85, 100)
      : 0;

  // 2. 유연근무 (Flex): 3가지 유형의 합계 비율
  const flexIndex =
    flexData.reduce((acc, cur) => acc + (cur.value || 0), 0) * 100;

  // 3. 이탈 방어력 (Retention): 100% - 최근 퇴사 위험도
  const lastRiskStr =
    attritionRisk.length > 0
      ? attritionRisk[attritionRisk.length - 1].rate
      : "0%";
  const lastRiskNum = parseFloat(lastRiskStr.replace("%", "")) || 0;
  const stabilityIndex = 100 - lastRiskNum;

  // 차트 데이터
  const data = [
    { subject: "Wage|임금", A: wageIndex },
    { subject: "Recruit|채용", A: recruitmentScore },
    { subject: "Health|건강도", A: healthScore },
    { subject: "Flex|유연근무", A: flexIndex },
    { subject: "Retention|이탈방어", A: stabilityIndex },
  ];

  // 마우스 안내창 (한글만 출력)
  const formatTooltipLabel = (label) => {
    if (typeof label === "string" && label.includes("|")) {
      return label.split("|")[1]; // 구분자(|) 뒤의 한글만 반환
    }
    return label;
  };

  // 마우스 안내창(오각형 각 점수 소수점 1자리 까지만 출력)
  const formatTooltipValue = (value) => [
    Number(value).toFixed(1) + "점",
    "점수",
  ];

  return (
    <div className="card-box card-top balance-card">
      <div className="card-header-custom">
        <h3 className="eng-title">HR Balance </h3>
        <p className="kor-title">기관 역량 밸런스 </p>
        <h4 className="kor-sub">데이터 기반 종합 역량 진단</h4>
        <p className="card-content-title">*점수산출 근거</p>
        <p className="card-content">
          공공데이터포털,알리오(ALIO)등 공공기관 공개시스템의 공식 데이터를
          기반으로, AI 머신러닝(ML) Random Forest 모델이 직원수, 나이, 연봉,
          근무등 수만 건의 공공기관 인력 데이터를 학습, 상관관계를 분석하여 결과
          산출
        </p>
      </div>
      <div className="card-content balance-content">
        <ResponsiveContainer
          width="100%"
          aspect={1}
          style={{ maxWidth: "450px", margin: "0 auto" }}
        >
          <RadarChart cx="52%" cy="45%" outerRadius="65%" data={data}>
            <PolarGrid stroke="#adb5bd" />
            <PolarAngleAxis dataKey="subject" tick={<CustomTick />} />

            <Tooltip
              labelFormatter={formatTooltipLabel}
              formatter={formatTooltipValue}
              separator=": "
              labelStyle={{
                fontWeight: "800",
                color: "#000000",
                fontSize: "15px",
              }}
              contentStyle={{
                borderRadius: "8px",
                border: "1px solid #b6db76",
                fontSize: "15px",
              }}
              itemStyle={{ color: "#295c09", fontWeight: "800" }}
            />

            <Radar
              name="Index"
              dataKey="A"
              stroke="#6fa74b"
              fill="#6fa74b"
              fillOpacity={0.6}
            />
          </RadarChart>
        </ResponsiveContainer>
        {hoveredDesc && (
          <div
            className="logic-tooltip-bubble"
            style={{
              position: "fixed",
              top: tooltipPos.y - 60,
              left: tooltipPos.x + 15,
              zIndex: 1000,
              backgroundColor: "rgba(52, 58, 64, 0.95)",
              color: "#fff",
              padding: "10px 15px",
              borderRadius: "8px",
              fontSize: "15px",
              pointerEvents: "none",
              boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
            }}
          >
            {hoveredDesc}
          </div>
        )}

        <div className="balance-info-text">
          종합 진단 점수:{" "}
          <strong className="balance-info-sc">
            {Number(healthScore).toFixed(1)}
          </strong>{" "}
          점
        </div>
      </div>
    </div>
  );
}

export default HRBalanceCard;
