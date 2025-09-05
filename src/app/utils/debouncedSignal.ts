import { Signal, signal, effect } from "@angular/core";

export function debouncedSignal<T>(source: Signal<T>, delay: number) {
  const result = signal<T>(source());
  let timeout: any;

  effect((onCleanup) => {
    const value = source();
    clearTimeout(timeout); // Clear previous timeout
    timeout = setTimeout(() => result.set(value), delay);
    onCleanup(() => clearTimeout(timeout)); // Cleanup on next input change, იცავს cleanup/memory leak-ს
  });

  return result;
}
