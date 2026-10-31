
import { useState } from "react";
import { Send, ShieldCheck } from "lucide-react";
import api from "../services/api";

function SendMoney() {
  // Store form input values
  const [formData, setFormData] = useState({
    senderVpa: "",
    receiverVpa: "",
    amount: "",
    pin: "",
  });

  // Store loading and response messages
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle payment submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage(null);

    // Validate sender and receiver
    if (formData.senderVpa === formData.receiverVpa) {
      setMessage({
        type: "error",
        text: "Sender and receiver cannot be the same.",
      });
      return;
    }

    try {
      setLoading(true);

      // Send payment request to Spring Boot
      const response = await api.post("/demo/send", {
        senderVpa: formData.senderVpa,
        receiverVpa: formData.receiverVpa,
        amount: Number(formData.amount),
        pin: formData.pin,
        ttl: 5,
        startDevice: "phone-alice",
      });

      console.log("Backend Response:", response.data);

      setMessage({
        type: "success",
        text: "Payment packet successfully submitted to the mesh network!",
      });

      // Clear form after successful request
      setFormData({
        senderVpa: "",
        receiverVpa: "",
        amount: "",
        pin: "",
      });

    } catch (error) {
      console.error(
        "Payment Error:",
        error.response?.data || error
      );

      setMessage({
        type: "error",
        text:
          error.response?.data?.message ||
          error.response?.data?.error ||
          "Unable to submit payment. Check backend connection.",
      });

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">

      {/* Page Heading */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800">
          Send Money
        </h1>

        <p className="text-slate-500 mt-2">
          Transfer money securely between demo accounts.
        </p>
      </div>

      {/* Payment Form Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">

        {/* Form Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-blue-100 text-blue-600 p-3 rounded-xl">
            <Send size={24} />
          </div>

          <div>
            <h2 className="text-lg font-bold text-slate-800">
              New Payment
            </h2>

            <p className="text-sm text-slate-500">
              Enter the payment details below
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Sender */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Sender UPI ID
            </label>

            <select
              name="senderVpa"
              value={formData.senderVpa}
              onChange={handleChange}
              required
              className="w-full border border-slate-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select sender</option>
              <option value="alice@demo">Alice (alice@demo)</option>
              <option value="bob@demo">Bob (bob@demo)</option>
              <option value="carol@demo">Carol (carol@demo)</option>
              <option value="dave@demo">Dave (dave@demo)</option>
            </select>
          </div>

          {/* Receiver */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Receiver UPI ID
            </label>

            <select
              name="receiverVpa"
              value={formData.receiverVpa}
              onChange={handleChange}
              required
              className="w-full border border-slate-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select receiver</option>
              <option value="alice@demo">Alice (alice@demo)</option>
              <option value="bob@demo">Bob (bob@demo)</option>
              <option value="carol@demo">Carol (carol@demo)</option>
              <option value="dave@demo">Dave (dave@demo)</option>
            </select>
          </div>

          {/* Amount */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Amount (₹)
            </label>

            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="Enter amount"
              min="0.01"
              step="0.01"
              required
              className="w-full border border-slate-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* PIN */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Demo UPI PIN
            </label>

            <input
              type="password"
              name="pin"
              value={formData.pin}
              onChange={handleChange}
              placeholder="Enter demo PIN"
              required
              className="w-full border border-slate-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Information */}
          <div className="bg-blue-50 p-4 rounded-lg flex gap-3">
            <ShieldCheck className="text-blue-600 shrink-0" />

            <p className="text-sm text-blue-700">
              This is a demonstration payment system using
              simulated offline transactions.
            </p>
          </div>

          {/* Success / Error Message */}
          {message && (
            <div
              role="alert"
              className={`p-4 rounded-lg text-sm ${
                message.type === "success"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {message.text}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition"
          >
            <Send size={18} />

            {loading ? "Processing..." : "Send Payment"}
          </button>

        </form>
      </div>
    </div>
  );
}

export default SendMoney;
