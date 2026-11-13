import type { Folder, StudySet, UploadFile } from "./types"

export const mockFolders: Folder[] = [
  { id: "physiology", name: "Physiology", studySetCount: 3 },
  { id: "biochemistry", name: "Biochemistry", studySetCount: 2 },
  { id: "anatomy", name: "Anatomy", studySetCount: 1 },
  { id: "pharmacology", name: "Pharmacology", studySetCount: 1 },
  { id: "microbiology", name: "Microbiology", studySetCount: 0 },
  { id: "organic-chemistry", name: "Organic chemistry II", studySetCount: 1 },
]

export const mockStudySets: StudySet[] = [
  {
    id: "cardiovascular-physiology",
    title: "Cardiovascular physiology",
    cardCount: 42,
    folderId: "physiology",
    status: "ready",
    lastActivity: { kind: "studied", at: "2026-11-12T22:30:00Z", label: "2 hours ago" },
  },
  {
    id: "renal-physiology",
    title: "Renal physiology lecture 6",
    cardCount: 0,
    folderId: "physiology",
    status: "processing",
    lastActivity: { kind: "created", at: "2026-11-13T00:20:00Z", label: "5 minutes ago" },
  },
  {
    id: "glycolysis",
    title: "Glycolysis and the citric acid cycle",
    cardCount: 36,
    folderId: "biochemistry",
    status: "ready",
    lastActivity: { kind: "studied", at: "2026-11-11T18:00:00Z", label: "yesterday" },
  },
  {
    id: "upper-limb",
    title: "Upper limb: brachial plexus, muscles of the forearm, and their innervation",
    cardCount: 58,
    folderId: "anatomy",
    status: "ready",
    lastActivity: { kind: "studied", at: "2026-11-09T15:00:00Z", label: "3 days ago" },
  },
  {
    id: "exam-review",
    title: "Midterm review",
    cardCount: 0,
    folderId: null,
    status: "ready",
    lastActivity: { kind: "created", at: "2026-11-12T20:00:00Z", label: "4 hours ago" },
  },
  {
    id: "autonomic-drugs",
    title: "Autonomic drugs",
    cardCount: 27,
    folderId: "pharmacology",
    status: "ready",
    lastActivity: { kind: "studied", at: "2026-11-05T14:00:00Z", label: "1 week ago" },
  },
  {
    id: "respiratory-mechanics",
    title: "Respiratory mechanics",
    cardCount: 19,
    folderId: "physiology",
    status: "ready",
    lastActivity: { kind: "created", at: "2026-11-02T10:00:00Z", label: "Nov 2" },
  },
  {
    id: "enzyme-kinetics",
    title: "Enzyme kinetics",
    cardCount: 24,
    folderId: "biochemistry",
    status: "ready",
    lastActivity: { kind: "studied", at: "2026-10-28T09:00:00Z", label: "Oct 28" },
  },
  {
    id: "stereochemistry",
    title: "Stereochemistry",
    cardCount: 31,
    folderId: "organic-chemistry",
    status: "ready",
    lastActivity: { kind: "studied", at: "2026-10-20T09:00:00Z", label: "Oct 20" },
  },
]

export const mockUploadFiles: UploadFile[] = [
  {
    id: "mock-file-1",
    name: "Lecture 7 - Cardiac cycle.pdf",
    size: 2_480_000,
    status: "ready",
  },
  {
    id: "mock-file-2",
    name: "Week 7 slides.pptx",
    size: 8_920_000,
    status: "ready",
  },
]
