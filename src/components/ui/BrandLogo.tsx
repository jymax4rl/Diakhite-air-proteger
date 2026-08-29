import Image from "next/image";
import { images } from "@/data/images";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

interface BrandLogoProps {
  className?: string;
  markClassName?: string;
  compact?: boolean;
  /** Navbar lockup is above the fold; keep footer instances lazy. */
  loading?: "eager" | "lazy";
}

/**
 * Shared Diakhite Air Proteger lockup.
 *
 * The mark is decorative because the adjacent wordmark supplies the accessible
 * brand name. Links wrapping this component provide their own aria-label.
 */
export default function BrandLogo({
  className,
  markClassName,
  compact = false,
  loading = "lazy",
}: BrandLogoProps) {
  return (
    <span className={cn("inline-flex min-w-0 items-center gap-2.5", className)}>
      <span
        className={cn(
          "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-600",
          markClassName,
        )}
      >
        <Image
          src={images.logo.markLight}
          alt=""
          width={28}
          height={28}
          loading={loading}
          className="h-7 w-7 object-contain"
        />
      </span>
      <span className="min-w-0 leading-none">
        <span
          className={cn(
            "block whitespace-nowrap font-bold tracking-tight text-white",
            compact ? "text-[13px] sm:text-[15px]" : "text-[15px]",
          )}
        >
          {site.brand.logoPrimary}
        </span>
        <span
          className={cn(
            "block font-bold uppercase text-brand-400",
            compact
              ? "text-[8px] tracking-[0.14em] sm:text-[9px] sm:tracking-[0.15em]"
              : "text-[9px] tracking-[0.15em]",
          )}
        >
          {site.brand.logoSecondary}
        </span>
      </span>
    </span>
  );
}
