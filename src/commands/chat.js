import readline from "readline";
import { AIClient } from "../core/llm.js";

export async function runChatMode() {
  const ai = new AIClient();

  const history = [
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

      history.push({ role: "user", content: userInput });

      try {
        const responseMessage = await ai.generate(history);
        const aiReply = responseMessage.content;

        console.log(`🤖 AI: ${aiReply}\n`);

        history.push({ role: "assistant", content: aiReply });
      } catch (error) {
        console.error("❌ Error:", error.message);
      }

      askQuestion();
    });
  };

  askQuestion();
}
