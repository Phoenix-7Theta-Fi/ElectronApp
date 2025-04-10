import { FolderIcon, PlusIcon } from "@heroicons/react/24/outline"
import { Button } from "@/components/ui/button"

export default function AreasPage() {
  return (
    <div className="flex flex-col gap-8 p-8">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold">Areas</h1>
          <p className="text-secondary">Manage your areas of responsibility</p>
        </div>
        <Button>
          <PlusIcon className="mr-2 h-4 w-4" />
          New Area
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Example Area Card */}
        <div className="flex flex-col gap-2 rounded-lg border border-border p-4">
          <div className="flex items-center gap-2">
            <FolderIcon className="h-5 w-5 text-secondary" />
            <h3 className="font-medium">Example Area</h3>
          </div>
          <p className="text-sm text-secondary">2 Projects • 5 Resources</p>
        </div>
      </div>
    </div>
  )
}