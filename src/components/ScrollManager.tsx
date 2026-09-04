import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollManager() {
  const location = useLocation();
  const prevPathname = useRef(location.pathname);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const behavior: ScrollBehavior = prefersReducedMotion ? 'auto' : 'smooth';

    if (location.hash) {
      const id = decodeURIComponent(location.hash.slice(1));
      const raf = requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({ behavior, block: 'start' });
      });
      return () => cancelAnimationFrame(raf);
    }

    if (prevPathname.current !== location.pathname) {
      window.scrollTo({ top: 0 });
    }
    prevPathname.current = location.pathname;
  }, [location]);

  return null;
}
