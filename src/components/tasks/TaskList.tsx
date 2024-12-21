'use client';

import { Task } from '@/lib/types';
import { TaskItem } from './TaskItem';
import { Spinner } from '@nextui-org/react';
import { motion, AnimatePresence } from 'framer-motion';
import { ClipboardList } from 'lucide-react';

interface TaskListProps {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  onUpdate: (id: string, data: { completed?: boolean; title?: string }) => Promise<Task>;
  onDelete: (id: string) => Promise<void>;
}

export function TaskList({ tasks, loading, error, onUpdate, onDelete }: TaskListProps) {
  if (loading) {
    return (
      <div className="flex h-[300px] items-center justify-center">
        <Spinner 
          size="lg"
          classNames={{
            circle1: "border-b-primary",
            circle2: "border-b-primary/40"
          }}
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl bg-danger-50/50 dark:bg-danger-900/20 p-6 text-danger text-center">
        <p className="text-lg font-medium">{error}</p>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center py-16 text-center"
      >
        <div className="rounded-2xl bg-default-100 p-4 mb-6">
          <ClipboardList className="h-12 w-12 text-default-400" />
        </div>
        <h3 className="text-xl font-semibold mb-2">No tasks yet</h3>
        <p className="text-default-500 max-w-sm">
          Get started by creating your first task. Stay organized and boost your productivity!
        </p>
      </motion.div>
    );
  }

  return (
    <div className="space-y-4">
      <AnimatePresence mode="popLayout">
        {tasks.map((task) => (
          <motion.div
            key={task.id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{
              layout: { type: 'spring', bounce: 0.2 }
            }}
          >
            <TaskItem
              task={task}
              onUpdate={onUpdate}
              onDelete={onDelete}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}