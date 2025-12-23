export function dotProduct(a, b) {
  return a.map((x, i) => a[i] * b[i]).reduce((m, n) => m + n);
}

export function magnitude(vec) {
  return Math.sqrt(vec.reduce((p, n) => p + n * n, 0));
}

export function cosineSimilarity(vecA, vecB) {
  return dotProduct(vecA, vecB) / (magnitude(vecA) * magnitude(vecB));
}
