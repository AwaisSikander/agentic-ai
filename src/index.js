import { AIClient } from "./core/llm.js";

async function main() {
  const ai = new AIClient();

  const systemPrompt = {
    role: "system",
    content: "You are a specialized JSON generator. Output current status.",
  };

  const userPrompt = {
    role: "user",
    content: "Initialize system check.",
  };

  const result = await ai.generate([systemPrompt, userPrompt], { json: true });

  console.log(result.content);
}

main();
