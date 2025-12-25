import { retrieveChunks } from "./retrieval-agent.js";
import { rerankChunks } from "./reranker-agent.js";
import { generateGroundedAnswer } from "./answer-agent.js";

export async function runRAG(query) {
  const retrieved = await retrieveChunks(query);
  const ranked = await rerankChunks(retrieved);
  return await generateGroundedAnswer(query, ranked);
}
