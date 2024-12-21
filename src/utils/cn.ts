import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merges tailwind classes and handles conflicts
 * @param inputs Array of class names to merge
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
