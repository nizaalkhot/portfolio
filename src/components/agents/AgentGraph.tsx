"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

type NodeDef = {
  id: string;
  label: string;
  x: number;
  y: number;
  tag: string;
};

const nodes: NodeDef[] = [
  { id: "researcher", label: "Researcher", x: 120, y: 90, tag: "tool.search" },
  { id: "analyst", label: "Analyst", x: 340, y: 90, tag: "llm.reason" },
  { id: "writer", label: "Writer", x: 560, y: 90, tag: "llm.compose" },
  { id: "reviewer", label: "Reviewer", x: 340, y: 260, tag: "llm.critique" },
];

const edges: [string, string][] = [
  ["researcher", "analyst"],
  ["analyst", "writer"],
  ["writer", "reviewer"],
  ["reviewer", "analyst"],
];

const nodeById = (id: string) => nodes.find((n) => n.id === id)!;

export function AgentGraph() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const interval = setInterval(() => {
      setActive((a) => (a + 1) % nodes.length);
    }, 1600);
    return () => clearInterval(interval);
  }, [reduce]);

  return (
    <div className="relative w-full" aria-hidden>
      <svg
        viewBox="0 0 680 340"
        className="w-full h-auto"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.35" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="edgeGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0" />
            <stop offset="50%" stopColor="var(--accent)" stopOpacity="0.8" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
          </linearGradient>
          <filter id="soft" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" />
          </filter>
        </defs>

        {/* Edges */}
        {edges.map(([from, to], i) => {
          const a = nodeById(from);
          const b = nodeById(to);
          return (
            <g key={`${from}-${to}`}>
              <line
                x1={a.x}
                y1={a.y}
                x2={b.x}
                y2={b.y}
                stroke="rgba(255,255,255,0.08)"
                strokeWidth={1}
              />
              <motion.line
                x1={a.x}
                y1={a.y}
                x2={b.x}
                y2={b.y}
                stroke="url(#edgeGrad)"
                strokeWidth={1.5}
                strokeDasharray="6 14"
                initial={{ strokeDashoffset: 0, opacity: 0.4 }}
                animate={reduce ? {} : { strokeDashoffset: -80, opacity: [0.2, 1, 0.2] }}
                transition={{
                  duration: 2.6,
                  repeat: Infinity,
                  ease: "linear",
                  delay: i * 0.35,
                }}
              />
            </g>
          );
        })}

        {/* Nodes */}
        {nodes.map((n, i) => {
          const isActive = i === active;
          return (
            <g key={n.id} transform={`translate(${n.x}, ${n.y})`}>
              <motion.circle
                r={38}
                fill="url(#nodeGlow)"
                animate={{ opacity: isActive ? 1 : 0.35, scale: isActive ? 1.15 : 1 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              />
              <motion.circle
                r={22}
                fill="var(--bg-elev)"
                stroke={isActive ? "var(--accent)" : "rgba(255,255,255,0.14)"}
                strokeWidth={isActive ? 1.5 : 1}
                animate={{ scale: isActive ? 1.08 : 1 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              />
              {isActive && (
                <motion.circle
                  r={22}
                  fill="transparent"
                  stroke="var(--accent)"
                  strokeWidth={1}
                  initial={{ scale: 1, opacity: 0.5 }}
                  animate={{ scale: 2.2, opacity: 0 }}
                  transition={{ duration: 1.4, repeat: Infinity }}
                />
              )}
              <text
                textAnchor="middle"
                y={5}
                className="fill-[var(--fg)]"
                style={{
                  fontFamily: "var(--font-mono), monospace",
                  fontSize: 10,
                  letterSpacing: "-0.01em",
                }}
              >
                {n.label.toLowerCase()}
              </text>
              <text
                textAnchor="middle"
                y={50}
                className="fill-[var(--fg-subtle)]"
                style={{
                  fontFamily: "var(--font-mono), monospace",
                  fontSize: 9,
                  letterSpacing: "0.04em",
                }}
              >
                {n.tag}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
