import { SupportBot } from "../agents/support-bot.js";

export async function runSupportBot() {
  const bot = new SupportBot();
  const query = "Where is my order ORD-123?";

  console.log(`💬 User: "${query}"`);
  const answer = await bot.handleRequest(query);
  console.log(`🤖 Bot: "${answer}"`);
}
