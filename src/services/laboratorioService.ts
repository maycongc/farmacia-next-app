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
): Promise<PageResponse<LaboratorioResponse>> {
  const { data } = await api.get(endpoints.laboratorios, {
    params: { page, pageSize },
  });

  return data;
}

export function getLaboratorio(id: number): Promise<LaboratorioResponse> {
  return api.get(`${endpoints.laboratorios}/${id}`).then(r => r.data);
}

export function createLaboratorio(
  payload: LaboratorioRequest,
): Promise<LaboratorioResponse> {
  return api.post(endpoints.laboratorios, payload).then(r => r.data);
}

export function updateLaboratorio(
  id: number,
  payload: LaboratorioUpdateRequest,
): Promise<LaboratorioResponse> {
  return api.put(`${endpoints.laboratorios}/${id}`, payload).then(r => r.data);
}

export function deleteLaboratorio(id: number): Promise<void> {
  return api.delete(`${endpoints.laboratorios}/${id}`).then(() => {});
}

export function deleteLaboratoriosEmLote(
  payload: Array<number>,
): Promise<void> {
  return api
    .delete(`${endpoints.laboratorios}/lote`, { data: payload })
    .then(() => {});
}
