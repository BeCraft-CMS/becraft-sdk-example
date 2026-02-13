import { BeCraftClient } from '@becraft/sdk';

const baseUrl = import.meta.env.BECRAFT_API_URL;
const apiKey = import.meta.env.BECRAFT_API_KEY;

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
