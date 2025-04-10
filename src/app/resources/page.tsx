import { DocumentTextIcon, PlusIcon } from "@heroicons/react/24/outline"
import { Button } from "@/components/ui/button"

export default function ResourcesPage() {
  return (
    <div className="flex flex-col gap-8 p-8">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold">Resources</h1>
          <p className="text-secondary">Your knowledge base</p>
        </div>
        <div className="flex gap-2">
          <Button>
            <PlusIcon className="mr-2 h-4 w-4" />
            New Folder
          </Button>
          <Button>
            <PlusIcon className="mr-2 h-4 w-4" />
            New Document
          </Button>
        </div>
      </div>

      <div className="rounded-lg border border-border">
        <div className="flex flex-col divide-y divide-border">
          {/* Example Resource */}
          <div className="flex items-center gap-3 p-4">
            <DocumentTextIcon className="h-5 w-5 text-secondary" />
            <div className="flex flex-col">
              <h3 className="font-medium">Example Document</h3>
              <p className="text-sm text-secondary">Modified 2 days ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}