interface HighlightsPanelProps {
  mission: string;
  objectives: string[];
  highlights: string[];
}

export function HighlightsPanel({ mission, objectives, highlights }: HighlightsPanelProps) {
  return (
    <div className="panel grid">
      <header>
        <h1 style={{ margin: 0, fontSize: "2.4rem", fontWeight: 700 }}>Autonomous QA Assistant</h1>
        <p style={{ marginTop: "0.9rem", color: "#dbeafe", fontSize: "1.05rem", lineHeight: 1.5 }}>
          {mission}
        </p>
      </header>
      <section>
        <h2 className="section-title">Mission Objectives</h2>
        <div className="chip-wrap">
          {objectives.map((item) => (
            <span className="chip" key={item}>
              {item}
            </span>
          ))}
        </div>
      </section>
      <section>
        <h2 className="section-title">Prime Directives</h2>
        <div className="roadmap">
          {highlights.map((line) => (
            <div className="roadmap-item" key={line}>
              <span>{line}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
