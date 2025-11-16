import type { TableColumn } from '@nuxt/ui';
import { downloadCSV } from '~/utils/csv';

/**
 * Composable for exporting table data as a CSV file.
 *
 * @returns {{
 *   downloadTableData: (
 *     data: Record<string, any>[],
 *     columns: TableColumn<any>[],
 *     filename?: string
 *   ) => void
 * }}
 *
 * Provides a function to generate and download a CSV file from displayed table data
 * and associated column configuration. Handles header extraction and formatting.
 */

export const useCsvDownload = () => {
  const downloadTableData = (
    data: Record<string, any>[],
    columns: TableColumn<any>[],
    filename?: string,
  ) => {
    if (!data || data.length === 0 || !columns) {
      console.warn('No table data available for download');
      return;
    }

    // Extract columns with accessorKey and their headers
    const validColumns = columns
      .map((col) => ({
        header: col.header as string,
        accessorKey: 'accessorKey' in col ? (col.accessorKey as string) : null,
      }))
      .filter((col): col is { header: string; accessorKey: string } => col.accessorKey !== null);

    const headerLabels = validColumns.map((col) => col.header);

    // Create CSV data using header labels as keys and actual data values
    const csvData = data.map((row) => {
      const csvRow: Record<string, any> = {};
      validColumns.forEach((col) => {
        csvRow[col.header] = row[col.accessorKey] ?? '';
      });
      return csvRow;
    });

    // Generate filename with current date if not provided
    const finalFilename = filename || `deals-${new Date().toISOString().split('T')[0]}.csv`;

    downloadCSV(csvData, headerLabels, finalFilename);
  };

  return {
    downloadTableData,
  };
};
