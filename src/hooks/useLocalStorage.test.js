import { act, renderHook, waitFor } from "@testing-library/react";
import { useLocalStorage } from "./useLocalStorage";

beforeEach(() => {
  window.localStorage.clear();
});

test("useLocalStorage persists a value and reads it back correctly", async () => {
  const { result, unmount } = renderHook(() => useLocalStorage("sample-key", "first"));

  expect(result.current[0]).toBe("first");

  act(() => {
    result.current[1]("stored");
  });

  expect(window.localStorage.getItem("sample-key")).toBe(JSON.stringify("stored"));

  unmount();

  const { result: nextResult } = renderHook(() => useLocalStorage("sample-key", "fallback"));
  await waitFor(() => expect(nextResult.current[0]).toBe("stored"));
});
