
import { ArrowUpRight, ArrowDownLeft } from "lucide-react";

function TransactionTable() {
  const transactions = [
    {
      id: "TXN001",
      sender: "Alice",
      receiver: "Bob",
      amount: "₹100",
      status: "SETTLED",
      type: "sent",
    },
    {
      id: "TXN002",
      sender: "Carol",
      receiver: "Dave",
      amount: "₹250",
      status: "SETTLED",
      type: "received",
    },
    {
      id: "TXN003",
      sender: "Bob",
      receiver: "Alice",
      amount: "₹150",
      status: "PENDING",
      type: "sent",
    },
    {
      id: "TXN004",
      sender: "Dave",
      receiver: "Carol",
      amount: "₹300",
      status: "REJECTED",
      type: "received",
    },
  ];

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm mt-8">

      <div className="p-6 border-b border-slate-200">
        <h2 className="text-lg font-bold text-slate-800">
          Recent Transactions
        </h2>

        <p className="text-sm text-slate-500 mt-1">
          Latest payment activity
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">

          <thead className="bg-slate-50 text-slate-500 text-sm">
            <tr>
              <th className="p-4">Transaction ID</th>
              <th className="p-4">Sender</th>
              <th className="p-4">Receiver</th>
              <th className="p-4">Amount</th>
              <th className="p-4">Status</th>
              <th className="p-4">Type</th>
            </tr>
          </thead>

          <tbody>
            {transactions.map((txn) => (
              <tr key={txn.id} className="border-t border-slate-100">

                <td className="p-4 font-medium text-slate-700">
                  {txn.id}
                </td>

                <td className="p-4 text-slate-600">
                  {txn.sender}
                </td>

                <td className="p-4 text-slate-600">
                  {txn.receiver}
                </td>

                <td className="p-4 font-semibold text-slate-800">
                  {txn.amount}
                </td>

                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      txn.status === "SETTLED"
                        ? "bg-green-100 text-green-700"
                        : txn.status === "PENDING"
                        ? "bg-orange-100 text-orange-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {txn.status}
                  </span>
                </td>

                <td className="p-4">
                  {txn.type === "sent" ? (
                    <ArrowUpRight className="text-red-500" size={20} />
                  ) : (
                    <ArrowDownLeft className="text-green-500" size={20} />
                  )}
                </td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
}

export default TransactionTable;
