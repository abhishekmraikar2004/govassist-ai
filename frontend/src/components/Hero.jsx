export default function Hero() {
  return (
    <section className="mt-10 grid items-center gap-10 lg:grid-cols-2">
      <div className="text-left">
        <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1 text-sm text-blue-800">
          <span className="h-2 w-2 rounded-full bg-blue-600" />
          Government-tech, powered by AI
        </div>

        <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
          GovAssist AI
          <span className="block text-blue-700">
            Find the right Government Schemes using AI
          </span>
        </h1>

        <p className="mt-5 max-w-xl text-slate-600">
          Discover government schemes that match your profile—fast, clear, and
          actionable.
        </p>

        <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Link
            to="/recommend"
            className="inline-flex items-center justify-center rounded-xl bg-blue-700 px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-blue-800"
          >
            Find My Schemes
          </Link>
          <div className="text-sm text-slate-500">
  
          </div>
        </div>
      </div>

      <div className="relative">
        <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-blue-500/20 to-indigo-500/20 blur-2xl" />
        <div className="relative rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl bg-blue-50 p-4">
              <div className="text-sm font-semibold text-blue-800">
                Smart Matching
              </div>
              <div className="mt-2 text-sm text-slate-600">
                Eligibility-first recommendations
              </div>
            </div>
            <div className="rounded-2xl bg-indigo-50 p-4">
              <div className="text-sm font-semibold text-indigo-800">
                Clear Next Steps
              </div>
              <div className="mt-2 text-sm text-slate-600">
                Documents & timelines at a glance
              </div>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4 sm:col-span-2">
              <div className="text-sm font-semibold text-slate-900">
                Built for citizens
              </div>
              <div className="mt-2 text-sm text-slate-600">
                A clean experience to help you explore government schemes with
                confidence.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
