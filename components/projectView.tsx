"use client"

import { useState } from "react"
import { X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface ProjectModalProps {
  open: boolean
  onClose: () => void
}

export function ProjectModal({ open, onClose }: ProjectModalProps) {
  const [projectName, setProjectName] = useState("")
  const [summary, setSummary] = useState("")

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] bg-background border-border">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-normal">New project</DialogTitle>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>
        <div className="space-y-6 pt-4">
          <div className="space-y-2">
            <Input
              placeholder="Project name"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="text-lg bg-background border-none focus-visible:ring-0 p-0 h-auto"
            />
            <Input
              placeholder="Add a short summary..."
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              className="text-muted-foreground bg-background border-none focus-visible:ring-0 p-0 h-auto"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            <Button variant="outline" size="sm">
              Backlog
            </Button>
            <Button variant="outline" size="sm">
              No priority
            </Button>
            <Button variant="outline" size="sm">
              Lead
            </Button>
            <Button variant="outline" size="sm">
              Members
            </Button>
            <Button variant="outline" size="sm">
              Dependencies
            </Button>
            <Button variant="outline" size="sm">
              Start date
            </Button>
            <Button variant="outline" size="sm">
              Target date
            </Button>
            <Button variant="outline" size="sm">
              Milestones
            </Button>
          </div>
          <Textarea
            placeholder="Write a description, a project brief, or collect ideas..."
            className="min-h-[200px] bg-background resize-none"
          />
          <div className="flex justify-end gap-2">
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button>Create project</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

