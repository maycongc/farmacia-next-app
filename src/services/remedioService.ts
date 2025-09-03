import { api } from '@/lib/api/axios';
import { endpoints } from '@/lib/api/endpoints';
import { PageResponse } from '@/types/common';
import { RemedioRequest, RemedioResponse } from '@/types/remedio';

export function listRemedios(
  page = 0,
  pageSize = 10,
  sortBy: string | null,
  order: string | null,
): Promise<PageResponse<RemedioResponse>> {
  return api
    .get(endpoints.remedios, { params: { page, pageSize, sortBy, order } })
    .then(r => r.data);
}

export function getRemedio(id: number): Promise<RemedioResponse> {
  return api.get(`${endpoints.remedios}/${id}`).then(r => r.data);
}

export function createRemedio(
  payload: RemedioRequest,
): Promise<RemedioResponse> {
  return api.post(endpoints.remedios, payload).then(r => r.data);
}

export function updateRemedio(
  id: number,
  payload: RemedioRequest,
): Promise<RemedioResponse> {
  return api.put(`${endpoints.remedios}/${id}`, payload).then(r => r.data);
}

export function deleteRemedio(id: number): Promise<void> {
  return api.delete(`${endpoints.remedios}/${id}`).then(() => {});
}
