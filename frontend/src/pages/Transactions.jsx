
import { useEffect, useState } from "react";
import { RefreshCw, ArrowUpRight, ArrowDownLeft } from "lucide-react";
import api from "../services/api";

function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/transactions");

      setTransactions(response.data);
    } catch (err) {
      console.error("Transactions API error:", err);
      setError("Unable to load transactions. Check backend connection.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div>
      {/* Heading */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Transactions
          </h1>

          <p className="text-slate-500 mt-2">
            View your payment transaction history.
          </p>
        </div>

        <button
          onClick={fetchTransactions}
          disabled={loading}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          <RefreshCw size={18} />
          Refresh
        </button>
      </div>

      {/* Summary */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm mb-6">
        <p className="text-slate-500 text-sm">
          Total Transactions
        </p>

        <h2 className="text-3xl font-bold text-slate-800 mt-2">
          {transactions.length}
        </h2>
      </div>

      {/* Loading */}
      {loading && (
        <p className="text-slate-500">
          Loading transactions...
        </p>
      )}

      {/* Error */}
      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded-lg">
          {error}
        </div>
      )}

      {/* Transaction Table */}
      {!loading && !error && (
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">

          <div className="p-6 border-b border-slate-200">
            <h2 className="text-lg font-bold text-slate-800">
              Recent Transactions
            </h2>
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
                    <th className="p-4">Transaction ID</th>
                    <th className="p-4">Sender</th>
                    <th className="p-4">Receiver</th>
                    <th className="p-4">Amount</th>
                    <th className="p-4">Status</th>
                  </tr>
                </thead>

                <tbody>
                  {transactions.map((transaction, index) => (
                    <tr
                      key={transaction.id ?? index}
                      className="border-t border-slate-100"
                    >
                      <td className="p-4 text-sm text-slate-600">
                        {transaction.id ?? "—"}
                      </td>

                      <td className="p-4 text-slate-700">
                        {transaction.senderVpa ?? transaction.sender ?? "—"}
                      </td>

                      <td className="p-4 text-slate-700">
                        {transaction.receiverVpa ?? transaction.receiver ?? "—"}
                      </td>

                      <td className="p-4 font-semibold text-slate-800">
                        ₹{Number(transaction.amount ?? 0).toLocaleString("en-IN")}
                      </td>

                      <td className="p-4">
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
                          {transaction.status ?? "UNKNOWN"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>

              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Transactions;
