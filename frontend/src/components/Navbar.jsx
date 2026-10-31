
import { Bell, WifiOff } from "lucide-react";

function Navbar() {
  return (
    <header className="h-20 bg-white border-b border-slate-200 px-8 flex items-center justify-between">
      <div>
        <h2 className="text-xl font-bold text-slate-800">
          UPI Offline Mesh Dashboard
        </h2>

        <p className="text-sm text-slate-500">
          Manage your offline payment network
        </p>
      </div>

      <div className="flex items-center gap-5">
        <div className="flex items-center gap-2 text-sm text-green-600">
          <WifiOff size={18} />
          Offline Mode
        </div>

        <Bell size={20} className="text-slate-600" />

        <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
          U
        </div>
      </div>
    </header>
  );
}

export default Navbar;
