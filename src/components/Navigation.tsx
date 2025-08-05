import { Search, ChevronDown, Bell, User, Settings } from "lucide-react";
import logo from "@/assets/logo.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Navigation = ({ activeTab, onTabChange }: NavigationProps) => {
  return (
    <nav className="border-b border-vercel-border bg-background">
      <div className="flex h-16 items-center px-6">
        {/* Logo and Team Selector */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="h-6 w-6 rounded bg-foreground flex items-center justify-center">
              <span className="text-sm font-bold text-background">▲</span>
            </div>
            <span className="text-lg font-semibold">CreatorPulse</span>
          </div>
          
          <div className="h-6 w-px bg-vercel-border" />
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center space-x-2 text-sm">
                <span>Siddhant Goswami's projects</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem>Siddhant Goswami's projects</DropdownMenuItem>
              <DropdownMenuItem>Switch Team</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Create Team</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Navigation Links */}
        <div className="flex items-center space-x-6 ml-8">
          <Button 
            variant="ghost" 
            className={`text-sm ${activeTab === 'overview' ? 'font-medium text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
            onClick={() => onTabChange('overview')}
          >
            Overview
          </Button>
          <Button 
            variant="ghost" 
            className={`text-sm ${activeTab === 'sources' ? 'font-medium text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
            onClick={() => onTabChange('sources')}
          >
            Sources
          </Button>
          <Button 
            variant="ghost" 
            className={`text-sm ${activeTab === 'delivery' ? 'font-medium text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
            onClick={() => onTabChange('delivery')}
          >
            Delivery
          </Button>
          <Button 
            variant="ghost" 
            className={`text-sm ${activeTab === 'analytics' ? 'font-medium text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
            onClick={() => onTabChange('analytics')}
          >
            Analytics
          </Button>
          <Button 
            variant="ghost" 
            className={`text-sm ${activeTab === 'settings' ? 'font-medium text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
            onClick={() => onTabChange('settings')}
          >
            Settings
          </Button>
        </div>

        {/* Right side */}
        <div className="ml-auto flex items-center space-x-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search..."
              className="w-64 pl-9 bg-muted/50 border-vercel-border"
            />
            <kbd className="absolute right-3 top-1/2 -translate-y-1/2 rounded border bg-muted px-1.5 py-0.5 text-xs text-muted-foreground">
              ⌘K
            </kbd>
          </div>

          {/* Feedback */}
          <Button variant="ghost" size="sm" className="text-sm text-muted-foreground">
            Feedback
          </Button>

          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-4 w-4" />
            <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-vercel-blue"></span>
          </Button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center space-x-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback>CP</AvatarFallback>
                </Avatar>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Sign out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;