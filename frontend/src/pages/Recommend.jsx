import { useMemo, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SchemeCard from "../components/SchemeCard";

const genderOptions = ["Male", "Female", "Other"];
const categoryOptions = [
  "General",
  "OBC",
  "SC",
  "ST",
  "Student",
  "Housing",
  "Healthcare",
  "Education",
  "Employment",
];

const stateOptions = [
  "Andhra Pradesh",
  "Bihar",
  "Chhattisgarh",
  "Delhi",
  "Gujarat",
  "Haryana",
  "Karnataka",
  "Kerala",
  "Maharashtra",
  "Odisha",
  "Rajasthan",
  "Tamil Nadu",
  "Uttar Pradesh",
  "West Bengal",
];

const educationOptions = [
  "High School",
  "Graduate",
  "Postgraduate",
  "Doctorate",
];

export default function Recommend() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [recommendations, setRecommendations] = useState([]);

  const [form, setForm] = useState({
    name: "",
    age: "",
    gender: "Male",
    state: "",
    occupation: "",
    income: "",
    category: "General",
    education: "",
  });

  const canSubmit = useMemo(() => {
    const required = [
      "name",
      "age",
      "state",
      "occupation",
      "income",
      "education",
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
    setRecommendations([]);

    try {
      const payload = {
        name: form.name,
        age: Number(form.age),
        gender: form.gender,
        state: form.state,
        occupation: form.occupation,
        income: Number(form.income),
        category: form.category,
        education: form.education,
      };

      const res = await api.post("/recommend", payload);

      const recs = res?.data?.recommendations || [];
      setRecommendations(recs);
    } catch (err) {
      const message =
        err?.response?.data?.detail ||
        err?.response?.data?.message ||
        err?.message;
      setError(message || "Unable to fetch recommendations. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar />

      <main className="px-4 pb-16">
        <div className="mx-auto max-w-6xl">
          <header className="mt-10">
            <h1 className="text-3xl font-bold">Find the Right Schemes</h1>
            <p className="mt-2 text-sm text-slate-600">
              Answer a few questions and get tailored government schemes.
            </p>
          </header>

          <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <label className="flex flex-col gap-2">
                  <span className="text-sm font-medium">Name</span>
                  <input
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="e.g., Rahul"
                  />
                </label>

                <label className="flex flex-col gap-2">
                  <span className="text-sm font-medium">Age</span>
                  <input
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2"
                    type="number"
                    name="age"
                    value={form.age}
                    onChange={handleChange}
                    placeholder="e.g., 25"
                  />
                </label>

                <label className="flex flex-col gap-2">
                  <span className="text-sm font-medium">Gender</span>
                  <select
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2"
                    name="gender"
                    value={form.gender}
                    onChange={handleChange}
                  >
                    {genderOptions.map((g) => (
                      <option value={g} key={g}>
                        {g}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="flex flex-col gap-2">
                  <span className="text-sm font-medium">State</span>
                  <select
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2"
                    name="state"
                    value={form.state}
                    onChange={handleChange}
                  >
                    <option value="" disabled>
                      Select state
                    </option>
                    {stateOptions.map((s) => (
                      <option value={s} key={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="flex flex-col gap-2">
                  <span className="text-sm font-medium">Occupation</span>
                  <input
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2"
                    name="occupation"
                    value={form.occupation}
                    onChange={handleChange}
                    placeholder="e.g., Student"
                  />
                </label>

                <label className="flex flex-col gap-2">
                  <span className="text-sm font-medium">Annual Income</span>
                  <input
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2"
                    type="number"
                    name="income"
                    value={form.income}
                    onChange={handleChange}
                    placeholder="e.g., 50000"
                  />
                </label>

                <label className="flex flex-col gap-2">
                  <span className="text-sm font-medium">Category</span>
                  <select
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2"
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                  >
                    {categoryOptions.map((c) => (
                      <option value={c} key={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="flex flex-col gap-2">
                  <span className="text-sm font-medium">Education</span>
                  <select
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2"
                    name="education"
                    value={form.education}
                    onChange={handleChange}
                  >
                    <option value="" disabled>
                      Select education
                    </option>
                    {educationOptions.map((ed) => (
                      <option value={ed} key={ed}>
                        {ed}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              {error ? <p className="text-sm text-red-600">{error}</p> : null}

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
                <button
                  type="submit"
                  disabled={!canSubmit || loading}
                  className="rounded-xl bg-blue-700 px-5 py-2.5 font-medium text-white shadow-sm disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? "Finding Best Schemes..." : "Get Recommendations"}
                </button>
              </div>
            </form>
          </section>

          <section className="mt-10">
            <div className="flex items-end justify-between gap-6">
              <div>
                <h2 className="text-xl font-semibold">Recommended Schemes</h2>
                <p className="mt-1 text-sm text-slate-600">
                  {loading
                    ? "Finding best matches for your profile..."
                    : recommendations.length
                      ? "Matches based on your details."
                      : "Submit the form to see recommendations."}
                </p>
              </div>
            </div>

            {loading ? (
              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-28 animate-pulse rounded-2xl bg-slate-200/70"
                  />
                ))}
              </div>
            ) : recommendations.length ? (
              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {recommendations.map((scheme, idx) => (
                  <SchemeCard
                    key={scheme?.scheme_name || scheme?.name || idx}
                    scheme={scheme}
                  />
                ))}
              </div>
            ) : null}
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
