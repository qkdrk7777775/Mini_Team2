import GaugeChart from "react-gauge-chart";
import "../css/RecruitmentGaugeCard.css";

const RecruitmentGaugeCard = ({ score, gradeInfo }) => {
  const gaugeColor = ["#ff8585", "#7dc24f", "#76b7f3"];

  return (
    <div className="recruitment-group-container">
      {/* 게이지 메인 카드 */}
      <div className="card-box recruitment-main-card">
        <div className="card-header">
          <div className="eng-title">Hiring Index</div>
          <div className="kor-subtitle">채용경쟁력 진단</div>
        </div>

        <div className="card-content recruitment-gauge-content">
          <div className="gauge-relative-box">
            <GaugeChart
              id="recruitment-gauge"
              key={`gauge-${score}`}
              nrOfLevels={3}
              arcsLength={[0.333, 0.334, 0.333]}
              colors={gaugeColor}
              percent={score / 100}
              arcPadding={0.02}
              cornerRadius={0}
              needleColor="#495057"
              needleBaseColor="#212529"
              animate={true}
              hideText={true}
              style={{ width: "100%" }}
            />
            <span className="gauge-step-label label-c">C</span>
            <span className="gauge-step-label label-b">B</span>
            <span className="gauge-step-label label-a">A</span>

            <div className="gauge-score-overlay">
              <span className="score-num">{score}</span>
              <span className="score-unit">점</span>
              <div
                className="grade-badge-custom"
                style={{
                  backgroundColor: gradeInfo.bgColor,
                  color: gradeInfo.color,
                }}
              >
                {gradeInfo.label} 등급
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 결과 안내 카드 */}
      <div className="gauge-result-info-card">
        <p className="gauge-result-text">
          현재 기관의 채용 경쟁력은{" "}
          <strong
            className="gauge-result-highlight"
            style={{ color: gradeInfo.color }}
          >
            {gradeInfo.label}등급
          </strong>{" "}
          수준입니다.
        </p>
      </div>
    </div>
  );
};

export default RecruitmentGaugeCard;
