'use client';

import { useEffect, useState, use } from 'react';
import { TaskForm } from '@/components/tasks/TaskForm';
import { useTasks } from '@/hooks/useTasks';
import { useRouter } from 'next/navigation';
import { Button, Card, Divider, Spinner } from '@nextui-org/react';
import { ArrowLeft, Edit3, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { Task, UpdateTaskDTO } from '@/lib/types';
import { api } from '@/lib/api';
import { motion } from 'framer-motion';
import { capitalizeFirstLetter } from '@/utils/text';

interface EditTaskPageProps {
  params: Promise<{ id: string }>;
}

export default function EditTask({ params }: EditTaskPageProps) {
  const router = useRouter();
  const { updateTask } = useTasks();
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { id } = use(params);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const deviceId = localStorage.getItem('deviceId');
        if (!deviceId) throw new Error('Device ID not found');

        const response = await api.getTask(id);
        setTask({
          ...response,
          createdAt: new Date(response.createdAt),
          updatedAt: new Date(response.updatedAt),
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load task');
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [id]);

  const handleUpdate = async (data: UpdateTaskDTO) => {
    try {
      await updateTask(id, data);
      router.push('/');
    } catch (error) {
      console.error('Failed to update task:', error);
      throw error;
    }
  };

  if (loading) {
    return (
      <motion.div 
        className='flex flex-col items-center justify-center h-[400px] gap-4'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <Spinner size='lg' color='primary' />
        <p className='text-default-500'>Loading task details...</p>
      </motion.div>
    );
  }

  if (error || !task) {
    return (
      <motion.div 
        className='flex flex-col items-center justify-center h-[400px] gap-4'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className='p-3 rounded-full bg-danger/10'>
          <AlertCircle className='h-6 w-6 text-danger' />
        </div>
        <div className='text-center'>
          <p className='text-danger font-medium text-lg mb-1'>
            {error || 'Task not found'}
          </p>
          <p className='text-default-500'>
            Please try again or go back to the home page
          </p>
        </div>
        <Link href='/'>
          <Button 
            color='primary' 
            variant='flat'
            className='mt-4'
          >
            Go Back Home
          </Button>
        </Link>
      </motion.div>
    );
  }

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
              Edit Task
            </h2>
            <div 
              className='w-3 h-3 rounded-full ring-2 ring-offset-2 ring-offset-background'
              style={{ backgroundColor: task.color }}
            />
          </div>
          <p className='text-default-500'>
            Editing &quot;{capitalizeFirstLetter(task.title)}&quot;
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
              <Edit3 className='h-5 w-5 text-primary' />
            </div>
            <div>
              <h3 className='text-xl font-semibold'>Task Details</h3>
              <p className='text-small text-default-500'>
                Update the information below
              </p>
            </div>
          </div>

          <Divider className='my-6 bg-default-100' />

          <TaskForm 
            onSubmit={handleUpdate} 
            initialData={task}
            mode='edit' 
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
