import type { ComponentChildren } from "preact";
import type { Signal } from "@preact/signals";
import { lazy, Suspense } from "preact/compat";
import { Button } from "./Button";

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
      <div class="flex justify-center items-center gap-4 w-fit bg-teal-900/50 rounded-md">
        <Button variant="default" size="default" onClick={subtract}>
          -
        </Button>
        <pre>{count}</pre>
        <Button variant="default" size="default" onClick={add}>
          +
        </Button>
      </div>
      <Suspense fallback={Fallback}>
        <Message>{children}</Message>
      </Suspense>
    </>
  );
}
