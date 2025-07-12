import { useEffect, useRef } from "react";

export const useClickOutside = <T extends HTMLElement>(callback: () => void, predicate: boolean) => {
  const ref = useRef<T>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (predicate && ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    }
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    }
  }, [callback])
  return ref;
}