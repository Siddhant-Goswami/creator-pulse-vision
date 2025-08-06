import { useState } from "react";
import { Search, Filter, Grid3X3, List, Plus, FileText, Edit, Check, X, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useProjects } from "@/hooks/use-projects";
import { CreateProjectData } from "@/lib/api-client";
import ProjectCard from "./ProjectCard";
const ProjectsGrid = () => {
  const { projects, loading, error, addProject } = useProjects();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [newProjectTitle, setNewProjectTitle] = useState("");
  const [newProjectDescription, setNewProjectDescription] = useState("");
  const [newProjectCategory, setNewProjectCategory] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const { toast } = useToast();
  const handleCreateProject = async () => {
    if (!newProjectTitle.trim()) return;
    
    setIsCreating(true);
    try {
      const projectData: CreateProjectData = {
        title: newProjectTitle,
        ...(newProjectDescription.trim() && { description: newProjectDescription.trim() }),
        ...(newProjectCategory.trim() && { category: newProjectCategory.trim() })
      };
      
      await addProject(projectData);
      toast({
        title: "Project Created",
        description: `${newProjectTitle} has been created successfully.`
      });
      setNewProjectTitle("");
      setNewProjectDescription("");
      setNewProjectCategory("");
      setIsCreateDialogOpen(false);
    } catch (err) {
      console.error('Failed to create project:', err);
      toast({
        title: "Error",
        description: "Failed to create project. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsCreating(false);
    }
  };
  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading projects...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Error Alert */}
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h3 className="text-lg font-semibold">Projects ({projects.length})</h3>
          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("grid")}
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("list")}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Project
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Project</DialogTitle>
              <DialogDescription>
                Create a new project to organize your content and track progress.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Project Title</label>
                <Input 
                  placeholder="Enter project title..." 
                  value={newProjectTitle} 
                  onChange={e => setNewProjectTitle(e.target.value)} 
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Description (optional)</label>
                <Textarea 
                  placeholder="Describe your project..." 
                  value={newProjectDescription} 
                  onChange={e => setNewProjectDescription(e.target.value)}
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Category (optional)</label>
                <Input 
                  placeholder="e.g., Technology, Education, Entertainment..." 
                  value={newProjectCategory} 
                  onChange={e => setNewProjectCategory(e.target.value)} 
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button 
                  onClick={handleCreateProject} 
                  disabled={isCreating || !newProjectTitle.trim()}
                >
                  {isCreating ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    'Create Project'
                  )}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Projects Grid/List */}
      {projects.length === 0 ? (
        <div className="text-center py-12">
          <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">No projects yet</h3>
          <p className="text-muted-foreground mb-4">Create your first project to get started with content management.</p>
          <Button onClick={() => setIsCreateDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Create Your First Project
          </Button>
        </div>
      ) : (
        <div className={viewMode === "grid" 
          ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
          : "space-y-4"
        }>
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} viewMode={viewMode} />
          ))}
        </div>
      )}
    </div>
  );
};
export default ProjectsGrid;