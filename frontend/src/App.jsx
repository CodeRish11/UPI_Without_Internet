import { BrowserRouter, Routes, Route } from "react-router-dom";

import DashboardLayout from "./layouts/DashboardLayout";

import Dashboard from "./pages/Dashboard";
import SendMoney from "./pages/SendMoney";
import Transactions from "./pages/Transactions";
import Accounts from "./pages/Accounts";
import MeshMonitor from "./pages/MeshMonitor";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="send-money" element={<SendMoney />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="accounts" element={<Accounts />} />
          <Route path="mesh-monitor" element={<MeshMonitor />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;