import Furigana from "@/components/Furigana";
import { usePrefs } from "@/store/prefsStore";

export default function Reading() {
  const { showFurigana, setShowFurigana } = usePrefs();
  const sentence = { text: "日本語を勉強します。", ruby: [ [0,2,"にほんご"], [3,5,"べんきょう"] ] };
  return (
    <div className="grid gap-4 max-w-2xl">
      <h1 className="text-2xl font-semibold">Reading</h1>
      <label className="inline-flex items-center gap-2 text-sm">
        <input type="checkbox" checked={showFurigana} onChange={(e) => setShowFurigana(e.target.checked)} />
        Show furigana
      </label>
      <p className="text-xl leading-relaxed font-jp">
        <Furigana text={sentence.text} ruby={sentence.ruby as any} enabled={showFurigana} />
      </p>
    </div>
  );
}
