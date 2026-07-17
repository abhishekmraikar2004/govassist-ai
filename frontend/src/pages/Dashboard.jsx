import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="text-3xl font-semibold">Dashboard</h1>
        <p className="mt-3 text-slate-600">
          Your saved recommendations and activity will appear here.
        </p>
      </main>
      <Footer />
    </div>
  );
}
