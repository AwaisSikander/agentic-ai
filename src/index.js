import { runSystemCheck } from "./commands/check.js";
import { runTicketClassifier } from "./commands/classify.js";
import { runSupportBot } from "./commands/support.js";
import { runQABot } from "./commands/qa.js";
import { runChatMode } from "./commands/chat.js";

async function main() {
  const command = process.argv[2];

  switch (command) {
    case "check":
      await runSystemCheck();
      break;

    case "classify":
      await runTicketClassifier();
      break;

    case "support":
      await runSupportBot();
      break;

    case "qa":
      await runQABot();
      break;

    case "chat":
      await runChatMode();
      break;

    default:
      console.log("⚠️  Unknown Command.");
      console.log("Usage: npm start <command>");
      console.log("Commands:");
      console.log("  check      -> Run LLM connection test");
      console.log("  classify   -> Run support ticket agent");
      break;
  }
}

main();
