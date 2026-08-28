import { type ElementType, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}

/**
 * Responsive content container. Implemented by `.site-container` in globals.css:
 * always 100% wide with the page gutter applied as padding-inline
 * (1rem → 1.5rem at sm → 2rem at lg), capped so the content column never
 * exceeds 1280px. Because the gutter is padding rather than a width reduction,
 * a full-width child cannot be laid out wider than the visible area.
 */
export default function Container({
  children,
  className,
  as: Tag = "div",
}: ContainerProps) {
  return <Tag className={cn("site-container", className)}>{children}</Tag>;
}
