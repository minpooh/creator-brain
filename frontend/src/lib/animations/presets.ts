import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type Gsap = typeof gsap;
type TweenTarget = gsap.TweenTarget;
type Stagger = number | gsap.StaggerVars;

type FadeUpOptions = {
  y?: number;
  duration?: number;
  delay?: number;
  stagger?: Stagger;
  ease?: string;
  reduced?: boolean;
};

function hasTargets(targets: TweenTarget): boolean {
  if (!targets) return false;
  if (Array.isArray(targets) && targets.length === 0) return false;
  return true;
}

function isSectionHalfwayInView(el: HTMLElement) {
  const rect = el.getBoundingClientRect();
  return rect.top + rect.height / 2 <= window.innerHeight && rect.bottom > 80;
}

export function fadeUpSection(
  instance: Gsap,
  root: HTMLElement,
  {
    y = 28,
    duration = 1,
    reduced = false,
    withScrollTrigger = true,
  }: {
    y?: number;
    duration?: number;
    reduced?: boolean;
    withScrollTrigger?: boolean;
  } = {},
): gsap.core.Timeline {
  const tl = instance.timeline({
    paused: !reduced && withScrollTrigger,
    defaults: { ease: "power2.out" },
  });

  if (reduced) {
    tl.to(root, { opacity: 1, duration: 0.2 });
    return tl;
  }

  instance.set(root, { opacity: 0, y });
  tl.to(root, { opacity: 1, y: 0, duration, clearProps: "transform" });

  if (!withScrollTrigger) {
    tl.play();
    return tl;
  }

  let played = false;
  const play = () => {
    if (played) return;
    played = true;
    tl.play();
  };

  ScrollTrigger.create({
    trigger: root,
    start: "center bottom",
    once: true,
    onEnter: () => {
      if (window.scrollY < 8) return;
      play();
    },
  });

  ScrollTrigger.create({
    start: 8,
    once: true,
    onEnter: () => {
      if (isSectionHalfwayInView(root)) {
        play();
      }
    },
  });

  return tl;
}

export function fadeUp(
  instance: Gsap,
  targets: TweenTarget,
  {
    y = 28,
    duration = 0.85,
    delay = 0,
    stagger,
    ease = "power2.out",
    reduced = false,
  }: FadeUpOptions = {},
) {
  if (!hasTargets(targets)) return;

  if (reduced) {
    return instance.fromTo(
      targets,
      { opacity: 0 },
      { opacity: 1, duration: 0.2, delay, stagger, ease: "none" },
    );
  }

  return instance.fromTo(
    targets,
    { opacity: 0, y },
    { opacity: 1, y: 0, duration, delay, stagger, ease },
  );
}

export function scaleReveal(
  instance: Gsap,
  targets: TweenTarget,
  {
    reduced = false,
    duration = 0.95,
    delay = 0,
    scale = 0.94,
  }: {
    reduced?: boolean;
    duration?: number;
    delay?: number;
    scale?: number;
  } = {},
) {
  if (!hasTargets(targets)) return;

  if (reduced) {
    return instance.fromTo(
      targets,
      { opacity: 0 },
      { opacity: 1, duration: 0.2, delay, ease: "none" },
    );
  }

  return instance.fromTo(
    targets,
    { opacity: 0, scale },
    { opacity: 1, scale: 1, duration, delay, ease: "power2.out" },
  );
}

export function drawStroke(
  instance: Gsap,
  paths: Element[],
  {
    duration = 0.55,
    stagger = 0.14,
    delay = 0,
    reduced = false,
  }: {
    duration?: number;
    stagger?: number;
    delay?: number;
    reduced?: boolean;
  } = {},
) {
  if (!paths.length) return;

  if (reduced) {
    instance.set(paths, { strokeDashoffset: 0, opacity: 1 });
    return;
  }

  instance.fromTo(
    paths,
    { strokeDashoffset: 1, opacity: 1 },
    {
      strokeDashoffset: 0,
      duration,
      stagger,
      delay,
      ease: "power1.inOut",
    },
  );
}

export function animateProgressBars(
  instance: Gsap,
  bars: HTMLElement[],
  {
    reduced = false,
    duration = 1.2,
    stagger = 0.16,
  }: {
    reduced?: boolean;
    duration?: number;
    stagger?: number;
  } = {},
) {
  bars.forEach((bar, i) => {
    const percent = Number(bar.dataset.percent ?? 0);
    const valueEl = bar
      .closest("[data-progress]")
      ?.querySelector<HTMLElement>("[data-progress-value]");

    if (reduced) {
      instance.set(bar, { scaleX: percent / 100 });
      if (valueEl) valueEl.textContent = `${percent}%`;
      return;
    }

    instance.fromTo(
      bar,
      { scaleX: 0 },
      {
        scaleX: percent / 100,
        duration,
        delay: i * stagger,
        ease: "power2.out",
      },
    );

    if (!valueEl) return;

    const counter = { val: 0 };
    instance.to(counter, {
      val: percent,
      duration,
      delay: i * stagger,
      ease: "power2.out",
      onUpdate: () => {
        valueEl.textContent = `${Math.round(counter.val)}%`;
      },
    });
  });
}
