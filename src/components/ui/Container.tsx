import { type ElementType, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}

/**
 * Responsive content container.
 * Width: min(100% − 2rem, 1280px) on mobile, min(100% − 4rem, 1280px) on md+.
 * Defined in globals.css as .site-container.
 */
export default function Container({
  children,
  className,
  as: Tag = "div",
}: ContainerProps) {
  return <Tag className={cn("site-container", className)}>{children}</Tag>;
}
