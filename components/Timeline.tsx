import type { ExecutionSlot } from "@/lib/assistant";

interface TimelineProps {
  slots: ExecutionSlot[];
}

export function Timeline({ slots }: TimelineProps) {
  return (
    <div className="panel">
      <h2 className="section-title">Execution Timeline</h2>
      <div className="timeline">
        {slots.map((slot) => (
          <div key={slot.timebox} className="timeline-item">
            <time>{slot.timebox}</time>
            <div>
              <strong>{slot.focus}</strong>
              <ul>
                {slot.outcomes.map((outcome) => (
                  <li key={outcome}>• {outcome}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
