import { ModelRouter } from "./model-router.js";

export class AIClient {
  constructor() {
    this.router = new ModelRouter();
  }

  async generate(messages, options = {}) {
    return this.router.generate(messages, options);
  }

  async embed(text, options = {}) {
    return this.router.embed(text, options);
  }
}
