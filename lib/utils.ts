import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { format } from 'date-fns';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string) {
  if (!date) return '';
  try {
    return format(new Date(date), 'MMM d, yyyy');
  } catch (error) {
    return '';
  }
}

export function generateSlug(text: string): string {
  if (!text) return 'undefined';
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}