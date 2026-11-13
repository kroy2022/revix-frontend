"use client"

import * as React from "react"
import { FolderIcon, FolderPlusIcon, LayersIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Folder } from "./types"

const COLLAPSED_FOLDER_COUNT = 4

type FolderButtonProps = {
  icon: React.ReactNode
  name: string
  count: number
  selected: boolean
  onClick: () => void
}

function FolderButton({ icon, name, count, selected, onClick }: FolderButtonProps) {
  return (
    <Button
      type="button"
      variant="outline"
      aria-pressed={selected}
      onClick={onClick}
      title={name}
      className="h-10 max-w-full gap-2 bg-card px-3 aria-pressed:border-accent-border aria-pressed:bg-accent aria-pressed:text-accent-foreground aria-pressed:hover:bg-accent-hover"
    >
      {icon}
      <span className="min-w-0 truncate sm:max-w-48">{name}</span>
      <span className="text-muted-foreground group-aria-pressed/button:text-accent-foreground">
        {count}
        <span className="sr-only"> {count === 1 ? "study set" : "study sets"}</span>
      </span>
    </Button>
  )
}

type FolderBarProps = {
  folders: Folder[]
  totalStudySets: number
  selectedFolderId: string | null
  onSelectFolder: (folderId: string | null) => void
}

export function FolderBar({ folders, totalStudySets, selectedFolderId, onSelectFolder }: FolderBarProps) {
  const listId = React.useId()
  const [isExpanded, setIsExpanded] = React.useState(false)
  const hasOverflow = folders.length > COLLAPSED_FOLDER_COUNT
  const visibleFolders = isExpanded ? folders : folders.slice(0, COLLAPSED_FOLDER_COUNT)

  return (
    <section aria-labelledby="folders-heading" className="flex flex-col gap-3">
      <div className="flex items-center justify-between gap-4">
        <h2 id="folders-heading" className="text-lg font-semibold text-foreground">
          Folders
        </h2>
        <Button type="button" variant="ghost" className="h-9 px-3">
          <FolderPlusIcon aria-hidden="true" />
          New folder
        </Button>
      </div>

      <div
        id={listId}
        role="group"
        aria-label="Filter study sets by folder"
        className="flex flex-wrap items-center gap-2"
      >
        <FolderButton
          icon={<LayersIcon aria-hidden="true" />}
          name="All sets"
          count={totalStudySets}
          selected={selectedFolderId === null}
          onClick={() => onSelectFolder(null)}
        />
        {visibleFolders.map((folder) => (
          <FolderButton
            key={folder.id}
            icon={<FolderIcon aria-hidden="true" />}
            name={folder.name}
            count={folder.studySetCount}
            selected={selectedFolderId === folder.id}
            onClick={() => onSelectFolder(folder.id)}
          />
        ))}
        {hasOverflow && (
          <Button
            type="button"
            variant="ghost"
            aria-expanded={isExpanded}
            aria-controls={listId}
            onClick={() => setIsExpanded((expanded) => !expanded)}
            className="h-10 px-3 text-primary hover:text-accent-foreground aria-expanded:bg-transparent aria-expanded:text-primary aria-expanded:hover:bg-muted"
          >
            {isExpanded ? "Show fewer" : `View all (${folders.length})`}
          </Button>
        )}
      </div>
    </section>
  )
}
