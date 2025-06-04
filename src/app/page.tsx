import CourseCards from "@/components/courseCard";
import SidebarDashboard from "@/components/sidebar-dashboard";
import StatisticsDashboard from "@/components/statistics-dashboard";

export default function Home() {
  return (
    <>
    <main className="min-h-screen bg-gray-50 py-8">
      <StatisticsDashboard />
      <CourseCards />
      <SidebarDashboard />
    </main>
    </>
  );
}
