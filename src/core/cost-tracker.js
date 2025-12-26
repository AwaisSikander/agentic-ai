export class CostTracker {
  constructor() {
    this.totalTokens = 0;
    this.totalCost = 0;
  }

  trackOpenAI(tokens) {
    const costPer1k = 0.002;
    const cost = (tokens / 1000) * costPer1k;

    this.totalTokens += tokens;
    this.totalCost += cost;
  }

  log() {
    console.log(
      `💰 Tokens used: ${
        this.totalTokens
      } | Estimated cost: $${this.totalCost.toFixed(4)}`
    );
  }
}
