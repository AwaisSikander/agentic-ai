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
      const { json, ...apiOptions } = options;

      const response = await this.client.chat.completions.create({
        model: config.model.default,
        messages: messages,
        response_format: json ? { type: "json_object" } : undefined,
        temperature: 1,
        ...apiOptions,
      });

      return response.choices[0].message;
    } catch (error) {
      console.error(error.message);
      throw new Error("LLM Generation Failed");
    }
  }
}
