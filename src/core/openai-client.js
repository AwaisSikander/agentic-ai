import OpenAI from "openai";
import { config } from "../config/env.js";
import { CostTracker } from "./cost-tracker.js";

const costTracker = new CostTracker();

export class OpenAIClient {
  constructor() {
    this.client = new OpenAI({
      apiKey: config.openai.apiKey,
      organization: config.openai.organization,
      project: config.openai.projectId,
    });
  }

  async generate(messages, options = {}) {
    try {
      const { json, temperature, ...apiOptions } = options;

      const isNano = config.model.default.includes("nano");
      const safeTemperature = isNano ? 1 : temperature ?? 0.7;

      const response = await this.client.chat.completions.create({
        model: config.model.default,
        messages: messages,
        response_format: json ? { type: "json_object" } : undefined,
        temperature: safeTemperature,
        ...apiOptions,
      });

      const usage = response.usage?.total_tokens || 0;
      costTracker.trackOpenAI(usage);
      costTracker.log();

      return response.choices[0].message;
    } catch (error) {
      console.error(error.message);
      throw new Error("LLM Generation Failed");
    }
  }
  async embed(text) {
    const res = await this.client.embeddings.create({
      model: "text-embedding-3-small",
      input: text,
    });

    return res.data[0].embedding;
  }
}
