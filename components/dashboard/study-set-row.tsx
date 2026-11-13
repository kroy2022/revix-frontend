import Link from "next/link"
import { Loader2Icon, PlusIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { StudySetActionsMenu } from "./study-set-actions-menu"
import type { Folder, StudySet } from "./types"

type StudySetRowProps = {
  studySet: StudySet
  folders: Folder[]
}

function getMetadata(studySet: StudySet, folderName: string | undefined) {
  const cards =
    studySet.status === "processing"
      ? "Processing files"
      : studySet.cardCount === 0
        ? "No cards yet"
        : `${studySet.cardCount} ${studySet.cardCount === 1 ? "card" : "cards"}`
  const activity = `${studySet.lastActivity.kind === "studied" ? "Studied" : "Created"} ${studySet.lastActivity.label}`

  return [cards, folderName, activity].filter(Boolean).join(" · ")
}

function StudySetPrimaryAction({ studySet }: { studySet: StudySet }) {
  if (studySet.status === "processing") {
    return (
      <span className="flex h-9 items-center gap-1.5 px-2 text-sm text-muted-foreground">
        <Loader2Icon className="size-4 animate-spin motion-reduce:animate-none" aria-hidden="true" />
        Processing
      </span>
    )
  }

  if (studySet.cardCount === 0) {
    return (
      <Button
        variant="outline"
        size="lg"
        nativeButton={false}
        render={<Link href={`/study-sets/${studySet.id}/edit`} />}
        className="bg-card px-3"
      >
        <PlusIcon aria-hidden="true" />
        Add cards
      </Button>
    )
  }

  return (
    <Button
      variant="outline"
      size="lg"
      nativeButton={false}
      render={<Link href={`/study-sets/${studySet.id}/study`} />}
      aria-label={`Study ${studySet.title}`}
      className="bg-card px-4"
    >
      Study
    </Button>
  )
}

export function StudySetRow({ studySet, folders }: StudySetRowProps) {
  const folderName = folders.find((folder) => folder.id === studySet.folderId)?.name

  return (
    <li className="flex items-center gap-3 px-4 py-4 sm:px-5">
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <Link
          href={`/study-sets/${studySet.id}`}
          className="w-fit rounded-sm text-base font-medium break-words text-foreground underline-offset-4 outline-none hover:underline focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          {studySet.title}
        </Link>
        <p className="text-sm text-muted-foreground">{getMetadata(studySet, folderName)}</p>
      </div>
      <div className="flex shrink-0 items-center gap-1">
        <StudySetPrimaryAction studySet={studySet} />
        <StudySetActionsMenu studySet={studySet} folders={folders} />
      </div>
    </li>
  )
}
