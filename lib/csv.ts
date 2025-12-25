import Papa from 'papaparse';

export function downloadCSV(data: any, filename: string = 'ikargos_data.csv'): void {
  try {
    let csvData: any[] = [];

    if (Array.isArray(data)) {
      csvData = data;
    } else if (typeof data === 'object' && data !== null) {
      csvData = [data];
    } else if (typeof data === 'string') {
      try {
        const parsed = JSON.parse(data);
        csvData = Array.isArray(parsed) ? parsed : [parsed];
      } catch {
        return;
      }
    } else {
      return;
    }

    const csv = Papa.unparse(csvData);
    
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
  } catch (error) {
    console.error('Failed to download CSV:', error);
  }
}

export function canExportToCSV(data: any): boolean {
  if (!data) return false;
  
  if (Array.isArray(data) && data.length > 0) return true;
  
  if (typeof data === 'object' && data !== null) return true;
  
  if (typeof data === 'string') {
    try {
      const parsed = JSON.parse(data);
      return typeof parsed === 'object' && parsed !== null;
    } catch {
      return false;
    }
  }
  
  return false;
}
