import { useState } from "react";
import { Search, Filter, Grid3X3, List, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ProjectCard from "./ProjectCard";

const ProjectsGrid = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const projects = [
    {
      name: "youtube-growth-scripts",
      url: "youtube-growth-scripts.creatorpulse.app",
      lastUpdate: "Jan 25 on main",
      status: "ready" as const,
      repo: "CreatorPulse/youtube-growth-scripts",
      branch: "main",
      description: "AI-generated scripts for viral YouTube content focused on productivity and growth",
    },
    {
      name: "trend-analyzer-v2",
      url: "trend-analyzer-v2.creatorpulse.app",
      lastUpdate: "12/20/24",
      status: "ready" as const,
      repo: "CreatorPulse/trend-analyzer",
      branch: "main",
      description: "Advanced trend detection and analysis for content creators",
    },
    {
      name: "content-scheduler",
      url: "content-scheduler.creatorpulse.app",
      lastUpdate: "Jan 24 on feature",
      status: "building" as const,
      repo: "CreatorPulse/content-scheduler",
      branch: "feature",
      description: "Automated content scheduling and delivery system",
    },
    {
      name: "voice-trainer",
      url: "voice-trainer.creatorpulse.app",
      lastUpdate: "10/2/24",
      status: "ready" as const,
      repo: "CreatorPulse/voice-trainer",
      branch: "main",
      description: "AI voice training and style adaptation engine",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold">Projects</h1>
          <p className="text-muted-foreground">
            Manage your CreatorPulse projects and drafts
          </p>
        </div>
        <Button className="bg-foreground hover:bg-foreground/90 text-background">
          <Plus className="mr-2 h-4 w-4" />
          Add New...
        </Button>
      </div>

      {/* Filters and Search */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search Projects..."
              className="w-80 pl-9 border-vercel-border"
            />
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="border-vercel-border">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem>All Projects</DropdownMenuItem>
              <DropdownMenuItem>Ready</DropdownMenuItem>
              <DropdownMenuItem>Building</DropdownMenuItem>
              <DropdownMenuItem>Error</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant={viewMode === "grid" ? "default" : "ghost"}
            size="icon"
            onClick={() => setViewMode("grid")}
            className={viewMode === "grid" ? "bg-muted" : ""}
          >
            <Grid3X3 className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "ghost"}
            size="icon"
            onClick={() => setViewMode("list")}
            className={viewMode === "list" ? "bg-muted" : ""}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Projects Grid */}
      <div className={
        viewMode === "grid" 
          ? "grid grid-cols-1 md:grid-cols-2 gap-4" 
          : "space-y-4"
      }>
        {projects.map((project, index) => (
          <ProjectCard key={index} {...project} />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center pt-4">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <span>1 of 1</span>
          <Button variant="ghost" size="sm" disabled>
            →
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProjectsGrid;