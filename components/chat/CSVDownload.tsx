'use client';

import { Download } from 'lucide-react';
import { downloadCSV, canExportToCSV } from '@/lib/csv';
import { cn } from '@/lib/utils';

interface CSVDownloadProps {
  data: any;
  filename?: string;
}

export function CSVDownload({ data, filename = 'ikargos_data.csv' }: CSVDownloadProps) {
  if (!canExportToCSV(data)) {
    return null;
  }

  const handleDownload = () => {
    downloadCSV(data, filename);
  };

  return (
    <button
      onClick={handleDownload}
      className={cn(
        'flex items-center gap-2 px-3 py-2 bg-ikargos-orange text-white rounded-md',
        'hover:bg-ikargos-orange/90 transition-colors text-sm font-medium',
        'focus:outline-none focus:ring-2 focus:ring-ikargos-orange focus:ring-offset-2'
      )}
    >
      <Download className="h-4 w-4" />
      Download CSV
    </button>
  );
}
