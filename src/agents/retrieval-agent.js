import { ragStore } from "../core/rag-store.js";
const store = ragStore;
let ready = true;

export async function retrieveChunks(query) {
  if (!ready) {
    await store.addDocuments([
      "Refund Policy: Returns allowed within 30 days. 100% money back.",
      "Shipping Policy: Orders ship within 3–5 business days.",
      "Support Hours: Customer support is available 24/7.",
    ]);
    ready = true;
  }

  const results = await store.search(query);

  console.log("\n[RAG RETRIEVAL]");
  console.log(results);

  return results;
}
