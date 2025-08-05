import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import ProjectsGrid from "@/components/ProjectsGrid";
import UsageStats from "@/components/UsageStats";
import SourcesTab from "@/components/SourcesTab";
import DeliveryTab from "@/components/DeliveryTab";
import AnalyticsTab from "@/components/AnalyticsTab";
import SettingsTab from "@/components/SettingsTab";
import { Button } from "@/components/ui/button";
const Index = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const renderTabContent = () => {
    switch (activeTab) {
      case 'sources':
        return <div className="max-w-7xl mx-auto">
            <SourcesTab />
          </div>;
      case 'delivery':
        return <div className="max-w-7xl mx-auto">
            <DeliveryTab />
          </div>;
      case 'analytics':
        return <div className="max-w-7xl mx-auto">
            <AnalyticsTab />
          </div>;
      case 'settings':
        return <div className="max-w-7xl mx-auto">
            <SettingsTab />
          </div>;
      default:
        return <div className="max-w-7xl mx-auto space-y-8">
            {/* Header */}
            <div>
              <h1 className="text-2xl font-semibold text-foreground">Dashboard</h1>
              <p className="text-muted-foreground">Welcome back! Here's what's happening with your content.</p>
            </div>
            
            {/* Stats Grid */}
            <UsageStats />
            
            {/* Content Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Recent Drafts */}
              <div className="lg:col-span-2">
                <ProjectsGrid />
              </div>
              
              {/* Trends to Watch - placeholder for now */}
              <div className="lg:col-span-1">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      📈 Trends to Watch
                    </h3>
                    
                  </div>
                  <div className="space-y-4">
                    {[{
                    title: "AI Tools for Content Creation",
                    growth: "+125%",
                    category: "Technology"
                  }, {
                    title: "Short-form Video Strategies",
                    growth: "+89%",
                    category: "Strategy"
                  }, {
                    title: "Creator Economy Trends",
                    growth: "+67%",
                    category: "Business"
                  }].map((trend, index) => <div key={index} className="p-4 border border-vercel-border rounded-lg hover:bg-muted/50 transition-colors">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-medium text-sm mb-1">{trend.title}</h4>
                            <span className="text-xs text-vercel-blue bg-vercel-blue/10 px-2 py-1 rounded">
                              {trend.category}
                            </span>
                          </div>
                          <span className="text-xs font-medium text-success ml-2">{trend.growth}</span>
                        </div>
                      </div>)}
                  </div>
                </div>
              </div>
            </div>
          </div>;
    }
  };
  return <DashboardLayout activeTab={activeTab} onTabChange={setActiveTab}>
      {renderTabContent()}
    </DashboardLayout>;
};
export default Index;