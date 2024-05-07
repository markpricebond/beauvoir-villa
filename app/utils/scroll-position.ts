import { useState, useEffect } from 'react';

const useScrollPosition = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.scrollY !== 0) {
      setScrollPosition(window.scrollY);
    }
  }, []);

  useEffect(() => {
    const setScollPositionCallback = () => setScrollPosition(window.scrollY);

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', setScollPositionCallback);
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('scroll', setScollPositionCallback);
      }
    };
  }, []);

  return scrollPosition;
};

export default useScrollPosition;
