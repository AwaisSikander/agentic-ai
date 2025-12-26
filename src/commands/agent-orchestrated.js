import readline from "readline";
import { runOrchestratedAgent } from "../agents/orchestrated-agent.js";
import { manageHistory } from "../utils/memory.js";
import { initializeKnowledge } from "../tools/policy-search.js";

export async function runOrchestratedAgentCLI() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  await initializeKnowledge();

  let history = [
    {
      role: "system",
      content:
        "You are a customer support AI. Use tools when required. Be accurate and concise.",
    },
  ];

  const loop = () => {
    rl.question("\nYou: ", async (input) => {
      if (input.trim().toLowerCase() === "exit") {
        rl.close();
        return;
      }

      history.push({ role: "user", content: input });
      history = manageHistory(history);

      const answer = await runOrchestratedAgent(history, {
        useLocal: process.argv.includes("--local"),
      });

      console.log("\nAI:", answer);

      history.push({ role: "assistant", content: answer });
      history = manageHistory(history);

      loop();
    });
  };

  console.log("Orchestrated agent started. Type 'exit' to quit.");
  loop();
}
