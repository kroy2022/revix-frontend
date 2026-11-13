export type Folder = {
  id: string
  name: string
  studySetCount: number
}

export type StudySetStatus = "ready" | "processing"

export type StudySet = {
  id: string
  title: string
  cardCount: number
  folderId: string | null
  status: StudySetStatus
  lastActivity: {
    kind: "created" | "studied"
    at: string
    label: string
  }
}

export type UploadFileStatus = "ready" | "error"

export type UploadFile = {
  id: string
  name: string
  size: number
  status: UploadFileStatus
  error?: string
}
