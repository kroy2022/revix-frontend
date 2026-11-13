"use client"

import { CircleAlertIcon, CircleCheckIcon, FileTextIcon, XIcon } from "lucide-react"
import { AppTooltip } from "@/components/app-tooltip"
import { Button } from "@/components/ui/button"
import type { UploadFile } from "./types"

function formatFileSize(bytes: number) {
  if (bytes < 1_000_000) return `${Math.max(1, Math.round(bytes / 1_000))} KB`
  return `${(bytes / 1_000_000).toFixed(1)} MB`
}

type UploadFileListProps = {
  files: UploadFile[]
  onRemove: (id: string) => void
  disabled?: boolean
}

export function UploadFileList({ files, onRemove, disabled }: UploadFileListProps) {
  if (files.length === 0) return null

  return (
    <ul
      aria-label="Selected files"
      className="flex flex-col divide-y divide-border overflow-hidden rounded-xl border border-border bg-card shadow-raised"
    >
      {files.map((file) => (
        <li
          key={file.id}
          className="flex items-center gap-3 px-3 py-3 animate-in fade-in-0 slide-in-from-top-1 duration-200 motion-reduce:animate-none sm:px-4"
        >
          <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-secondary text-secondary-foreground">
            <FileTextIcon className="size-4" aria-hidden="true" />
          </span>
          <div className="flex min-w-0 flex-1 flex-col gap-0.5">
            <span className="text-sm font-medium break-words text-foreground">{file.name}</span>
            {file.status === "error" ? (
              <span className="flex items-center gap-1.5 text-sm text-destructive">
                <CircleAlertIcon className="size-3.5 shrink-0" aria-hidden="true" />
                {file.error ?? "This file can’t be used."}
              </span>
            ) : (
              <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <CircleCheckIcon className="size-3.5 shrink-0 text-primary" aria-hidden="true" />
                Ready · <span className="tabular-nums">{formatFileSize(file.size)}</span>
              </span>
            )}
          </div>
          <AppTooltip label="Remove file">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => onRemove(file.id)}
              disabled={disabled}
              aria-label={`Remove ${file.name}`}
              className="text-muted-foreground hover:text-foreground"
            >
              <XIcon aria-hidden="true" />
            </Button>
          </AppTooltip>
        </li>
      ))}
    </ul>
  )
}
