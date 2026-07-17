import { useMemo, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ISSUE_TYPES = [
  "Bribe Demand",
  "Delay",
  "Document Rejection",
  "Fraud",
  "Other",
];

export default function Report() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [reportId, setReportId] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    state: "",
    district: "",
    scheme_name: "",
    issue_type: "",
    description: "",
  });

  const canSubmit = useMemo(() => {
    const required = [
      "email",
      "phone",
      "state",
      "district",
      "scheme_name",
      "issue_type",
      "description",
    ];
    return required.every((k) => String(form[k] ?? "").trim().length > 0);
  }, [form]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!canSubmit || loading) return;

    setLoading(true);
    setError("");
    setSuccess(false);
    setReportId("");

    try {
      const payload = {
        name: form.name,
        email: form.email,
        phone: form.phone,
        state: form.state,
        district: form.district,
        scheme_name: form.scheme_name,
        issue_type: form.issue_type,
        description: form.description,
      };

      const res = await api.post("/report", payload);
      const id = res?.data?.report_id;

      setReportId(id || "");
      setSuccess(true);
    } catch (err) {
      const message =
        err?.response?.data?.detail ||
        err?.response?.data?.message ||
        err?.message ||
        "Unable to submit report";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="mx-auto max-w-3xl px-4 py-10">
        <h1 className="text-3xl font-semibold">Corruption Reporting</h1>
        <p className="mt-2 text-sm text-slate-600">
          Report corruption or issues related to government schemes.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-2">
              <span className="text-sm font-medium">Name (optional)</span>
              <input
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="e.g., Rahul"
              />
            </label>

            <label className="flex flex-col gap-2">
              <span className="text-sm font-medium">Email</span>
              <input
                type="email"
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
              />
            </label>

            <label className="flex flex-col gap-2">
              <span className="text-sm font-medium">Phone</span>
              <input
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="e.g., 9876543210"
              />
            </label>

            <label className="flex flex-col gap-2">
              <span className="text-sm font-medium">State</span>
              <input
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2"
                name="state"
                value={form.state}
                onChange={handleChange}
                placeholder="e.g., Maharashtra"
              />
            </label>

            <label className="flex flex-col gap-2">
              <span className="text-sm font-medium">District</span>
              <input
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2"
                name="district"
                value={form.district}
                onChange={handleChange}
                placeholder="e.g., Pune"
              />
            </label>

            <label className="flex flex-col gap-2">
              <span className="text-sm font-medium">Scheme Name</span>
              <input
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2"
                name="scheme_name"
                value={form.scheme_name}
                onChange={handleChange}
                placeholder="e.g., PMAY"
              />
            </label>
          </div>

          <label className="flex flex-col gap-2">
            <span className="text-sm font-medium">Issue Type</span>
            <select
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2"
              name="issue_type"
              value={form.issue_type}
              onChange={handleChange}
            >
              <option value="" disabled>
                Select issue type
              </option>
              {ISSUE_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-sm font-medium">Description</span>
            <textarea
              rows={5}
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Describe the issue you faced..."
            />
          </label>

          {error ? (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          ) : null}

          {success ? (
            <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
              <div>Your report has been submitted successfully.</div>
              {reportId ? (
                <div className="mt-2 font-mono text-xs">
                  Report ID: {reportId}
                </div>
              ) : null}
            </div>
          ) : null}

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
            <button
              type="submit"
              disabled={!canSubmit || loading}
              className="rounded-xl bg-blue-700 px-5 py-2.5 font-medium text-white shadow-sm disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Submitting..." : "Submit Report"}
            </button>
          </div>
        </form>
      </main>
      <Footer />
    </div>
  );
}
