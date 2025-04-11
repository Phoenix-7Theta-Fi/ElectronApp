"use client"

import { Task } from "@/lib/tasks"
import { TaskItem } from "./task-item"
import { useCallback } from "react"

interface TaskListProps {
  tasks: Task[]
  onTasksChange?: () => void
}

export function TaskList({ tasks, onTasksChange }: TaskListProps) {
  const handleComplete = useCallback(async (task: Task) => {
    try {
      await fetch(`/api/tasks/${task.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'completed' }),
      })
      onTasksChange?.()
    } catch (error) {
      console.error('Failed to complete task:', error)
    }
  }, [onTasksChange])

  const handleDelete = useCallback(async (task: Task) => {
    try {
      await fetch(`/api/tasks/${task.id}`, {
        method: 'DELETE',
      })
      onTasksChange?.()
    } catch (error) {
      console.error('Failed to delete task:', error)
    }
  }, [onTasksChange])

  return (
    <div className="flex flex-col gap-2">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onComplete={handleComplete}
          onDelete={handleDelete}
        />
      ))}
    </div>
  )
}