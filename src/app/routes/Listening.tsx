import AudioPlayer from "@/components/AudioPlayer";

export default function Listening() {
  return (
    <div className="grid gap-4 max-w-xl">
      <h1 className="text-2xl font-semibold">Listening</h1>
      <AudioPlayer src="/sample.mp3" />
      <p className="text-sm text-slate-400">Tip: use 0.8× to catch unfamiliar words.</p>
    </div>
  );
}
