/**
 * PulseID Utility Functions
 *
 * Lightweight, zero-dependency helper functions.
 */

/**
 * Combines CSS class names into a single string, filtering out falsy values.
 * Provides clean class composition without external runtime overhead.
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}
