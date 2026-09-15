"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

export function registerGsapPlugins() {
  if (registered || typeof window === "undefined") return;

  gsap.registerPlugin(useGSAP, ScrollTrigger);
  gsap.config({ nullTargetWarn: false });
  ScrollTrigger.config({ ignoreMobileResize: true });
  registered = true;
}

export { gsap, ScrollTrigger };
