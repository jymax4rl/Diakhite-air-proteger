import { type ElementType, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type Shade = "light" | "medium" | "dark";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  shade?: Shade;
}

const shades: Record<Shade, string> = {
  light: "bg-white/5 backdrop-blur-xl border border-white/10",
  medium: "bg-white/8 backdrop-blur-xl border border-white/12",
  dark: "bg-navy-800/80 backdrop-blur-xl border border-white/8",
};

/**
 * Glassmorphism card.
 * shade="light" → near-transparent  (overlay on images)
 * shade="medium" → slightly more opaque
 * shade="dark"   → navy-tinted (for panels on dark bg)
 */
export default function GlassCard({
  children,
  className,
  as: Tag = "div",
  shade = "dark",
}: GlassCardProps) {
  return (
    <Tag className={cn(shades[shade], className)}>{children}</Tag>
  );
}
