import { AIClient } from "../core/llm.js";

export class CategorizerAgent {
  constructor() {
    this.ai = new AIClient();
  }

  async analyze(ticketContent) {
    const systemPrompt = {
      role: "system",
      content: `You are an advanced support ticket classifier.
      Analyze the input and output JSON with this structure:
      {
        "category": "Technical" | "Billing" | "Sales" | "General",
        "priority": "High" | "Medium" | "Low",
        "sentiment": "Positive" | "Neutral" | "Negative",
        "suggested_action": "string"
      }
      
      RULES:
      1. High priority is for system outages or payment failures.
      2. Low priority is for general questions.
      3. Be strict.
      4. Make sure the output is valid JSON only.`,
    };

    const userPrompt = {
      role: "user",
      content: ticketContent,
    };

    const result = await this.ai.generate([systemPrompt, userPrompt], {
      json: true,
    });
    return JSON.parse(result.content);
  }
}
