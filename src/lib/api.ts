import { CreateTaskDTO, UpdateTaskDTO, Task } from './types';

export const api = {
  getTasks: async (): Promise<Task[]> => {
    const deviceId = localStorage.getItem('deviceId');
    const res = await fetch('/api/tasks', {
      headers: {
        'X-Device-ID': deviceId || 'default-device',
      },
    });
    if (!res.ok) throw new Error('Failed to fetch tasks');
    return res.json();
  },

  createTask: async (data: CreateTaskDTO): Promise<Task> => {
    const deviceId = localStorage.getItem('deviceId');
    const res = await fetch('/api/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Device-ID': deviceId || 'default-device',
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to create task');
    return res.json();
  },

  updateTask: async (id: string, data: UpdateTaskDTO): Promise<Task> => {
    const deviceId = localStorage.getItem('deviceId');
    const res = await fetch(`/api/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Device-ID': deviceId || 'default-device',
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to update task');
    return res.json();
  },

  deleteTask: async (id: string): Promise<void> => {
    const deviceId = localStorage.getItem('deviceId');
    const res = await fetch(`/api/tasks/${id}`, {
      method: 'DELETE',
      headers: {
        'X-Device-ID': deviceId || 'default-device',
      },
    });
    if (!res.ok) throw new Error('Failed to delete task');
  },

  getTask: async (id: string): Promise<Task> => {
    const deviceId = localStorage.getItem('deviceId');
    const res = await fetch(`/api/tasks/${id}`, {
      headers: {
        'X-Device-ID': deviceId || 'default-device',
      },
    });
    if (!res.ok) throw new Error('Failed to fetch task');
    return res.json();
  },
}; 