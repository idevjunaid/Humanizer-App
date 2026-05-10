import { TEXT_LIMITS } from "./constants";

/**
 * Input validation utilities
 */

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export const validateTextInput = (text: string): ValidationResult => {
  if (!text || text.trim().length === 0) {
    return {
      isValid: false,
      error: "Please enter some text",
    };
  }

  const trimmed = text.trim();

  if (trimmed.length < TEXT_LIMITS.minInput) {
    return {
      isValid: false,
      error: `Text must be at least ${TEXT_LIMITS.minInput} characters`,
    };
  }

  if (trimmed.length > TEXT_LIMITS.maxInput) {
    return {
      isValid: false,
      error: `Text must not exceed ${TEXT_LIMITS.maxInput} characters`,
    };
  }

  return {
    isValid: true,
  };
};

export const validateEmail = (email: string): ValidationResult => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email || email.trim().length === 0) {
    return {
      isValid: false,
      error: "Email is required",
    };
  }

  if (!emailRegex.test(email)) {
    return {
      isValid: false,
      error: "Please enter a valid email address",
    };
  }

  return {
    isValid: true,
  };
};

export const validateFeedback = (
  name: string,
  email: string,
  message: string,
): ValidationResult => {
  if (!name || name.trim().length === 0) {
    return {
      isValid: false,
      error: "Name is required",
    };
  }

  const emailValidation = validateEmail(email);
  if (!emailValidation.isValid) {
    return emailValidation;
  }

  if (!message || message.trim().length === 0) {
    return {
      isValid: false,
      error: "Message is required",
    };
  }

  if (message.trim().length < 10) {
    return {
      isValid: false,
      error: "Message must be at least 10 characters",
    };
  }

  return {
    isValid: true,
  };
};
