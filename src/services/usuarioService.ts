import { PageResponse } from '@/domain/dto/common';
import { UsuarioResponse } from '@/domain/dto/usuario';
import { api } from '@/lib/api/axios';
import { endpoints } from '@/lib/api/endpoints';

export function listUsuarios(
  page = 0,
  pageSize = 10,
): Promise<PageResponse<UsuarioResponse>> {
  return api
    .get(endpoints.usuarios, { params: { page, pageSize } })
    .then(r => r.data);
}
