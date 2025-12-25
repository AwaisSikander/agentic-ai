import { planTask } from "./planner-agent.js";
import { executeTask } from "./executor-agent.js";
import { critiqueAnswer } from "./critic-agent.js";

export async function runOrchestratedAgent(history) {
  const plan = await planTask(history);
  const answer = await executeTask(plan, history);
  const finalAnswer = await critiqueAnswer(answer, history);
  return finalAnswer;
}
