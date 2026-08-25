"use client";

import { useMemo } from "react";
import { useLocalStorage } from "./useLocalStorage";

const EMPTY_PLEDGES = [];

export function usePledges() {
  const [pledges, setPledges] = useLocalStorage("cleancity-pledges", EMPTY_PLEDGES);

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
