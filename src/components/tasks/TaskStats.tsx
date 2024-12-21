'use client';

import { Card } from '@nextui-org/react';
import { Task } from '@/lib/types';
import { CheckCircle2, Circle, Clock, ListTodo } from 'lucide-react';
import { motion } from 'framer-motion';

interface TaskStatsProps {
  tasks: Task[];
  loading: boolean;
}

export function TaskStats({ tasks, loading }: TaskStatsProps) {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;
  const pendingTasks = totalTasks - completedTasks;
  const completionRate =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const stats = [
    {
      id: 'total',
      label: 'Total Tasks',
      value: totalTasks,
      icon: ListTodo,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      description: 'All tasks in your list',
      chart: null,
    },
    {
      id: 'completed',
      label: 'Completed',
      value: completedTasks,
      icon: CheckCircle2,
      color: 'text-success',
      bgColor: 'bg-success/10',
      description: "Tasks you've finished",
      chart: null,
    },
    {
      id: 'pending',
      label: 'In Progress',
      value: pendingTasks,
      icon: Clock,
      color: 'text-warning',
      bgColor: 'bg-warning/10',
      description: 'Tasks still pending',
      chart: null,
    },
    {
      id: 'rate',
      label: 'Completion Rate',
      value: `${completionRate}%`,
      icon: Circle,
      color: 'text-secondary',
      bgColor: 'bg-secondary/10',
      description: 'Overall progress',
      chart: (
        <div className='w-full h-1.5 bg-default-200 rounded-full overflow-hidden'>
          <motion.div
            className='h-full bg-secondary'
            initial={{ width: '0%' }}
            animate={{ width: `${completionRate}%` }}
            transition={{
              delay: 0.5,
              duration: 1,
              ease: [0.4, 0, 0.2, 1],
            }}
          />
        </div>
      ),
    },
  ] as const;

  return (
    <>
      {stats.map((stat) => {
        const statKey = `stat-${stat.id}`;
        return (
          <motion.div
            key={statKey}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: stats.indexOf(stat) * 0.1,
              duration: 0.5,
              ease: [0.4, 0, 0.2, 1],
            }}
            className='h-full'
          >
            <Card
              className='p-6 shadow-small bg-background/80 backdrop-blur-xl backdrop-saturate-150 h-full w-full border-1 border-default-200/50 dark:border-default-700/50'
              isPressable
              isHoverable
            >
              <div className='flex flex-col h-full w-full'>
                <div className='flex items-start gap-3 mb-4'>
                  <div className={`rounded-xl ${stat.bgColor} p-3 flex-shrink-0`}>
                    <stat.icon className={`h-5 w-5 ${stat.color}`} />
                  </div>
                  <div className='flex-1 min-w-0'>
                    <p className='text-small text-default-500 font-medium truncate'>
                      {stat.label}
                    </p>
                    <motion.p
                      key={`value-${statKey}`}
                      className='text-2xl font-semibold truncate'
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{
                        delay: stats.indexOf(stat) * 0.1 + 0.2,
                        duration: 0.5,
                        ease: [0.4, 0, 0.2, 1],
                      }}
                    >
                      {loading ? '-' : stat.value}
                    </motion.p>
                  </div>
                </div>
                <div className='h-px bg-default-200/50 w-full mb-4' />
                <div className='flex flex-col justify-between flex-grow'>
                  <p className='text-small text-default-400 mb-4 line-clamp-2'>
                    {stat.description}
                  </p>
                  {stat.chart}
                </div>
              </div>
            </Card>
          </motion.div>
        );
      })}
    </>
  );
}
