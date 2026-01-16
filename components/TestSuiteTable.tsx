import type { TestSuite } from "@/lib/assistant";

interface TestSuiteTableProps {
  suites: TestSuite[];
}

export function TestSuiteTable({ suites }: TestSuiteTableProps) {
  return (
    <div className="panel grid">
      <header>
        <h2 className="section-title">Autonomous Test Pods</h2>
        <p>
          Primary missions aligned to focus domains with guardrails on risk, automation appetite,
          and daily sync rhythm.
        </p>
      </header>
      <table className="table">
        <thead>
          <tr>
            <th>Suite</th>
            <th>Objective</th>
            <th>Highlights</th>
            <th>Owner</th>
            <th>Automation</th>
            <th>Risk</th>
          </tr>
        </thead>
        <tbody>
          {suites.map((suite) => (
            <tr key={suite.name}>
              <td>{suite.name}</td>
              <td>{suite.objective}</td>
              <td>
                <ul>
                  {suite.scenarioHighlights.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </td>
              <td>{suite.owner}</td>
              <td>
                <span className="score-chip">{suite.automationScore}%</span>
              </td>
              <td>
                <span className="status" data-risk={suite.risk}>
                  {suite.risk.toUpperCase()}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
