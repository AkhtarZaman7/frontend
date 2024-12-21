import { NextResponse } from 'next/server';
import { headers } from 'next/headers';

const API_URL = 'http://localhost:5000';

// Get single task
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const headersList = await headers();
    const deviceId = headersList.get('X-Device-ID');
    
    if (!deviceId) {
      return NextResponse.json(
        { error: 'Device ID is required' },
        { status: 400 }
      );
    }

    const res = await fetch(`${API_URL}/tasks/${id}`, {
      headers: {
        'X-Device-ID': deviceId,
      },
    });
    
    if (!res.ok) throw new Error('Failed to fetch task');
    const task = await res.json();
    
    return NextResponse.json(task);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch task', details: error },
      { status: 500 }
    );
  }
}

// Update task
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const headersList = await headers();
    const deviceId = headersList.get('X-Device-ID');
    
    if (!deviceId) {
      return NextResponse.json(
        { error: 'Device ID is required' },
        { status: 400 }
      );
    }

    const data = await request.json();
    
    const res = await fetch(`${API_URL}/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Device-ID': deviceId,
      },
      body: JSON.stringify(data),
    });
    
    if (!res.ok) throw new Error('Failed to update task');
    const task = await res.json();
    
    return NextResponse.json(task);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update task', details: error },
      { status: 500 }
    );
  }
}

// Delete task
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const headersList = await headers();
    const deviceId = headersList.get('X-Device-ID');
    
    if (!deviceId) {
      return NextResponse.json(
        { error: 'Device ID is required' },
        { status: 400 }
      );
    }

    const res = await fetch(`${API_URL}/tasks/${id}`, {
      method: 'DELETE',
      headers: {
        'X-Device-ID': deviceId,
      },
    });
    
    if (!res.ok) throw new Error('Failed to delete task');
    
    return NextResponse.json({ message: 'Task deleted successfully' });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete task', details: error },
      { status: 500 }
    );
  }
} 