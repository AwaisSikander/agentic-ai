import { AIClient } from "../core/llm.js";

const ai = new AIClient();

export async function critiqueAnswer(answer, history) {
  console.log("\n[CRITIC INPUT]");
  console.log(answer);

  const response = await ai.generate([
    {
      role: "system",
      content:
        "You are a reviewer. Improve clarity and correctness ONLY. Do not add new facts, do not add templates, do not expand scope. Preserve factual content.",
    },
    ...history,
    { role: "assistant", content: answer },
  ]);

  console.log("\n[CRITIC OUTPUT]");
  console.log(response.content);

  return response.content;
}
