import { usePrefs } from "@/store/prefsStore";

export default function Settings() {
  const { dailyNew, setDailyNew, showFurigana, setShowFurigana, level, setLevel } = usePrefs();
  return (
    <div className="grid gap-4 max-w-xl">
      <h1 className="text-2xl font-semibold">Settings</h1>

      <label className="grid gap-1">
        <span className="text-sm text-slate-300">Starting level</span>
        <select value={level} onChange={(e) => setLevel(e.target.value as "N5" | "N4")} className="bg-slate-900 border border-slate-800 rounded px-3 py-2">
          <option>N5</option>
          <option>N4</option>
        </select>
      </label>

      <label className="grid gap-1">
        <span className="text-sm text-slate-300">New cards per day</span>
        <input type="number" min={5} max={40} value={dailyNew} onChange={(e) => setDailyNew(Number(e.target.value))} className="bg-slate-900 border border-slate-800 rounded px-3 py-2" />
      </label>

      <label className="inline-flex items-center gap-2">
        <input type="checkbox" checked={showFurigana} onChange={(e) => setShowFurigana(e.target.checked)} />
        Show furigana
      </label>
    </div>
  );
}
