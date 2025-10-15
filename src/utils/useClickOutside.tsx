import { useEffect } from 'react';

// Type for the handler function (can pass the event as parameter)
type Handler = (event: MouseEvent | TouchEvent) => void;

export function useClickOutside<T extends HTMLDivElement|null>(
  ref: React.RefObject<T>,
  handler: Handler
) {
  useEffect(() => {
    // Define the handler for clicks outside the referenced element
    function handleClick(event: MouseEvent | TouchEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler(event);
      }
    }

    // Attach listeners
    document.addEventListener('mousedown', handleClick);
    document.addEventListener('touchstart', handleClick);

    // Cleanup listeners on unmount
    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('touchstart', handleClick);
    };
  }, [ref, handler]); // Only re-run when ref or handler change
}
