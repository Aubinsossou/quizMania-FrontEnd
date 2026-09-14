// Configuration des API
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://quizmania.proojet.online';

export const buildApiUrl = (path = '') => {
  const cleanBase = API_BASE_URL.replace(/\/+$/, '');
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${cleanBase}${cleanPath}`;
};
