import { openDB, DBSchema, IDBPDatabase } from "idb";

interface JLPTDB extends DBSchema {
  decks: { key: string; value: { id: string; title: string; level: "N5" | "N4"; counts?: any } };
  items: { key: string; value: { id: string; type: "kana" | "kanji" | "vocab" | "grammar"; data: any } };
  cards: { key: string; value: import("@/lib/srs/types").ReviewCard };
  audio: { key: string; value: Blob };
  prefs: { key: string; value: any };
}

let dbPromise: Promise<IDBPDatabase<JLPTDB>> | null = null;
export function db() {
  if (!dbPromise) {
    dbPromise = openDB<JLPTDB>("jlpt-n5n4", 1, {
      upgrade(db) {
        db.createObjectStore("decks", { keyPath: "id" });
        db.createObjectStore("items", { keyPath: "id" });
        db.createObjectStore("cards", { keyPath: "id" });
        db.createObjectStore("audio");
        db.createObjectStore("prefs");
      },
    });
  }
  return dbPromise;
}
