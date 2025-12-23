export function manageHistory(history, maxMessages = 10) {
  if (history.length <= maxMessages) {
    return history;
  }

  const systemPrompt = history[0];

  const recentHistory = history.slice(-(maxMessages - 1));

  return [systemPrompt, ...recentHistory];
}
