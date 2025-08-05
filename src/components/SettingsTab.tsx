import { User, Bell, Shield, CreditCard, Trash2, Download } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

const SettingsTab = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">Manage your account preferences and CreatorPulse configuration</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Profile Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Profile
            </CardTitle>
            <CardDescription>Update your personal information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback>SG</AvatarFallback>
              </Avatar>
              <div>
                <Button variant="outline" size="sm">Change Avatar</Button>
                <p className="text-xs text-muted-foreground mt-1">JPG, PNG up to 2MB</p>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" defaultValue="Siddhant Goswami" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue="siddhant@creatorpulse.ai" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="youtube">YouTube Channel</Label>
              <Input id="youtube" defaultValue="@SiddhantGoswami" />
            </div>

            <Button>Save Changes</Button>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notifications
            </CardTitle>
            <CardDescription>Configure how you receive updates</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="daily-delivery">Daily Delivery</Label>
                <p className="text-sm text-muted-foreground">Receive daily trend insights</p>
              </div>
              <Switch id="daily-delivery" defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="trend-alerts">Breaking Trend Alerts</Label>
                <p className="text-sm text-muted-foreground">Urgent trending topics</p>
              </div>
              <Switch id="trend-alerts" defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="performance-updates">Performance Updates</Label>
                <p className="text-sm text-muted-foreground">Weekly analytics summary</p>
              </div>
              <Switch id="performance-updates" />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="product-updates">Product Updates</Label>
                <p className="text-sm text-muted-foreground">New features and improvements</p>
              </div>
              <Switch id="product-updates" defaultChecked />
            </div>

            <Separator />

            <div className="space-y-2">
              <Label htmlFor="notification-frequency">Notification Frequency</Label>
              <Select defaultValue="immediate">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="immediate">Immediate</SelectItem>
                  <SelectItem value="hourly">Hourly digest</SelectItem>
                  <SelectItem value="daily">Daily digest</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Privacy & Security */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Privacy & Security
            </CardTitle>
            <CardDescription>Manage your data and security preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="analytics-sharing">Share Analytics</Label>
                <p className="text-sm text-muted-foreground">Help improve our recommendations</p>
              </div>
              <Switch id="analytics-sharing" defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="public-profile">Public Profile</Label>
                <p className="text-sm text-muted-foreground">Show in creator directory</p>
              </div>
              <Switch id="public-profile" />
            </div>

            <Separator />

            <div className="space-y-2">
              <Button variant="outline" className="w-full flex items-center gap-2">
                <Download className="h-4 w-4" />
                Export My Data
              </Button>
              <Button variant="outline" className="w-full">
                Change Password
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Subscription */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Subscription
            </CardTitle>
            <CardDescription>Manage your CreatorPulse subscription</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 border rounded-lg bg-muted/50">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">Pro Plan</h4>
                <span className="text-sm text-muted-foreground">$29/month</span>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Unlimited sources, advanced analytics, priority support
              </p>
              <div className="text-xs text-muted-foreground">
                Next billing: January 25, 2024
              </div>
            </div>

            <div className="space-y-2">
              <Button variant="outline" className="w-full">
                Update Payment Method
              </Button>
              <Button variant="outline" className="w-full">
                View Billing History
              </Button>
              <Button variant="outline" className="w-full">
                Cancel Subscription
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Danger Zone */}
      <Card className="border-destructive/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive">
            <Trash2 className="h-5 w-5" />
            Danger Zone
          </CardTitle>
          <CardDescription>Irreversible and destructive actions</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Button variant="destructive" className="w-full">
              Delete All Data
            </Button>
            <Button variant="destructive" className="w-full">
              Delete Account
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            These actions cannot be undone. All your data, settings, and subscription will be permanently removed.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsTab;