import { useState, useCallback, useEffect } from 'react';
import { Task, CreateTaskDTO, UpdateTaskDTO } from '@/lib/types';
import { api } from '@/lib/api';
import { handleApiError } from '@/utils/error';
import { toast } from 'sonner';

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      const data = await api.getTasks();
      setTasks(data);
      setError(null);
    } catch (err) {
      const message = handleApiError(err, 'Failed to fetch tasks');
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  const createTask = useCallback(async (data: CreateTaskDTO) => {
    try {
      const newTask = await api.createTask(data);
      setTasks((prev) => [...prev, newTask]);
      toast.success('Task created successfully');
    } catch (err) {
      handleApiError(err, 'Failed to create task');
      throw err;
    }
  }, []);

  const updateTask = useCallback(async (id: string, data: UpdateTaskDTO) => {
    try {
      const updatedTask = await api.updateTask(id, data);
      setTasks((prev) =>
        prev.map((task) => (task.id === id ? updatedTask : task))
      );
      toast.success('Task updated successfully');
      return updatedTask;
    } catch (err) {
      handleApiError(err, 'Failed to update task');
      throw err;
    }
  }, []);

  const deleteTask = useCallback(async (id: string) => {
    try {
      await api.deleteTask(id);
      setTasks((prev) => prev.filter((task) => task.id !== id));
      toast.success('Task deleted successfully');
    } catch (err) {
      handleApiError(err, 'Failed to delete task');
      throw err;
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return {
    tasks,
    loading,
    error,
    createTask,
    updateTask,
    deleteTask,
    refetch: fetchTasks,
  };
} 