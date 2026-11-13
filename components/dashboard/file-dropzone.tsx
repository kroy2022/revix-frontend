"use client"

import * as React from "react"
import { UploadIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { hasDraggedFiles } from "./upload-files"

const ACCEPTED_FILE_TYPES = [
  ".pdf",
  ".pptx",
  ".docx",
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
].join(",")

type FileDropzoneProps = {
  onFilesSelected: (files: File[]) => void
  disabled?: boolean
}

export function FileDropzone({ onFilesSelected, disabled }: FileDropzoneProps) {
  const hintId = React.useId()
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [isDragging, setIsDragging] = React.useState(false)

  function handleDragOver(event: React.DragEvent<HTMLDivElement>) {
    if (!hasDraggedFiles(event)) return
    event.preventDefault()
    if (!disabled) setIsDragging(true)
  }

  function handleDragLeave(event: React.DragEvent<HTMLDivElement>) {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
      setIsDragging(false)
    }
  }

  function handleDrop(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault()
    setIsDragging(false)
    if (disabled) return
    onFilesSelected(Array.from(event.dataTransfer.files))
  }

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    onFilesSelected(Array.from(event.target.files ?? []))
    event.target.value = ""
  }

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      data-dragging={isDragging || undefined}
      aria-disabled={disabled || undefined}
      className={cn(
        "flex flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed border-accent-border bg-card px-6 py-12 text-center transition-[background-color,border-color] duration-150",
        "hover:border-primary/50 data-dragging:border-primary data-dragging:bg-accent",
        "aria-disabled:cursor-not-allowed aria-disabled:opacity-60 aria-disabled:hover:border-accent-border"
      )}
    >
      <span className="flex size-12 items-center justify-center rounded-2xl bg-accent text-accent-foreground">
        <UploadIcon className="size-5" aria-hidden="true" />
      </span>
      <div className="flex flex-col gap-1">
        <p className="text-base font-medium text-foreground">
          Drop your lecture files here or{" "}
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={disabled}
            aria-describedby={hintId}
            className="rounded-sm text-primary underline decoration-accent-border decoration-2 underline-offset-4 outline-none transition-colors duration-150 hover:text-primary-hover hover:decoration-primary focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none"
          >
            browse files
          </button>
        </p>
        <p id={hintId} className="text-sm text-muted-foreground">
          PDF, PPTX, or DOCX · Up to 5 files
        </p>
      </div>
      <input
        ref={inputRef}
        type="file"
        multiple
        accept={ACCEPTED_FILE_TYPES}
        onChange={handleInputChange}
        disabled={disabled}
        tabIndex={-1}
        aria-hidden="true"
        className="sr-only"
      />
    </div>
  )
}
