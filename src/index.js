import { runSystemCheck } from "./commands/check.js";
import { runTicketClassifier } from "./commands/classify.js";

async function main() {
  const command = process.argv[2];

  switch (command) {
    case "check":
      await runSystemCheck();
      break;

    case "classify":
      await runTicketClassifier();
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
