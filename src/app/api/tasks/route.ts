import { NextResponse } from 'next/server';
import { headers } from 'next/headers';

const API_URL = 'http://localhost:5000';

// Get all tasks
export async function GET() {
  try {
    const headersList = await headers();
    const deviceId = headersList.get('X-Device-ID');
    
    if (!deviceId) {
      return NextResponse.json(
        { error: 'Device ID is required' },
        { status: 400 }
      );
    }

    const res = await fetch(`${API_URL}/tasks`, {
      headers: {
        'X-Device-ID': deviceId,
      },
    });
    
    if (!res.ok) throw new Error('Failed to fetch tasks');
    const data = await res.json();
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return NextResponse.json(
      { error: 'Failed to fetch tasks', details: error },
      { status: 500 }
    );
  }
}

// Create task
export async function POST(request: Request) {
  try {
    const headersList = await headers();
    const deviceId = headersList.get('X-Device-ID');
    
    if (!deviceId) {
      return NextResponse.json(
        { error: 'Device ID is required' },
        { status: 400 }
      );
    }

    const data = await request.json();
    
    const res = await fetch(`${API_URL}/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Device-ID': deviceId,
      },
      body: JSON.stringify(data),
    });
    
    if (!res.ok) throw new Error('Failed to create task');
    const task = await res.json();
    
    return NextResponse.json(task);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create task', details: error },
      { status: 500 }
    );
  }
} 