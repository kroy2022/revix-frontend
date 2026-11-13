"use client"

import * as React from "react"
import { FolderBar } from "./folder-bar"
import { StudySetList } from "./study-set-list"
import type { Folder, StudySet } from "./types"

type StudyLibraryProps = {
  folders: Folder[]
  studySets: StudySet[]
}

export function StudyLibrary({ folders, studySets }: StudyLibraryProps) {
  const [selectedFolderId, setSelectedFolderId] = React.useState<string | null>(null)
  const selectedFolder = folders.find((folder) => folder.id === selectedFolderId) ?? null

  return (
    <div className="flex flex-col gap-10">
      <FolderBar
        folders={folders}
        totalStudySets={studySets.length}
        selectedFolderId={selectedFolderId}
        onSelectFolder={setSelectedFolderId}
      />
      <StudySetList
        studySets={studySets}
        folders={folders}
        selectedFolder={selectedFolder}
        onClearFolder={() => setSelectedFolderId(null)}
      />
    </div>
  )
}
