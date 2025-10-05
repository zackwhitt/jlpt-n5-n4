export default function Counters({ newCount, dueCount, total }: { newCount: number; dueCount: number; total: number }) {
  return (
    <div className="flex gap-3 text-sm">
      <span className="px-2 py-1 rounded bg-blue-900/40">New {newCount}</span>
      <span className="px-2 py-1 rounded bg-yellow-900/40">Due {dueCount}</span>
      <span className="px-2 py-1 rounded bg-slate-800">Total {total}</span>
    </div>
  );
}
