import { apiFetch } from '@/api/client';

export const getCocktail = (id) => apiFetch(`/cocktails/${id}`);

export const getCocktails = (query) =>
  apiFetch(`/cocktails${query ? `?q=${encodeURIComponent(query)}` : ''}`);

export const createCocktail = (payload) =>
  apiFetch('/cocktails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
