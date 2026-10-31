
import {
  LayoutDashboard,
  Send,
  ArrowLeftRight,
  Users,
  Network,
  Wallet,
} from "lucide-react";

import { NavLink } from "react-router-dom";

function Sidebar() {
  const menuItems = [
    { name: "Dashboard", path: "/", icon: LayoutDashboard },
    { name: "Send Money", path: "/send-money", icon: Send },
    { name: "Transactions", path: "/transactions", icon: ArrowLeftRight },
    { name: "Accounts", path: "/accounts", icon: Users },
    { name: "Mesh Monitor", path: "/mesh-monitor", icon: Network },
  ];

  return (
    <aside className="w-64 shrink-0 min-h-screen bg-slate-950 text-white p-5">

      <div className="flex items-center gap-3 mb-10">
        <div className="bg-blue-600 p-2 rounded-lg">
          <Wallet size={24} />
        </div>

        <div>
          <h1 className="text-lg font-bold">UPI Mesh</h1>
          <p className="text-xs text-slate-400">Offline Payments</p>
        </div>
      </div>

      <p className="text-xs text-slate-500 uppercase mb-4">
        Main Menu
      </p>

      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-slate-300 hover:bg-slate-800"
                }`
              }
            >
              <Icon size={20} />
              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="mt-12 p-4 bg-slate-900 rounded-xl">
        <p className="text-sm font-semibold">Network Status</p>
        <p className="text-xs text-green-400 mt-2">
          ● Mesh System Active
        </p>
      </div>

    </aside>
  );
}

export default Sidebar;
