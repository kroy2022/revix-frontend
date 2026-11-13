"use client"

import {
  CheckIcon,
  FolderInputIcon,
  FolderMinusIcon,
  MoreHorizontalIcon,
  PencilIcon,
  Trash2Icon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { Folder, StudySet } from "./types"

type StudySetActionsMenuProps = {
  studySet: StudySet
  folders: Folder[]
}

export function StudySetActionsMenu({ studySet, folders }: StudySetActionsMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="ghost"
            size="icon-lg"
            aria-label={`More actions for ${studySet.title}`}
          />
        }
      >
        <MoreHorizontalIcon aria-hidden="true" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-52">
        <DropdownMenuItem>
          <PencilIcon aria-hidden="true" />
          Rename
        </DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <FolderInputIcon aria-hidden="true" />
            Move to folder
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent className="w-52">
            {folders.map((folder) => {
              const isCurrent = folder.id === studySet.folderId
              return (
                <DropdownMenuItem key={folder.id} disabled={isCurrent}>
                  <span className="min-w-0 flex-1 truncate">{folder.name}</span>
                  {isCurrent && (
                    <>
                      <CheckIcon aria-hidden="true" />
                      <span className="sr-only">(current folder)</span>
                    </>
                  )}
                </DropdownMenuItem>
              )
            })}
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        {studySet.folderId && (
          <DropdownMenuItem>
            <FolderMinusIcon aria-hidden="true" />
            Remove from folder
          </DropdownMenuItem>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">
          <Trash2Icon aria-hidden="true" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
