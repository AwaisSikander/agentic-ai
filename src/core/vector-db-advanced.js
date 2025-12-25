import { AIClient } from "./llm.js";
import { cosineSimilarity } from "../utils/math.js";

export class AdvancedVectorStore {
  constructor() {
    this.ai = new AIClient();
    this.store = [];
  }

  async addDocuments(texts) {
    for (const text of texts) {
      const res = await this.ai.client.embeddings.create({
        model: "text-embedding-3-small",
        input: text,
      });

      this.store.push({
        text,
        vector: res.data[0].embedding,
      });
    }
  }

  async search(query, topK = 5) {
    const res = await this.ai.client.embeddings.create({
      model: "text-embedding-3-small",
      input: query,
    });

    const queryVector = res.data[0].embedding;

    return this.store
      .map((doc) => ({
        text: doc.text,
        score: cosineSimilarity(queryVector, doc.vector),
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, topK);
  }
}
