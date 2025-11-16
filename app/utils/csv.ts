// cSpell:ignore papaparse
import Papa from 'papaparse';

/**
 * Converts an array of table data and headers into a CSV string and triggers a download of the file.
 *
 * Uses PapaParse's unparse for conversion. The download is performed in-browser via a Blob and a temporary link element.
 *
 * @param {Record<string, any>[]} data - Array of objects to be converted to CSV rows.
 * @param {string[]} headers - Array of header strings (column names) to appear as CSV header row.
 * @param {string} [filename='data.csv'] - Optional filename for the downloaded file.
 * @returns {void}
 */

export function downloadCSV(
  data: Record<string, any>[],
  headers: string[],
  filename: string = 'data.csv',
): void {
  if (!data || data.length === 0) {
    return;
  }

  // Convert data to CSV format with headers
  const csv = Papa.unparse(data, {
    columns: headers,
    header: true,
  });

  // Create and trigger download
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);

  link.setAttribute('href', url);
  link.setAttribute('download', filename);

  link.style.visibility = 'hidden';

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
