export function formatTaskTitle(title: string): string {
  const trimmed = title.trim();

  // Check word limit
  const words = trimmed.split(/\s+/);
  if (words.length > 4) {
    return words.slice(0, 4).join(" ") + "...";
  }

  // Check character limit
  if (trimmed.length > 20) {
    return trimmed.slice(0, 20).trimEnd() + "...";
  }

  return trimmed;
}