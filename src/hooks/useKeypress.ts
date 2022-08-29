import { useEffect } from "react";

const useKeypress = (key: string, func: () => void) => {
  useEffect(() => {
    const onKeyup = (event: KeyboardEvent) => {
      if (event.key === key) {
        func();
      }
    };
    window.addEventListener("keyup", onKeyup);
    return () => window.removeEventListener("keyup", onKeyup);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default useKeypress;
