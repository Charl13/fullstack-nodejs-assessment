import { apiFetch } from '@/api/client';

export const getCocktail = (id) => apiFetch(`/cocktails/${id}`);

export const getCocktails = () => apiFetch('/cocktails');

export const createCocktail = (payload) =>
  apiFetch('/cocktails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
