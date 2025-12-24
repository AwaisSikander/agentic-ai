import { AIClient } from "../core/llm.js";
import {
  getOrderDetails,
  orderLookupToolDefinition,
} from "../tools/order-lookup.js";
import {
  searchPolicies,
  policyToolDefinition,
  initializeKnowledge,
} from "../tools/policy-search.js";

const ai = new AIClient();
let isKnowledgeLoaded = false;

export async function processUserMessage(fullHistory) {
  if (!isKnowledgeLoaded) {
    console.log("🔄 Initializing Knowledge Base...");
    await initializeKnowledge();
    isKnowledgeLoaded = true;
    console.log("✅ Knowledge Base Ready.");
  }

  const tools = [orderLookupToolDefinition, policyToolDefinition];
  const messages = [...fullHistory];

  let keepThinking = true;

  while (keepThinking) {
    console.log("🧠 Sending request to OpenAI...");
    const response = await ai.generate(messages, {
      tools: tools,
      tool_choice: "auto",
    });

    const msg = response;

    if (!msg.tool_calls) {
      console.log("🤖 AI decided to reply directly.");
      messages.push({ role: "assistant", content: msg.content });
      keepThinking = false;
    } else {
      console.log("🛠️ AI wants to use tools:", msg.tool_calls.length);
      messages.push(msg);

      for (const toolCall of msg.tool_calls) {
        const fnName = toolCall.function.name;
        const args = JSON.parse(toolCall.function.arguments);
        let result = "";

        console.log(`⚡ Running Tool: ${fnName}`);

        if (fnName === "get_order_details") {
          result = JSON.stringify(await getOrderDetails(args.orderId));
        } else if (fnName === "search_policies") {
          result = await searchPolicies(args.query);
        }

        messages.push({
          role: "tool",
          tool_call_id: toolCall.id,
          content: result,
        });
      }
      console.log("🔄 Tool finished. Asking AI again...");
    }
  }

  return messages;
}
