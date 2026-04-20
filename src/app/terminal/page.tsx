import type { Metadata } from "next";
import { TerminalClient } from "./TerminalClient";

export const metadata: Metadata = {
  title: "Terminal",
  description: "Retro terminal interface. Type `help` to begin.",
};

export default function TerminalPage() {
  return (
    <main className="flex min-h-[100dvh] items-stretch bg-black p-0 md:p-6">
      <TerminalClient />
    </main>
  );
}
