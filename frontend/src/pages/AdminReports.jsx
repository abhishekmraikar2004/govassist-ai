import { useEffect, useMemo, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function StatusBadge({ status }) {
  const s = String(status || "").toLowerCase();
  const styles =
    s === "pending"
      ? "bg-yellow-100 text-yellow-800 border-yellow-200"
      : s === "approved"
        ? "bg-green-100 text-green-800 border-green-200"
        : "bg-slate-100 text-slate-800 border-slate-200";

  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${styles}`}
    >
      {status || "Pending"}
    </span>
  );
}

export default function AdminReports() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");

  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      setError("");
      try {
        const res = await api.get("/reports");
        if (!mounted) return;
        setReports(Array.isArray(res?.data) ? res.data : []);
      } catch (e) {
        if (!mounted) return;
        setError(
          e?.response?.data?.detail ||
            e?.response?.data?.message ||
            e?.message ||
            "Unable to load reports",
        );
      } finally {
        if (!mounted) return;
        setLoading(false);
      }
    }
    load();
    return () => {
      mounted = false;
    };
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return reports;
    return reports.filter((r) => {
      const fields = [
        r.report_id,
        r.scheme_name,
        r.issue_type,
        r.state,
        r.created_at,
        r.status,
      ];
      return fields.some((f) =>
        String(f || "")
          .toLowerCase()
          .includes(q),
      );
    });
  }, [query, reports]);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="text-3xl font-semibold">Admin Reports</h1>
        <p className="mt-2 text-sm text-slate-600">
          View corruption reports submitted by users.
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-md">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by report id, scheme, issue, state..."
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {loading ? (
          <div className="mt-8 text-sm text-slate-600">Loading...</div>
        ) : error ? (
          <div className="mt-8 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        ) : (
          <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-200 bg-white">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-700">
                <tr>
                  <th className="px-4 py-3 font-medium">Report ID</th>
                  <th className="px-4 py-3 font-medium">Scheme</th>
                  <th className="px-4 py-3 font-medium">Issue</th>
                  <th className="px-4 py-3 font-medium">State</th>
                  <th className="px-4 py-3 font-medium">Date</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length ? (
                  filtered.map((r) => (
                    <tr key={r.report_id} className="border-t border-slate-100">
                      <td className="px-4 py-3 font-mono text-xs text-slate-800">
                        {r.report_id}
                      </td>
                      <td className="px-4 py-3">{r.scheme_name}</td>
                      <td className="px-4 py-3">{r.issue_type}</td>
                      <td className="px-4 py-3">{r.state}</td>
                      <td className="px-4 py-3">
                        {r.created_at
                          ? new Date(r.created_at).toLocaleString()
                          : "-"}
                      </td>
                      <td className="px-4 py-3">
                        <StatusBadge status={r.status} />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      className="px-4 py-10 text-center text-sm text-slate-600"
                      colSpan={6}
                    >
                      No reports found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
