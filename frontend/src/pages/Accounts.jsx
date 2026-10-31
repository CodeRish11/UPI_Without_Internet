
import { useEffect, useState } from "react";
import { Users, Wallet, RefreshCw } from "lucide-react";
import api from "../services/api";

function Accounts() {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchAccounts = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/accounts");

      setAccounts(response.data);
    } catch (err) {
      console.error("Accounts API error:", err);

      setError("Unable to load accounts. Check backend connection.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  const totalBalance = accounts.reduce(
    (total, account) => total + Number(account.balance || 0),
    0
  );

  return (
    <div>
      {/* Page Heading */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Accounts
          </h1>

          <p className="text-slate-500 mt-2">
            Manage your demo UPI accounts.
          </p>
        </div>

        <button
          onClick={fetchAccounts}
          disabled={loading}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          <RefreshCw size={18} />
          Refresh
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3">
            <Users className="text-blue-600" size={25} />

            <p className="text-slate-500">
              Total Accounts
            </p>
          </div>

          <h2 className="text-3xl font-bold mt-4 text-slate-800">
            {accounts.length}
          </h2>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3">
            <Wallet className="text-green-600" size={25} />

            <p className="text-slate-500">
              Combined Account Balance
            </p>
          </div>

          <h2 className="text-3xl font-bold mt-4 text-slate-800">
            ₹{totalBalance.toLocaleString("en-IN")}
          </h2>
        </div>

      </div>

      {/* Loading */}
      {loading && (
        <p className="text-slate-500">
          Loading accounts...
        </p>
      )}

      {/* Error */}
      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded-lg">
          {error}
        </div>
      )}

      {/* Account Table */}
      {!loading && !error && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">

          <div className="p-6 border-b border-slate-200">
            <h2 className="text-lg font-bold text-slate-800">
              All Accounts
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">

              <thead className="bg-slate-50 text-slate-500 text-sm">
                <tr>
                  <th className="p-4">Account Holder</th>
                  <th className="p-4">UPI ID</th>
                  <th className="p-4">Balance</th>
                  <th className="p-4">Version</th>
                </tr>
              </thead>

              <tbody>
                {accounts.map((account) => (
                  <tr
                    key={account.vpa}
                    className="border-t border-slate-100"
                  >
                    <td className="p-4 font-medium text-slate-800">
                      {account.holderName}
                    </td>

                    <td className="p-4 text-slate-600">
                      {account.vpa}
                    </td>

                    <td className="p-4 font-semibold text-slate-800">
                      ₹{Number(account.balance).toLocaleString("en-IN")}
                    </td>

                    <td className="p-4 text-slate-600">
                      {account.version}
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default Accounts;
