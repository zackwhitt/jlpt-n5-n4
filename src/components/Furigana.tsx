/**
 * Render text with optional furigana.
 * `ruby` is an array of [startIndex, endIndexExclusive, reading].
 */
export default function Furigana({ text, ruby, enabled }: { text: string; ruby: [number, number, string][]; enabled: boolean; }) {
  if (!enabled || !ruby?.length) return <>{text}</>;
  const parts: React.ReactNode[] = [];
  let cursor = 0;
  for (const [start, end, reading] of ruby) {
    if (cursor < start) parts.push(text.slice(cursor, start));
    parts.push(
      <ruby key={`${start}-${end}`}>
        {text.slice(start, end)}
        <rt>{reading}</rt>
      </ruby>
    );
    cursor = end;
  }
  if (cursor < text.length) parts.push(text.slice(cursor));
  return <>{parts}</>;
}
