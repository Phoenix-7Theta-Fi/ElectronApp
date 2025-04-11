import { TaskService } from '@/lib/tasks';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    console.log('POST /api/tasks - Starting request');
    const body = await request.json();
    console.log('Request body:', body);
    
    if (!body.content || typeof body.content !== 'string') {
      console.log('Validation failed: invalid content');
      return NextResponse.json(
        { error: 'Content is required and must be a string' },
        { status: 400 }
      );
    }

    const task = await TaskService.create({
      content: body.content,
      metadata: body.metadata,
    });
    console.log('Task created:', task);

    return NextResponse.json(task, { status: 201 });
  } catch (error) {
    console.error('Failed to create task:', error);
    return NextResponse.json(
      { error: 'Failed to create task' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const tasks = await TaskService.list();
    return NextResponse.json(tasks);
  } catch (error) {
    console.error('Failed to fetch tasks:', error);
    return NextResponse.json(
      { error: 'Failed to fetch tasks' },
      { status: 500 }
    );
  }
}
