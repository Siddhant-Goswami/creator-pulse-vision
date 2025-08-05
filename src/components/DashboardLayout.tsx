import { ReactNode } from "react";
import Navigation from "./Navigation";

interface DashboardLayoutProps {
  children: ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const DashboardLayout = ({ children, activeTab, onTabChange }: DashboardLayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation activeTab={activeTab} onTabChange={onTabChange} />
      <main className="p-6">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;