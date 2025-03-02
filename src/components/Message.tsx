import type { ComponentChildren } from "preact";

export default function Message({ children }: { children: ComponentChildren }) {
  return <div className="text-sky-900">{children}</div>;
}
