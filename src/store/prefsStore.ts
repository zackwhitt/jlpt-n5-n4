import { create } from "zustand";

type State = {
  dailyNew: number;
  showFurigana: boolean;
  level: "N5" | "N4";
  setDailyNew: (n: number) => void;
  setShowFurigana: (b: boolean) => void;
  setLevel: (l: "N5" | "N4") => void;
};

const storageKey = "prefs:v1";

const saved = (() => {
  try { return JSON.parse(localStorage.getItem(storageKey) || "null") } catch { return null }
})();

export const usePrefs = create<State>((set, get) => ({
  dailyNew: saved?.dailyNew ?? 15,
  showFurigana: saved?.showFurigana ?? true,
  level: saved?.level ?? "N5",
  setDailyNew: (n) => { set({ dailyNew: n }); persist(); },
  setShowFurigana: (b) => { set({ showFurigana: b }); persist(); },
  setLevel: (l) => { set({ level: l }); persist(); },
}));

function persist() {
  const s = usePrefs.getState();
  localStorage.setItem(storageKey, JSON.stringify({ dailyNew: s.dailyNew, showFurigana: s.showFurigana, level: s.level }));
}
