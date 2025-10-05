import { useEffect, useRef, useState } from "react";

export default function AudioPlayer({ src }: { src: string }) {
  const ref = useRef<HTMLAudioElement>(null);
  const [rate, setRate] = useState(1);
  useEffect(() => { if (ref.current) ref.current.playbackRate = rate; }, [rate]);
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4 flex items-center gap-3">
      <audio ref={ref} src={src} controls preload="none" />
      <label className="text-sm">Speed
        <select value={rate} onChange={(e) => setRate(Number(e.target.value))} className="ml-2 bg-slate-800 rounded px-2 py-1">
          <option value={0.8}>0.8×</option>
          <option value={1}>1.0×</option>
        </select>
      </label>
    </div>
  );
}
