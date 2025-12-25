export async function rerankChunks(chunks) {
  const filtered = chunks.filter((c) => c.score > 0.25);

  console.log("\n[RAG RERANK]");
  console.log(filtered);

  return filtered;
}
