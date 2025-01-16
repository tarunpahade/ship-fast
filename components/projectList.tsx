"use client"

import { useState } from "react"
import { MoreHorizontal, Plus, Search } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ProjectModal } from "./project-modal"

interface Project {
  id: string
  title: string
  health: string
  priority: string
  lead: string
  targetDate: string
  status: string
}

export function ProjectList() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [projects] = useState<Project[]>([
    {
      id: "1",
      title: "AI Video Editor",
      health: "On Track",
      priority: "High",
      lead: "John Doe",
      targetDate: "2024-01-30",
      status: "0%"
    },
    {
      id: "2",
      title: "Project Manager",
      health: "At Risk",
      priority: "Medium",
      lead: "Jane Smith",
      targetDate: "2024-02-15",
      status: "25%"
    }
  ])

  return (
    <div className="h-screen flex flex-col dark">
      <header className="border-b border-border p-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-semibold">Projects</h1>
          <Button onClick={() => setIsModalOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Create project
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Filter projects..."
              className="pl-8 bg-background"
            />
          </div>
        </div>
      </header>
      <div className="flex-1 overflow-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left p-4 font-medium">Title</th>
              <th className="text-left p-4 font-medium">Health</th>
              <th className="text-left p-4 font-medium">Priority</th>
              <th className="text-left p-4 font-medium">Lead</th>
              <th className="text-left p-4 font-medium">Target Date</th>
              <th className="text-left p-4 font-medium">Status</th>
              <th className="w-8 p-4"></th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr
                key={project.id}
                className="border-b border-border hover:bg-muted/50"
              >
                <td className="p-4">{project.title}</td>
                <td className="p-4">{project.health}</td>
                <td className="p-4">{project.priority}</td>
                <td className="p-4">{project.lead}</td>
                <td className="p-4">{project.targetDate}</td>
                <td className="p-4">{project.status}</td>
                <td className="p-4">
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ProjectModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  )
}

