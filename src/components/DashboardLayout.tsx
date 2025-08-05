import { ReactNode } from "react";
import Navigation from "./Navigation";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="p-6">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;