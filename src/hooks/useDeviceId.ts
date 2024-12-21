import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export function useDeviceId() {
  const [deviceId, setDeviceId] = useState<string | null>(null);

  useEffect(() => {
    let id = localStorage.getItem('deviceId');
    if (!id) {
      id = uuidv4();
      localStorage.setItem('deviceId', id);
    }
    setDeviceId(id);
  }, []);

  return deviceId;
} 