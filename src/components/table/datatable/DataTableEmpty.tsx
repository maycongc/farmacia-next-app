interface DataTableEmptyProps {
  colSpan: number;
  message: string;
}

export function DataTableEmpty({ colSpan, message }: DataTableEmptyProps) {
  return (
    <tr>
      <td colSpan={colSpan} className="px-4 py-6 text-center text-gray-500">
        {message}
      </td>
    </tr>
  );
}
