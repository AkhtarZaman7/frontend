'use client';

import { useTheme } from 'next-themes';
import { Button } from '@nextui-org/react';
import { Sun } from 'lucide-react';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      isIconOnly
      variant='light'
      aria-label='Toggle theme'
      onPress={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      <Sun className='h-[1.2rem] w-[1.2rem]' />
    </Button>
  );
}
