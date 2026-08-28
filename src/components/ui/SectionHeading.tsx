import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  align?: "left" | "center";
  /** "dark" = white title on dark bg; "light" = navy title on light bg */
  theme?: "dark" | "light";
  className?: string;
  headingId?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  theme = "dark",
  className,
  headingId,
}: SectionHeadingProps) {
  const isDark = theme === "dark";

  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            "text-sm font-semibold tracking-[0.15em] uppercase mb-3",
            isDark ? "text-brand-400" : "text-brand-600"
          )}
        >
          {eyebrow}
        </p>
      )}
      <h2
        id={headingId}
        className={cn(
          "section-title mb-4",
          isDark ? "text-white" : "text-navy-800"
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "lead",
            isDark ? "text-slate-400" : "text-slate-600"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
