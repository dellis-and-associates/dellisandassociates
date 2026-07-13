import type { Metadata } from "next";
import LoginGate from "@/components/LoginGate";

export const metadata: Metadata = {
  title: "Agent training",
};

export default function AgentTrainingPage() {
  return <LoginGate area="Agent training" />;
}
