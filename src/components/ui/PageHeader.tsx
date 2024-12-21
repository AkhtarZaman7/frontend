import { motion } from 'framer-motion';
import { TRANSITIONS } from '@/constants';
import { WithChildren } from '@/types';

interface PageHeaderProps extends WithChildren {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}

export function PageHeader({ title, subtitle, action, children }: PageHeaderProps) {
  return (
    <div className='flex flex-col gap-6'>
      <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={TRANSITIONS.DEFAULT}
          className='space-y-1'
        >
          <h1 className='text-2xl font-bold bg-gradient-to-r from-primary to-primary-600 bg-clip-text text-transparent'>
            {title}
          </h1>
          {subtitle && <p className='text-default-500 text-lg'>{subtitle}</p>}
        </motion.div>
        {action && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            {action}
          </motion.div>
        )}
      </div>
      {children}
    </div>
  );
} 