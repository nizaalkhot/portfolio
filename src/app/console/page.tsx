import type { Metadata } from "next";
import { ConsoleClient } from "./ConsoleClient";

export const metadata: Metadata = {
  title: "Agent Observability Console · Nizaal Khot",
  description: "Real-time telemetry, trace streams, and agent architecture observability for autonomous multi-agent systems.",
  robots: { index: false, follow: false },
};

export default function ConsolePage() {
  return (
    <main className="mx-auto min-h-screen max-w-5xl px-6 py-20">
      <ConsoleClient />
    </main>
  );
}
