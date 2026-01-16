/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState } from "react";
import {
  generateQAPlan,
  type AssistantInput,
  type RiskLevel,
  type QAPlan
} from "@/lib/assistant";
import { HighlightsPanel } from "@/components/HighlightsPanel";
import { MetricBadges } from "@/components/MetricBadges";
import { TestSuiteTable } from "@/components/TestSuiteTable";
import { Timeline } from "@/components/Timeline";
import { RiskPanel } from "@/components/RiskPanel";

const defaultInput: AssistantInput = {
  productBrief:
    "We're shipping an AI-powered insights dashboard where customers orchestrate automated alerts and billing exports. The release bundles revamped permissions, generative summaries, and a pay-as-you-go billing engine.",
  releaseType: "ga",
  sprintLength: 10,
  qaTeamSize: 4,
  riskTolerance: "medium",
  focusThemes: ["Reliability", "Security hardening", "UX polish"]
};

function normalizeFocusThemes(value: string): string[] {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function hydratePlan(input: AssistantInput): QAPlan {
  return generateQAPlan({
    ...input,
    focusThemes: input.focusThemes.length ? input.focusThemes : ["Core Experience"]
  });
}

export default function Home() {
  const [productBrief, setProductBrief] = useState(defaultInput.productBrief);
  const [releaseType, setReleaseType] = useState<AssistantInput["releaseType"]>(
    defaultInput.releaseType
  );
  const [sprintLength, setSprintLength] = useState(defaultInput.sprintLength);
  const [qaTeamSize, setQaTeamSize] = useState(defaultInput.qaTeamSize);
  const [riskTolerance, setRiskTolerance] = useState<RiskLevel>(defaultInput.riskTolerance);
  const [focusThemes, setFocusThemes] = useState(defaultInput.focusThemes.join(", "));
  const [plan, setPlan] = useState<QAPlan>(() => hydratePlan(defaultInput));

  const handleGenerate = () => {
    const nextPlan = hydratePlan({
      productBrief: productBrief.trim(),
      releaseType,
      sprintLength,
      qaTeamSize,
      riskTolerance,
      focusThemes: normalizeFocusThemes(focusThemes)
    });
    setPlan(nextPlan);
  };

  return (
    <div className="app-shell">
      <div className="grid" style={{ gap: "2rem" }}>
        <HighlightsPanel
          mission={plan.mission}
          objectives={plan.keyObjectives}
          highlights={plan.planHighlights}
        />

        <section className="panel grid">
          <h2 className="section-title">Configure Mission Inputs</h2>
          <div className="grid two">
            <div className="input-group">
              <label htmlFor="product-brief">Product Brief</label>
              <textarea
                id="product-brief"
                className="textarea-input"
                value={productBrief}
                onChange={(event) => setProductBrief(event.target.value)}
                placeholder="Describe what we're launching, risky surfaces, and product KPIs…"
              />
            </div>
            <div className="grid" style={{ gap: "1rem" }}>
              <div className="input-group">
                <label htmlFor="release-type">Release Type</label>
                <select
                  id="release-type"
                  className="select-input"
                  value={releaseType}
                  onChange={(event) =>
                    setReleaseType(event.target.value as AssistantInput["releaseType"])
                  }
                >
                  <option value="ga">General Availability</option>
                  <option value="beta">Beta / Controlled Rollout</option>
                  <option value="hotfix">Hotfix / Patch Train</option>
                </select>
              </div>
              <div className="input-group">
                <label>Risk Tolerance</label>
                <div className="radio-group">
                  {(["low", "medium", "high"] as RiskLevel[]).map((level) => (
                    <label key={level}>
                      <input
                        type="radio"
                        name="risk"
                        value={level}
                        checked={riskTolerance === level}
                        onChange={() => setRiskTolerance(level)}
                      />
                      {level.toUpperCase()}
                    </label>
                  ))}
                </div>
              </div>
              <div className="grid two">
                <div className="input-group">
                  <label htmlFor="sprint-length">Sprint Length (days)</label>
                  <input
                    id="sprint-length"
                    className="text-input"
                    type="number"
                    min={3}
                    value={sprintLength}
                    onChange={(event) => setSprintLength(Number(event.target.value))}
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="qa-team">QA Pod Size</label>
                  <input
                    id="qa-team"
                    className="text-input"
                    type="number"
                    min={1}
                    value={qaTeamSize}
                    onChange={(event) => setQaTeamSize(Number(event.target.value))}
                  />
                </div>
              </div>
              <div className="input-group">
                <label htmlFor="focus-themes">Focus Themes (comma separated)</label>
                <input
                  id="focus-themes"
                  className="text-input"
                  value={focusThemes}
                  onChange={(event) => setFocusThemes(event.target.value)}
                  placeholder="Reliability, Payments, Observability"
                />
              </div>
            </div>
          </div>
          <button className="cta" type="button" onClick={handleGenerate}>
            Deploy Autonomous Plan
          </button>
        </section>

        <section className="grid two">
          <div className="panel">
            <h2 className="section-title">Quality Pulse</h2>
            <MetricBadges badges={plan.metricBadges} />
          </div>
          <div className="panel">
            <h2 className="section-title">Automation Backlog Candidates</h2>
            <div className="roadmap">
              {plan.automationCandidates.map((candidate) => (
                <div className="roadmap-item" key={candidate}>
                  <span>{candidate}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <TestSuiteTable suites={plan.testSuites} />

        <Timeline slots={plan.executionTimeline} />

        <section className="panel">
          <h2 className="section-title">Immediate Actions</h2>
          <div className="roadmap">
            {plan.nextActions.map((action) => (
              <div className="roadmap-item" key={action}>
                <span>{action}</span>
              </div>
            ))}
          </div>
        </section>

        <RiskPanel alerts={plan.riskAlerts} />
      </div>
    </div>
  );
}
