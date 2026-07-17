function CheckItem({ children }) {
  return (
    <li className="flex items-start gap-2 text-sm text-slate-700">
      <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-blue-700 text-white">
        ✓
      </span>
      <span className="leading-snug">{children}</span>
    </li>
  );
}

function Steps({ steps }) {
  if (!Array.isArray(steps) || !steps.length) return null;
  return (
    <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-slate-700">
      {steps.map((s, idx) => (
        <li key={`${idx}-${s}`}>{s}</li>
      ))}
    </ol>
  );
}

export default function SchemeCard({ scheme }) {
  const aiExplanation = scheme?.ai_explanation || "";
  const eligibilityStatus = scheme?.eligibility_status || "";
  const applicationSteps =
    scheme?.application_steps || scheme?.applicationSteps || [];
  const officialWebsite =
    scheme?.official_website || scheme?.officialWebsite || "";
  const lastDate = scheme?.last_date || scheme?.lastDate || "";
  const title =
    scheme?.scheme_name ||
    scheme?.name ||
    scheme?.scheme_name ||
    scheme?.title ||
    scheme?.scheme ||
    "Scheme";

  const description =
    scheme?.description || scheme?.about || scheme?.details || "";

  const benefits = scheme?.benefits || "";

  const eligibility =
    scheme?.eligibility ||
    scheme?.eligibility_criteria ||
    scheme?.criteria ||
    "";

  const documents = scheme?.documents || scheme?.required_documents || [];

  return (
    <article className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <h4 className="text-base font-semibold text-slate-900">{title}</h4>
        <span className="shrink-0 rounded-full bg-blue-50 px-2 py-1 text-[11px] font-semibold text-blue-700">
          Recommended
        </span>
      </div>

      {description ? (
        <p className="mt-2 line-clamp-3 text-sm text-slate-600">
          {description}
        </p>
      ) : null}

      {benefits ? (
        <div className="mt-3 rounded-xl bg-blue-50 p-3">
          <p className="text-xs font-medium text-blue-800">Benefits</p>
          <p className="mt-1 line-clamp-3 text-sm text-blue-900">{benefits}</p>
        </div>
      ) : null}

      {eligibility ? (
        <div className="mt-3 rounded-xl bg-slate-50 p-3">
          <p className="text-xs font-medium text-slate-800">Eligibility</p>
          <p className="mt-1 line-clamp-3 text-sm text-slate-700">
            {eligibility}
          </p>
        </div>
      ) : null}

      <div className="mt-3">
        <p className="text-xs font-medium text-slate-800">Eligibility Status</p>
        <p className="mt-1 text-sm font-semibold text-slate-700">
          {eligibilityStatus || "Eligible"}
        </p>
      </div>

      {aiExplanation ? (
        <div className="mt-3 rounded-xl bg-indigo-50 p-3">
          <p className="text-xs font-medium text-indigo-900">AI Explanation</p>
          <p className="mt-1 text-sm text-indigo-900">{aiExplanation}</p>
        </div>
      ) : null}

      <div className="mt-3">
        <p className="text-xs font-medium text-slate-800">Required Documents</p>
        {Array.isArray(documents) && documents.length ? (
          <ul className="mt-2 space-y-2">
            {documents.slice(0, 10).map((d, idx) => (
              <CheckItem key={`${d}-${idx}`}>{d}</CheckItem>
            ))}
          </ul>
        ) : (
          <p className="mt-1 text-sm text-slate-600">
            No document info available.
          </p>
        )}
      </div>

      <div className="mt-4">
        <p className="text-xs font-medium text-slate-800">Application Steps</p>
        <Steps steps={applicationSteps} />
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="rounded-xl bg-slate-50 p-3">
          <p className="text-xs font-medium text-slate-800">Official Website</p>
          {officialWebsite ? (
            officialWebsite === "Visit the official state portal" ? (
              <p className="mt-1 text-sm text-slate-700">
                Visit the official state portal
              </p>
            ) : (
              <a
                href={officialWebsite}
                target="_blank"
                rel="noreferrer"
                className="mt-1 inline-block text-sm font-medium text-blue-700 hover:underline"
              >
                Open website
              </a>
            )
          ) : (
            <p className="mt-1 text-sm text-slate-700">
              Visit the official state portal
            </p>
          )}
        </div>

        <div className="rounded-xl bg-slate-50 p-3">
          <p className="text-xs font-medium text-slate-800">Last Date</p>
          <p className="mt-1 text-sm text-slate-700">
            {lastDate || "Visit the official state portal"}
          </p>
        </div>
      </div>
    </article>
  );
}
