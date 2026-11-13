"use client"

import * as React from "react"
import { FolderIcon, FolderPlusIcon, LayersIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SectionHeader } from "@/components/section-header"
import type { Folder } from "./types"

const COLLAPSED_FOLDER_COUNT = 4

type FolderTileProps = {
  icon: React.ReactNode
  name: string
  count: number
  selected: boolean
  onClick: () => void
}

function FolderTile({ icon, name, count, selected, onClick }: FolderTileProps) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      title={name}
      className="group flex min-w-0 items-center gap-3 rounded-xl border border-border bg-card p-3 text-left shadow-raised outline-none transition-[background-color,border-color,box-shadow] duration-150 hover:border-accent-border hover:bg-secondary focus-visible:ring-3 focus-visible:ring-ring/50 aria-pressed:border-primary aria-pressed:bg-accent aria-pressed:ring-1 aria-pressed:ring-primary"
    >
      <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors duration-150 group-aria-pressed:bg-primary group-aria-pressed:text-primary-foreground [&_svg]:size-4">
        {icon}
      </span>
      <span className="flex min-w-0 flex-col">
        <span className="truncate text-sm font-medium text-foreground">{name}</span>
        <span className="text-sm text-muted-foreground tabular-nums group-aria-pressed:text-accent-foreground">
          {count} {count === 1 ? "set" : "sets"}
        </span>
      </span>
    </button>
  )
}

type FolderBarProps = {
  folders: Folder[]
  totalStudySets: number
  selectedFolderId: string | null
  onSelectFolder: (folderId: string | null) => void
}

export function FolderBar({ folders, totalStudySets, selectedFolderId, onSelectFolder }: FolderBarProps) {
  const gridId = React.useId()
  const [isExpanded, setIsExpanded] = React.useState(false)
  const hasOverflow = folders.length > COLLAPSED_FOLDER_COUNT
  const visibleFolders = isExpanded ? folders : folders.slice(0, COLLAPSED_FOLDER_COUNT)

  return (
    <section aria-labelledby="folders-heading" className="flex flex-col gap-4">
      <SectionHeader
        id="folders-heading"
        title="Folders"
        className="sm:items-center"
        actions={
          <>
            {hasOverflow && (
              <Button
                type="button"
                variant="ghost"
                aria-expanded={isExpanded}
                aria-controls={gridId}
                onClick={() => setIsExpanded((expanded) => !expanded)}
                className="h-9 px-3 text-primary hover:bg-accent hover:text-accent-foreground aria-expanded:bg-transparent aria-expanded:text-primary aria-expanded:hover:bg-accent"
              >
                {isExpanded ? "Show fewer" : `View all (${folders.length})`}
              </Button>
            )}
            <Button type="button" variant="outline" className="h-9 px-3">
              <FolderPlusIcon aria-hidden="true" />
              New folder
            </Button>
          </>
        }
      />

      <div
        id={gridId}
        role="group"
        aria-label="Filter study sets by folder"
        className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5"
      >
        <FolderTile
          icon={<LayersIcon aria-hidden="true" />}
          name="All sets"
          count={totalStudySets}
          selected={selectedFolderId === null}
          onClick={() => onSelectFolder(null)}
        />
        {visibleFolders.map((folder) => (
          <FolderTile
            key={folder.id}
            icon={<FolderIcon aria-hidden="true" />}
            name={folder.name}
            count={folder.studySetCount}
            selected={selectedFolderId === folder.id}
            onClick={() => onSelectFolder(folder.id)}
          />
        ))}
      </div>
    </section>
  )
}
