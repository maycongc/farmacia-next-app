export const PERMISSOES = {
  LIST_LABORATORIO: 'laboratorio:read',
  LIST_REMEDIO: 'remedio:read',
  LIST_USUARIO: 'usuario:read',
  // Adicione outros conforme necessário
};

export function hasPermission(
  user: { permissoes?: string[] },
  permissoes: string,
) {
  return !!user?.permissoes?.includes(permissoes);
}
