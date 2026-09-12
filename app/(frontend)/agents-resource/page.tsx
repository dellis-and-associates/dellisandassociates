import type { Metadata } from "next";
import LoginGate from "@/components/LoginGate";

export const metadata: Metadata = {
  title: "Agents resource",
};

export default function AgentsResourcePage() {
  return <LoginGate area="Agents resource" />;
}
