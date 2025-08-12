import { format, parseISO } from 'date-fns';

export function formatDate(dateString: string, dateFormat = 'dd/MM/yyyy') {
  if (!dateString) return '';
  const date = parseISO(dateString);
  return format(date, dateFormat);
}

export function formatDateTime(
  dateString: string,
  dateFormat = 'dd/MM/yyyy HH:mm',
) {
  if (!dateString) return '';
  const date = parseISO(dateString);
  return format(date, dateFormat);
}
