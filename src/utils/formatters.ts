/**
 * Text formatting utilities
 */

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) {
    return text;
  }
  return text.substring(0, maxLength) + "...";
};

export const formatDate = (timestamp: number): string => {
  const date = new Date(timestamp);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (date.toDateString() === today.toDateString()) {
    return `Today ${date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}`;
  } else if (date.toDateString() === yesterday.toDateString()) {
    return `Yesterday ${date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}`;
  } else {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }
};

export const getTextPreview = (text: string, length: number = 50): string => {
  return truncateText(text, length);
};

export const wordCount = (text: string): number => {
  return text
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0).length;
};

export const charCount = (text: string): number => {
  return text.length;
};

export const readingTime = (text: string): string => {
  const words = wordCount(text);
  const minutes = Math.ceil(words / 200); // Average reading speed is ~200 words per minute
  return minutes === 1 ? "1 min read" : `${minutes} min read`;
};

export const capitalizeWords = (text: string): string => {
  return text
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

export const removeExtraWhitespace = (text: string): string => {
  return text.trim().replace(/\s+/g, " ");
};

export const getUniqueId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};
