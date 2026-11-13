"use client"

import * as React from "react"
import { CircleAlertIcon, CircleXIcon, Loader2Icon } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FileDropzone } from "./file-dropzone"
import { UploadFileList } from "./upload-file-list"
import type { UploadFile } from "./types"

const MAX_FILES = 5
const ACCEPTED_EXTENSIONS = ["pdf", "pptx", "docx"]

export type XaraDraft = {
  name: string
  files: UploadFile[]
}

type XaraCreateFormProps = {
  draft: XaraDraft
  onDraftChange: (draft: XaraDraft) => void
  isProcessing?: boolean
  error?: string | null
}

function toUploadFile(file: File): UploadFile {
  const extension = file.name.split(".").pop()?.toLowerCase() ?? ""
  const isAccepted = ACCEPTED_EXTENSIONS.includes(extension)

  return {
    id: crypto.randomUUID(),
    name: file.name,
    size: file.size,
    status: isAccepted ? "ready" : "error",
    error: isAccepted ? undefined : "Unsupported file type. Use PDF, PPTX, or DOCX.",
  }
}

function getBlockingReason(draft: XaraDraft) {
  if (draft.files.length === 0) return "Add at least one file to continue."
  if (draft.files.some((file) => file.status === "error")) {
    return "Remove files that can’t be used to continue."
  }
  if (!draft.name.trim()) return "Name your study set to continue."
  return null
}

export function XaraCreateForm({
  draft,
  onDraftChange,
  isProcessing = false,
  error,
}: XaraCreateFormProps) {
  const nameId = React.useId()
  const hintId = React.useId()
  const [limitNotice, setLimitNotice] = React.useState<string | null>(null)

  const blockingReason = getBlockingReason(draft)
  const canSubmit = !blockingReason && !isProcessing
  const isFull = draft.files.length >= MAX_FILES

  function handleFilesSelected(selected: File[]) {
    const remainingSlots = MAX_FILES - draft.files.length
    const accepted = selected.slice(0, Math.max(0, remainingSlots))
    const skippedCount = selected.length - accepted.length

    setLimitNotice(
      skippedCount > 0
        ? `You can add up to ${MAX_FILES} files. ${skippedCount} ${skippedCount === 1 ? "file wasn’t" : "files weren’t"} added.`
        : null
    )
    if (accepted.length > 0) {
      onDraftChange({ ...draft, files: [...draft.files, ...accepted.map(toUploadFile)] })
    }
  }

  function handleRemove(id: string) {
    setLimitNotice(null)
    onDraftChange({ ...draft, files: draft.files.filter((file) => file.id !== id) })
  }

  return (
    <form
      onSubmit={(event) => event.preventDefault()}
      aria-busy={isProcessing || undefined}
      className="flex flex-col gap-6"
    >
      <div className="flex flex-col gap-3">
        <FileDropzone
          onFilesSelected={handleFilesSelected}
          disabled={isProcessing || isFull}
        />
        {limitNotice ? (
          <p role="status" className="flex items-center gap-1.5 text-sm text-destructive">
            <CircleAlertIcon className="size-4 shrink-0" aria-hidden="true" />
            {limitNotice}
          </p>
        ) : isFull && (
          <p className="text-sm text-muted-foreground">
            You’ve added the maximum of {MAX_FILES} files. Remove one to add another.
          </p>
        )}
        <UploadFileList files={draft.files} onRemove={handleRemove} disabled={isProcessing} />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor={nameId} className="text-sm">
          Study set name
        </Label>
        <Input
          id={nameId}
          value={draft.name}
          onChange={(event) => onDraftChange({ ...draft, name: event.target.value })}
          placeholder="e.g. Cardiac cycle"
          disabled={isProcessing}
          className="h-10 bg-card"
        />
      </div>

      {error && (
        <Alert variant="destructive">
          <CircleXIcon aria-hidden="true" />
          <AlertTitle>We couldn’t create your study set</AlertTitle>
          <AlertDescription>{error} Your files and name are still here, so you can try again.</AlertDescription>
        </Alert>
      )}

      <div className="flex flex-col items-center gap-2">
        <Button
          type="submit"
          size="lg"
          disabled={!canSubmit}
          aria-describedby={blockingReason ? hintId : undefined}
          className="h-10 px-6"
        >
          {isProcessing && (
            <Loader2Icon className="animate-spin motion-reduce:animate-none" aria-hidden="true" />
          )}
          {isProcessing ? "Creating study set…" : "Create study set"}
        </Button>
        {blockingReason && !isProcessing && (
          <p id={hintId} className="text-center text-sm text-muted-foreground">
            {blockingReason}
          </p>
        )}
      </div>
    </form>
  )
}
