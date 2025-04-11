import { db } from '@/db';

export type NewTask = {
  content: string;
  metadata?: Record<string, unknown>;
};

export type Task = {
  id: number;
  content: string;
  status: 'active' | 'completed';
  metadata: Record<string, unknown> | null;
  created_at: number;
  updated_at: number;
};

export class TaskService {
  static create(task: NewTask): Task {
    const stmt = db.prepare(`
      INSERT INTO tasks (content, metadata)
      VALUES (@content, @metadata)
      RETURNING *
    `);

    const result = stmt.get({
      content: task.content,
      metadata: task.metadata ? JSON.stringify(task.metadata) : null,
    }) as Task;

    if (result.metadata) {
      result.metadata = JSON.parse(result.metadata as unknown as string);
    }

    return result;
  }

  static list(): Task[] {
    const stmt = db.prepare(`
      SELECT * FROM tasks
      WHERE status = 'active'
      ORDER BY created_at
    `);

    const tasks = stmt.all() as Task[];
    return tasks.map(task => ({
      ...task,
      metadata: task.metadata ? JSON.parse(task.metadata as unknown as string) : null
    }));
  }

  static update(id: number, data: Partial<Task>): Task {
    const setClauses = [];
    const params: Record<string, unknown> = { id };

    if (data.content !== undefined) {
      setClauses.push('content = @content');
      params.content = data.content;
    }
    if (data.status !== undefined) {
      setClauses.push('status = @status');
      params.status = data.status;
    }
    if (data.metadata !== undefined) {
      setClauses.push('metadata = @metadata');
      params.metadata = data.metadata ? JSON.stringify(data.metadata) : null;
    }

    setClauses.push('updated_at = unixepoch()');

    const stmt = db.prepare(`
      UPDATE tasks
      SET ${setClauses.join(', ')}
      WHERE id = @id
      RETURNING *
    `);

    const result = stmt.get(params) as Task;
    if (result.metadata) {
      result.metadata = JSON.parse(result.metadata as unknown as string);
    }

    return result;
  }

  static delete(id: number): void {
    const stmt = db.prepare('DELETE FROM tasks WHERE id = ?');
    stmt.run(id);
  }
}
