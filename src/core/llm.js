import OpenAI from "openai";
import { config } from "../config/env.js";

export class AIClient {
  constructor() {
    this.client = new OpenAI({
      apiKey: config.openai.apiKey,
    });
  }

  async generate(messages, options = {}) {
    try {
      const response = await this.client.chat.completions.create({
        model: config.model.default,
        messages: messages,
        temperature: options.temperature || 0,
        response_format: options.json ? { type: "json_object" } : undefined,
        ...options,
      });

      return response.choices[0].message;
    } catch (error) {
      console.error(error);
      throw new Error("LLM Generation Failed");
    }
  }
}
