"use client"

import * as React from "react"
import { PenLineIcon, SparklesIcon } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ManualCreateForm } from "./manual-create-form"
import { XaraCreateForm, type XaraDraft } from "./xara-create-form"
import type { UploadFile } from "./types"

type CreationMode = "xara" | "manual"

type CreateStudySetProps = {
  initialFiles?: UploadFile[]
}

export function CreateStudySet({ initialFiles = [] }: CreateStudySetProps) {
  const [mode, setMode] = React.useState<CreationMode>("xara")
  const [xaraDraft, setXaraDraft] = React.useState<XaraDraft>({ name: "", files: initialFiles })
  const [manualName, setManualName] = React.useState("")

  return (
    <section
      aria-labelledby="create-study-set-heading"
      className="rounded-2xl border border-border bg-card px-4 py-6 sm:px-8 sm:py-8"
    >
      <h2 id="create-study-set-heading" className="sr-only">
        Create a study set
      </h2>
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
          <XaraCreateForm draft={xaraDraft} onDraftChange={setXaraDraft} />
        </TabsContent>
        <TabsContent value="manual">
          <ManualCreateForm name={manualName} onNameChange={setManualName} />
        </TabsContent>
      </Tabs>
    </section>
  )
}
