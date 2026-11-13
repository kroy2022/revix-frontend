"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { SearchField } from "@/components/search-field"
import { StudySetRow } from "./study-set-row"
import type { Folder, StudySet } from "./types"

type StudySetListProps = {
  studySets: StudySet[]
  folders: Folder[]
  selectedFolder: Folder | null
  onClearFolder: () => void
}

function EmptyMessage({
  title,
  description,
  action,
}: {
  title: string
  description?: string
  action?: React.ReactNode
}) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-card px-6 py-12 text-center">
      <div className="flex flex-col gap-1">
        <p className="text-base font-medium text-foreground">{title}</p>
        {description && <p className="text-sm text-muted-foreground">{description}</p>}
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

  const countLabel = `${visibleSets.length} ${visibleSets.length === 1 ? "set" : "sets"}${
    selectedFolder ? ` in ${selectedFolder.name}` : ""
  } · Sorted by recent activity`

  function renderEmptyState() {
    if (studySets.length === 0) {
      return (
        <EmptyMessage
          title="No study sets yet"
          description="Create your first study set above to get started."
        />
      )
    }
    if (normalizedQuery) {
      return (
        <EmptyMessage
          title={`No study sets match “${query.trim()}”`}
          description={selectedFolder ? `Searching in ${selectedFolder.name}.` : "Try a different title."}
          action={
            <Button variant="outline" size="lg" onClick={() => setQuery("")} className="bg-card px-3">
              Clear search
            </Button>
          }
        />
      )
    }
    return (
      <EmptyMessage
        title={`No study sets in ${selectedFolder?.name ?? "this folder"} yet`}
        description="Move a study set here from its actions menu."
        action={
          <Button variant="outline" size="lg" onClick={onClearFolder} className="bg-card px-3">
            Show all sets
          </Button>
        }
      />
    )
  }

  return (
    <section aria-labelledby="study-sets-heading" className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex flex-col gap-1">
          <h2 id="study-sets-heading" className="text-lg font-semibold text-foreground">
            My study sets
          </h2>
          <p aria-live="polite" className="text-sm text-muted-foreground">
            {countLabel}
          </p>
        </div>
        <SearchField
          label="Search study sets by title"
          placeholder="Search by title"
          value={query}
          onValueChange={setQuery}
          className="w-full sm:w-72"
        />
      </div>

      {visibleSets.length > 0 ? (
        <ul className="flex flex-col divide-y divide-border rounded-2xl border border-border bg-card">
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
