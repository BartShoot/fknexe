import type { ComponentChildren } from "preact";

export default function Message({ children }: { children: ComponentChildren }) {
  return <div class="text-sky-900">{children}</div>;
}
