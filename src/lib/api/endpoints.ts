export const endpoints = {
  auth: {
    register: '/auth/register',
    login: '/auth/login',
    refresh: '/auth/refresh',
    me: '/auth/me',
    logout: '/auth/logout',
  },
  usuarios: '/usuarios',
  laboratorios: '/laboratorios',
  remedios: '/remedios',
} as const;
