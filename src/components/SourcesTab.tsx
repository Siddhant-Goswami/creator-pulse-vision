import { useState } from "react";
import { Plus, Youtube, Globe, Trash2, Settings, Rss, Twitter, AlertCircle, Loader2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useSources } from "@/hooks/use-sources";
import { CreateSourceData } from "@/lib/api-client";
const SourcesTab = () => {
  const { sources, loading, error, addSource, updateSourceStatus, removeSource } = useSources();
  const [newSourceUrl, setNewSourceUrl] = useState("");
  const [newSourceName, setNewSourceName] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const getSourceIcon = (type: string, icon: string) => {
    switch (icon) {
      case 'youtube': return Youtube;
      case 'rss': return Rss;
      case 'twitter': return Twitter;
      default: return Globe;
    }
  };

  const toggleSourceStatus = async (id: number) => {
    const source = sources.find(s => s.id === id);
    if (!source) return;
    
    const newStatus = source.status === "active" ? "paused" : "active";
    try {
      await updateSourceStatus(id, newStatus);
    } catch (err) {
      console.error('Failed to update source status:', err);
    }
  };

  const deleteSource = async (id: number) => {
    try {
      await removeSource(id);
    } catch (err) {
      console.error('Failed to delete source:', err);
    }
  };

  const getSourceType = (url: string): CreateSourceData['type'] => {
    if (url.includes("youtube.com") || url.includes("youtu.be")) {
      return "YouTube";
    } else if (url.includes("twitter.com") || url.includes("x.com")) {
      return "Twitter";
    } else if (url.includes("/feed") || url.includes(".xml") || url.includes("/rss")) {
      return "RSS";
    } else {
      return "Blog";
    }
  };

  const addNewSource = async () => {
    if (!newSourceUrl.trim()) return;
    
    setIsSubmitting(true);
    try {
      const sourceType = getSourceType(newSourceUrl);
      const sourceData: CreateSourceData = {
        url: newSourceUrl,
        type: sourceType,
        ...(newSourceName.trim() && { name: newSourceName.trim() })
      };
      
      await addSource(sourceData);
      setNewSourceUrl("");
      setNewSourceName("");
      setIsDialogOpen(false);
    } catch (err) {
      console.error('Failed to add source:', err);
    } finally {
      setIsSubmitting(false);
    }
  };
  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading sources...</span>
      </div>
    );
  }

  return <div className="space-y-6">
      {/* Error Alert */}
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Sources</h2>
          <p className="text-muted-foreground">Connect your trusted sources for trend discovery and research</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Source
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Source</DialogTitle>
              <DialogDescription>
                Connect a YouTube channel, RSS feed, Twitter account, or blog to monitor for trends and content ideas.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Input 
                  placeholder="Source name (optional)" 
                  value={newSourceName} 
                  onChange={e => setNewSourceName(e.target.value)} 
                />
                <Input 
                  placeholder="Enter YouTube channel URL, RSS feed, or Twitter URL..." 
                  value={newSourceUrl} 
                  onChange={e => setNewSourceUrl(e.target.value)} 
                />
              </div>
              <div className="flex justify-between">
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex items-center gap-2" onClick={() => setNewSourceUrl("https://youtube.com/@")}>
                    <Youtube className="h-4 w-4" />
                    YouTube
                  </Button>
                  <Button variant="outline" size="sm" className="flex items-center gap-2" onClick={() => setNewSourceUrl("https://example.com/feed.xml")}>
                    <Rss className="h-4 w-4" />
                    RSS Feed
                  </Button>
                  <Button variant="outline" size="sm" className="flex items-center gap-2" onClick={() => setNewSourceUrl("https://twitter.com/")}>
                    <Twitter className="h-4 w-4" />
                    Twitter
                  </Button>
                </div>
                <Button onClick={addNewSource} disabled={isSubmitting || !newSourceUrl.trim()}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Adding...
                    </>
                  ) : (
                    'Connect'
                  )}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Connected Sources */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Connected Sources ({sources.length})</h3>
        {sources.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <Globe className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No sources connected</h3>
              <p className="text-muted-foreground mb-4">Start by adding your first source to monitor for trends and content ideas.</p>
              <Button onClick={() => setIsDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Source
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {sources.map(source => {
              const IconComponent = getSourceIcon(source.type, source.icon);
              const formatRelativeTime = (dateString: string) => {
                const date = new Date(dateString);
                const now = new Date();
                const diffInMs = now.getTime() - date.getTime();
                const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
                const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
                const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
                
                if (diffInMinutes < 60) {
                  return `${diffInMinutes} minutes ago`;
                } else if (diffInHours < 24) {
                  return `${diffInHours} hours ago`;
                } else if (diffInDays < 7) {
                  return `${diffInDays} days ago`;
                } else {
                  return date.toLocaleDateString();
                }
              };

              const lastCrawledText = source.lastCrawled 
                ? formatRelativeTime(source.lastCrawled)
                : 'Never';
              
              return (
                <Card key={source.id} className="transition-colors hover:bg-muted/50">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                          <IconComponent className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium">{source.name}</h4>
                            <Badge variant={source.status === "active" ? "default" : source.status === "error" ? "destructive" : "secondary"}>
                              {source.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {source.type} • Last crawled {lastCrawledText}
                          </p>
                          <p className="text-xs text-muted-foreground/70 truncate max-w-md">
                            {source.url}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch 
                          checked={source.status === "active"} 
                          onCheckedChange={() => toggleSourceStatus(source.id)} 
                          disabled={source.status === "error"}
                        />
                        <Button variant="ghost" size="icon">
                          <Settings className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => deleteSource(source.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>;
};
export default SourcesTab;