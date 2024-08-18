export function formatSentence(message) {
  return capitalize(message).replace(/\.?$/, ".");
}

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
