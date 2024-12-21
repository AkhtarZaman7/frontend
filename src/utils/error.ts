import { toast } from 'sonner';

export function handleApiError(error: unknown, fallbackMessage = 'Something went wrong') {
  console.error(error);
  
  const message = error instanceof Error 
    ? error.message 
    : fallbackMessage;

  toast.error(message, {
    description: 'Please try again later',
    duration: 3000,
  });

  return message;
} 