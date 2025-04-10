import { QuickAdd } from "@/components/quick-add"

export default function InboxPage() {
  return (
    <div className="flex flex-col gap-8 p-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">Inbox</h1>
        <p className="text-secondary">Capture thoughts and tasks quickly</p>
      </div>
      
      <QuickAdd />
      
      <div className="flex flex-col gap-4">
        <div className="rounded-lg border border-border">
          <div className="p-4">
            <p className="text-center text-secondary">No items in inbox</p>
          </div>
        </div>
      </div>
    </div>
  )
}