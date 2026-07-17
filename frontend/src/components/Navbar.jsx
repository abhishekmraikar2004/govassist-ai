import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <NavLink to="/" className="flex items-center gap-2">
          <span className="text-lg font-bold text-blue-700">GovAssist AI</span>
        </NavLink>

        <nav className="flex items-center gap-4 text-sm text-slate-700">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              "font-medium " +
              (isActive ? "text-blue-700" : "hover:text-blue-700")
            }
          >
            Home
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
