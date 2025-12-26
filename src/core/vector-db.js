import { AIClient } from "./llm.js";
import { cosineSimilarity } from "../utils/math.js";

export class VectorStore {
  constructor() {
    this.ai = new AIClient();
    this.store = [];
  }

  async addDocument(text) {
    const response = await this.ai.embed(text);
    this.store.push({ text, response });
  }

  async search(query) {
    // 1. Convert the USER'S question into numbers
    const response = await this.ai.embed(query);
    const queryVector = response;

    // 2. Compare against every document in the store
    const results = this.store.map((doc) => ({
      text: doc.text,
      similarity: cosineSimilarity(queryVector, doc.vector),
    }));

    // 3. Sort by similarity (Highest first)
    results.sort((a, b) => b.similarity - a.similarity);

    // Return the top match
    return results[0];
  }
}
