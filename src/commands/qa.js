import { VectorStore } from "../core/vector-db.js";
import { AIClient } from "../core/llm.js";

export async function runQABot() {
  const db = new VectorStore();
  const ai = new AIClient();

  console.log("🔄 Loading Knowledge Base...");

  await db.addDocument(
    "Refund Policy: You can return items within 30 days for a full refund."
  );
  await db.addDocument(
    "Shipping Policy: We ship only to the USA and Canada. Delivery takes 5 days."
  );
  await db.addDocument("Tech Support: Our support hours are 9 AM to 5 PM EST.");

  const userQuestion = "Can I get my money back?";
  console.log(`❓ User asks: "${userQuestion}"`);

  const bestMatch = await db.search(userQuestion);
  console.log(
    `💡 Found Context (${(bestMatch.similarity * 100).toFixed(1)}% match): "${
      bestMatch.text
    }"`
  );

  const result = await ai.generate([
    {
      role: "system",
      content: "Answer the user using only the provided context.",
    },
    {
      role: "user",
      content: `Context: ${bestMatch.text}\n\nQuestion: ${userQuestion}`,
    },
  ]);

  console.log(`🤖 Answer: ${result.content}`);
}
