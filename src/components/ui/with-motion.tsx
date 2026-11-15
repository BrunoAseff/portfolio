import type { ComponentType } from "react";
import { LazyMotion, MotionConfig, domAnimation } from "motion/react";
// Every hydrated island owns a context; React contexts cannot cross Astro islands.
export function withMotion<T extends object>(Control: ComponentType<T>) {
  return function MotionIsland(props: T) {
    return (
      <LazyMotion features={domAnimation} strict>
        <MotionConfig reducedMotion="user">
          <Control {...props} />
        </MotionConfig>
      </LazyMotion>
    );
  };
}
