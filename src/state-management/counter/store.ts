import { create } from "zustand";
import { mountStoreDevtool } from "simple-zustand-devtools";

interface CounterStore {
  counter: number;
  increment: () => void;
  reset: () => void;
}

const useCounterStore = create<CounterStore>((setState) => ({
  counter: 0,

  increment: () =>
    setState((store) => ({
      counter: store.counter + 1,
    })),

  reset: () =>
    setState(() => ({
      counter: 0,
    })),
}));

if (process.env.NODE_ENV === "development") {
  mountStoreDevtool("Counter store: ", useCounterStore);
}

export default useCounterStore;
