import { AIClient } from "../core/llm.js";

const ai = new AIClient();

export async function planTask(history) {
  const response = await ai.generate(
    [
      {
        role: "system",
        content:
          "You are a planner. Output JSON with exactly two keys: action and input. Allowed actions: order_lookup, policy_search, direct_answer. Rules: If user mentions an order ID like ORD-XXX, action must be order_lookup and input must be that order ID. If user mentions refund, policy, shipping, hours, action must be policy_search and input must describe the topic. Use direct_answer only if no tool is needed.",
      },
      ...history,
    ],
    { json: true }
  );

  const plan = JSON.parse(response.content);

  console.log("\n[PLANNER OUTPUT]");
  console.log(plan);

  if (!plan.action) {
    throw new Error("Planner missing action");
  }

  return plan;
}
