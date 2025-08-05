import { ChevronDown, User, Settings } from "lucide-react";
import logo from "@/assets/logo.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}
const Navigation = ({
  activeTab,
  onTabChange
}: NavigationProps) => {
  return <nav className="border-b border-vercel-border bg-white">
      <div className="flex h-16 items-center px-6">
        {/* Logo and Team Selector */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="h-6 w-6 rounded bg-foreground flex items-center justify-center">
              <span className="text-sm font-bold text-background">▲</span>
            </div>
            <span className="text-lg font-semibold">Cyber Monk</span>
          </div>
          
          <div className="h-6 w-px bg-vercel-border" />
          
        </div>

        {/* Navigation Links */}
        <div className="flex items-center space-x-6 ml-8">
          <Button variant="ghost" className={`text-sm ${activeTab === 'overview' ? 'font-medium text-foreground' : 'text-muted-foreground hover:text-foreground'}`} onClick={() => onTabChange('overview')}>
            Overview
          </Button>
          <Button variant="ghost" className={`text-sm ${activeTab === 'sources' ? 'font-medium text-foreground' : 'text-muted-foreground hover:text-foreground'}`} onClick={() => onTabChange('sources')}>
            Sources
          </Button>
          <Button variant="ghost" className={`text-sm ${activeTab === 'delivery' ? 'font-medium text-foreground' : 'text-muted-foreground hover:text-foreground'}`} onClick={() => onTabChange('delivery')}>
            Delivery
          </Button>
          <Button variant="ghost" className={`text-sm ${activeTab === 'analytics' ? 'font-medium text-foreground' : 'text-muted-foreground hover:text-foreground'}`} onClick={() => onTabChange('analytics')}>
            Analytics
          </Button>
        </div>

        {/* Right side */}
        <div className="ml-auto flex items-center space-x-4">
          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center space-x-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=100&h=100&fit=crop&crop=face" />
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
    </nav>;
};
export default Navigation;