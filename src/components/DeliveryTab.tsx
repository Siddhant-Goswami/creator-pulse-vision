import { Clock, Mail, Calendar, FileText, Settings } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

const DeliveryTab = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Delivery Settings</h2>
        <p className="text-muted-foreground">Configure how and when you receive your daily content insights</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Writing Style */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Writing Style Training
            </CardTitle>
            <CardDescription>Upload your best scripts to train the AI</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
              <FileText className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm font-medium">Upload your top 20 scripts</p>
              <p className="text-xs text-muted-foreground mb-3">Drag & drop files or click to browse</p>
              <Button variant="outline" size="sm">Choose Files</Button>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Training Progress</span>
                <span>12/20 scripts uploaded</span>
              </div>
              <div className="h-2 bg-muted rounded-full">
                <div className="h-2 bg-primary rounded-full w-3/5"></div>
              </div>
            </div>

            <Button className="w-full" disabled>
              Train Writing Style (8 more needed)
            </Button>
          </CardContent>
        </Card>

        {/* Schedule Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Delivery Schedule
            </CardTitle>
            <CardDescription>When you want to receive your daily insights</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="delivery-time">Delivery Time</Label>
              <Select defaultValue="10:00">
                <SelectTrigger>
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="06:00">6:00 AM</SelectItem>
                  <SelectItem value="07:00">7:00 AM</SelectItem>
                  <SelectItem value="08:00">8:00 AM</SelectItem>
                  <SelectItem value="09:00">9:00 AM</SelectItem>
                  <SelectItem value="10:00">10:00 AM</SelectItem>
                  <SelectItem value="11:00">11:00 AM</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label>Delivery Days</Label>
              <div className="space-y-2">
                {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
                  <div key={day} className="flex items-center space-x-2">
                    <Checkbox id={day} defaultChecked={!["Saturday", "Sunday"].includes(day)} />
                    <Label htmlFor={day} className="text-sm font-normal">{day}</Label>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Email Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Email Delivery
            </CardTitle>
            <CardDescription>Configure your email preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" defaultValue="siddhant@creatorpulse.ai" />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="email-enabled">Enable Email Delivery</Label>
                <p className="text-sm text-muted-foreground">Receive daily insights via email</p>
              </div>
              <Switch id="email-enabled" defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="backup-email">Backup Notifications</Label>
                <p className="text-sm text-muted-foreground">Send backup if primary fails</p>
              </div>
              <Switch id="backup-email" />
            </div>
          </CardContent>
        </Card>

        {/* Content Format */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Content Format
            </CardTitle>
            <CardDescription>Customize what's included in your daily delivery</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="trends-section">Trends to Watch</Label>
                  <p className="text-sm text-muted-foreground">Top 3 emerging topics</p>
                </div>
                <Switch id="trends-section" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="deep-research">Deep Research Report</Label>
                  <p className="text-sm text-muted-foreground">Detailed analysis of one topic</p>
                </div>
                <Switch id="deep-research" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="script-suggestions">Script Suggestions</Label>
                  <p className="text-sm text-muted-foreground">AI-generated draft ideas</p>
                </div>
                <Switch id="script-suggestions" defaultChecked />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="content-length">Content Length</Label>
              <Select defaultValue="medium">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="brief">Brief (1-2 paragraphs)</SelectItem>
                  <SelectItem value="medium">Medium (3-5 paragraphs)</SelectItem>
                  <SelectItem value="detailed">Detailed (Full report)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DeliveryTab;