
import { useEffect, useState } from "react";
import {
  RefreshCw,
  Wifi,
  WifiOff,
  Smartphone,
  Package,
  Network,
} from "lucide-react";
import api from "../services/api";

function MeshMonitor() {
  const [mesh, setMesh] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchMeshState = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/mesh/state");
      setMesh(response.data);
    } catch (err) {
      console.error("Mesh API error:", err);
      setError("Unable to load mesh network information.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMeshState();
  }, []);

  const devices = mesh?.devices || [];

  const onlineDevices = devices.filter(
    (device) => device.hasInternet
  ).length;

  const offlineDevices = devices.length - onlineDevices;

  const totalPackets = devices.reduce(
    (total, device) => total + Number(device.packetCount || 0),
    0
  );

  const stats = [
    {
      title: "Total Devices",
      value: devices.length,
      icon: Smartphone,
      color: "text-blue-600",
      bg: "bg-blue-100",
    },
    {
      title: "Online Devices",
      value: onlineDevices,
      icon: Wifi,
      color: "text-green-600",
      bg: "bg-green-100",
    },
    {
      title: "Offline Devices",
      value: offlineDevices,
      icon: WifiOff,
      color: "text-orange-600",
      bg: "bg-orange-100",
    },
    {
      title: "Total Packets",
      value: totalPackets,
      icon: Package,
      color: "text-purple-600",
      bg: "bg-purple-100",
    },
  ];

  return (
    <div>
      {/* Heading */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Mesh Monitor
          </h1>

          <p className="text-slate-500 mt-2">
            Monitor your offline payment network.
          </p>
        </div>

        <button
          onClick={fetchMeshState}
          disabled={loading}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          <RefreshCw size={18} />
          Refresh
        </button>
      </div>

      {/* Loading */}
      {loading && (
        <p className="text-slate-500">
          Loading mesh network...
        </p>
      )}

      {/* Error */}
      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded-lg">
          {error}
        </div>
      )}

      {/* Network Information */}
      {!loading && !error && mesh && (
        <>
          {/* Statistics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
            {stats.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="bg-white rounded-xl border border-slate-200 shadow-sm p-6"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-slate-500 text-sm">
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

          {/* Network Status */}
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Network className="text-blue-600" size={24} />

              <h2 className="text-lg font-bold text-slate-800">
                Network Overview
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-50 rounded-lg p-4">
                <p className="text-sm text-slate-500">
                  Idempotency Cache Size
                </p>

                <p className="text-2xl font-bold text-slate-800 mt-2">
                  {mesh.idempotencyCacheSize ?? 0}
                </p>
              </div>

              <div className="bg-slate-50 rounded-lg p-4">
                <p className="text-sm text-slate-500">
                  Network Devices
                </p>

                <p className="text-2xl font-bold text-slate-800 mt-2">
                  {devices.length}
                </p>
              </div>
            </div>
          </div>

          {/* Device Table */}
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-200">
              <h2 className="text-lg font-bold text-slate-800">
                Connected Devices
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                Live device information from the backend.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50 text-slate-500 text-sm">
                  <tr>
                    <th className="p-4">Device ID</th>
                    <th className="p-4">Internet</th>
                    <th className="p-4">Packet Count</th>
                    <th className="p-4">Packet IDs</th>
                  </tr>
                </thead>

                <tbody>
                  {devices.map((device) => (
                    <tr
                      key={device.deviceId}
                      className="border-t border-slate-100"
                    >
                      <td className="p-4 font-medium text-slate-800">
                        {device.deviceId}
                      </td>

                      <td className="p-4">
                        {device.hasInternet ? (
                          <span className="flex items-center gap-2 text-green-600 text-sm font-medium">
                            <Wifi size={16} />
                            Online
                          </span>
                        ) : (
                          <span className="flex items-center gap-2 text-orange-600 text-sm font-medium">
                            <WifiOff size={16} />
                            Offline
                          </span>
                        )}
                      </td>

                      <td className="p-4 font-semibold text-slate-800">
                        {device.packetCount}
                      </td>

                      <td className="p-4 text-sm text-slate-500">
                        {device.packetIds?.length
                          ? device.packetIds.join(", ")
                          : "No packets"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default MeshMonitor;
