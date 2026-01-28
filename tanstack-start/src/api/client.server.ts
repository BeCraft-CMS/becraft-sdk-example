import { BeCraftClient } from 'becraft-sdk';

// Server-only environment variables (no VITE_ prefix)
const baseUrl = process.env.BECRAFT_API_URL;
const apiKey = process.env.BECRAFT_API_KEY;

if (!baseUrl) {
  console.warn('BECRAFT_API_URL must be set');
}
if (!apiKey) {
  console.warn('BECRAFT_API_KEY must be set');
}

export const client = new BeCraftClient({
  baseUrl: baseUrl ?? '',
  apiKey: apiKey ?? '',
});
