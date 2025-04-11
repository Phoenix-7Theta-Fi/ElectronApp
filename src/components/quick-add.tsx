"use client"

import * as React from "react"
import { PlusIcon } from "@heroicons/react/24/outline"

interface QuickAddProps {
  onTaskCreated?: () => void
  autoFocus?: boolean
}

export function QuickAdd({ onTaskCreated, autoFocus }: QuickAddProps) {
  const [input, setInput] = React.useState("")
  const [isLoading, setIsLoading] = React.useState(false)
  const inputRef = React.useRef<HTMLInputElement>(null)

  React.useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus()
    }
  }, [autoFocus])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    setIsLoading(true)
    try {
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: input.trim() }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        console.error('Server error:', errorData)
        throw new Error(errorData.error || 'Failed to create task')
      }
      
      const data = await response.json()
      console.log('Task created successfully:', data)
      
      setInput("")
      onTaskCreated?.()
    } catch (error) {
      console.error('Failed to create task:', error)
      // You might want to show an error message to the user here
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <div className="relative flex-1">
        <PlusIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-secondary" />
        <input
          ref={inputRef}
          type="text"
          placeholder="Add task, note, or use @ to link..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isLoading}
          className="w-full rounded-md border border-border bg-muted px-9 py-2 text-sm placeholder:text-secondary focus:outline-none focus:ring-2 focus:ring-accent disabled:opacity-50"
        />
      </div>
    </form>
  )
}
