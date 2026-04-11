import { useEffect, useState } from "react";

const API_BASE = "http://127.0.0.1:8000/api";

function UserDashboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Not authenticated. Please login.");
      setLoading(false);
      return;
    }

    fetch(`${API_BASE}/auth/users/`, {
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Access denied or server error.");
        return res.json();
      })
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const filtered = users.filter(
    (u) =>
      u.username.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4 py-8">
      {/* Background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-emerald-500 shadow-lg shadow-emerald-500/30">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">DeliveryApp</h1>
              <p className="text-slate-400 text-xs">Admin Dashboard</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-700/60 hover:bg-red-500/20 border border-slate-600/50 hover:border-red-500/40 text-slate-300 hover:text-red-400 text-sm font-medium transition-all duration-200"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1" />
            </svg>
            Logout
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {[
            { label: "Total Users", value: users.length, icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" },
            { label: "Active Today", value: users.length, icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" },
            { label: "Search Results", value: filtered.length, icon: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" },
          ].map((stat) => (
            <div key={stat.label} className="bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-xs font-medium">{stat.label}</p>
                  <p className="text-2xl font-bold text-white mt-1">{loading ? "—" : stat.value}</p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-emerald-500/15 flex items-center justify-center">
                  <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={stat.icon} />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Table Card */}
        <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 rounded-2xl overflow-hidden">
          {/* Table Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 border-b border-slate-700/50">
            <h2 className="text-white font-semibold text-lg">All Users</h2>
            <div className="relative w-full sm:w-64">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"
                fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search users..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-slate-900/70 border border-slate-600/60 text-white placeholder-slate-500 rounded-xl pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50 transition"
              />
            </div>
          </div>

          {/* Loading */}
          {loading && (
            <div className="flex items-center justify-center py-20">
              <svg className="animate-spin w-8 h-8 text-emerald-500" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="flex items-center gap-3 mx-6 my-6 px-4 py-3 rounded-xl bg-red-500/15 border border-red-500/25 text-red-400 text-sm">
              <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {error}
            </div>
          )}

          {/* Table */}
          {!loading && !error && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-700/50">
                    {["#", "Username", "Name", "Email", "Phone", "Address"].map((h) => (
                      <th key={h} className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wider px-6 py-3">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/30">
                  {filtered.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="text-center text-slate-500 py-12 text-sm">
                        No users found.
                      </td>
                    </tr>
                  ) : (
                    filtered.map((user, idx) => (
                      <tr key={user.id} className="hover:bg-slate-700/20 transition-colors">
                        <td className="px-6 py-4 text-slate-400 text-sm">{idx + 1}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 text-xs font-bold">
                              {user.username[0].toUpperCase()}
                            </div>
                            <span className="text-white text-sm font-medium">{user.username}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-slate-300 text-sm">{user.name || "—"}</td>
                        <td className="px-6 py-4 text-slate-300 text-sm">{user.email || "—"}</td>
                        <td className="px-6 py-4 text-slate-300 text-sm">{user.phone_number || "—"}</td>
                        <td className="px-6 py-4 text-slate-300 text-sm">{user.address || "—"}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* Footer */}
          {!loading && !error && (
            <div className="px-6 py-4 border-t border-slate-700/50">
              <p className="text-slate-500 text-xs">
                Showing {filtered.length} of {users.length} users
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;