import { VectorStore } from "../core/vector-db.js";

const db = new VectorStore();

export async function initializeKnowledge() {
  console.log("📚 Loading Corporate Policies...");
  await db.addDocument(
    "Refund Policy: Returns allowed within 30 days. 100% money back."
  );
  await db.addDocument(
    "Shipping: We ship to USA/Canada. Delivery takes 3-5 days."
  );
  await db.addDocument("Hours: Support is open 24/7.");
}

export async function searchPolicies(query) {
  console.log(`📖 SEARCHING KNOWLEDGE for: "${query}"...`);
  const result = await db.search(query);

  if (!result) {
    return "No relevant policy found in the knowledge base.";
  }

  return `Policy Found: "${result.text}" (Relevance: ${(
    result.similarity * 100
  ).toFixed(1)}%)`;
}

export const policyToolDefinition = {
  type: "function",
  function: {
    name: "search_policies",
    description:
      "Search the company knowledge base for policies on refunds, shipping, or support.",
    parameters: {
      type: "object",
      properties: {
        query: {
          type: "string",
          description:
            "The topic to search for (e.g., 'refunds', 'shipping times').",
        },
      },
      required: ["query"],
      additionalProperties: false,
    },
    strict: true,
  },
};
