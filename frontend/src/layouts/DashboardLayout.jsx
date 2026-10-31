import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

function DashboardLayout() {
  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />

      <div className="flex-1 min-w-0">
        <Navbar />

        <main className="p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;