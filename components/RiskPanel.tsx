import type { RiskAlert } from "@/lib/assistant";

interface RiskPanelProps {
  alerts: RiskAlert[];
}

export function RiskPanel({ alerts }: RiskPanelProps) {
  if (!alerts.length) {
    return null;
  }

  return (
    <div className="panel">
      <h2 className="section-title">Risk Radar</h2>
      <div className="roadmap">
        {alerts.map((alert) => (
          <article key={alert.title} className="roadmap-item">
            <strong>{alert.title}</strong>
            <span>Signal: {alert.signal}</span>
            <span className="highlight">Mitigation: {alert.mitigation}</span>
            <span className="status" data-risk={alert.severity}>
              {alert.severity.toUpperCase()}
            </span>
          </article>
        ))}
      </div>
    </div>
  );
}
