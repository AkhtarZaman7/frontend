'use client';

import { TaskForm } from '@/components/tasks/TaskForm';
import { useTasks } from '@/hooks/useTasks';
import { useRouter } from 'next/navigation';
import { Button, Card, Divider } from '@nextui-org/react';
import { ArrowLeft, ListPlus, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { CreateTaskDTO } from '@/lib/types';
import { motion } from 'framer-motion';

export default function NewTask() {
  const router = useRouter();
  const { createTask } = useTasks();

  const handleCreate = async (data: CreateTaskDTO) => {
    try {
      await createTask(data);
      router.push('/');
    } catch (error) {
      console.error('Failed to create task:', error);
      throw error;
    }
  };

  return (
    <motion.div 
      className='max-w-[600px] mx-auto space-y-8 px-4'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Header */}
      <div className='flex items-center gap-4'>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Link href='/'>
            <Button 
              isIconOnly 
              variant='light' 
              aria-label='Go back'
              className='hover:opacity-70 transition-opacity group'
            >
              <ArrowLeft 
                size={20} 
                className='group-hover:-translate-x-0.5 transition-transform' 
              />
            </Button>
          </Link>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className='flex-1'
        >
          <div className='flex items-center gap-2 mb-1'>
            <h2 className='text-2xl font-bold bg-gradient-to-r from-primary to-primary-600 bg-clip-text text-transparent'>
              Create New Task
            </h2>
            <Sparkles className='h-5 w-5 text-warning' />
          </div>
          <p className='text-default-500'>
            Add a new task to your list and stay organized
          </p>
        </motion.div>
      </div>

      {/* Form Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className='relative'
      >
        {/* Background Gradient */}
        <div className='absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/20 to-warning/20 rounded-2xl blur-3xl' />
        
        <Card className='p-6 shadow-medium bg-background/80 backdrop-blur-xl backdrop-saturate-150 border-1 border-white/20'>
          <div className='flex items-center gap-3 mb-6'>
            <div className='p-2.5 rounded-xl bg-primary/10 ring-1 ring-primary/20'>
              <ListPlus className='h-5 w-5 text-primary' />
            </div>
            <div>
              <h3 className='text-xl font-semibold'>Task Details</h3>
              <p className='text-small text-default-500'>
                Fill in the information below
              </p>
            </div>
          </div>

          <Divider className='my-6 bg-default-100' />

          <TaskForm 
            onSubmit={handleCreate} 
            mode='create' 
          />
        </Card>
      </motion.div>

      {/* Help Text */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className='flex justify-center items-center gap-3 text-small text-default-400'
      >
        <div className='flex items-center gap-2'>
          <span>Press</span>
          <kbd className='px-2 py-1 rounded bg-default-100 font-mono text-xs border-b-2 border-default-200'>
            Enter
          </kbd>
          <span>to save</span>
        </div>
        <span>•</span>
        <div className='flex items-center gap-2'>
          <span>Press</span>
          <kbd className='px-2 py-1 rounded bg-default-100 font-mono text-xs border-b-2 border-default-200'>
            Esc
          </kbd>
          <span>to cancel</span>
        </div>
      </motion.div>
    </motion.div>
  );
}
