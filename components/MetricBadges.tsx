import type { MetricBadge } from "@/lib/assistant";

interface MetricBadgesProps {
  badges: MetricBadge[];
}

export function MetricBadges({ badges }: MetricBadgesProps) {
  return (
    <div className="badge-grid">
      {badges.map((badge) => (
        <article key={badge.label} className="badge-tile">
          <strong>{badge.label}</strong>
          <span className="highlight">{badge.value}</span>
          <span>{badge.description}</span>
        </article>
      ))}
    </div>
  );
}
