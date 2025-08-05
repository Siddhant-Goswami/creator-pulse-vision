import { TrendingUp, Eye, Clock, CheckCircle, BarChart3, Calendar } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
const AnalyticsTab = () => {
  const topicsData = [{
    id: 1,
    topic: "AI Video Generation Tools",
    suggestedDate: "2024-01-15",
    status: "published",
    views: 156000,
    uplift: "+34%",
    engagement: "8.2%"
  }, {
    id: 2,
    topic: "Meta's New AR Glasses",
    suggestedDate: "2024-01-12",
    status: "published",
    views: 89000,
    uplift: "+12%",
    engagement: "6.7%"
  }, {
    id: 3,
    topic: "GitHub Copilot Updates",
    suggestedDate: "2024-01-10",
    status: "rejected",
    views: 0,
    uplift: "N/A",
    engagement: "N/A"
  }, {
    id: 4,
    topic: "Tesla FSD Beta Review",
    suggestedDate: "2024-01-08",
    status: "published",
    views: 234000,
    uplift: "+67%",
    engagement: "9.1%"
  }];
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
  return <div className="space-y-6">
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
              
              <SelectItem value="90">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Topics Accepted</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Views Uplift</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+28%</div>
            <p className="text-xs text-muted-foreground">vs your baseline</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Research Time Saved</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.2h</div>
            <p className="text-xs text-muted-foreground">per accepted topic</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1.2M</div>
            <p className="text-xs text-muted-foreground">from suggested topics</p>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Tabs */}
      <Tabs defaultValue="topics" className="space-y-4">
        <TabsList>
          <TabsTrigger value="topics">Topic Performance</TabsTrigger>
          <TabsTrigger value="trends">Trend Analysis</TabsTrigger>
          <TabsTrigger value="efficiency">Efficiency Metrics</TabsTrigger>
        </TabsList>

        <TabsContent value="topics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Suggested Topics Performance</CardTitle>
              <CardDescription>Track how your published videos performed compared to your baseline</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topicsData.map(topic => <div key={topic.id} className="flex items-center justify-between p-4 border rounded-lg">
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
                  </div>)}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Trend Success Rate</CardTitle>
              <CardDescription>How well our trend predictions performed</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center text-muted-foreground">
                <div className="text-center">
                  <BarChart3 className="h-8 w-8 mx-auto mb-2" />
                  <p>Trend analysis chart would go here</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="efficiency" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Efficiency Metrics</CardTitle>
              <CardDescription>Time savings and productivity improvements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="h-4 w-4" />
                      <h4 className="font-medium">Research Time</h4>
                    </div>
                    <p className="text-2xl font-bold">4.2 hours</p>
                    <p className="text-sm text-muted-foreground">Average saved per topic</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="h-4 w-4" />
                      <h4 className="font-medium">Publishing Frequency</h4>
                    </div>
                    <p className="text-2xl font-bold">2.3x</p>
                    <p className="text-sm text-muted-foreground">Increase since using CreatorPulse</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>;
};
export default AnalyticsTab;