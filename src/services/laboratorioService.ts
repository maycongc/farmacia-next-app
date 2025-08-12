import { PageResponse } from '@/domain/dto/common';
import {
  LaboratorioRequest,
  LaboratorioUpdateRequest,
  LaboratorioResponse,
} from '@/domain/dto/laboratorio';
import { api } from '@/lib/api/axios';
import { endpoints } from '@/lib/api/endpoints';

export function listLaboratorios(
  page = 0,
  pageSize = 10,
): Promise<PageResponse<LaboratorioResponse>> {
  return api
    .get(endpoints.laboratorios, { params: { page, pageSize } })
    .then(r => r.data);
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
