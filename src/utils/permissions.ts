export const PERMISSOES = {
  REMEDIO_READ: 'remedio:read',
  REMEDIO_CREATE: 'remedio:create',
  REMEDIO_UPDATE: 'remedio:update',
  REMEDIO_DELETE: 'remedio:delete',

  USUARIO_READ: 'usuario:read',
  USUARIO_CREATE: 'usuario:create',
  USUARIO_CREATE_ADMIN: 'usuario:create:admin',
  USUARIO_UPDATE: 'usuario:update',
  USUARIO_DELETE: 'usuario:delete',

  GRUPO_READ: 'grupo:read',
  GRUPO_CREATE: 'grupo:create',
  GRUPO_UPDATE: 'grupo:update',
  GRUPO_DELETE: 'grupo:delete',

  LABORATORIO_READ: 'laboratorio:read',
  LABORATORIO_CREATE: 'laboratorio:create',
  LABORATORIO_UPDATE: 'laboratorio:update',
  LABORATORIO_DELETE: 'laboratorio:delete',

  PERMISSAO_READ: 'permissao:read',
  PERMISSAO_MANAGE: 'permissao:manage',

  // Adicione outros conforme necessário
};

export function hasPermission(
  user: { permissoes?: string[] },
  permissoes: string,
) {
  return !!user?.permissoes?.includes(permissoes);
}
