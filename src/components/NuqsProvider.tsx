import { NuqsAdapter } from "nuqs/adapters/react";
import type { ComponentChildren } from "preact";

export function NuqsProvider({ children }: { children: ComponentChildren }) {
  return <NuqsAdapter>{children}</NuqsAdapter>;
}
