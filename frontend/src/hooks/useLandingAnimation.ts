"use client";

import { useGSAP } from "@gsap/react";
import type { RefObject } from "react";
import { gsap, queryVisible, registerGsapPlugins } from "@/lib/animations";

registerGsapPlugins();

export type MotionContext = {
  gsap: typeof gsap;
  root: HTMLElement;
  reduced: boolean;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  y: number;
  q: <T extends Element = HTMLElement>(selector: string) => T[];
};

export function useLandingAnimation(
  scope: RefObject<HTMLElement | null>,
  setup: (ctx: MotionContext) => void,
) {
  useGSAP(
    () => {
      const root = scope.current;
      if (!root) return;

      const mm = gsap.matchMedia();

      mm.add(
        {
          isMobile: "(max-width: 767px)",
          isTablet: "(min-width: 768px) and (max-width: 1023px)",
          isDesktop: "(min-width: 1024px)",
          reduceMotion: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          const reduced = Boolean(context.conditions?.reduceMotion);
          const isMobile = Boolean(context.conditions?.isMobile);
          const isTablet = Boolean(context.conditions?.isTablet);
          const isDesktop = Boolean(context.conditions?.isDesktop);
          const y = reduced ? 0 : isMobile ? 16 : isTablet ? 22 : 28;

          const q = <T extends Element = HTMLElement>(selector: string) =>
            queryVisible<T>(root, selector);

          setup({
            gsap,
            root,
            reduced,
            isMobile,
            isTablet,
            isDesktop,
            y,
            q,
          });
        },
      );

      return () => {
        mm.revert();
      };
    },
    { scope },
  );
}
