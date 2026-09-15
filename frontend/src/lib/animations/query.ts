import { gsap } from "./register";

export function queryVisible<T extends Element = HTMLElement>(
  root: Element,
  selector: string,
): T[] {
  return gsap.utils.toArray<T>(selector, root).filter((el) => {
    return el.getClientRects().length > 0;
  });
}
