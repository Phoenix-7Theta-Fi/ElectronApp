import { Task } from "@/lib/tasks"
import { CheckCircleIcon, TrashIcon } from "@heroicons/react/24/outline"
import { Button } from "./ui/button"

interface TaskItemProps {
  task: Task
  onComplete?: (task: Task) => void
  onDelete?: (task: Task) => void
}

export function TaskItem({ task, onComplete, onDelete }: TaskItemProps) {
  return (
    <div className="flex items-center justify-between gap-2 rounded-md border border-border p-4">
      <div className="flex items-center gap-3">
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => onComplete?.(task)}
        >
          <CheckCircleIcon className="h-5 w-5 text-secondary" />
        </Button>
        <span>{task.content}</span>
      </div>
      <Button 
        variant="ghost" 
        size="sm"
        onClick={() => onDelete?.(task)}
      >
        <TrashIcon className="h-4 w-4 text-secondary" />
      </Button>
    </div>
  )
}