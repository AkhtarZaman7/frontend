import { WithChildren } from '@/types';
import { cn } from '@/utils/cn';

interface ContainerProps extends WithChildren {
  className?: string;
}

export function Container({ children, className }: ContainerProps) {
  return (
    <div className={cn('max-w-[1200px] mx-auto px-4', className)}>
      {children}
    </div>
  );
} 