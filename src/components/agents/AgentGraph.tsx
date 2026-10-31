"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { Play, Pause, RefreshCw, Cpu, Activity, ShieldCheck, Database, Layers } from "lucide-react";

export type ArchitectureId = "drishti" | "code_agent" | "tanglefoot";

type NodeDef = {
  id: string;
  label: string;
  subLabel: string;
  x: number;
  y: number;
  model: string;
  tag: string;
  payload: string;
  latency: string;
  tokens: string;
};

type Architecture = {
  id: ArchitectureId;
  name: string;
  framework: string;
  description: string;
  nodes: NodeDef[];
  edges: [string, string][];
};

const ARCHITECTURES: Record<ArchitectureId, Architecture> = {
  drishti: {
    id: "drishti",
    name: "Drishti Fraud Mesh",
    framework: "Google ADK · Multi-Agent",
    description: "Real-time banking scam interceptor monitoring UPI transactions, APK malware, and mule rings.",
    edges: [
      ["ingress", "apk_sandbox"],
      ["ingress", "mule_graph"],
      ["apk_sandbox", "adk_agent"],
      ["mule_graph", "adk_agent"],
      ["adk_agent", "interceptor"],
    ],
    nodes: [
      {
        id: "ingress",
        label: "Ingress",
        subLabel: "Tx & APK Stream",
        x: 100,
        y: 130,
        model: "Gemini 2.0 Flash",
        tag: "event.stream",
        payload: '{"tx_id":"0x92f","amount":85000,"vpa":"mule@axis"}',
        latency: "14ms",
        tokens: "180 tok",
      },
      {
        id: "apk_sandbox",
        label: "APK Sandbox",
        subLabel: "Static Decompile",
        x: 270,
        y: 65,
        model: "Gemini 2.0 Flash",
        tag: "tool.decompile",
        payload: '{"malicious_perms":["BIND_ACCESSIBILITY","SMS_READ"]}',
        latency: "84ms",
        tokens: "310 tok",
      },
      {
        id: "mule_graph",
        label: "Mule Graph",
        subLabel: "Neo4j Ring Hunt",
        x: 270,
        y: 195,
        model: "Cypher Query",
        tag: "db.neo4j",
        payload: '{"cluster_id":"ring_42","hop_depth":2,"flagged":true}',
        latency: "42ms",
        tokens: "95 tok",
      },
      {
        id: "adk_agent",
        label: "ADK Core",
        subLabel: "Triage & Reason",
        x: 440,
        y: 130,
        model: "Google ADK Agent",
        tag: "agent.decision",
        payload: '{"action":"BLOCK_AND_FREEZE","confidence":0.992}',
        latency: "128ms",
        tokens: "540 tok",
      },
      {
        id: "interceptor",
        label: "Interceptor",
        subLabel: "FIU-IND Rails",
        x: 600,
        y: 130,
        model: "Banking Gateway",
        tag: "action.halt",
        payload: '{"status":"BLOCKED_SETTLEMENT","alert_fiu":true}',
        latency: "22ms",
        tokens: "45 tok",
      },
    ],
  },
  code_agent: {
    id: "code_agent",
    name: "Hierarchical Code Agent",
    framework: "LangGraph + DSPy",
    description: "Production autonomous Python development loop with DSPy-optimized review gates.",
    edges: [
      ["supervisor", "generator"],
      ["generator", "sandbox_test"],
      ["sandbox_test", "dspy_opt"],
      ["dspy_opt", "generator"],
      ["sandbox_test", "compliance_gate"],
    ],
    nodes: [
      {
        id: "supervisor",
        label: "Supervisor",
        subLabel: "Task Decomposer",
        x: 100,
        y: 130,
        model: "Claude 4.5 Sonnet",
        tag: "langgraph.state",
        payload: '{"spec":"FastAPI HMAC webhook","subtasks":["auth","route","test"]}',
        latency: "310ms",
        tokens: "820 tok",
      },
      {
        id: "generator",
        label: "Generator",
        subLabel: "Code Synthesis",
        x: 270,
        y: 65,
        model: "Claude 4.5 Sonnet",
        tag: "llm.codegen",
        payload: '{"generated_lines":142,"ast_valid":true}',
        latency: "580ms",
        tokens: "1,420 tok",
      },
      {
        id: "sandbox_test",
        label: "Test Runner",
        subLabel: "Pytest & Linter",
        x: 440,
        y: 65,
        model: "Pytest Sandbox",
        tag: "tool.pytest",
        payload: '{"tests_passed":9,"tests_failed":1,"error":"timing_leak"}',
        latency: "240ms",
        tokens: "160 tok",
      },
      {
        id: "dspy_opt",
        label: "DSPy Opt",
        subLabel: "Teleprompter",
        x: 350,
        y: 195,
        model: "DSPy MIPROv2",
        tag: "dspy.teleprompter",
        payload: '{"compiled_prompt":"Enforce constant-time compare","score":0.98}',
        latency: "320ms",
        tokens: "680 tok",
      },
      {
        id: "compliance_gate",
        label: "Gate",
        subLabel: "Security & CI/CD",
        x: 600,
        y: 130,
        model: "Bandit + Semgrep",
        tag: "ci.compliance",
        payload: '{"status":"MERGE_APPROVED","cwe_vulns":0}',
        latency: "95ms",
        tokens: "80 tok",
      },
    ],
  },
  tanglefoot: {
    id: "tanglefoot",
    name: "Tanglefoot Chaos Suite",
    framework: "Adversarial Agent Evals",
    description: "Evaluates multi-agent resilience under intentional flaky APIs, tool hallucinations, and loops.",
    edges: [
      ["chaos_injector", "agent_core"],
      ["agent_core", "loop_detector"],
      ["loop_detector", "agent_core"],
      ["loop_detector", "telemetry"],
    ],
    nodes: [
      {
        id: "chaos_injector",
        label: "Chaos Proxy",
        subLabel: "Fault Injection",
        x: 120,
        y: 130,
        model: "Tanglefoot Harness",
        tag: "chaos.fault_injection",
        payload: '{"injected_fault":"lying_search_engine","error_rate":0.35}',
        latency: "18ms",
        tokens: "65 tok",
      },
      {
        id: "agent_core",
        label: "Agent Target",
        subLabel: "Framework Evals",
        x: 300,
        y: 80,
        model: "LangGraph / CrewAI",
        tag: "agent.runtime",
        payload: '{"strategy":"fallback_vector_search","recovered":true}',
        latency: "440ms",
        tokens: "910 tok",
      },
      {
        id: "loop_detector",
        label: "Loop Sentry",
        subLabel: "Circular Trap Check",
        x: 460,
        y: 180,
        model: "Graph Cycle Detector",
        tag: "monitor.cycle_trap",
        payload: '{"cycle_detected":false,"state_entropy":0.89}',
        latency: "45ms",
        tokens: "120 tok",
      },
      {
        id: "telemetry",
        label: "Benchmark",
        subLabel: "Resilience Score",
        x: 590,
        y: 100,
        model: "Tanglefoot Evals",
        tag: "eval.resilience",
        payload: '{"resilience_score":94.2,"mttr_ms":480}',
        latency: "30ms",
        tokens: "110 tok",
      },
    ],
  },
};

export function AgentGraph() {
  const reduce = useReducedMotion();
  const [activeArch, setActiveArch] = useState<ArchitectureId>("drishti");
  const [activeNodeIdx, setActiveNodeIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [selectedNode, setSelectedNode] = useState<NodeDef | null>(null);

  const arch = ARCHITECTURES[activeArch];
  const nodes = arch.nodes;
  const edges = arch.edges;

  // Auto step active node
  useEffect(() => {
    if (reduce || !isPlaying) return;
    const interval = setInterval(() => {
      setActiveNodeIdx((a) => (a + 1) % nodes.length);
    }, 1800);
    return () => clearInterval(interval);
  }, [reduce, isPlaying, nodes.length]);

  // Keep selected node in sync or reset on arch switch
  useEffect(() => {
    setActiveNodeIdx(0);
    setSelectedNode(arch.nodes[0]);
  }, [activeArch]);

  const currentNode = selectedNode || nodes[activeNodeIdx] || nodes[0];
  const nodeById = (id: string) => nodes.find((n) => n.id === id) || nodes[0];

  return (
    <div className="flex flex-col gap-4">
      {/* Top Architecture Selector Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--hairline)] pb-3">
        <div className="flex flex-wrap items-center gap-1.5">
          {(Object.keys(ARCHITECTURES) as ArchitectureId[]).map((key) => {
            const a = ARCHITECTURES[key];
            const isActive = activeArch === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => {
                  setActiveArch(key);
                  setSelectedNode(a.nodes[0]);
                }}
                className={cn(
                  "inline-flex items-center gap-2 rounded-lg px-2.5 py-1 text-xs mono font-medium transition-all duration-200",
                  isActive
                    ? "bg-[var(--accent)] text-black font-semibold shadow-sm"
                    : "bg-[var(--bg-elev)] text-[var(--fg-muted)] hover:text-[var(--fg)] hover:bg-[var(--bg-elev-2)]"
                )}
              >
                <span>{a.name}</span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsPlaying((p) => !p)}
            className="inline-flex items-center gap-1.5 rounded border border-[var(--hairline)] px-2 py-0.5 text-[11px] mono text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors"
            title={isPlaying ? "Pause simulation" : "Play simulation"}
            aria-label={isPlaying ? "Pause simulation" : "Play simulation"}
          >
            {isPlaying ? <Pause size={11} /> : <Play size={11} />}
            <span>{isPlaying ? "pause" : "simulate"}</span>
          </button>
          <span className="mono text-[10px] text-[var(--accent)] bg-[var(--accent)]/10 px-2 py-0.5 rounded border border-[var(--accent)]/20">
            {arch.framework}
          </span>
        </div>
      </div>

      {/* SVG Canvas */}
      <div className="relative w-full rounded-xl border border-[var(--hairline)] bg-[#070709] p-2 overflow-hidden">
        <svg
          viewBox="0 0 680 270"
          className="w-full h-auto select-none"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.4" />
              <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="edgeGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.1" />
              <stop offset="50%" stopColor="var(--accent)" stopOpacity="0.9" />
              <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.1" />
            </linearGradient>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.02)" strokeWidth="1" />
            </pattern>
          </defs>

          <rect width="680" height="270" fill="url(#grid)" />

          {/* Edges */}
          {edges.map(([from, to], i) => {
            const a = nodeById(from);
            const b = nodeById(to);
            const isConnected =
              (currentNode.id === from && nodes[activeNodeIdx]?.id === to) ||
              (currentNode.id === to && nodes[activeNodeIdx]?.id === from);

            return (
              <g key={`${activeArch}-${from}-${to}`}>
                <line
                  x1={a.x}
                  y1={a.y}
                  x2={b.x}
                  y2={b.y}
                  stroke={isConnected ? "rgba(255,255,255,0.25)" : "rgba(255,255,255,0.07)"}
                  strokeWidth={1}
                />
                <motion.line
                  x1={a.x}
                  y1={a.y}
                  x2={b.x}
                  y2={b.y}
                  stroke="url(#edgeGrad)"
                  strokeWidth={isConnected ? 2 : 1.2}
                  strokeDasharray="6 14"
                  initial={{ strokeDashoffset: 0, opacity: 0.3 }}
                  animate={reduce ? {} : { strokeDashoffset: -80, opacity: isConnected ? [0.4, 1, 0.4] : [0.2, 0.7, 0.2] }}
                  transition={{
                    duration: 2.4,
                    repeat: Infinity,
                    ease: "linear",
                    delay: i * 0.3,
                  }}
                />
              </g>
            );
          })}

          {/* Nodes */}
          {nodes.map((n, i) => {
            const isActive = i === activeNodeIdx;
            const isSelected = currentNode.id === n.id;

            return (
              <g
                key={`${activeArch}-${n.id}`}
                transform={`translate(${n.x}, ${n.y})`}
                onClick={() => setSelectedNode(n)}
                className="cursor-pointer group"
                role="button"
                tabIndex={0}
                aria-label={`Inspect ${n.label} node`}
              >
                {/* Glow */}
                <motion.circle
                  r={36}
                  fill="url(#nodeGlow)"
                  animate={{
                    opacity: isSelected || isActive ? 1 : 0.2,
                    scale: isSelected ? 1.25 : isActive ? 1.15 : 1,
                  }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                />

                {/* Base Circle */}
                <circle
                  r={22}
                  fill="#0c0d10"
                  stroke={isSelected ? "var(--accent)" : isActive ? "var(--accent)" : "rgba(255,255,255,0.18)"}
                  strokeWidth={isSelected ? 2 : isActive ? 1.5 : 1}
                  className="transition-colors duration-200"
                />

                {/* Pulsing ring on active */}
                {isActive && !reduce && (
                  <motion.circle
                    r={22}
                    fill="transparent"
                    stroke="var(--accent)"
                    strokeWidth={1}
                    initial={{ scale: 1, opacity: 0.6 }}
                    animate={{ scale: 2.1, opacity: 0 }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                )}

                {/* Label inside */}
                <text
                  textAnchor="middle"
                  y={4}
                  className="fill-[var(--fg)] font-semibold select-none text-[9.5px] pointer-events-none"
                  style={{ fontFamily: "var(--font-mono), monospace" }}
                >
                  {n.label}
                </text>

                {/* Subtag underneath */}
                <text
                  textAnchor="middle"
                  y={38}
                  className="fill-[var(--fg-subtle)] text-[8.5px] select-none pointer-events-none"
                  style={{ fontFamily: "var(--font-mono), monospace" }}
                >
                  {n.subLabel}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Live State Inspector Pane for Selected Node */}
      <div className="rounded-xl border border-[var(--hairline)] bg-[var(--bg-elev)]/60 p-3.5 backdrop-blur-sm">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--hairline)] pb-2.5">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-[var(--accent)] animate-pulse" />
            <span className="mono text-xs font-semibold text-[var(--fg)]">
              Node: <span className="text-[var(--accent)]">{currentNode.label}</span>
            </span>
            <span className="mono text-[10px] text-[var(--fg-subtle)] bg-[var(--bg)] px-2 py-0.5 rounded border border-[var(--hairline-strong)]">
              {currentNode.tag}
            </span>
          </div>

          <div className="flex items-center gap-3 mono text-[11px] text-[var(--fg-subtle)]">
            <span className="flex items-center gap-1">
              <Cpu size={12} className="text-[var(--accent)]" />
              <span>{currentNode.model}</span>
            </span>
            <span className="flex items-center gap-1">
              <Activity size={12} className="text-[var(--fg-muted)]" />
              <span>{currentNode.latency}</span>
            </span>
            <span className="hidden sm:inline-block">({currentNode.tokens})</span>
          </div>
        </div>

        {/* State Payload Output */}
        <div className="mt-2.5 flex items-start gap-2">
          <span className="mono text-[10px] uppercase tracking-wider text-[var(--fg-subtle)] pt-0.5">
            state:
          </span>
          <pre className="flex-1 overflow-x-auto mono text-[11.5px] text-[var(--fg-muted)] bg-[#040405] p-2 rounded border border-[var(--hairline)]">
            <code>{currentNode.payload}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
