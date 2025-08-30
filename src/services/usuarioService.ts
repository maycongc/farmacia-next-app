import { api } from '@/lib/api/axios';
import { endpoints } from '@/lib/api/endpoints';
import { PageResponse } from '@/types/common';
import { UsuarioResponse } from '@/types/usuario';

export function listUsuarios(
  page = 0,
  pageSize = 10,
): Promise<PageResponse<UsuarioResponse>> {
  return api
    .get(endpoints.usuarios, { params: { page, pageSize } })
    .then(r => r.data);
}
