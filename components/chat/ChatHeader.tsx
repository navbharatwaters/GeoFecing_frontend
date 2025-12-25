import Link from 'next/link';
import { ThemeToggle } from './ThemeToggle';

export function ChatHeader() {
  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-4 py-4 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link 
          href="https://ikargos.com/" 
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 hover:opacity-80 transition-opacity"
        >
          <div className="text-3xl font-bold">
            <span className="text-ikargos-orange">i</span>
            <span className="text-gray-800 dark:text-gray-100">Kargos</span>
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400 font-medium tracking-wider">
            Logistics Simplified
          </div>
        </Link>
        
        <div className="flex items-center gap-4">
          <div className="text-sm text-gray-600 dark:text-gray-300 font-medium">
            Database Assistant
          </div>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
