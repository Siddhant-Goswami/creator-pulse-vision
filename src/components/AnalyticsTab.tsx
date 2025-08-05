import { TrendingUp, Eye, Clock, CheckCircle, ArrowUpRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

const AnalyticsTab = () => {
  const chartData = [
    { name: 'Jan', views: 45000, engagement: 6.2 },
    { name: 'Feb', views: 52000, engagement: 7.1 },
    { name: 'Mar', views: 78000, engagement: 8.5 },
    { name: 'Apr', views: 89000, engagement: 6.7 },
    { name: 'May', views: 124000, engagement: 9.2 },
    { name: 'Jun', views: 156000, engagement: 8.2 },
    { name: 'Jul', views: 234000, engagement: 9.1 },
  ];

  const topicsData = [
    {
      id: 1,
      topic: "AI Video Generation Tools",
      suggestedDate: "2024-01-15",
      status: "published",
      views: 156000,
      uplift: "+34%",
      engagement: "8.2%"
    },
    {
      id: 2,
      topic: "Meta's New AR Glasses",
      suggestedDate: "2024-01-12",
      status: "published",
      views: 89000,
      uplift: "+12%",
      engagement: "6.7%"
    },
    {
      id: 3,
      topic: "GitHub Copilot Updates",
      suggestedDate: "2024-01-10",
      status: "rejected",
      views: 0,
      uplift: "N/A",
      engagement: "N/A"
    },
    {
      id: 4,
      topic: "Tesla FSD Beta Review",
      suggestedDate: "2024-01-08",
      status: "published",
      views: 234000,
      uplift: "+67%",
      engagement: "9.1%"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "published":
        return <Badge className="bg-green-100 text-green-800 border-green-200">Published</Badge>;
      case "rejected":
        return <Badge variant="secondary">Rejected</Badge>;
      default:
        return <Badge variant="outline">Pending</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Analytics</h2>
          <p className="text-muted-foreground">Track performance of CreatorPulse-suggested topics</p>
        </div>
        <div className="flex items-center gap-2">
          <Select defaultValue="30">
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Last 7 days</SelectItem>
              <SelectItem value="30">Last 30 days</SelectItem>
              <SelectItem value="90">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Agent Experience Score */}
        <Card className="p-6">
          <div className="space-y-6 text-center">
            <div className="flex flex-col items-center space-y-4">
              <div className="relative w-20 h-20">
                <svg className="w-20 h-20 -rotate-90" viewBox="0 0 36 36">
                  <circle
                    cx="18"
                    cy="18"
                    r="16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    className="text-muted/20"
                  />
                  <circle
                    cx="18"
                    cy="18"
                    r="16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeDasharray="75.4"
                    strokeDashoffset="15.08"
                    className="text-green-500"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold">85</span>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-2">Agent Experience Score</h3>
                <p className="text-sm text-muted-foreground max-w-sm">
                  Values are estimated and may vary. The <span className="text-blue-600">agent score is calculated</span> directly from these metrics.
                </p>
              </div>
            </div>
            
            {/* Performance Categories */}
            <div className="flex justify-center items-center gap-6 text-xs">
              <span className="flex items-center gap-2">
                <div className="w-0 h-0 border-l-[4px] border-r-[4px] border-b-[6px] border-l-transparent border-r-transparent border-b-red-500"></div>
                0–49
              </span>
              <span className="flex items-center gap-2">
                <div className="w-3 h-3 bg-orange-500"></div>
                50–89
              </span>
              <span className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                90–100
              </span>
            </div>
            
            {/* Metrics */}
            <div className="text-left space-y-4">
              <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">METRICS</h4>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Topic Relevance</p>
                    <p className="text-lg font-bold text-green-600">90</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Engagement Rate</p>
                    <p className="text-lg font-bold text-green-600">82</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-orange-500"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Trend Accuracy</p>
                    <p className="text-lg font-bold text-orange-600">78</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Chart with Metrics */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle>Performance Over Time</CardTitle>
            <CardDescription>Views and engagement from CreatorPulse suggested topics</CardDescription>
            
            {/* Metrics Tabs */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="flex items-center gap-2 p-3 rounded-lg border">
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Topics Accepted</p>
                  <p className="text-lg font-bold">18</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2 p-3 rounded-lg border">
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Avg Views Uplift</p>
                  <p className="text-lg font-bold">+28%</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2 p-3 rounded-lg border">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Research Time Saved</p>
                  <p className="text-lg font-bold">4.2h</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2 p-3 rounded-lg border">
                <Eye className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Total Views</p>
                  <p className="text-lg font-bold">1.2M</p>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis 
                    dataKey="name" 
                    className="text-muted-foreground"
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis 
                    className="text-muted-foreground"
                    tick={{ fontSize: 12 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="views" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2}
                    dot={{ fill: "hsl(var(--primary))", strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Topics Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Topic Performance</CardTitle>
          <CardDescription>Track how your published videos performed compared to your baseline</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topicsData.map((topic) => (
              <div key={topic.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium">{topic.topic}</h4>
                    {getStatusBadge(topic.status)}
                  </div>
                  <p className="text-sm text-muted-foreground">Suggested on {topic.suggestedDate}</p>
                </div>
                <div className="text-right space-y-1">
                  <div className="flex items-center gap-4">
                    <div>
                      <p className="text-sm font-medium">{topic.views.toLocaleString()} views</p>
                      <p className="text-xs text-muted-foreground">Engagement: {topic.engagement}</p>
                    </div>
                    <div className="text-right">
                      <p className={`text-sm font-medium ${topic.uplift.includes('+') ? 'text-green-600' : 'text-muted-foreground'}`}>
                        {topic.uplift}
                      </p>
                      <p className="text-xs text-muted-foreground">vs baseline</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsTab;