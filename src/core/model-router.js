import { OpenAIClient } from "./openai-client.js";
import { LocalLLMClient } from "./local-llm-client.js";
import dotenv from "dotenv";
dotenv.config();

export class ModelRouter {
  constructor() {
    this.mode = process.env.AI_MODE || "openai";
    this.openai = new OpenAIClient();
    this.local = new LocalLLMClient();
    console.log(`🤖 AI Mode: ${this.mode}`);
  }

  async generate(messages, options = {}) {
    const start = Date.now();

    const useLocal = this.mode === "local" && (await this.local.isAvailable());

    if (useLocal) {
      return this.local.generate(messages, options);
    } else {
      console.log("⚠️ Local LLM not running, falling back to OpenAI.");
    }
    const duration = Date.now() - start;
    console.log(`⏱️ Model response time: ${duration} ms`);

    return this.openai.generate(messages, options);
  }

  async embed(text) {
    const useLocal = this.mode === "local" && (await this.local.isAvailable());

    if (useLocal) {
      return this.local.embed(text);
    }
    return this.openai.embed(text);
  }
}
