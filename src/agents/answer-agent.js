import { AIClient } from "../core/llm.js";

const ai = new AIClient();

export async function generateGroundedAnswer(query, chunks) {
  if (chunks.length === 0) {
    return "I do not have enough information in the knowledge base to answer this question.";
  }

  const response = await ai.generate([
    {
      role: "system",
      content:
        "Answer strictly using the provided context. Do not add new facts. If the answer is not in the context, say you do not know.",
    },
    {
      role: "user",
      content: `Question: ${query}\nContext:\n${chunks
        .map((c) => c.text)
        .join("\n")}`,
    },
  ]);

  console.log("\n[RAG ANSWER]");
  console.log(response.content);

  return response.content;
}
