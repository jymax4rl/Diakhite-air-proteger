"use client";

import {
  Children,
  type ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

interface ProcessCarouselProps {
  children: ReactNode;
  stepLabels: readonly string[];
}

export default function ProcessCarousel({
  children,
  stepLabels,
}: ProcessCarouselProps) {
  const items = Children.toArray(children);
  const scrollRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Array<HTMLDivElement | null>>([]);
  const frameRef = useRef<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const syncActiveIndex = useCallback(() => {
    frameRef.current = null;

    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const containerRect = scrollContainer.getBoundingClientRect();
    const containerCenter = containerRect.left + containerRect.width / 2;
    let closestIndex = 0;
    let closestDistance = Number.POSITIVE_INFINITY;

    itemRefs.current.forEach((item, index) => {
      if (!item) return;

      const itemRect = item.getBoundingClientRect();
      const itemCenter = itemRect.left + itemRect.width / 2;
      const distance = Math.abs(itemCenter - containerCenter);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    setActiveIndex((current) =>
      current === closestIndex ? current : closestIndex,
    );
  }, []);

  const scheduleActiveIndexSync = useCallback(() => {
    if (frameRef.current !== null) return;
    frameRef.current = requestAnimationFrame(syncActiveIndex);
  }, [syncActiveIndex]);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    syncActiveIndex();

    const resizeObserver = new ResizeObserver(scheduleActiveIndexSync);
    resizeObserver.observe(scrollContainer);
    itemRefs.current.forEach((item) => {
      if (item) resizeObserver.observe(item);
    });

    return () => {
      resizeObserver.disconnect();
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
  }, [scheduleActiveIndexSync, syncActiveIndex]);

  const scrollToStep = (index: number) => {
    const scrollContainer = scrollRef.current;
    const item = itemRefs.current[index];
    if (!scrollContainer || !item) return;

    const containerRect = scrollContainer.getBoundingClientRect();
    const itemRect = item.getBoundingClientRect();
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    scrollContainer.scrollTo({
      left: scrollContainer.scrollLeft + itemRect.left - containerRect.left,
      behavior: reducedMotion ? "auto" : "smooth",
    });
  };

  return (
    <>
      <div
        ref={scrollRef}
        className="scroll-snap-row md:grid-cols-4"
        role="list"
        aria-label="Notre processus en 4 étapes"
        onScroll={scheduleActiveIndexSync}
      >
        {items.map((item, index) => (
          <div
            key={stepLabels[index]}
            ref={(node) => {
              itemRefs.current[index] = node;
            }}
            role="listitem"
            className="scroll-snap-item w-[180px] sm:w-[200px] md:w-auto flex flex-col gap-2"
          >
            {item}
          </div>
        ))}
      </div>

      <div className="flex h-8 md:hidden items-center justify-center">
        {stepLabels.map((label, index) => {
          const isActive = activeIndex === index;

          return (
            <button
              key={label}
              type="button"
              className="flex size-11 items-center justify-center"
              aria-label={`Aller à l’étape ${index + 1} : ${label}`}
              aria-current={isActive ? "step" : undefined}
              onClick={() => scrollToStep(index)}
            >
              <span
                className={`h-1.5 rounded-full transition-all duration-200 motion-reduce:transition-none ${
                  isActive ? "w-5 bg-brand-500" : "w-1.5 bg-white/20"
                }`}
                aria-hidden="true"
              />
            </button>
          );
        })}
      </div>
    </>
  );
}
