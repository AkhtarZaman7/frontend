'use client';

import { useEffect, useState, useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Button, Card, Chip } from '@nextui-org/react';
import { PlusCircle, ListTodo } from 'lucide-react';
import { TaskList } from '@/components/tasks/TaskList';
import { useTasks } from '@/hooks/useTasks';
import Link from 'next/link';
import { TaskStats } from '@/components/tasks/TaskStats';
import { motion } from 'framer-motion';
import { SearchBar } from '@/components/ui/SearchBar';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const { tasks, loading, error, updateTask, deleteTask } = useTasks();

  useEffect(() => {
    if (!localStorage.getItem('deviceId')) {
      localStorage.setItem('deviceId', uuidv4());
    }
  }, []);

  // Filter tasks based on search query and active filter
  const filteredTasks = useMemo(() => {
    let filtered = tasks;

    // Apply search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter((task) =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }


    return filtered;
  }, [tasks, searchQuery]);

  // Calculate stats based on filtered tasks
  const completedTasks = tasks.filter((task) => task.completed).length;
  const totalTasks = tasks.length;
  const pendingTasks = totalTasks - completedTasks;

  // Calculate filtered stats for display
  const filteredCompletedTasks = filteredTasks.filter(
    (task) => task.completed
  ).length;
  const filteredTotalTasks = filteredTasks.length;

  return (
    <div className='max-w-[1200px] mx-auto space-y-8'>
      {/* Header Section */}
      <div className='flex flex-col gap-6'>
        <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className='space-y-1'
          >
            <h1 className='text-4xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary-600 bg-clip-text text-transparent'>
              Welcome Back 👋
            </h1>
            <p className='text-default-500 text-lg'>
              {totalTasks === 0
                ? 'Start organizing your tasks today'
                : `You have ${pendingTasks} pending tasks`}
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Link href='/tasks/new'>
              <Button
                color='primary'
                endContent={<PlusCircle className='h-5 w-5' />}
                size='lg'
                className='font-medium shadow-lg bg-gradient-to-r from-primary to-primary-600'
                radius='full'
              >
                New Task
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Search Bar */}
        <SearchBar onSearch={setSearchQuery} />
      </div>

      {/* Stats Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
          <TaskStats tasks={tasks} loading={loading} />
        </div>
      </motion.div>

      {/* Tasks Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className='px-6 py-8 shadow-medium bg-background/80 backdrop-blur-xl backdrop-saturate-150 border-1 border-default-200/50 dark:border-default-700/50'>
          <div className='mb-6 flex flex-col sm:flex-row sm:items-center gap-4 justify-between'>
            <div className='flex items-center gap-3'>
              <div className='p-2 rounded-xl bg-primary/10 ring-1 ring-primary/20'>
                <ListTodo className='h-5 w-5 text-primary' />
              </div>
              <div>
                <h2 className='text-xl font-semibold'>All Tasks</h2>
                <p className='text-small text-default-500'>
                  Manage and track your tasks
                </p>
              </div>
            </div>
            {filteredTotalTasks > 0 && (
              <Chip
                variant='flat'
                color='primary'
                classNames={{
                  base: 'bg-primary/10',
                  content: 'text-primary-600 dark:text-primary-400',
                }}
              >
                {filteredCompletedTasks} of {filteredTotalTasks} completed
              </Chip>
            )}
          </div>
          <TaskList
            tasks={filteredTasks}
            loading={loading}
            error={error}
            onUpdate={updateTask}
            onDelete={deleteTask}
          />
        </Card>
      </motion.div>
    </div>
  );
}
