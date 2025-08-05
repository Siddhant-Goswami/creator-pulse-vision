import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronRight, Clock, FileText, TrendingUp } from "lucide-react";

const UsageStats = () => {
  const stats = [
    {
      title: "Drafts Accepted",
      value: "127",
      change: "+12%",
      description: "This month",
      icon: FileText,
    },
    {
      title: "Avg Research Time",
      value: "18 min",
      change: "-67%",
      description: "Per accepted draft",
      icon: Clock,
    },
    {
      title: "Views Uplift",
      value: "23.5K",
      change: "+8.2%",
      description: "From AI topics",
      icon: TrendingUp,
    },
    {
      title: "Acceptance Rate",
      value: "84%",
      change: "+5%",
      description: "Last 30 days",
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
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-medium ${
                    isPositive ? 'text-success' : 
                    isNegative ? 'text-success' : 
                    'text-muted-foreground'
                  }`}>
                    {stat.change}
                  </span>
                  <span className="text-xs text-muted-foreground">{stat.description}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default UsageStats;