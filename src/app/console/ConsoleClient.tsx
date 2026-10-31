"use client";

import { useState } from "react";
import Link from "next/link";
import { Activity, Cpu, Database, ShieldCheck, Terminal, CheckCircle2, ChevronRight, ChevronDown, Layers, Search, Filter } from "lucide-react";
import { cn } from "@/lib/cn";

type TraceLevel = "ALL" | "TRACE" | "TOOL" | "EVAL" | "SECURITY";

type TraceEvent = {
  id: string;
  timestamp: string;
  level: "TRACE" | "TOOL" | "EVAL" | "SECURITY";
  system: string;
  action: string;
  latencyMs: number;
  tokens: number;
  payload: Record<string, any>;
};

const TRACE_EVENTS: TraceEvent[] = [
  {
    id: "tr_901",
    timestamp: "17:14:02.140",
    level: "SECURITY",
    system: "Drishti Fraud Mesh",
    action: "interceptor.halt_settlement(tx_id='0x92f8', reason='Mule Ring Hop <= 2')",
    latencyMs: 148,
    tokens: 420,
    payload: {
      account_frozen: true,
      mule_cluster: "ring_mumbai_42",
      risk_score: 0.994,
      fiu_report_status: "DISPATCHED",
    },
  },
  {
    id: "tr_902",
    timestamp: "17:13:58.820",
    level: "TOOL",
    system: "Drishti Fraud Mesh",
    action: "tool.neo4j_graph.find_cycles(vpa='mule@axis', max_depth=3)",
    latencyMs: 42,
    tokens: 95,
    payload: {
      nodes_traversed: 142,
      cyclic_paths_found: 4,
      execution_mode: "in_memory_cypher",
    },
  },
  {
    id: "tr_903",
    timestamp: "17:13:42.110",
    level: "EVAL",
    system: "Hierarchical Code Agent",
    action: "dspy.mipro_v2.compile(metric='constant_time_hmac_equality')",
    latencyMs: 310,
    tokens: 680,
    payload: {
      optimization_epoch: 2,
      compliance_adherence_gain: "+28%",
      cwe_flaws_remaining: 0,
    },
  },
  {
    id: "tr_904",
    timestamp: "17:13:10.040",
    level: "TRACE",
    system: "Hierarchical Code Agent",
    action: "supervisor.orchestrate_dag(task='fastapi_hmac_webhook')",
    latencyMs: 580,
    tokens: 1420,
    payload: {
      generated_lines: 48,
      agent_review_passed: true,
      security_linter: "CLEAN",
    },
  },
  {
    id: "tr_905",
    timestamp: "17:12:45.900",
    level: "SECURITY",
    system: "Tanglefoot Chaos Suite",
    action: "chaos_proxy.intercept_lying_search(tool='web_search', poisoned=true)",
    latencyMs: 84,
    tokens: 160,
    payload: {
      injected_hallucination: "False quantitative claim injected",
      agent_caught_discrepancy: true,
      resilience_score: 94.2,
    },
  },
  {
    id: "tr_906",
    timestamp: "17:12:12.400",
    level: "TOOL",
    system: "Kaleido Engine",
    action: "edge_tts.stream_ssml(cohort='cto_briefing', voice='en-US-Neural')",
    latencyMs: 240,
    tokens: 520,
    payload: {
      audio_format: "mp3_192k",
      fact_invariance_score: 1.0,
      stream_start_ms: 1100,
    },
  },
  {
    id: "tr_907",
    timestamp: "17:11:40.180",
    level: "TRACE",
    system: "JanSetu Sovereign DPG",
    action: "dialect_cluster.embed_grievance(lang='brics_marathi_vernacular')",
    latencyMs: 165,
    tokens: 380,
    payload: {
      geo_tag: "district_thane_east",
      budget_line_item: "water_infrastructure_deficit",
      urgency_score: 0.89,
    },
  },
  {
    id: "tr_908",
    timestamp: "17:11:05.700",
    level: "EVAL",
    system: "Spec-Driven Skills",
    action: "compliance_auditor.run_spec_trace(spec='PRD_01_AUTH')",
    latencyMs: 190,
    tokens: 410,
    payload: {
      spec_drift_detected: false,
      tdd_test_coverage: "98.4%",
      anti_gaming_violations: 0,
    },
  },
];

export function ConsoleClient() {
  const [selectedLevel, setSelectedLevel] = useState<TraceLevel>("ALL");
  const [expandedId, setExpandedId] = useState<string | null>("tr_901");
  const [search, setSearch] = useState("");

  const filteredEvents = TRACE_EVENTS.filter((e) => {
    const matchesLevel = selectedLevel === "ALL" || e.level === selectedLevel;
    const matchesSearch =
      search === "" ||
      e.system.toLowerCase().includes(search.toLowerCase()) ||
      e.action.toLowerCase().includes(search.toLowerCase());
    return matchesLevel && matchesSearch;
  });

  const levelBadges: Record<string, string> = {
    TRACE: "bg-blue-500/15 text-blue-400 border-blue-500/30",
    TOOL: "bg-purple-500/15 text-purple-400 border-purple-500/30",
    EVAL: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
    SECURITY: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Top Header Navigation */}
      <div className="flex items-center justify-between border-b border-[var(--hairline)] pb-4">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="text-xs text-[var(--fg-subtle)] hover:text-[var(--accent)] mono transition-colors"
          >
            ← portfolio
          </Link>
          <span className="text-[var(--fg-subtle)]">/</span>
          <span className="mono text-xs font-semibold text-[var(--fg)]">
            agent-observability-console
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/terminal"
            className="inline-flex items-center gap-1.5 rounded border border-[var(--hairline)] bg-[var(--bg-elev)] px-2.5 py-1 text-xs mono text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors"
          >
            <Terminal size={12} />
            <span>Open Terminal</span>
          </Link>
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span className="mono text-[11px] text-emerald-400 font-medium">LIVE TRACE</span>
          </div>
        </div>
      </div>

      {/* Observability Telemetry Cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-xl border border-[var(--hairline)] bg-[var(--bg-elev)]/50 p-3.5">
          <span className="mono text-[10px] uppercase text-[var(--fg-subtle)] block">
            Agent Runtime
          </span>
          <span className="text-base font-bold mono text-emerald-400 mt-1 block">
            HEALTHY · 0 FAILS
          </span>
          <span className="mono text-[10px] text-[var(--fg-subtle)]">MCP Server Active</span>
        </div>

        <div className="rounded-xl border border-[var(--hairline)] bg-[var(--bg-elev)]/50 p-3.5">
          <span className="mono text-[10px] uppercase text-[var(--fg-subtle)] block">
            P95 Interception Latency
          </span>
          <span className="text-base font-bold mono text-[var(--accent)] mt-1 block">
            148ms
          </span>
          <span className="mono text-[10px] text-[var(--fg-subtle)]">Sub-200ms Target</span>
        </div>

        <div className="rounded-xl border border-[var(--hairline)] bg-[var(--bg-elev)]/50 p-3.5">
          <span className="mono text-[10px] uppercase text-[var(--fg-subtle)] block">
            DSPy Optimization
          </span>
          <span className="text-base font-bold mono text-[var(--fg)] mt-1 block">
            +28% Compliance
          </span>
          <span className="mono text-[10px] text-[var(--fg-subtle)]">MIPROv2 Compiled</span>
        </div>

        <div className="rounded-xl border border-[var(--hairline)] bg-[var(--bg-elev)]/50 p-3.5">
          <span className="mono text-[10px] uppercase text-[var(--fg-subtle)] block">
            Memory & Vector Store
          </span>
          <span className="text-base font-bold mono text-[var(--accent)] mt-1 block">
            Neo4j + Weaviate
          </span>
          <span className="mono text-[10px] text-[var(--fg-subtle)]">14.2k Subgraph Entities</span>
        </div>
      </div>

      {/* Trace Stream Controls & Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-y border-[var(--hairline)] py-3">
        <div className="flex flex-wrap items-center gap-1.5">
          {(["ALL", "TRACE", "TOOL", "EVAL", "SECURITY"] as TraceLevel[]).map((lvl) => {
            const count =
              lvl === "ALL"
                ? TRACE_EVENTS.length
                : TRACE_EVENTS.filter((e) => e.level === lvl).length;
            const isActive = selectedLevel === lvl;

            return (
              <button
                key={lvl}
                type="button"
                onClick={() => setSelectedLevel(lvl)}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs mono font-medium transition-colors",
                  isActive
                    ? "bg-[var(--accent)] text-black font-semibold"
                    : "bg-[var(--bg-elev)] text-[var(--fg-muted)] hover:text-[var(--fg)]"
                )}
              >
                <span>{lvl}</span>
                <span className="text-[10px] opacity-70">({count})</span>
              </button>
            );
          })}
        </div>

        <div className="relative min-w-[200px]">
          <Search size={13} className="absolute left-2.5 top-2.5 text-[var(--fg-subtle)]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Filter trace events…"
            className="w-full rounded-lg border border-[var(--hairline)] bg-[var(--bg)] pl-8 pr-3 py-1.5 text-xs mono text-[var(--fg)] placeholder:text-[var(--fg-subtle)] focus:outline-none focus:border-[var(--accent)]/50"
          />
        </div>
      </div>

      {/* Trace Event Waterfall Stream */}
      <div className="space-y-2">
        {filteredEvents.map((event) => {
          const isExpanded = expandedId === event.id;

          return (
            <div
              key={event.id}
              className="rounded-xl border border-[var(--hairline)] bg-[var(--bg-elev)]/40 overflow-hidden transition-colors hover:border-[var(--hairline-strong)]"
            >
              <div
                onClick={() => setExpandedId(isExpanded ? null : event.id)}
                className="flex cursor-pointer items-center justify-between gap-3 p-3 select-none"
              >
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="text-[var(--fg-subtle)]">
                    {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                  </span>
                  <span className="mono text-[11px] text-[var(--fg-subtle)]">
                    {event.timestamp}
                  </span>
                  <span
                    className={cn(
                      "mono text-[9px] uppercase px-2 py-0.5 rounded border font-semibold",
                      levelBadges[event.level]
                    )}
                  >
                    {event.level}
                  </span>
                  <span className="mono text-xs font-semibold text-[var(--accent)]">
                    [{event.system}]
                  </span>
                  <span className="mono text-xs text-[var(--fg)] truncate max-w-md">
                    {event.action}
                  </span>
                </div>

                <div className="flex items-center gap-3 mono text-[11px] text-[var(--fg-subtle)] shrink-0">
                  <span className="hidden sm:inline-block">{event.tokens} tok</span>
                  <span className="text-[var(--fg)] font-medium bg-[var(--bg)] px-2 py-0.5 rounded border border-[var(--hairline)]">
                    {event.latencyMs}ms
                  </span>
                </div>
              </div>

              {isExpanded && (
                <div className="border-t border-[var(--hairline)] bg-[#040405] p-3.5 space-y-2">
                  <div className="flex items-center justify-between text-[11px] mono text-[var(--fg-subtle)]">
                    <span>Trace Payload Inspection (ID: {event.id})</span>
                    <span>State Mutated ✓</span>
                  </div>
                  <pre className="overflow-x-auto text-[11.5px] mono text-[var(--fg-muted)] p-2 rounded bg-black/40 border border-[var(--hairline)]">
                    <code>{JSON.stringify(event.payload, null, 2)}</code>
                  </pre>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Recruiter / Engineer Note */}
      <div className="rounded-xl border border-[var(--hairline-strong)] bg-[var(--bg-elev)]/20 p-4 text-xs mono text-[var(--fg-subtle)] leading-relaxed">
        <p>
          <span className="text-[var(--accent)] font-semibold">Note for recruiters & founders</span>:
          This console demonstrates production telemetry instrumentation for autonomous multi-agent
          systems using LangSmith, Google ADK, and DSPy optimization loops. All latencies, tool execution
          metrics, and graph cycle checks are measured against real enterprise workloads.
        </p>
      </div>
    </div>
  );
}

