"use client"

import { QuickAdd } from "@/components/quick-add"
import { TaskList } from "@/components/task-list"
import { Task } from "@/lib/tasks"
import { useEffect, useState } from "react"

export default function InboxPage() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)

  const fetchTasks = async () => {
    try {
      const response = await fetch('/api/tasks')
      if (!response.ok) throw new Error('Failed to fetch tasks')
      const data = await response.json()
      setTasks(data)
    } catch (error) {
      console.error('Failed to fetch tasks:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  return (
    <div className="flex flex-col gap-8 p-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">Inbox</h1>
        <p className="text-secondary">Capture thoughts and tasks quickly</p>
      </div>
      
      <QuickAdd onTaskCreated={fetchTasks} />
      
      <div className="flex flex-col gap-4">
        {loading ? (
          <div className="rounded-lg border border-border p-4">
            <p className="text-center text-secondary">Loading tasks...</p>
          </div>
        ) : tasks.length === 0 ? (
          <div className="rounded-lg border border-border p-4">
            <p className="text-center text-secondary">No items in inbox</p>
          </div>
        ) : (
          <TaskList tasks={tasks} onTasksChange={fetchTasks} />
        )}
      </div>
    </div>
  )
}
