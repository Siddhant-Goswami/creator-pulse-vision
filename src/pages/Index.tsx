import DashboardLayout from "@/components/DashboardLayout";
import ProjectsGrid from "@/components/ProjectsGrid";
import UsageStats from "@/components/UsageStats";

const Index = () => {
  return (
    <DashboardLayout>
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
    </DashboardLayout>
  );
};

export default Index;
