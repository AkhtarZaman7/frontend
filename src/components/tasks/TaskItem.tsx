'use client';

import { useState } from 'react';
import { Task, UpdateTaskDTO } from '@/lib/types';
import { 
  Button, 
  Card, 
  CardBody,
  Checkbox,
  ButtonGroup,
  Tooltip,
  Chip,
  Progress
} from '@nextui-org/react';
import { Pencil, Trash2, Clock, Calendar } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { formatDate, timeSince } from '@/utils/date';
import { capitalizeFirstLetter } from '@/utils/text';

interface TaskItemProps {
  task: Task;
  onUpdate: (id: string, data: UpdateTaskDTO) => Promise<Task>;
  onDelete: (id: string) => Promise<void>;
}

export function TaskItem({ task, onUpdate, onDelete }: TaskItemProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleToggle = async () => {
    if (loading) return;
    try {
      setLoading(true);
      await onUpdate(task.id, { completed: !task.completed });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (loading) return;
    try {
      setLoading(true);
      await onDelete(task.id);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    router.push(`/tasks/${task.id}/edit`);
  };

  return (
    <Card 
      className='group transition-all duration-300'
      shadow='sm'
      radius='lg'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardBody className='p-4 overflow-hidden'>
        <motion.div 
          className='flex flex-col gap-3'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, x: -20 }}
        >
          {/* Color Bar */}
          <div 
            className='absolute top-0 left-0 w-full h-1 rounded-t-lg transition-opacity'
            style={{ 
              backgroundColor: task.color,
              opacity: isHovered ? 0.7 : 0.3
            }}
          />

          {/* Task Header */}
          <div className='flex items-start gap-3 pt-2'>
            <div className='relative'>
              <Checkbox
                isSelected={task.completed}
                onValueChange={handleToggle}
                isDisabled={loading}
                size='lg'
                color='success'
                className='pt-1'
                classNames={{
                  wrapper: `${task.completed ? 'opacity-70' : ''}`,
                  icon: `text-white`,
                }}
              />
              <AnimatePresence>
                {task.completed && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className='absolute -top-1 -right-1 w-2 h-2 bg-success rounded-full'
                  />
                )}
              </AnimatePresence>
            </div>
            <div className='flex-1 min-w-0'>
              <div className='flex items-center gap-2 mb-2'>
                <motion.div 
                  className='flex-1 min-w-0'
                  layout
                >
                  <h3 
                    className={`text-medium font-semibold leading-tight mb-0.5 ${
                      task.completed ? 'text-default-400 line-through' : ''
                    }`}
                    style={{ 
                      color: isHovered && !task.completed ? task.color : undefined
                    }}
                  >
                    {capitalizeFirstLetter(task.title)}
                  </h3>
                  <div className='flex items-center gap-4 text-small text-default-400'>
                    <div className='flex items-center gap-1.5'>
                      <Clock className='w-3.5 h-3.5' />
                      <span>{timeSince(task.createdAt)}</span>
                    </div>
                    <div className='flex items-center gap-1.5'>
                      <Calendar className='w-3.5 h-3.5' />
                      <span>{formatDate(task.createdAt)}</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : 20 }}
              transition={{ duration: 0.2 }}
            >
              <ButtonGroup size='sm'>
                <Tooltip 
                  content='Edit' 
                  showArrow
                  classNames={{
                    base: "bg-default-100",
                    content: "text-default-foreground"
                  }}
                >
                  <Button
                    isIconOnly
                    onPress={handleEdit}
                    color='default'
                    variant='light'
                    isDisabled={loading}
                    className='group-hover:bg-default-100'
                  >
                    <Pencil size={18} />
                  </Button>
                </Tooltip>
                <Tooltip 
                  content='Delete' 
                  color='danger' 
                  showArrow
                  classNames={{
                    base: "bg-danger dark:bg-danger-400",
                    content: "text-danger-foreground"
                  }}
                >
                  <Button
                    isIconOnly
                    onPress={handleDelete}
                    color='danger'
                    variant='light'
                    isDisabled={loading}
                    className='group-hover:bg-danger-100'
                  >
                    <Trash2 size={18} />
                  </Button>
                </Tooltip>
              </ButtonGroup>
            </motion.div>
          </div>

          {/* Task Status */}
          <div className='flex items-center gap-2 ml-11'>
            <Chip
              size='sm'
              variant='flat'
              color={task.completed ? 'success' : 'primary'}
              classNames={{
                base: task.completed 
                  ? 'bg-success-50/10' 
                  : 'bg-primary-50/10',
                content: 'font-medium',
              }}
              startContent={
                <div className={`w-1.5 h-1.5 rounded-full ${
                  task.completed ? 'bg-success-500' : 'bg-primary-500'
                }`} />
              }
            >
              {task.completed ? 'Completed' : 'In Progress'}
            </Chip>
            {task.completed ? (
              <Progress 
                size='sm'
                radius='full'
                classNames={{
                  base: 'max-w-[100px]',
                  track: 'bg-default-100',
                  indicator: 'bg-success',
                }}
                value={100}
                isStriped
              />
            ) : (
              <div 
                className='h-1.5 w-24 rounded-full overflow-hidden bg-default-100'
                style={{ 
                  background: `linear-gradient(to right, ${task.color}20, ${task.color}40)`
                }}
              />
            )}
          </div>
        </motion.div>
      </CardBody>
    </Card>
  );
}