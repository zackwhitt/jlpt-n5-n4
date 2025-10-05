import { usePrefs } from "@/store/prefsStore";
import { useNavigate } from "react-router-dom";

export default function Onboarding() {
  const nav = useNavigate();
  const { dailyNew, setDailyNew, level, setLevel } = usePrefs();

  return (
    <div className="grid gap-6 max-w-xl">
      <h1 className="text-2xl font-semibold">Welcome! 🎌</h1>
      <p>Let’s set up your study plan. You can change this later in Settings.</p>

      <label className="grid gap-1">
        <span className="text-sm text-slate-300">Starting level</span>
        <select
          value={level}
          onChange={(e) => setLevel(e.target.value as "N5" | "N4")}
          className="bg-slate-900 border border-slate-800 rounded px-3 py-2"
        >
          <option value="N5">N5</option>
          <option value="N4">N4</option>
        </select>
      </label>

      <label className="grid gap-1">
        <span className="text-sm text-slate-300">New cards per day</span>
        <input
          type="number"
          min={5}
          max={40}
          value={dailyNew}
          onChange={(e) => setDailyNew(Number(e.target.value))}
          className="bg-slate-900 border border-slate-800 rounded px-3 py-2"
        />
      </label>

      <button
        onClick={() => nav("/decks")}
        className="justify-self-start bg-emerald-600 hover:bg-emerald-500 px-4 py-2 rounded font-medium"
      >
        Save & Continue
      </button>
    </div>
  );
}
