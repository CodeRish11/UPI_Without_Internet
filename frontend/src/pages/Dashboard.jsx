
import { useEffect, useState } from "react";
import {
  RefreshCw,
  ArrowLeftRight,
  CheckCircle,
  XCircle,
  Users,
  Wifi,
  WifiOff,
  Wallet,
} from "lucide-react";

import api from "../services/api";

function Dashboard() {
  const [accounts, setAccounts] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [mesh, setMesh] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError("");

      const [accountsRes, transactionsRes, meshRes] =
        await Promise.all([
          api.get("/accounts"),
          api.get("/transactions"),
          api.get("/mesh/state"),
        ]);

      setAccounts(accountsRes.data);
      setTransactions(transactionsRes.data);
      setMesh(meshRes.data);

    } catch (err) {
      console.error("Dashboard API error:", err);
      setError("Unable to load dashboard data. Check backend connection.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  // Calculate transaction statistics from the returned records
  const settledCount = transactions.filter(
    (item) => item.status === "SETTLED"
  ).length;

  const rejectedCount = transactions.filter(
    (item) => item.status === "REJECTED"
  ).length;

  const devices = mesh?.devices || [];

  const onlineDevices = devices.filter(
    (device) => device.hasInternet
  ).length;

  const totalBalance = accounts.reduce(
    (total, account) => total + Number(account.balance || 0),
    0
  );

  const stats = [
    {
      title: "Recent Transactions Loaded",
      value: transactions.length,
      icon: ArrowLeftRight,
      color: "text-blue-600",
      bg: "bg-blue-100",
    },
    {
      title: "Settled Payments",
      value: settledCount,
      icon: CheckCircle,
      color: "text-green-600",
      bg: "bg-green-100",
    },
    {
      title: "Rejected Payments",
      value: rejectedCount,
      icon: XCircle,
      color: "text-red-600",
      bg: "bg-red-100",
    },
    {
      title: "Total Accounts",
      value: accounts.length,
      icon: Users,
      color: "text-purple-600",
      bg: "bg-purple-100",
    },
  ];

  return (
    <div>
      {/* Heading */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Dashboard Overview
          </h1>

          <p className="text-slate-500 mt-2">
            Monitor your offline payment network.
          </p>
        </div>

        <button
          onClick={fetchDashboardData}
          disabled={loading}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          <RefreshCw size={18} />
          Refresh
        </button>
      </div>

      {/* Loading */}
      {loading && (
        <p className="text-slate-500 mb-6">
          Loading dashboard data...
        </p>
      )}

      {/* Error */}
      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-6">
          {error}
        </div>
      )}

      {!loading && !error && (
        <>
          {/* Statistics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
            {stats.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="bg-white rounded-xl border border-slate-200 shadow-sm p-6"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-slate-500">
                      {item.title}
                    </p>

                    <div className={`${item.bg} ${item.color} p-3 rounded-lg`}>
                      <Icon size={22} />
                    </div>
                  </div>

                  <h2 className="text-3xl font-bold text-slate-800 mt-4">
                    {item.value}
                  </h2>
                </div>
              );
            })}
          </div>

          {/* Balance and Network Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
              <div className="flex items-center gap-3">
                <Wallet className="text-green-600" size={25} />

                <p className="text-slate-500">
                  Combined Account Balance
                </p>
              </div>

              <h2 className="text-3xl font-bold text-slate-800 mt-4">
                ₹{totalBalance.toLocaleString("en-IN")}
              </h2>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
              <div className="flex items-center gap-3">
                {onlineDevices > 0 ? (
                  <Wifi className="text-green-600" size={25} />
                ) : (
                  <WifiOff className="text-orange-600" size={25} />
                )}

                <p className="text-slate-500">
                  Online Devices
                </p>
              </div>

              <h2 className="text-3xl font-bold text-slate-800 mt-4">
                {onlineDevices} / {devices.length}
              </h2>
            </div>

          </div>

          {/* Recent Transactions */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">

            <div className="p-6 border-b border-slate-200">
              <h2 className="text-lg font-bold text-slate-800">
                Recent Transactions
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                Latest records returned by the backend.
              </p>
            </div>

            {transactions.length === 0 ? (
              <p className="p-6 text-slate-500">
                No transactions found.
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left">

                  <thead className="bg-slate-50 text-slate-500 text-sm">
                    <tr>
                      <th className="p-4">ID</th>
                      <th className="p-4">Sender</th>
                      <th className="p-4">Receiver</th>
                      <th className="p-4">Amount</th>
                      <th className="p-4">Status</th>
                    </tr>
                  </thead>

                  <tbody>
                    {transactions.slice(0, 5).map((item) => (
                      <tr
                        key={item.id}
                        className="border-t border-slate-100"
                      >
                        <td className="p-4 text-slate-600">
                          {item.id}
                        </td>

                        <td className="p-4 text-slate-700">
                          {item.senderVpa}
                        </td>

                        <td className="p-4 text-slate-700">
                          {item.receiverVpa}
                        </td>

                        <td className="p-4 font-semibold text-slate-800">
                          ₹{Number(item.amount).toLocaleString("en-IN")}
                        </td>

                        <td className="p-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              item.status === "SETTLED"
                                ? "bg-green-100 text-green-700"
                                : item.status === "REJECTED"
                                ? "bg-red-100 text-red-700"
                                : "bg-orange-100 text-orange-700"
                            }`}
                          >
                            {item.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>

                </table>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Dashboard;
