"use client"

import * as React from "react"
import { PlusIcon } from "@heroicons/react/24/outline"

export function QuickAdd() {
  const [input, setInput] = React.useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement NLP parsing and item creation
    setInput("")
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <div className="relative flex-1">
        <PlusIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-secondary" />
        <input
          type="text"
          placeholder="Add task, note, or use @ to link..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full rounded-md border border-border bg-muted px-9 py-2 text-sm placeholder:text-secondary focus:outline-none focus:ring-2 focus:ring-accent"
        />
      </div>
    </form>
  )
}