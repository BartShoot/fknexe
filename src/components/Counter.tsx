import type { ComponentChildren } from "preact";
import type { Signal } from "@preact/signals";
import { lazy, Suspense } from "preact/compat";

const Message = lazy(async () => import("./Message"));
const Fallback = () => <p>Loading...</p>;

type Props = {
  children: ComponentChildren;
  count: Signal<number>;
};

export default function Counter({ children, count }: Props) {
  const add = () => count.value++;
  const subtract = () => count.value--;

  return (
    <>
      <div class="flex justify-center items-center gap-4 w-fit">
        <button className="cursor-pointer" onClick={subtract}>
          -
        </button>
        <pre>{count}</pre>
        <button className="cursor-pointer" onClick={add}>
          +
        </button>
      </div>
      <Suspense fallback={Fallback}>
        <Message>{children}</Message>
      </Suspense>
    </>
  );
}
