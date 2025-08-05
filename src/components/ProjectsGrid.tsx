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
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import ProjectCard from "./ProjectCard";

const ProjectsGrid = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [newProjectName, setNewProjectName] = useState("");
  const { toast } = useToast();

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

  const handleCreateProject = () => {
    if (!newProjectName.trim()) return;
    
    toast({
      title: "Project Created",
      description: `${newProjectName} has been created successfully.`,
    });
    
    setNewProjectName("");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          📄 Recent Drafts
        </h3>
        <Button variant="ghost" size="sm" className="text-vercel-blue hover:text-vercel-blue/80">
          View All
        </Button>
      </div>

      {/* Recent Drafts List */}
      <div className="space-y-4">
        {[
          {
            title: "10 AI Tools Every YouTuber Needs",
            status: "accepted",
            views: "12-18K views",
            type: "List Video",
            category: "AI Tools",
            time: "2 hours ago"
          },
          {
            title: "The Future of Content Creation",
            status: "pending",
            views: "8-12K views",
            type: "Discussion",
            category: "Industry Trends",
            time: "5 hours ago"
          },
          {
            title: "YouTube Algorithm Changes 2024",
            status: "rejected",
            views: "15-25K views",
            type: "Educational",
            category: "Platform Updates",
            time: "1 day ago"
          }
        ].map((draft, index) => (
          <div key={index} className="p-4 border border-vercel-border rounded-lg hover:bg-muted/50 transition-colors">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h4 className="font-medium text-sm">{draft.title}</h4>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    draft.status === 'accepted' ? 'bg-success/10 text-success' :
                    draft.status === 'pending' ? 'bg-warning/10 text-warning' :
                    'bg-destructive/10 text-destructive'
                  }`}>
                    {draft.status}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    📊 {draft.views}
                  </span>
                  <span className="flex items-center gap-1">
                    🎬 {draft.type}
                  </span>
                  <span className="flex items-center gap-1">
                    🏷️ {draft.category}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">{draft.time}</p>
              </div>
              <Button variant="ghost" size="sm" className="text-vercel-blue hover:text-vercel-blue/80">
                View Draft
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsGrid;