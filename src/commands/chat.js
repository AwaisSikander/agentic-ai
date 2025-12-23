import readline from "readline";
import { AIClient } from "../core/llm.js";
import { manageHistory } from "../utils/memory.js";

export async function runChatMode() {
  const ai = new AIClient();

  const fullHistory = [
    {
      role: "system",
      content: "You are a helpful chat assistant. Remember the user's name.",
    },
  ];

  console.log("💬 Chat Mode Started. Type 'exit' to quit.\n");

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const askQuestion = () => {
    rl.question("You: ", async (userInput) => {
      if (userInput.toLowerCase() === "exit") {
        rl.close();
        return;
      }

      fullHistory.push({ role: "user", content: userInput });
      const contextToSend = manageHistory(fullHistory, 6);
      try {
        const responseMessage = await ai.generate(contextToSend);
        const aiReply = responseMessage.content;

        console.log(`🤖 AI: ${aiReply}\n`);

        fullHistory.push({ role: "assistant", content: aiReply });
      } catch (error) {
        console.error("❌ Error:", error.message);
      }

      askQuestion();
    });
  };

  askQuestion();
}
