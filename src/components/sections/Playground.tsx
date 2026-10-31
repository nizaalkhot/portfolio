"use client";

import { useCallback, useRef, useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { Play, RotateCcw, Sparkles, Terminal, FileCode, Cpu, ShieldAlert, CheckCircle2, Activity } from "lucide-react";
import { cn } from "@/lib/cn";

type Status = "idle" | "thinking" | "tool_call" | "done";

type Agent = {
  id: string;
  label: string;
  role: string;
  toolLabel: string;
  status: Status;
  logs: string[];
};

type ScenarioId = "fraud" | "codegen" | "chaos";

type Scenario = {
  id: ScenarioId;
  name: string;
  subtitle: string;
  defaultPrompt: string;
  agents: Agent[];
  script: { agent: string; status: Status; log: string; ms: number }[];
  stateJson: (step: number) => string;
  outputMarkdown: string;
  metrics: {
    latency: string;
    tokens: string;
    compliance: string;
    model: string;
  };
};

const SCENARIOS: Record<ScenarioId, Scenario> = {
  fraud: {
    id: "fraud",
    name: "Banking Fraud Mesh (Drishti)",
    subtitle: "Google ADK · Real-Time Scam Interceptor",
    defaultPrompt: "Ingest suspicious ₹85,000 UPI transfer with unverified remote support APK payload.",
    agents: [
      {
        id: "ingress",
        label: "Ingress",
        role: "Event parsing & device check",
        toolLabel: "stream.telemetry",
        status: "idle",
        logs: [],
      },
      {
        id: "mule_tracer",
        label: "Mule Tracer",
        role: "Neo4j subgraph hop hunter",
        toolLabel: "tool.neo4j_graph",
        status: "idle",
        logs: [],
      },
      {
        id: "interceptor",
        label: "FIU Interceptor",
        role: "Halt settlement & freeze funds",
        toolLabel: "api.fiu_ind_rails",
        status: "idle",
        logs: [],
      },
    ],
    script: [
      { agent: "ingress", status: "thinking", log: "evaluating tx_id=0x92f (amount=₹85,000)...", ms: 500 },
      { agent: "ingress", status: "tool_call", log: "apk_sandbox.decompile() → [BIND_ACCESSIBILITY] flagged", ms: 800 },
      { agent: "ingress", status: "done", log: "dispatched telemetry to mule graph →", ms: 400 },
      { agent: "mule_tracer", status: "thinking", log: "querying recipient VPA in Neo4j...", ms: 600 },
      { agent: "mule_tracer", status: "tool_call", log: "cypher.find_cycles(hops=3) → 4 mule accounts detected", ms: 900 },
      { agent: "mule_tracer", status: "done", log: "clustering coefficient 0.88 · fraud ring 42 confirmed →", ms: 400 },
      { agent: "interceptor", status: "thinking", log: "synthesizing ADK multi-agent confidence score...", ms: 500 },
      { agent: "interceptor", status: "tool_call", log: "settlement_gateway.freeze_and_hold(risk=0.994)", ms: 1000 },
      { agent: "interceptor", status: "done", log: "transaction blocked in 148ms · FIU report filed ✓", ms: 400 },
    ],
    stateJson: (step) =>
      JSON.stringify(
        {
          engine: "Google ADK",
          tx_id: "0x92f8103",
          amount_inr: 85000,
          risk_assessment: {
            score: step >= 7 ? 0.994 : step >= 4 ? 0.72 : 0.35,
            action: step >= 7 ? "BLOCK_AND_FREEZE" : "INVESTIGATING",
            mule_ring_id: step >= 5 ? "ring_mumbai_42" : null,
            malicious_apk: step >= 2 ? true : null,
          },
          telemetry: {
            latency_ms: 148,
            steps_executed: step,
            status: step >= 8 ? "COMPLETED" : "PROCESSING",
          },
        },
        null,
        2
      ),
    outputMarkdown: `## 🛡️ Real-Time Fraud Interception Report

**Action**: \`BLOCK_AND_FREEZE\` (Settlement Prevented)
**Confidence Score**: \`99.4%\` · **Total Interception Latency**: \`148ms\`

### 1. Attack Vector Identified
- **Modus Operandi**: Digital Arrest / Fake Bank KYC APK scam.
- **Payload**: Attached binary contained hidden accessibility service bindings to hijack SMS OTPs.

### 2. Mule Ring Subgraph Topology
- Neo4j graph traversal identified **4 cyclic beneficiary accounts** across 2 banks.
- Rapid withdrawal sequence halted before outbound IMPS transfer.

### 3. Compliance & Action
- Beneficiary account frozen under PMLA/FIU-IND regulatory guidelines.
- Automated incident telemetry dispatched to the central banking consortium.`,
    metrics: {
      latency: "148ms p95",
      tokens: "840 tok",
      compliance: "100% automated",
      model: "Gemini 2.0 Flash",
    },
  },

  codegen: {
    id: "codegen",
    name: "Autonomous Code & DSPy Evals",
    subtitle: "LangGraph + DSPy Optimization Loop",
    defaultPrompt: "Generate FastAPI webhook route with HMAC-SHA256 constant-time verification.",
    agents: [
      {
        id: "generator",
        label: "Generator",
        role: "Synthesizes typed Python AST",
        toolLabel: "tool.codegen",
        status: "idle",
        logs: [],
      },
      {
        id: "reviewer",
        label: "Reviewer",
        role: "Security & timing attack audit",
        toolLabel: "tool.pytest_sandbox",
        status: "idle",
        logs: [],
      },
      {
        id: "dspy_opt",
        label: "DSPy Optimizer",
        role: "Teleprompter prompt compilation",
        toolLabel: "tool.dspy_mipro",
        status: "idle",
        logs: [],
      },
    ],
    script: [
      { agent: "generator", status: "thinking", log: "parsing spec → FastAPI router + Pydantic schema", ms: 500 },
      { agent: "generator", status: "tool_call", log: "emit_ast(model=claude-4.5) → 48 lines generated", ms: 800 },
      { agent: "generator", status: "done", log: "passing candidate to security reviewer →", ms: 400 },
      { agent: "reviewer", status: "thinking", log: "executing pytest sandbox and security linter...", ms: 600 },
      { agent: "reviewer", status: "tool_call", log: "test_timing_attacks() → FAILED (standard == string comparison)", ms: 900 },
      { agent: "reviewer", status: "done", log: "emitted failure feedback: CWE-208 timing leak →", ms: 400 },
      { agent: "dspy_opt", status: "thinking", log: "triggering DSPy MIPROv2 teleprompter compilation...", ms: 600 },
      { agent: "dspy_opt", status: "tool_call", log: "recompile_prompt(rule='hmac.compare_digest') ✓", ms: 1000 },
      { agent: "generator", status: "done", log: "re-generated with constant-time check · 10/10 tests PASSED ✓", ms: 400 },
    ],
    stateJson: (step) =>
      JSON.stringify(
        {
          framework: "LangGraph + DSPy",
          task: "fastapi_hmac_webhook",
          review_state: {
            iteration: step >= 7 ? 2 : 1,
            cwe_vulnerabilities: step >= 7 ? 0 : step >= 5 ? 1 : 0,
            tests_passed: step >= 8 ? "10/10" : step >= 5 ? "8/10" : "0/10",
            dspy_teleprompter_compiled: step >= 7,
          },
          compliance_adherence: step >= 8 ? "100%" : step >= 5 ? "72%" : "pending",
        },
        null,
        2
      ),
    outputMarkdown: `## 🚀 Production Code Review Passed (DSPy Optimized)

\`\`\`python
import hmac
import hashlib
from fastapi import APIRouter, Header, HTTPException, Request

router = APIRouter()

@router.post("/v1/webhooks/payment")
async def verify_payment_webhook(
    request: Request,
    x_signature: str = Header(...)
):
    body = await request.body()
    expected = hmac.new(
        key=b"prod_secret_key",
        msg=body,
        digestmod=hashlib.sha256
    ).hexdigest()
    
    # DSPy compiled rule: constant-time comparison prevents timing leaks
    if not hmac.compare_digest(expected, x_signature):
        raise HTTPException(status_code=401, detail="Invalid HMAC signature")
        
    return {"status": "verified", "payload_bytes": len(body)}
\`\`\`

**Result**: 10/10 tests passed · 0 timing attack vulnerabilities · 86% coding time cut.`,
    metrics: {
      latency: "420ms cycle",
      tokens: "1,240 tok",
      compliance: "+28% higher",
      model: "Claude 4.5 Sonnet",
    },
  },

  chaos: {
    id: "chaos",
    name: "Adversarial Chaos Recovery (Tanglefoot)",
    subtitle: "Adversarial LLM Benchmark & Stress Test",
    defaultPrompt: "Execute multi-step synthesis under lying search tools and intermittent API drops.",
    agents: [
      {
        id: "chaos_inj",
        label: "Chaos Proxy",
        role: "Adversarial fault injector",
        toolLabel: "tool.fault_inject",
        status: "idle",
        logs: [],
      },
      {
        id: "agent_core",
        label: "Agent Core",
        role: "Framework under test",
        toolLabel: "framework.langgraph",
        status: "idle",
        logs: [],
      },
      {
        id: "resilience",
        label: "Loop Sentry",
        role: "Resilience & cycle scoring",
        toolLabel: "eval.resilience",
        status: "idle",
        logs: [],
      },
    ],
    script: [
      { agent: "chaos_inj", status: "thinking", log: "interposing proxy on tool://web_search...", ms: 500 },
      { agent: "chaos_inj", status: "tool_call", log: "inject_fault(type='lying_search_engine', rate=0.4)", ms: 800 },
      { agent: "chaos_inj", status: "done", log: "injected poisoned contradictory search response →", ms: 400 },
      { agent: "agent_core", status: "thinking", log: "correlating web result with vector memory...", ms: 600 },
      { agent: "agent_core", status: "tool_call", log: "cross_check_provenance() → discrepancy detected!", ms: 900 },
      { agent: "agent_core", status: "done", log: "rejected poisoned source · switched to verified cache →", ms: 400 },
      { agent: "resilience", status: "thinking", log: "tracking graph cycle entropy and backoff...", ms: 500 },
      { agent: "resilience", status: "tool_call", log: "entropy_check(cycles=0) → no infinite loop detected", ms: 800 },
      { agent: "resilience", status: "done", log: "goal achieved with 0 hallucinated claims · resilience score: 94.2 ✓", ms: 400 },
    ],
    stateJson: (step) =>
      JSON.stringify(
        {
          benchmark: "Tanglefoot Chaos Engineering",
          adversarial_mode: "LYING_SEARCH_ENGINE",
          agent_framework: "LangGraph Multi-Agent",
          resilience_status: {
            fault_injected: step >= 2,
            poisoned_data_detected: step >= 5,
            circular_loop_prevented: step >= 7,
            resilience_score: step >= 8 ? 94.2 : 50.0,
          },
        },
        null,
        2
      ),
    outputMarkdown: `## ⚡ Tanglefoot Resilience Benchmark

**Target Framework**: LangGraph Multi-Agent
**Chaos Mode**: \`LYING_SEARCH_INJECTION\` · **Resilience Score**: \`94.2 / 100\`

### Evaluation Telemetry
1. **Fault Tolerance**: Agent detected contradictory claims and rejected poisoned third-party data within 1 step.
2. **Infinite Loop Resistance**: Zero circular cycles observed; entropy monitor confirmed deterministic exit.
3. **Recovery Latency**: 480ms mean time to recovery (MTTR).`,
    metrics: {
      latency: "480ms MTTR",
      tokens: "910 tok",
      compliance: "94.2 Score",
      model: "Tanglefoot Evals",
    },
  },
};

export function Playground() {
  const reduce = useReducedMotion();
  const [activeScenario, setActiveScenario] = useState<ScenarioId>("fraud");
  const [activeTab, setActiveTab] = useState<"output" | "state" | "metrics">("output");

  const scenario = SCENARIOS[activeScenario];
  const [prompt, setPrompt] = useState(scenario.defaultPrompt);
  const [agents, setAgents] = useState<Agent[]>(scenario.agents);
  const [running, setRunning] = useState(false);
  const [output, setOutput] = useState("");
  const [completed, setCompleted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  useEffect(() => () => clearTimers(), []);

  // Sync state when switching scenario
  useEffect(() => {
    clearTimers();
    setPrompt(scenario.defaultPrompt);
    setAgents(scenario.agents.map((a) => ({ ...a, logs: [] })));
    setOutput("");
    setCompleted(false);
    setRunning(false);
    setCurrentStep(0);
  }, [activeScenario]);

  const reset = useCallback(() => {
    clearTimers();
    setAgents(scenario.agents.map((a) => ({ ...a, logs: [] })));
    setOutput("");
    setRunning(false);
    setCompleted(false);
    setCurrentStep(0);
  }, [scenario.agents]);

  const streamOutput = useCallback(
    (text: string) => {
      const words = text.split(/(\s+)/);
      let i = 0;
      const tick = () => {
        i += 1;
        setOutput(words.slice(0, i).join(""));
        if (i < words.length) {
          timers.current.push(setTimeout(tick, reduce ? 0 : 16));
        } else {
          setCompleted(true);
        }
      };
      tick();
    },
    [reduce]
  );

  const run = useCallback(() => {
    if (running) return;
    clearTimers();
    setAgents(scenario.agents.map((a) => ({ ...a, logs: [] })));
    setOutput("");
    setCompleted(false);
    setRunning(true);
    setCurrentStep(0);

    const steps = scenario.script;
    let delay = 0;

    steps.forEach((step, idx) => {
      delay += reduce ? 40 : step.ms;
      timers.current.push(
        setTimeout(() => {
          setCurrentStep(idx + 1);
          setAgents((prev) =>
            prev.map((a) =>
              a.id === step.agent
                ? {
                    ...a,
                    status: step.status,
                    logs: [...a.logs, step.log],
                  }
                : a
            )
          );
        }, delay)
      );
    });

    timers.current.push(
      setTimeout(() => {
        streamOutput(scenario.outputMarkdown);
        setRunning(false);
      }, delay + (reduce ? 40 : 300))
    );
  }, [scenario, running, reduce, streamOutput]);

  return (
    <section
      id="playground"
      className="relative isolate border-t border-[var(--hairline)] py-24 md:py-32"
      aria-label="Live agent playground"
    >
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          eyebrow="Live Autonomous Simulation"
          title="Interactive multi-agent orchestration."
          description="Simulate real-world agent pipelines across fraud interception, DSPy code compilation, and adversarial chaos recovery with live state telemetry."
        />

        {/* Domain Scenario Switcher Tabs */}
        <div className="mt-10 flex flex-wrap items-center gap-2">
          {(Object.keys(SCENARIOS) as ScenarioId[]).map((key) => {
            const sc = SCENARIOS[key];
            const isActive = activeScenario === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setActiveScenario(key)}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold transition-all duration-200",
                  isActive
                    ? "border-[var(--accent)] bg-[var(--accent)]/15 text-[var(--accent)] shadow-sm"
                    : "border-[var(--hairline-strong)] bg-[var(--bg-elev)]/50 text-[var(--fg-muted)] hover:border-[var(--hairline)] hover:text-[var(--fg)]"
                )}
              >
                <span>{sc.name}</span>
              </button>
            );
          })}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_1fr]">
          {/* Controls & Agent Nodes Panel */}
          <div className="flex flex-col gap-4 rounded-2xl border border-[var(--hairline)] bg-[var(--bg-elev)]/40 p-6 backdrop-blur-sm">
            <div className="flex items-center justify-between border-b border-[var(--hairline)] pb-3">
              <span className="mono text-[11px] uppercase tracking-[0.14em] text-[var(--accent)] font-semibold">
                {scenario.subtitle}
              </span>
              <span className="mono text-[11px] text-[var(--fg-subtle)]">
                {running ? "● simulation running" : "○ ready"}
              </span>
            </div>

            <label className="sr-only" htmlFor="playground-prompt">
              Prompt for the agents
            </label>
            <textarea
              id="playground-prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={3}
              className="w-full resize-none rounded-xl border border-[var(--hairline)] bg-[var(--bg)] px-4 py-3 text-sm leading-relaxed text-[var(--fg)] placeholder:text-[var(--fg-subtle)] focus:border-[var(--accent)]/50 focus:outline-none"
              placeholder="Simulation prompt..."
            />

            <div className="flex items-center gap-2">
              <Button
                onClick={run}
                variant="primary"
                className={cn(running && "opacity-60")}
                aria-disabled={running}
              >
                {running ? (
                  <span className="inline-flex items-center gap-2">
                    <Sparkles size={16} className="animate-pulse" aria-hidden />
                    running simulation…
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-2">
                    <Play size={15} aria-hidden />
                    Run Pipeline
                  </span>
                )}
              </Button>
              <Button onClick={reset} variant="secondary">
                <span className="inline-flex items-center gap-2">
                  <RotateCcw size={15} aria-hidden />
                  Reset
                </span>
              </Button>
            </div>

            {/* Agent Status Cards */}
            <div className="mt-2 grid grid-cols-1 gap-2.5 sm:grid-cols-3">
              {agents.map((a, i) => (
                <AgentCard key={a.id} agent={a} index={i} />
              ))}
            </div>

            {/* Live Step Logs */}
            <div className="rounded-xl border border-[var(--hairline)] bg-[#050608] p-3 text-xs mono text-[var(--fg-muted)] space-y-1 max-h-36 overflow-y-auto">
              <span className="text-[10px] uppercase text-[var(--fg-subtle)] block mb-1">
                Execution Trace
              </span>
              {agents.flatMap((a) => a.logs).length === 0 ? (
                <span className="text-[var(--fg-subtle)]">Hit &quot;Run Pipeline&quot; to begin agent trace...</span>
              ) : (
                agents.flatMap((a) => a.logs).map((log, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-[11px]">
                    <span className="text-[var(--accent)]">›</span>
                    <span>{log}</span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Output & Telemetry Viewport */}
          <div className="flex flex-col rounded-2xl border border-[var(--hairline)] bg-[var(--bg-elev)]/40 p-6">
            {/* Viewport Tabs */}
            <div className="flex items-center justify-between border-b border-[var(--hairline)] pb-3 mb-4">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setActiveTab("output")}
                  className={cn(
                    "mono text-xs px-2.5 py-1 rounded-md transition-colors",
                    activeTab === "output"
                      ? "bg-[var(--accent)]/15 text-[var(--accent)] font-semibold"
                      : "text-[var(--fg-subtle)] hover:text-[var(--fg)]"
                  )}
                >
                  Markdown Output
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("state")}
                  className={cn(
                    "mono text-xs px-2.5 py-1 rounded-md transition-colors",
                    activeTab === "state"
                      ? "bg-[var(--accent)]/15 text-[var(--accent)] font-semibold"
                      : "text-[var(--fg-subtle)] hover:text-[var(--fg)]"
                  )}
                >
                  State Graph JSON
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("metrics")}
                  className={cn(
                    "mono text-xs px-2.5 py-1 rounded-md transition-colors",
                    activeTab === "metrics"
                      ? "bg-[var(--accent)]/15 text-[var(--accent)] font-semibold"
                      : "text-[var(--fg-subtle)] hover:text-[var(--fg)]"
                  )}
                >
                  Metrics & Evals
                </button>
              </div>

              <span className="mono text-[10px] text-[var(--accent)] bg-[var(--accent)]/10 px-2 py-0.5 rounded">
                {scenario.metrics.model}
              </span>
            </div>

            {/* Tab 1: Output Markdown */}
            {activeTab === "output" && (
              <div className="flex-1 overflow-y-auto max-h-[380px] pr-2">
                {output ? (
                  <div className="prose prose-invert prose-sm text-xs leading-relaxed text-[var(--fg-muted)] space-y-3">
                    <pre className="whitespace-pre-wrap font-sans text-xs bg-transparent border-0 p-0 text-[var(--fg-muted)]">
                      {output}
                    </pre>
                  </div>
                ) : (
                  <div className="flex h-56 flex-col items-center justify-center text-center text-xs text-[var(--fg-subtle)] mono">
                    <Terminal size={24} className="mb-2 opacity-40" />
                    <span>Run the simulation to stream output report...</span>
                  </div>
                )}
              </div>
            )}

            {/* Tab 2: State Graph JSON */}
            {activeTab === "state" && (
              <div className="flex-1 overflow-y-auto max-h-[380px]">
                <pre className="rounded-xl border border-[var(--hairline)] bg-[#040405] p-3 text-[11.5px] mono text-[var(--fg-muted)]">
                  <code>{scenario.stateJson(currentStep)}</code>
                </pre>
              </div>
            )}

            {/* Tab 3: Metrics & Evals */}
            {activeTab === "metrics" && (
              <div className="flex-1 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl border border-[var(--hairline)] bg-[#050608] p-3">
                    <span className="mono text-[10px] uppercase text-[var(--fg-subtle)] block">
                      Latency
                    </span>
                    <span className="text-xl font-bold mono text-[var(--accent)]">
                      {scenario.metrics.latency}
                    </span>
                  </div>
                  <div className="rounded-xl border border-[var(--hairline)] bg-[#050608] p-3">
                    <span className="mono text-[10px] uppercase text-[var(--fg-subtle)] block">
                      Token Budget
                    </span>
                    <span className="text-xl font-bold mono text-[var(--fg)]">
                      {scenario.metrics.tokens}
                    </span>
                  </div>
                  <div className="rounded-xl border border-[var(--hairline)] bg-[#050608] p-3">
                    <span className="mono text-[10px] uppercase text-[var(--fg-subtle)] block">
                      Compliance Metric
                    </span>
                    <span className="text-xl font-bold mono text-[var(--accent)]">
                      {scenario.metrics.compliance}
                    </span>
                  </div>
                  <div className="rounded-xl border border-[var(--hairline)] bg-[#050608] p-3">
                    <span className="mono text-[10px] uppercase text-[var(--fg-subtle)] block">
                      Inference Engine
                    </span>
                    <span className="text-sm font-bold mono text-[var(--fg)]">
                      {scenario.metrics.model}
                    </span>
                  </div>
                </div>

                <div className="rounded-xl border border-[var(--hairline)] bg-[#050608] p-3 text-xs mono space-y-1">
                  <span className="text-[10px] uppercase text-[var(--fg-subtle)] block mb-1">
                    Evaluation Verdict
                  </span>
                  <div className="flex items-center gap-2 text-[var(--accent)]">
                    <CheckCircle2 size={14} />
                    <span>Evaluation tests passed with zero safety violations</span>
                  </div>
                  <p className="text-[var(--fg-subtle)] text-[11px] mt-1">
                    Traced with DSPy teleprompter & LangSmith assertions.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function AgentCard({ agent, index }: { agent: Agent; index: number }) {
  const statusColors: Record<Status, string> = {
    idle: "bg-white/10 text-[var(--fg-subtle)]",
    thinking: "bg-blue-500/20 text-blue-400 border-blue-500/40",
    tool_call: "bg-[var(--accent)]/20 text-[var(--accent)] border-[var(--accent)]/40",
    done: "bg-emerald-500/20 text-emerald-400 border-emerald-500/40",
  };

  return (
    <div className="flex flex-col gap-1.5 rounded-xl border border-[var(--hairline)] bg-[var(--bg)] p-3">
      <div className="flex items-center justify-between">
        <span className="font-semibold text-xs text-[var(--fg)]">{agent.label}</span>
        <span
          className={cn(
            "mono rounded-full border px-2 py-0.5 text-[9px] uppercase tracking-wide",
            statusColors[agent.status]
          )}
        >
          {agent.status}
        </span>
      </div>
      <p className="text-[11px] text-[var(--fg-subtle)] line-clamp-1">{agent.role}</p>
      <span className="mono text-[10px] text-[var(--accent)] opacity-80 pt-0.5">
        {agent.toolLabel}
      </span>
    </div>
  );
}
