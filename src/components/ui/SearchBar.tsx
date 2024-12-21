'use client';

import { Input } from '@nextui-org/react';
import { Search } from 'lucide-react';
import { useCallback } from 'react';
import debounce from 'lodash/debounce';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export function SearchBar({ onSearch }: SearchBarProps) {
  // Debounce the search to avoid too many updates
  const debouncedSearch = useCallback(
    debounce((value: string) => {
      onSearch(value);
    }, 300),
    [onSearch]
  );

  return (
    <Input
      classNames={{
        base: "max-w-full sm:max-w-[20rem] h-10",
        mainWrapper: "h-full",
        input: "text-small",
        inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
      }}
      placeholder="Search tasks..."
      size="sm"
      startContent={<Search size={18} className="text-default-400" />}
      type="search"
      onValueChange={debouncedSearch}
    />
  );
} 