const features = [
  {
    title: "AI Scheme Recommendation",
    description:
      "(UI-only for now) Find schemes tailored to your needs and profile.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="h-6 w-6"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 2l1.5 6.5L20 12l-6.5 3.5L12 22l-1.5-6.5L4 12l6.5-3.5L12 2z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Eligibility Checker",
    description: "(UI-only for now) Quickly understand if a scheme fits you.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="h-6 w-6"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M20 6L9 17l-5-5"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Document Checklist",
    description:
      "(UI-only for now) Get an organized list of required documents.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="h-6 w-6"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7 3h7l3 3v15H7V3z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path
          d="M14 3v4h4"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path
          d="M9 12h6"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <path
          d="M9 16h6"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    title: "Corruption Reporting",
    description: "(UI-only for now) Report issues safely with clear guidance.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="h-6 w-6"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 22s8-4 8-10V6l-8-4-8 4v6c0 6 8 10 8 10z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path
          d="M9.5 12l1.7 1.7L15 10"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

export default function Features() {
  return (
    <section className="mt-14" aria-label="Features">
      <div className="flex items-end justify-between gap-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">
            Everything you need
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            A modern government-tech experience—blueprints for core
            capabilities.
          </p>
        </div>
      </div>

      <div
        className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
        id="find"
      >
        {features.map((f) => (
          <div
            key={f.title}
            className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-blue-50 p-3 text-blue-700">
                {f.icon}
              </div>
              <h3 className="text-base font-semibold text-slate-900">
                {f.title}
              </h3>
            </div>
            <p className="mt-3 text-sm text-slate-600">{f.description}</p>
            <div className="mt-4 h-px w-full bg-gradient-to-r from-blue-500/0 via-blue-500/40 to-blue-500/0 transition group-hover:opacity-100" />
          </div>
        ))}
      </div>
    </section>
  );
}
