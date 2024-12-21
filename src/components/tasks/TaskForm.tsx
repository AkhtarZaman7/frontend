'use client';

import { useState, useEffect, useCallback } from 'react';
import { Input, Button, Select, SelectItem } from '@nextui-org/react';
import { Task, CreateTaskDTO, UpdateTaskDTO } from '@/lib/types';
import { PlusCircle, Save } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { colorOptions } from '@/utils/color';
import { toast } from 'sonner';
import { handleApiError } from '@/utils/error';

interface TaskFormProps<TMode extends 'create' | 'edit'> {
  mode: TMode;
  initialData?: Task;
  onSubmit: TMode extends 'create'
    ? (data: CreateTaskDTO) => Promise<void>
    : (data: UpdateTaskDTO) => Promise<void>;
}

export function TaskForm<TMode extends 'create' | 'edit'>({
  mode,
  initialData,
  onSubmit,
}: TaskFormProps<TMode>) {
  const router = useRouter();
  const [title, setTitle] = useState(initialData?.title || '');
  const [color, setColor] = useState(initialData?.color || '#000000');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = useCallback(
    async (e?: React.FormEvent) => {
      e?.preventDefault();
      if (!title.trim() || loading) return;

      const toastId = toast.loading(
        mode === 'create' ? 'Creating task...' : 'Updating task...'
      );

      try {
        setLoading(true);
        setError(null);

        if (mode === 'create') {
          const deviceId = localStorage.getItem('deviceId');
          if (!deviceId) throw new Error('Device ID not found');

          const createSubmit = onSubmit as (data: CreateTaskDTO) => Promise<void>;
          await createSubmit({ title, color, deviceId });
        } else {
          const updateSubmit = onSubmit as (data: UpdateTaskDTO) => Promise<void>;
          await updateSubmit({ title, color });
        }

        toast.dismiss(toastId);
      } catch (err) {
        toast.dismiss(toastId);
        const message = handleApiError(err, `Failed to ${mode} task`);
        setError(message);
      } finally {
        setLoading(false);
      }
    },
    [title, color, loading, onSubmit, mode]
  );

  const handleCancel = useCallback(() => {
    router.push('/');
  }, [router]);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === 'Enter' &&
        !e.shiftKey &&
        !(
          e.target instanceof HTMLInputElement ||
          e.target instanceof HTMLSelectElement
        )
      ) {
        e.preventDefault();
        handleSubmit();
      }

      if (e.key === 'Escape') {
        e.preventDefault();
        handleCancel();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleCancel, handleSubmit]);

  return (
    <form onSubmit={handleSubmit} className='space-y-6'>
      <Input
        label='Title'
        value={title}
        onValueChange={setTitle}
        placeholder='Enter task title...'
        isDisabled={loading}
        errorMessage={error}
        variant='bordered'
        radius='lg'
        isRequired
        autoFocus
      />

      <Select
        label='Color'
        selectedKeys={[color]}
        onChange={(e) => setColor(e.target.value)}
        variant='bordered'
        radius='lg'
        classNames={{
          trigger: 'h-14',
          value: 'text-default-700 dark:text-default-300',
        }}
      >
        {colorOptions.map((option) => (
          <SelectItem
            key={option.value}
            value={option.value}
            className='text-default-700 dark:text-default-300'
            startContent={
              <div className='flex items-center gap-2'>
                <div
                  className='w-4 h-4 rounded-full ring-1 ring-default-300 dark:ring-default-600'
                  style={{ backgroundColor: option.value }}
                />
              </div>
            }
          >
            {option.label}
          </SelectItem>
        ))}
      </Select>

      <div className='flex gap-3 justify-end'>
        <Button
          variant='flat'
          radius='lg'
          className='font-medium'
          onPress={handleCancel}
          isDisabled={loading}
        >
          Cancel
        </Button>
        <Button
          type='submit'
          isDisabled={loading || !title.trim()}
          isLoading={loading}
          color='primary'
          radius='lg'
          className='font-medium'
          startContent={
            !loading &&
            (mode === 'create' ? <PlusCircle size={18} /> : <Save size={18} />)
          }
        >
          {mode === 'create' ? 'Create Task' : 'Save Changes'}
        </Button>
      </div>
    </form>
  );
}
