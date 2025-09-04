import { api } from '@/lib/api/axios';
import { endpoints } from '@/lib/api/endpoints';
import { PageResponse } from '@/types/common';
import {
  LaboratorioRequest,
  LaboratorioResponse,
  LaboratorioUpdateRequest,
} from '@/types/laboratorio';

export async function listLaboratorios(
  page = 0,
  pageSize = 10,
  sortBy?: string | null,
  order?: string | null,
): Promise<PageResponse<LaboratorioResponse>> {
  const { data } = await api.get(endpoints.laboratorios, {
    params: { page, pageSize, sortBy, order },
  });

  return data;
}

export async function getLaboratorio(id: number): Promise<LaboratorioResponse> {
  return await api.get(`${endpoints.laboratorios}/${id}`).then(r => r.data);
}

export async function createLaboratorio(
  payload: LaboratorioRequest,
): Promise<LaboratorioResponse> {
  return await api.post(endpoints.laboratorios, payload).then(r => r.data);
}

export async function updateLaboratorio(
  id: number,
  payload: LaboratorioUpdateRequest,
): Promise<LaboratorioResponse> {
  return await api
    .put(`${endpoints.laboratorios}/${id}`, payload)
    .then(r => r.data);
}

export async function deleteLaboratorio(id: number) {
  await api.delete(`${endpoints.laboratorios}/${id}`);
}

export async function deleteLaboratoriosEmLote(
  payload: Array<number>,
): Promise<void> {
  return await api
    .delete(`${endpoints.laboratorios}/lote`, { data: payload })
    .then(() => {});
}
