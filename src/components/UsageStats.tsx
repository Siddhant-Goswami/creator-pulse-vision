import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronRight, Clock, FileText, TrendingUp } from "lucide-react";

const UsageStats = () => {
  const stats = [
    {
      title: "Draft Requests",
      value: "42 / 100",
      description: "Updated just now",
      icon: FileText,
    },
    {
      title: "Research Time Saved",
      value: "15.2 hrs",
      description: "This month",
      icon: Clock,
    },
    {
      title: "Acceptance Rate",
      value: "87%",
      description: "Avg. draft acceptance",
      icon: TrendingUp,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Usage</h2>
        <Badge variant="outline" className="bg-warning/10 text-warning border-warning/20">
          Upgrade
        </Badge>
      </div>

      <div className="space-y-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="border-vercel-border">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-muted rounded-md">
                      <Icon className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{stat.title}</p>
                      <p className="text-xs text-muted-foreground">{stat.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold">{stat.value}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="border-vercel-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium">Recent Previews</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-3">
              <FileText className="h-6 w-6 text-muted-foreground" />
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Draft previews that you have recently generated will appear here.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UsageStats;