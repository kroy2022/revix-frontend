import Link from "next/link"
import { FilePlus2Icon, LayersIcon, Loader2Icon, PlusIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
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

function StudySetIcon({ studySet }: { studySet: StudySet }) {
  if (studySet.status === "processing") {
    return (
      <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-info-surface text-info">
        <Loader2Icon className="size-4 animate-spin motion-reduce:animate-none" aria-hidden="true" />
      </span>
    )
  }

  if (studySet.cardCount === 0) {
    return (
      <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-secondary text-secondary-foreground">
        <FilePlus2Icon className="size-4" aria-hidden="true" />
      </span>
    )
  }

  return (
    <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-accent text-accent-foreground">
      <LayersIcon className="size-4" aria-hidden="true" />
    </span>
  )
}

function StudySetPrimaryAction({ studySet }: { studySet: StudySet }) {
  if (studySet.status === "processing") {
    return (
      <span className="inline-flex h-7 items-center rounded-full border border-info-border bg-info-surface px-2.5 text-xs font-medium text-info">
        Processing
      </span>
    )
  }

  if (studySet.cardCount === 0) {
    return (
      <Link
        href={`/study-sets/${studySet.id}/edit`}
        aria-label={`Add cards to ${studySet.title}`}
        className={cn(buttonVariants({ variant: "outline", size: "lg" }), "px-3")}
      >
        <PlusIcon aria-hidden="true" />
        Add cards
      </Link>
    )
  }

  return (
    <Link
      href={`/study-sets/${studySet.id}/study`}
      aria-label={`Study ${studySet.title}`}
      className={cn(buttonVariants({ variant: "soft", size: "lg" }), "px-4")}
    >
      Study
    </Link>
  )
}

export function StudySetRow({ studySet, folders }: StudySetRowProps) {
  const folderName = folders.find((folder) => folder.id === studySet.folderId)?.name

  return (
    <li className="group/row relative flex items-center gap-4 px-4 py-4 transition-colors duration-150 hover:bg-secondary sm:px-5">
      <StudySetIcon studySet={studySet} />
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <Link
          href={`/study-sets/${studySet.id}`}
          className="w-fit rounded-sm text-base font-medium break-words text-foreground outline-none after:absolute after:inset-0 focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          {studySet.title}
        </Link>
        <p className="text-sm text-muted-foreground">{getMetadata(studySet, folderName)}</p>
      </div>
      <div className="relative z-10 flex shrink-0 items-center gap-1">
        <StudySetPrimaryAction studySet={studySet} />
        <StudySetActionsMenu studySet={studySet} folders={folders} />
      </div>
    </li>
  )
}
