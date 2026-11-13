"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type ManualCreateFormProps = {
  name: string
  onNameChange: (name: string) => void
}

export function ManualCreateForm({ name, onNameChange }: ManualCreateFormProps) {
  const nameId = React.useId()
  const descriptionId = React.useId()
  const canSubmit = name.trim().length > 0

  return (
    <form onSubmit={(event) => event.preventDefault()} className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <Label htmlFor={nameId}>Study set name</Label>
        <Input
          id={nameId}
          value={name}
          onChange={(event) => onNameChange(event.target.value)}
          placeholder="e.g. Pharmacology flashcards"
          aria-describedby={descriptionId}
          className="h-11 bg-card px-3.5 text-base md:text-base"
        />
        <p id={descriptionId} className="text-sm text-muted-foreground">
          You’ll add your own cards in the editor.
        </p>
      </div>

      <div className="flex flex-col items-center gap-2">
        <Button type="submit" disabled={!canSubmit} className="h-11 px-6 text-base">
          Create blank study set
        </Button>
        {!canSubmit && (
          <p className="text-center text-sm text-muted-foreground">
            Name your study set to continue.
          </p>
        )}
      </div>
    </form>
  )
}
