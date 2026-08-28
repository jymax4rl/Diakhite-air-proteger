import Link from "next/link";
import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

interface ButtonProps {
  variant?: Variant;
  size?: Size;
  href?: string;
  external?: boolean;
  children: ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  "aria-label"?: string;
  disabled?: boolean;
  tabIndex?: number;
}

const variants: Record<Variant, string> = {
  primary:
    "bg-brand-600 text-white hover:bg-brand-500 active:bg-brand-700 border border-brand-600 hover:border-brand-500",
  outline:
    "bg-transparent text-white border border-white/30 hover:bg-white/10 hover:border-white/60",
  ghost: "bg-transparent text-current hover:bg-white/10 border border-transparent",
};

const sizes: Record<Size, string> = {
  sm: "px-4 py-2 text-sm gap-1.5",
  md: "px-6 py-3 text-base gap-2",
  lg: "px-7 py-3.5 text-base gap-2 md:px-8 md:py-4 md:text-lg",
};

export default function Button({
  variant = "primary",
  size = "md",
  href,
  external = false,
  children,
  className,
  type = "button",
  onClick,
  "aria-label": ariaLabel,
  disabled,
  tabIndex,
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center font-semibold rounded-full transition-all duration-200 select-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-400 focus-visible:outline-offset-2 disabled:opacity-60 disabled:cursor-not-allowed";

  const classes = cn(base, variants[variant], sizes[size], className);

  if (href) {
    const externalProps = external
      ? { target: "_blank", rel: "noopener noreferrer" }
      : {};
    return (
      <Link
        href={href}
        className={classes}
        aria-label={ariaLabel}
        tabIndex={tabIndex}
        {...externalProps}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      aria-label={ariaLabel}
      disabled={disabled}
      tabIndex={tabIndex}
    >
      {children}
    </button>
  );
}
