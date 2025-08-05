import { useState } from "react";
import { Search, Filter, Grid3X3, List, Plus, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import ProjectCard from "./ProjectCard";
const ProjectsGrid = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [newProjectName, setNewProjectName] = useState("");
  const {
    toast
  } = useToast();
  const projects = [{
    name: "youtube-growth-scripts",
    url: "youtube-growth-scripts.creatorpulse.app",
    lastUpdate: "Jan 25 on main",
    status: "ready" as const,
    repo: "CreatorPulse/youtube-growth-scripts",
    branch: "main",
    description: "AI-generated scripts for viral YouTube content focused on productivity and growth"
  }, {
    name: "trend-analyzer-v2",
    url: "trend-analyzer-v2.creatorpulse.app",
    lastUpdate: "12/20/24",
    status: "ready" as const,
    repo: "CreatorPulse/trend-analyzer",
    branch: "main",
    description: "Advanced trend detection and analysis for content creators"
  }, {
    name: "content-scheduler",
    url: "content-scheduler.creatorpulse.app",
    lastUpdate: "Jan 24 on feature",
    status: "building" as const,
    repo: "CreatorPulse/content-scheduler",
    branch: "feature",
    description: "Automated content scheduling and delivery system"
  }, {
    name: "voice-trainer",
    url: "voice-trainer.creatorpulse.app",
    lastUpdate: "10/2/24",
    status: "ready" as const,
    repo: "CreatorPulse/voice-trainer",
    branch: "main",
    description: "AI voice training and style adaptation engine"
  }];
  const handleCreateProject = () => {
    if (!newProjectName.trim()) return;
    toast({
      title: "Project Created",
      description: `${newProjectName} has been created successfully.`
    });
    setNewProjectName("");
  };
  return <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <FileText className="w-5 h-5" />
          Recent Drafts
        </h3>
        
      </div>

      {/* Recent Drafts List */}
      <div className="space-y-4">
        {[{
        title: "10 AI Tools Every YouTuber Needs",
        status: "accepted",
        type: "List Video",
        category: "AI Tools",
        time: "2 hours ago"
      }, {
        title: "The Future of Content Creation",
        status: "pending",
        type: "Discussion",
        category: "Industry Trends",
        time: "5 hours ago"
      }, {
        title: "YouTube Algorithm Changes 2024",
        status: "rejected",
        type: "Educational",
        category: "Platform Updates",
        time: "1 day ago"
      }].map((draft, index) => <div key={index} className="p-4 border border-vercel-border rounded-lg hover:bg-muted/50 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <h4 className="font-medium text-sm">{draft.title}</h4>
                  <span className={`text-xs px-2 py-1 rounded font-medium ${draft.status === 'accepted' ? 'bg-green-100 text-green-700' : draft.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                    {draft.status === 'accepted' ? 'Published' : draft.status === 'pending' ? 'Pending' : 'Rejected'}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span>Suggested on {draft.time}</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-muted-foreground">{draft.time}</p>
              </div>
            </div>
          </div>)}
      </div>
    </div>;
};
export default ProjectsGrid;