import { AIClient } from "../core/llm.js";

export async function runSystemCheck() {
  const ai = new AIClient();

  console.log("🔍 Running System Diagnostics...");

  const result = await ai.generate(
    [
      {
        role: "system",
        content: "You are a JSON generator. Output system status.",
      },
      { role: "user", content: "Report status." },
    ],
    { json: true }
  );

  console.log("✅ SYSTEM ONLINE");
  console.log(JSON.parse(result.content));
}
