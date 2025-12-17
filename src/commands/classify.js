import { CategorizerAgent } from "../agents/categorizer.js";

export async function runTicketClassifier() {
  const agent = new CategorizerAgent();

  const tickets = [
    "My server is down! I am losing money every second! Fix it NOW!",
    "Hi, I was wondering if you offer a discount for students?",
    "I can't find the logout button. Your UI is confusing.",
  ];

  console.log("📂 Starting Ticket Classification Module...\n");

  for (const ticket of tickets) {
    console.log(`📨 In: "${ticket}"`);
    try {
      const analysis = await agent.analyze(ticket);
      console.log("🤖 Out:", analysis);
      console.log("------------------------------------------------");
    } catch (error) {
      console.error("❌ Error:", error);
    }
  }
}
