"use client"

import { QuickAdd } from "@/components/quick-add"

export default function QuickAddPage() {
  const handleTaskCreated = () => {
    // Use IPC to tell Electron to close the window
    window.electron?.send('closeQuickAdd');
  }

  return (
    <div className="p-4">
      <QuickAdd onTaskCreated={handleTaskCreated} autoFocus />
    </div>
  )
}