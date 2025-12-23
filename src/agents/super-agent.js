import readline from "readline";
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

export async function runSuperAgent() {
  const ai = new AIClient();
  await initializeKnowledge();

  const history = [
    {
      role: "system",
      content:
        "You are a Super Agent. You have tools for Order Lookup and Policy Search. Use them whenever needed.",
    },
  ];

  const tools = [orderLookupToolDefinition, policyToolDefinition];

  console.log("\n🤖 SUPER AGENT ONLINE. I can check orders AND read policies.");
  console.log("Try: 'Where is order ORD-123?' or 'Can I return it?'\n");

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const ask = () => {
    rl.question("You: ", async (userInput) => {
      if (userInput.trim().toLowerCase() === "exit") {
        console.log("👋 Shutting down agent...");
        rl.close();
        process.exit(0);
      }

      history.push({ role: "user", content: userInput });

      try {
        let keepThinking = true;

        while (keepThinking) {
          const response = await ai.generate(history, {
            tools: tools,
            tool_choice: "auto",
          });

          const msg = response;

          if (!msg.tool_calls) {
            console.log(`🤖 AI: ${msg.content}\n`);
            history.push({ role: "assistant", content: msg.content });
            keepThinking = false;
          } else {
            history.push(msg);

            for (const toolCall of msg.tool_calls) {
              const fnName = toolCall.function.name;
              const args = JSON.parse(toolCall.function.arguments);
              let result = "";

              console.log(`⚡ Executing Tool: ${fnName}`);

              if (fnName === "get_order_details") {
                result = JSON.stringify(await getOrderDetails(args.orderId));
              } else if (fnName === "search_policies") {
                result = await searchPolicies(args.query);
              }

              history.push({
                role: "tool",
                tool_call_id: toolCall.id,
                content: result,
              });
            }
          }
        }
      } catch (error) {
        console.error("❌ Error:", error.message);
        console.log("⚠️ History corrupted. Resetting memory...");
        history.length = 1;
      }
      ask();
    });
  };
  ask();
}
