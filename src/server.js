import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { processUserMessage } from "./agents/agent-backend.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "../public")));

app.post("/chat", async (req, res) => {
  try {
    const { history } = req.body;
    if (!history) return res.status(400).json({ error: "History is required" });

    console.log("📨 Incoming Request from Browser...");
    const updatedHistory = await processUserMessage(history);
    console.log("✅ Request Complete. Sending Response.");

    res.json({ history: updatedHistory });
  } catch (error) {
    console.error("❌ Server Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
