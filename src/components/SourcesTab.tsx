import { Plus, Youtube, Globe, Trash2, Settings } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";

const SourcesTab = () => {
  const sources = [
    {
      id: 1,
      name: "TechCrunch",
      type: "RSS Feed",
      url: "https://techcrunch.com/feed/",
      status: "active",
      icon: Globe,
      lastCrawled: "2 hours ago"
    },
    {
      id: 2,
      name: "Marques Brownlee",
      type: "YouTube Channel",
      url: "https://youtube.com/@MKBHD",
      status: "active",
      icon: Youtube,
      lastCrawled: "4 hours ago"
    },
    {
      id: 3,
      name: "Lex Fridman",
      type: "YouTube Channel", 
      url: "https://youtube.com/@lexfridman",
      status: "paused",
      icon: Youtube,
      lastCrawled: "1 day ago"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Sources</h2>
          <p className="text-muted-foreground">Connect your trusted sources for trend discovery and research</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Source
        </Button>
      </div>

      {/* Add New Source */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Connect New Source</CardTitle>
          <CardDescription>Add YouTube channels, RSS feeds, or websites to monitor</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input placeholder="Enter YouTube channel URL or RSS feed..." className="flex-1" />
            <Button>Connect</Button>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Youtube className="h-4 w-4" />
              YouTube
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              RSS Feed
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Connected Sources */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Connected Sources ({sources.length})</h3>
        <div className="grid gap-4">
          {sources.map((source) => (
            <Card key={source.id} className="transition-colors hover:bg-muted/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                      <source.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">{source.name}</h4>
                        <Badge variant={source.status === "active" ? "default" : "secondary"}>
                          {source.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{source.type} • Last crawled {source.lastCrawled}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch checked={source.status === "active"} />
                    <Button variant="ghost" size="icon">
                      <Settings className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SourcesTab;