"use client";

import { useMemo } from "react";
import { useLocalStorage } from "./useLocalStorage";

export function usePledges() {
  const [pledges, setPledges] = useLocalStorage("cleancity-pledges", []);

  const addPledge = (text) => {
    setPledges((current) => [
      {
        id: crypto.randomUUID(),
        text: text.trim(),
        createdAt: new Date().toISOString()
      },
      ...current
    ]);
  };

  const pledgeCount = useMemo(() => pledges.length, [pledges]);

  return { pledges, addPledge, pledgeCount };
}
