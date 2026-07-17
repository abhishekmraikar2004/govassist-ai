import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-50/40 to-white text-slate-900">
      <Navbar />
      <main className="px-4 pb-16">
        <div className="mx-auto max-w-6xl">
          <Hero />
          <Features />
        </div>
      </main>
      <Footer />
    </div>
  );
}
