import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ChevronRight, Clock, FileText, TrendingUp, AlertCircle, Loader2 } from "lucide-react";
import { useUsageStats } from "@/hooks/use-stats";

const UsageStats = () => {
  const { stats, loading, error } = useUsageStats();

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading statistics...</span>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (!stats) {
    return null;
  }

  const displayStats = [
    {
      title: "Topics Accepted",
      value: stats.topicsAccepted.value.toString(),
      change: stats.topicsAccepted.change,
      icon: FileText,
    },
    {
      title: "Avg Views Uplift",
      value: stats.avgViewsUplift.value,
      change: stats.avgViewsUplift.change,
      icon: TrendingUp,
    },
    {
      title: "Research Time Saved",
      value: stats.researchTimeSaved.value,
      change: stats.researchTimeSaved.change,
      icon: Clock,
    },
    {
      title: "Total Views",
      value: stats.totalViews.value,
      change: stats.totalViews.change,
      icon: TrendingUp,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {displayStats.map((stat, index) => {
        const Icon = stat.icon;
        const isPositive = stat.change.startsWith('+');
        const isNegative = stat.change.startsWith('-');
        
        return (
          <Card key={index} className="border-vercel-border bg-white hover:border-primary transition-colors">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold">{stat.value}</p>
                <span className="text-xs text-muted-foreground">{stat.change}</span>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default UsageStats;