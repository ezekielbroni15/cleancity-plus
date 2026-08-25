"use client";

import { useCallback, useSyncExternalStore } from "react";

const snapshotCache = new Map();

function readStorageValue(key, fallback) {
  if (typeof window === "undefined") return fallback;

  try {
    const storedValue = window.localStorage.getItem(key);
    if (!storedValue) return fallback;

    const cached = snapshotCache.get(key);
    if (cached?.raw === storedValue) return cached.value;

    const parsedValue = JSON.parse(storedValue);
    snapshotCache.set(key, { raw: storedValue, value: parsedValue });
    return parsedValue;
  } catch {
    return fallback;
  }
}

export function useLocalStorage(key, initialValue) {
  const subscribe = useCallback(
    (onStoreChange) => {
      const localEventName = `cleancity-storage:${key}`;
      const handleStorage = (event) => {
        if (event.type === localEventName || event.key === key) {
          onStoreChange();
        }
      };

      window.addEventListener("storage", handleStorage);
      window.addEventListener(localEventName, handleStorage);

      return () => {
        window.removeEventListener("storage", handleStorage);
        window.removeEventListener(localEventName, handleStorage);
      };
    },
    [key]
  );

  const getSnapshot = useCallback(() => readStorageValue(key, initialValue), [initialValue, key]);
  const getServerSnapshot = useCallback(() => initialValue, [initialValue]);
  const value = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setValue = useCallback(
    (nextValue) => {
      const currentValue = readStorageValue(key, initialValue);
      const resolvedValue = typeof nextValue === "function" ? nextValue(currentValue) : nextValue;

      try {
        const rawValue = JSON.stringify(resolvedValue);
        snapshotCache.set(key, { raw: rawValue, value: resolvedValue });
        window.localStorage.setItem(key, rawValue);
        window.dispatchEvent(new Event(`cleancity-storage:${key}`));
      } catch {
        // Storage can fail in private sessions; keep the app usable instead of throwing.
      }
    },
    [initialValue, key]
  );

  return [value, setValue];
}
