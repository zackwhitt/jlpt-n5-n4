import { useEffect, useState } from "react";

function isiOSSafari() {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent;
  // Rough check for iOS Safari
  return /iPad|iPhone|iPod/.test(ua) && /Safari/.test(ua) && !/CriOS|FxiOS/.test(ua);
}

export default function InstallBanner() {
  const [deferred, setDeferred] = useState<any>(null);
  const [dismissed, setDismissed] = useState(false);
  const iOS = isiOSSafari();

  useEffect(() => {
    const onPrompt = (e: any) => {
      // Chrome/Edge PWA install prompt
      e.preventDefault();
      setDeferred(e);
    };
    window.addEventListener("beforeinstallprompt", onPrompt);
    return () => window.removeEventListener("beforeinstallprompt", onPrompt);
  }, []);

  if (dismissed) return null;

  // Show nothing unless we either have the prompt or we are on iOS Safari
  if (!deferred && !iOS) return null;

  return (
    <div className="fixed bottom-3 inset-x-0 mx-auto max-w-xl px-3">
      <div className="rounded-xl bg-slate-800 border border-slate-700 p-3 shadow-lg grid gap-2">
        <div className="text-sm font-medium">Install this app</div>
        {iOS ? (
          <p className="text-xs text-slate-300">
            On iPhone/iPad: open in Safari, tap <span aria-label="Share">Share</span> → <b>Add to Home Screen</b>.
          </p>
        ) : (
          <p className="text-xs text-slate-300">
            Get the app experience with offline support and a home screen icon.
          </p>
        )}
        <div className="flex gap-2 justify-end">
          <button className="text-xs px-2 py-1 rounded bg-slate-700" onClick={() => setDismissed(true)}>Not now</button>
          {!iOS && deferred && (
            <button
              className="text-xs px-2 py-1 rounded bg-emerald-600 hover:bg-emerald-500"
              onClick={async () => {
                deferred.prompt();
                await deferred.userChoice;
                setDeferred(null);
                setDismissed(true);
              }}
            >
              Install
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
