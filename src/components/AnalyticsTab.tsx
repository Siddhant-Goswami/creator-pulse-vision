import { Globe, Shield, AlertTriangle, MessageSquare, Code, Ban } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';

const AnalyticsTab = () => {
  // Sample chart data
  const chartData = [
    { time: '19:21:00', value: 2 },
    { time: '19:26:00', value: 1 },
    { time: '19:31:00', value: 0 },
    { time: '19:36:00', value: 3 },
    { time: '19:41:00', value: 1 },
    { time: '19:46:00', value: 0 },
    { time: '19:51:00', value: 2 },
    { time: '19:56:00', value: 95 },
    { time: '20:01:00', value: 1 },
    { time: '20:06:00', value: 0 },
    { time: '20:11:00', value: 2 },
    { time: '20:16:00', value: 4 },
    { time: '20:21:00', value: 1 },
  ];

  const systemActivities = [
    {
      id: 1,
      name: "Allowed Requests",
      action: "allow",
      color: "bg-blue-500",
      count: 0
    },
    {
      id: 2,
      name: "DDoS Mitigation",
      action: "deny",
      color: "bg-green-500",
      count: 0
    },
    {
      id: 3,
      name: "BotID",
      action: "allow",
      color: "bg-purple-500",
      count: 0
    },
    {
      id: 4,
      name: "Challenge Mode",
      action: "challenge",
      color: "bg-orange-500",
      count: 0
    },
    {
      id: 5,
      name: "IP Blocking",
      action: "deny",
      color: "bg-teal-500",
      count: 0
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-blue-500" />
            <span className="text-sm">Firewall is active</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-gray-400" />
            <span className="text-sm">Enable Bot Protection</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Select defaultValue="overview">
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="overview">Overview</SelectItem>
              <SelectItem value="detailed">Detailed</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="category">
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="category">Group by Category</SelectItem>
              <SelectItem value="type">Group by Type</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="hour">
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="hour">Past Hour</SelectItem>
              <SelectItem value="day">Past Day</SelectItem>
              <SelectItem value="week">Past Week</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-6">
        <Card className="hover:border-primary transition-colors">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Globe className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">All Traffic</p>
                <p className="text-2xl font-bold">212</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:border-primary transition-colors">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Shield className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm text-muted-foreground">Allowed</p>
                <p className="text-2xl font-bold">114</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:border-primary transition-colors">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Ban className="h-5 w-5 text-red-600" />
              <div>
                <p className="text-sm text-muted-foreground">Denied</p>
                <p className="text-2xl font-bold">98</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:border-primary transition-colors">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-5 w-5 text-orange-600" />
              <div>
                <p className="text-sm text-muted-foreground">Challenged</p>
                <p className="text-2xl font-bold">-</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:border-primary transition-colors">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Code className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm text-muted-foreground">Logged</p>
                <p className="text-2xl font-bold">-</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:border-primary transition-colors">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <MessageSquare className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-muted-foreground">Rate Limited</p>
                <p className="text-2xl font-bold">-</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Chart */}
      <Card>
        <CardContent className="p-6">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <XAxis 
                  dataKey="time" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#6b7280' }}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#6b7280' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* System Activities */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">System</h3>
        <div className="space-y-2">
          {systemActivities.map((activity) => (
            <div key={activity.id} className="flex items-center justify-between p-3 border rounded-lg hover:border-primary transition-colors">
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${activity.color}`}></div>
                <span className="font-medium">{activity.name}</span>
                <span className="text-sm text-muted-foreground">{activity.action}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm">{activity.count}</span>
                <button className="text-muted-foreground hover:text-foreground">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="1"></circle>
                    <circle cx="19" cy="12" r="1"></circle>
                    <circle cx="5" cy="12" r="1"></circle>
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsTab;