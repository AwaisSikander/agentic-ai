import { AIClient } from "../core/llm.js";
import { getOrderDetails } from "../tools/order-lookup.js";
// import { searchPolicies } from "../tools/policy-search.js";
import { runRAG } from "./rag-orchestrator.js";

const ai = new AIClient();

export async function executeTask(plan, history, options = {}) {
  console.log("\n[EXECUTOR RECEIVED PLAN]");
  console.log(plan);

  const context = [...history];
  let injected = false;

  if (plan.action === "order_lookup") {
    const result = await getOrderDetails(plan.input);

    console.log("\n[ORDER LOOKUP RESULT]");
    console.log(result);

    context.push({
      role: "system",
      content: `Order lookup result: ${JSON.stringify(result)}`,
    });

    injected = true;
  }

  if (plan.action === "policy_search") {
    // const result = await searchPolicies(plan.input);
    const result = await runRAG(plan.input, options);

    console.log("\n[POLICY SEARCH RESULT]");
    console.log(result);

    context.push({
      role: "system",
      content: `Policy search result: ${result}`,
    });

    injected = true;
  }

  if (plan.action !== "direct_answer" && !injected) {
    throw new Error("Executor blocked: required context was not injected");
  }

  const response = await ai.generate(context, {
    useLocal: options.useLocal,
  });

  console.log("\n[RAW EXECUTOR ANSWER]");
  console.log(response.content);

  return response.content;
}
