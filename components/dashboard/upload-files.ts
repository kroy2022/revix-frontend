import type { DragEvent } from "react"
import type { UploadFile } from "./types"

export const MAX_UPLOAD_FILES = 5

const ACCEPTED_EXTENSIONS = ["pdf", "pptx", "docx"]

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

export function addUploadFiles(current: UploadFile[], selected: File[]) {
  const remainingSlots = Math.max(0, MAX_UPLOAD_FILES - current.length)
  const accepted = selected.slice(0, remainingSlots)
  const skippedCount = selected.length - accepted.length

  return {
    files: [...current, ...accepted.map(toUploadFile)],
    limitNotice:
      skippedCount > 0
        ? `You can add up to ${MAX_UPLOAD_FILES} files. ${skippedCount} ${skippedCount === 1 ? "file wasn’t" : "files weren’t"} added.`
        : null,
  }
}

export function hasDraggedFiles(event: DragEvent) {
  return Array.from(event.dataTransfer.types).includes("Files")
}
