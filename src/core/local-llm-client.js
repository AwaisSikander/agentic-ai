import { extractJSON } from "../utils/json-cleaner.js";
import { toOpenAIResponse } from "../utils/openai-response-adapter.js";

export class LocalLLMClient {
  constructor() {
    this.url = "http://localhost:11434";
    this.model = "phi3:mini";
    this.embedModel = "embeddinggemma";
  }

  async isAvailable() {
    try {
      const res = await fetch("http://localhost:11434");
      return res.ok;
    } catch {
      return false;
    }
  }

  async generate(messages, options = {}) {
    let finalMessages = [...messages];

    if (options.json) {
      finalMessages = [
        {
          role: "system",
          content:
            "You must return ONLY valid JSON. Do not add explanations, markdown, or extra text.",
        },
        ...messages,
      ];
    }

    const prompt = finalMessages
      .map((m) => `${m.role}: ${m.content}`)
      .join("\n");
    const { json, temperature, ...apiOptions } = options;

    const res = await fetch(`${this.url}/api/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: this.model,
        prompt,
        stream: false,
        response_format: json ? { type: "json_object" } : undefined,
        ...apiOptions,
      }),
    });

    const data = await res.json();

    if (options.json) {
      const parsed = extractJSON(data.response);
      if (!parsed) {
        throw new Error("Invalid JSON returned by local model");
      }

      return toOpenAIResponse(JSON.stringify(parsed)).choices[0].message;
    }

    return toOpenAIResponse(data.response).choices[0].message;
  }

  async embed(text) {
    const res = await fetch(`${this.url}/api/embed`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: this.embedModel,
        input: text,
      }),
    });

    const data = await res.json();

    return data.embeddings[0];
  }
}
