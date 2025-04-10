"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  InboxIcon, 
  FolderIcon, 
  SquaresPlusIcon,
  DocumentTextIcon,
  ArchiveBoxIcon,
  Cog6ToothIcon
} from "@heroicons/react/24/outline"

import { cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className, ...props }: SidebarProps) {
  const pathname = usePathname()

  return (
    <div className={cn("border-r border-border", className)} {...props}>
      <div className="flex h-16 items-center border-b border-border px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <span className="text-xl">TSK</span>
        </Link>
      </div>
      <ScrollArea className="h-[calc(100vh-4rem)]">
        <div className="flex flex-col gap-4 p-6">
          <div className="flex flex-col gap-2">
            <nav className="grid gap-1">
              <Link 
                href="/inbox"
                className={cn(
                  "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent",
                  pathname === "/inbox" && "bg-accent"
                )}
              >
                <InboxIcon className="h-4 w-4" />
                Inbox
              </Link>
            </nav>
          </div>
          <Separator />
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Projects</span>
              <Button variant="ghost" size="sm">
                <SquaresPlusIcon className="h-4 w-4" />
              </Button>
            </div>
            <nav className="grid gap-1">
              <Link
                href="/projects"
                className={cn(
                  "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent",
                  pathname === "/projects" && "bg-accent"
                )}
              >
                <FolderIcon className="h-4 w-4" />
                All Projects
              </Link>
            </nav>
          </div>
          <Separator />
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Areas</span>
              <Button variant="ghost" size="sm">
                <SquaresPlusIcon className="h-4 w-4" />
              </Button>
            </div>
            <nav className="grid gap-1">
              <Link
                href="/areas"
                className={cn(
                  "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent",
                  pathname === "/areas" && "bg-accent"
                )}
              >
                <FolderIcon className="h-4 w-4" />
                All Areas
              </Link>
            </nav>
          </div>
          <Separator />
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Resources</span>
              <Button variant="ghost" size="sm">
                <SquaresPlusIcon className="h-4 w-4" />
              </Button>
            </div>
            <nav className="grid gap-1">
              <Link
                href="/resources"
                className={cn(
                  "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent",
                  pathname === "/resources" && "bg-accent"
                )}
              >
                <DocumentTextIcon className="h-4 w-4" />
                All Resources
              </Link>
            </nav>
          </div>
          <Separator />
          <div className="flex flex-col gap-2">
            <nav className="grid gap-1">
              <Link
                href="/archives"
                className={cn(
                  "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent",
                  pathname === "/archives" && "bg-accent"
                )}
              >
                <ArchiveBoxIcon className="h-4 w-4" />
                Archives
              </Link>
              <Link
                href="/settings"
                className={cn(
                  "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent",
                  pathname === "/settings" && "bg-accent"
                )}
              >
                <Cog6ToothIcon className="h-4 w-4" />
                Settings
              </Link>
            </nav>
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}