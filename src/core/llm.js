import OpenAI from "openai";
import { config } from "../config/env.js";

export class AIClient {
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

      return response.choices[0].message;
    } catch (error) {
      console.error(error.message);
      throw new Error("LLM Generation Failed");
    }
  }
}
