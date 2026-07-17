import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    // Backend integration can be added later. For now keep UI functional.
    console.log({ email, password });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="mx-auto max-w-md px-4 py-10">
        <h1 className="text-3xl font-semibold">Login</h1>
        <p className="mt-2 text-slate-600">
          Sign in to access your personalized dashboard.
        </p>

        <form
          onSubmit={onSubmit}
          className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
        >
          <label className="flex flex-col gap-2">
            <span className="text-sm font-medium">Email</span>
            <input
              className="rounded-lg border border-slate-200 bg-white px-3 py-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
          </label>

          <label className="mt-4 flex flex-col gap-2">
            <span className="text-sm font-medium">Password</span>
            <input
              type="password"
              className="rounded-lg border border-slate-200 bg-white px-3 py-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </label>

          <button
            type="submit"
            className="mt-6 w-full rounded-xl bg-purple-600 px-5 py-2.5 font-medium text-white shadow-sm"
          >
            Login
          </button>

          <p className="mt-4 text-center text-sm text-slate-600">
            New here?{" "}
            <Link className="text-purple-700 hover:underline" to="/">
              Go back
            </Link>
          </p>
        </form>
      </main>
      <Footer />
    </div>
  );
}
