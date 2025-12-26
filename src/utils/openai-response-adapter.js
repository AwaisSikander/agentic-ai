export function toOpenAIResponse(text) {
  return {
    id: `local-${Date.now()}`,
    object: "chat.completion",
    created: Math.floor(Date.now() / 1000),
    model: "local-llm",
    choices: [
      {
        index: 0,
        message: {
          role: "assistant",
          content: text,
        },
        finish_reason: "stop",
      },
    ],
    usage: {
      prompt_tokens: 0,
      completion_tokens: text.split(" ").length,
      total_tokens: text.split(" ").length,
    },
  };
}
