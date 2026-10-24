import { useEffect, type DependencyList, type RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { whenIdle } from './idle';

gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };

/**
 * Run GSAP / ScrollTrigger setup scoped to `scope`, only when the visitor allows motion.
 * Setup waits for idle time: these effects are all below the fold, and ScrollTrigger measures
 * layout. Everything created inside is reverted on unmount (and if reduced motion is switched on).
 */
export function useGsap(scope: RefObject<HTMLElement | null>, setup: (root: HTMLElement) => void, deps: DependencyList = []) {
  useEffect(() => {
    const root = scope.current;
    if (!root) return;
    let mm: ReturnType<typeof gsap.matchMedia> | undefined;
    const cancel = whenIdle(() => {
      mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const ctx = gsap.context(() => setup(root), root);
        return () => ctx.revert();
      });
    });
    return () => {
      cancel();
      mm?.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
