"use client"

import * as React from "react"
import { FolderOpenIcon, LayersIcon, SearchXIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SearchField } from "@/components/search-field"
import { SectionHeader } from "@/components/section-header"
import { StudySetRow } from "./study-set-row"
import type { Folder, StudySet } from "./types"

type StudySetListProps = {
  studySets: StudySet[]
  folders: Folder[]
  selectedFolder: Folder | null
  onClearFolder: () => void
}

function EmptyMessage({
  icon,
  title,
  description,
  action,
}: {
  icon: React.ReactNode
  title: string
  description: string
  action?: React.ReactNode
}) {
  return (
    <div className="flex flex-col items-center gap-4 rounded-2xl border border-border bg-card px-6 py-14 text-center shadow-raised">
      <span className="flex size-12 items-center justify-center rounded-2xl bg-accent text-accent-foreground [&_svg]:size-5">
        {icon}
      </span>
      <div className="flex max-w-sm flex-col gap-1">
        <p className="text-base font-semibold text-foreground">{title}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      {action}
    </div>
  )
}

export function StudySetList({ studySets, folders, selectedFolder, onClearFolder }: StudySetListProps) {
  const [query, setQuery] = React.useState("")
  const normalizedQuery = query.trim().toLowerCase()

  const visibleSets = studySets
    .filter((set) => !selectedFolder || set.folderId === selectedFolder.id)
    .filter((set) => !normalizedQuery || set.title.toLowerCase().includes(normalizedQuery))
    .sort((a, b) => b.lastActivity.at.localeCompare(a.lastActivity.at))

  function renderEmptyState() {
    if (studySets.length === 0) {
      return (
        <EmptyMessage
          icon={<LayersIcon aria-hidden="true" />}
          title="No study sets yet"
          description="Create your first study set above to get started."
        />
      )
    }
    if (normalizedQuery) {
      return (
        <EmptyMessage
          icon={<SearchXIcon aria-hidden="true" />}
          title={`No study sets match “${query.trim()}”`}
          description={selectedFolder ? `Searching in ${selectedFolder.name}.` : "Try a different title."}
          action={
            <Button variant="outline" onClick={() => setQuery("")} className="h-9 px-3">
              Clear search
            </Button>
          }
        />
      )
    }
    return (
      <EmptyMessage
        icon={<FolderOpenIcon aria-hidden="true" />}
        title={`No study sets in ${selectedFolder?.name ?? "this folder"} yet`}
        description="Move a study set here from its actions menu."
        action={
          <Button variant="outline" onClick={onClearFolder} className="h-9 px-3">
            Show all sets
          </Button>
        }
      />
    )
  }

  return (
    <section aria-labelledby="study-sets-heading" className="flex flex-col gap-4">
      <SectionHeader
        id="study-sets-heading"
        title="My study sets"
        description={
          <p aria-live="polite">
            <span className="tabular-nums">{visibleSets.length}</span>{" "}
            {visibleSets.length === 1 ? "set" : "sets"}
            {selectedFolder && ` in ${selectedFolder.name}`} · Sorted by recent activity
          </p>
        }
        actions={
          <SearchField
            label="Search study sets by title"
            placeholder="Search by title"
            value={query}
            onValueChange={setQuery}
            className="w-full sm:w-72"
          />
        }
      />

      {visibleSets.length > 0 ? (
        <ul className="flex flex-col divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card shadow-raised">
          {visibleSets.map((studySet) => (
            <StudySetRow key={studySet.id} studySet={studySet} folders={folders} />
          ))}
        </ul>
      ) : (
        renderEmptyState()
      )}
    </section>
  )
}
