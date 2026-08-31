export const API_BASE_URL = '/api';

const parseErrorMessage = async (response) => {
  const body = await response.json().catch(() => null);

  return body?.message || `HTTP error! status: ${response.status}`;
};

export const apiFetch = async (path, options) => {
  const response = await fetch(`${API_BASE_URL}${path}`, options);

  if (!response.ok) {
    throw new Error(await parseErrorMessage(response));
  }
  return response.json();
};
