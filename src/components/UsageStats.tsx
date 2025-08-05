import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronRight, Clock, FileText, TrendingUp } from "lucide-react";

const UsageStats = () => {
  const stats = [
    {
      title: "Topics Accepted",
      value: "18",
      change: "+2 from last month",
      description: "",
      icon: FileText,
    },
    {
      title: "Avg Views Uplift",
      value: "+28%",
      change: "vs your baseline",
      description: "",
      icon: TrendingUp,
    },
    {
      title: "Research Time Saved",
      value: "4.2h",
      change: "per accepted topic",
      description: "",
      icon: Clock,
    },
    {
      title: "Total Views",
      value: "1.2M",
      change: "from suggested topics",
      description: "",
      icon: TrendingUp,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        const isPositive = stat.change.startsWith('+');
        const isNegative = stat.change.startsWith('-');
        
        return (
          <Card key={index} className="border-vercel-border">
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