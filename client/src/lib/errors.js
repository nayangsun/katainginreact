import { formatSentence } from "./utils";

export function isUnauthorizedError(error) {
  return (error && error.message === "Unauthorized") || false;
}

export function errorToMessage(error) {
  if (!error || !error.errors) {
    return "Something went wrong.";
  }

  const errorEntries = Object.entries(error.errors);
  if (errorEntries.length === 0) {
    return "Something went wrong.";
  }

  // Handle a single 'message' field
  if (error.errors.message) {
    return formatSentence(error.errors.message);
  }

  // Handle multiple fields with error arrays
  return errorEntries
    .map(([field, messages]) =>
      messages
        .map((message) => `${field}: ${formatSentence(message)}`)
        .join(" ")
    )
    .join(" ");
}
