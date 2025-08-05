import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import ProjectsGrid from "@/components/ProjectsGrid";
import UsageStats from "@/components/UsageStats";
import SourcesTab from "@/components/SourcesTab";
import DeliveryTab from "@/components/DeliveryTab";
import AnalyticsTab from "@/components/AnalyticsTab";
import SettingsTab from "@/components/SettingsTab";

const Index = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'sources':
        return (
          <div className="max-w-7xl mx-auto">
            <SourcesTab />
          </div>
        );
      case 'delivery':
        return (
          <div className="max-w-7xl mx-auto">
            <DeliveryTab />
          </div>
        );
      case 'analytics':
        return (
          <div className="max-w-7xl mx-auto">
            <AnalyticsTab />
          </div>
        );
      case 'settings':
        return (
          <div className="max-w-7xl mx-auto">
            <SettingsTab />
          </div>
        );
      default:
        return (
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Left sidebar - Usage Stats */}
              <div className="lg:col-span-1">
                <UsageStats />
              </div>
              
              {/* Main content - Projects Grid */}
              <div className="lg:col-span-3">
                <ProjectsGrid />
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <DashboardLayout activeTab={activeTab} onTabChange={setActiveTab}>
      {renderTabContent()}
    </DashboardLayout>
  );
};

export default Index;
