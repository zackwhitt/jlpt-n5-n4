import { Link, NavLink, Route, Routes } from "react-router-dom";
import Onboarding from "@/app/routes/Onboarding";
import Decks from "@/app/routes/Decks";
import Study from "@/app/routes/Study";
import Reading from "@/app/routes/Reading";
import Listening from "@/app/routes/Listening";
import Settings from "@/app/routes/Settings";
import InstallBanner from "@/components/InstallBanner";

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="sticky top-0 z-10 backdrop-blur bg-slate-950/70 border-b border-slate-800">
        <nav className="mx-auto max-w-5xl flex items-center gap-4 px-4 h-14">
          <Link to="/" className="font-semibold">JLPT N5–N4</Link>
          <div className="flex-1" />
          {[
            ["/onboarding", "Onboarding"],
            ["/decks", "Decks"],
            ["/study", "Study"],
            ["/reading", "Reading"],
            ["/listening", "Listening"],
            ["/settings", "Settings"],
          ].map(([to, label]) => (
            <NavLink key={to} to={to as string} className={({ isActive }) => `text-sm px-2 py-1 rounded ${isActive ? "bg-slate-800" : "hover:bg-slate-900"}`}>
              {label as string}
            </NavLink>
          ))}
        </nav>
      </header>

      <main className="mx-auto max-w-5xl p-4">
        <Routes>
          <Route path="/" element={<Decks />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/decks" element={<Decks />} />
          <Route path="/study" element={<Study />} />
          <Route path="/reading" element={<Reading />} />
          <Route path="/listening" element={<Listening />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </main>
      <InstallBanner />
    </div>
  );
}
