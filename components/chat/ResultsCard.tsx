'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ResultsCardProps {
  content: string;
  maxHeight?: number;
  children: React.ReactNode;
}

export function ResultsCard({ content, maxHeight = 400, children }: ResultsCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const lineCount = content.split('\n').length;
  const listItemCount = (content.match(/^[\s]*[-*•]\s/gm) || []).length;
  const shouldUseCard = lineCount > 10 || listItemCount > 8;

  if (!shouldUseCard) {
    return <>{children}</>;
  }

  return (
    <div className="border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden my-2">
      <div className="bg-gray-100 dark:bg-gray-800 px-4 py-2 flex items-center justify-between border-b border-gray-300 dark:border-gray-600">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-ikargos-orange rounded-full"></div>
          <span className="font-semibold text-sm text-gray-700 dark:text-gray-300">
            Results {listItemCount > 0 && `(${listItemCount} items)`}
          </span>
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={cn(
            'p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors',
            'focus:outline-none focus:ring-2 focus:ring-ikargos-orange'
          )}
          aria-label={isExpanded ? 'Collapse' : 'Expand'}
        >
          {isExpanded ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </button>
      </div>
      
      <div
        className={cn(
          'overflow-y-auto transition-all duration-300',
          'bg-white dark:bg-gray-900 px-4 py-3'
        )}
        style={{
          maxHeight: isExpanded ? 'none' : `${maxHeight}px`,
        }}
      >
        {children}
      </div>
      
      {!isExpanded && lineCount > 10 && (
        <div className="bg-gradient-to-t from-white dark:from-gray-900 to-transparent h-8 -mt-8 pointer-events-none" />
      )}
    </div>
  );
}
