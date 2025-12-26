export function extractJSON(text) {
  if (!text) return null;

  text = text.replace(/```json|```/g, "").trim();

  const match = text.match(/\{[\s\S]*\}/);

  if (!match) return null;

  try {
    return JSON.parse(match[0]);
  } catch {
    return null;
  }
}
