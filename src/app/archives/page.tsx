import { 
  DocumentTextIcon, 
  FolderIcon, 
  CheckCircleIcon 
} from "@heroicons/react/24/outline"

export default function ArchivesPage() {
  return (
    <div className="flex flex-col gap-8 p-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">Archives</h1>
        <p className="text-secondary">Previously completed or archived items</p>
      </div>

      <div className="rounded-lg border border-border">
        <div className="flex flex-col divide-y divide-border">
          {/* Example Archived Items */}
          <div className="flex items-center gap-3 p-4">
            <CheckCircleIcon className="h-5 w-5 text-secondary" />
            <div className="flex flex-col">
              <h3 className="font-medium">Completed Task</h3>
              <p className="text-sm text-secondary">Archived 3 days ago</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4">
            <FolderIcon className="h-5 w-5 text-secondary" />
            <div className="flex flex-col">
              <h3 className="font-medium">Archived Project</h3>
              <p className="text-sm text-secondary">Archived 1 week ago</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4">
            <DocumentTextIcon className="h-5 w-5 text-secondary" />
            <div className="flex flex-col">
              <h3 className="font-medium">Old Document</h3>
              <p className="text-sm text-secondary">Archived 2 weeks ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}