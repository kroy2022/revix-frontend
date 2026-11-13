"use client"

import * as React from "react"
import { ChevronUpIcon, PenLineIcon, SparklesIcon, UploadIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { AppTooltip } from "@/components/app-tooltip"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ManualCreateForm } from "./manual-create-form"
import { XaraCreateForm, type XaraDraft } from "./xara-create-form"
import { addUploadFiles, hasDraggedFiles } from "./upload-files"

type CreationMode = "xara" | "manual"

function getDescription(isOpen: boolean, isDragging: boolean) {
  if (isDragging) return "Release to add your files."
  if (isOpen) return "Upload lecture files for Xara, or write your own cards."
  return "Drop lecture files here, or choose how you’d like to start."
}

export function CreateStudySet() {
  const panelId = React.useId()
  const [isOpen, setIsOpen] = React.useState(false)
  const [isDragging, setIsDragging] = React.useState(false)
  const [mode, setMode] = React.useState<CreationMode>("xara")
  const [xaraDraft, setXaraDraft] = React.useState<XaraDraft>({ name: "", files: [] })
  const [limitNotice, setLimitNotice] = React.useState<string | null>(null)
  const [manualName, setManualName] = React.useState("")

  function openWith(nextMode: CreationMode) {
    setMode(nextMode)
    setIsOpen(true)
  }

  function handleFilesSelected(selected: File[]) {
    const result = addUploadFiles(xaraDraft.files, selected)
    setXaraDraft((draft) => ({ ...draft, files: result.files }))
    setLimitNotice(result.limitNotice)
  }

  function handleRemoveFile(id: string) {
    setLimitNotice(null)
    setXaraDraft((draft) => ({ ...draft, files: draft.files.filter((file) => file.id !== id) }))
  }

  function handleDragOver(event: React.DragEvent<HTMLElement>) {
    if (isOpen || !hasDraggedFiles(event)) return
    event.preventDefault()
    setIsDragging(true)
  }

  function handleDragLeave(event: React.DragEvent<HTMLElement>) {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
      setIsDragging(false)
    }
  }

  function handleDrop(event: React.DragEvent<HTMLElement>) {
    if (isOpen) return
    event.preventDefault()
    setIsDragging(false)
    openWith("xara")
    handleFilesSelected(Array.from(event.dataTransfer.files))
  }

  return (
    <section
      aria-labelledby="create-study-set-heading"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      data-dragging={isDragging || undefined}
      className={cn(
        "relative rounded-2xl border border-accent-border bg-linear-to-br from-accent via-card to-card shadow-raised",
        "transition-[border-color,box-shadow,background-color] duration-200",
        "data-dragging:border-primary data-dragging:bg-accent data-dragging:ring-4 data-dragging:ring-primary/15"
      )}
    >
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:gap-5 sm:p-6">
          <div className="flex min-w-0 flex-1 items-center gap-4">
            <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-raised">
              {isDragging ? (
                <UploadIcon className="size-5" aria-hidden="true" />
              ) : (
                <SparklesIcon className="size-5" aria-hidden="true" />
              )}
            </span>
            <div className="flex min-w-0 flex-col gap-0.5">
              <h2
                id="create-study-set-heading"
                className="text-lg font-semibold tracking-tight text-foreground"
              >
                Create a study set
              </h2>
              <p className="text-sm text-secondary-foreground">{getDescription(isOpen, isDragging)}</p>
            </div>
          </div>

          {isOpen ? (
            <AppTooltip label="Collapse">
              <Button
                type="button"
                variant="ghost"
                size="icon-lg"
                onClick={() => setIsOpen(false)}
                aria-expanded
                aria-controls={panelId}
                aria-label="Collapse study set creation"
                className="self-end text-secondary-foreground sm:self-center"
              >
                <ChevronUpIcon aria-hidden="true" />
              </Button>
            </AppTooltip>
          ) : (
            <div className="flex flex-wrap gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => openWith("manual")}
                aria-expanded={false}
                aria-controls={panelId}
                className="h-10 flex-1 px-4 sm:flex-none"
              >
                <PenLineIcon aria-hidden="true" />
                Write your own
              </Button>
              <Button
                type="button"
                onClick={() => openWith("xara")}
                aria-expanded={false}
                aria-controls={panelId}
                className="h-10 flex-1 px-4 sm:flex-none"
              >
                <SparklesIcon aria-hidden="true" />
                Create with Xara
              </Button>
            </div>
          )}
        </div>

        <CollapsibleContent
          id={panelId}
          className="h-(--collapsible-panel-height) overflow-hidden transition-[height] duration-200 ease-out data-ending-style:h-0 data-starting-style:h-0 motion-reduce:transition-none"
        >
          <div className="border-t border-accent-border/70 px-5 pt-6 pb-8 sm:px-8">
            <Tabs
              value={mode}
              onValueChange={(value) => setMode(value as CreationMode)}
              className="mx-auto w-full max-w-2xl gap-6"
            >
              <TabsList aria-label="Creation method" className="self-center group-data-horizontal/tabs:h-10">
                <TabsTrigger value="xara" className="px-4">
                  <SparklesIcon aria-hidden="true" />
                  Create with Xara
                </TabsTrigger>
                <TabsTrigger value="manual" className="px-4">
                  <PenLineIcon aria-hidden="true" />
                  Write your own
                </TabsTrigger>
              </TabsList>
              <TabsContent value="xara">
                <XaraCreateForm
                  draft={xaraDraft}
                  limitNotice={limitNotice}
                  onNameChange={(name) => setXaraDraft((draft) => ({ ...draft, name }))}
                  onFilesSelected={handleFilesSelected}
                  onRemoveFile={handleRemoveFile}
                />
              </TabsContent>
              <TabsContent value="manual">
                <ManualCreateForm name={manualName} onNameChange={setManualName} />
              </TabsContent>
            </Tabs>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </section>
  )
}
