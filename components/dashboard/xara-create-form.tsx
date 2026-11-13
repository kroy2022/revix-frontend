"use client"

import * as React from "react"
import { CircleAlertIcon, CircleXIcon, Loader2Icon } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FileDropzone } from "./file-dropzone"
import { UploadFileList } from "./upload-file-list"
import { MAX_UPLOAD_FILES } from "./upload-files"
import type { UploadFile } from "./types"

export type XaraDraft = {
  name: string
  files: UploadFile[]
}

type XaraCreateFormProps = {
  draft: XaraDraft
  limitNotice: string | null
  onNameChange: (name: string) => void
  onFilesSelected: (files: File[]) => void
  onRemoveFile: (id: string) => void
  isProcessing?: boolean
  error?: string | null
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
  limitNotice,
  onNameChange,
  onFilesSelected,
  onRemoveFile,
  isProcessing = false,
  error,
}: XaraCreateFormProps) {
  const nameId = React.useId()
  const hintId = React.useId()

  const blockingReason = getBlockingReason(draft)
  const canSubmit = !blockingReason && !isProcessing
  const isFull = draft.files.length >= MAX_UPLOAD_FILES

  return (
    <form
      onSubmit={(event) => event.preventDefault()}
      aria-busy={isProcessing || undefined}
      className="flex flex-col gap-6"
    >
      <div className="flex flex-col gap-3">
        <FileDropzone onFilesSelected={onFilesSelected} disabled={isProcessing || isFull} />
        {limitNotice ? (
          <p role="status" className="flex items-center gap-1.5 text-sm text-destructive">
            <CircleAlertIcon className="size-4 shrink-0" aria-hidden="true" />
            {limitNotice}
          </p>
        ) : (
          isFull && (
            <p className="text-sm text-muted-foreground">
              You’ve added the maximum of {MAX_UPLOAD_FILES} files. Remove one to add another.
            </p>
          )
        )}
        <UploadFileList files={draft.files} onRemove={onRemoveFile} disabled={isProcessing} />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor={nameId}>Study set name</Label>
        <Input
          id={nameId}
          value={draft.name}
          onChange={(event) => onNameChange(event.target.value)}
          placeholder="e.g. Cardiac cycle"
          disabled={isProcessing}
          className="h-11 bg-card px-3.5 text-base md:text-base"
        />
      </div>

      {error && (
        <Alert variant="destructive">
          <CircleXIcon aria-hidden="true" />
          <AlertTitle>We couldn’t create your study set</AlertTitle>
          <AlertDescription>
            {error} Your files and name are still here, so you can try again.
          </AlertDescription>
        </Alert>
      )}

      <div className="flex flex-col items-center gap-2">
        <Button
          type="submit"
          disabled={!canSubmit}
          aria-describedby={blockingReason ? hintId : undefined}
          className="h-11 px-6 text-base"
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
