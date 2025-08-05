import { MoreHorizontal, ExternalLink, GitBranch, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface ProjectCardProps {
  name: string;
  url: string;
  lastUpdate: string;
  status: "ready" | "building" | "error";
  repo?: string;
  branch?: string;
  description?: string;
}

const ProjectCard = ({ name, url, lastUpdate, status, repo, branch, description }: ProjectCardProps) => {
  const getStatusColor = () => {
    switch (status) {
      case "ready":
        return "bg-success text-white";
      case "building":
        return "bg-warning text-white";
      case "error":
        return "bg-error text-white";
      default:
        return "bg-muted";
    }
  };

  const getStatusText = () => {
    switch (status) {
      case "ready":
        return "Ready";
      case "building":
        return "Building";
      case "error":
        return "Error";
      default:
        return "Unknown";
    }
  };

  return (
    <Card className="group border-vercel-border hover:border-border transition-colors">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-3 flex-1">
            {/* Project Name and URL */}
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <Avatar className="h-5 w-5">
                  <AvatarFallback className="text-xs bg-muted">
                    {name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <h3 className="font-semibold text-foreground">{name}</h3>
                <Button variant="ghost" size="icon" className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ExternalLink className="h-3 w-3" />
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">{url}</p>
            </div>

            {/* Description */}
            {description && (
              <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
            )}

            {/* Repository Info */}
            {repo && (
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <GitBranch className="h-3 w-3" />
                  <span>{repo}</span>
                </div>
                {branch && (
                  <div className="flex items-center space-x-1">
                    <span>on</span>
                    <Badge variant="outline" className="text-xs">
                      {branch}
                    </Badge>
                  </div>
                )}
              </div>
            )}

            {/* Last Update */}
            <div className="flex items-center space-x-1 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              <span>{lastUpdate}</span>
            </div>
          </div>

          {/* Status and Actions */}
          <div className="flex items-center space-x-2">
            <Badge className={getStatusColor()}>
              {getStatusText()}
            </Badge>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>View Deployment</DropdownMenuItem>
                <DropdownMenuItem>View Function Logs</DropdownMenuItem>
                <DropdownMenuItem>View Source</DropdownMenuItem>
                <DropdownMenuItem>Visit Project</DropdownMenuItem>
                <DropdownMenuItem>Redeploy</DropdownMenuItem>
                <DropdownMenuItem className="text-destructive">
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;