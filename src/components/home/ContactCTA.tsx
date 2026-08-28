import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

export default function ContactCTA() {
  return (
    <section className="bg-brand-600 band-y" aria-label="Demander un devis">
      <Container>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Left – message */}
          <div className="flex items-center gap-3 sm:gap-4 text-center sm:text-left">
            {/* Phone icon circle */}
            <div className="hidden sm:flex w-10 h-10 flex-shrink-0 rounded-full bg-white/15 items-center justify-center">
              <PhoneIcon />
            </div>
            <div>
              <p className="text-white font-bold text-base sm:text-lg leading-snug">
                Un projet&nbsp;? Parlons-en
              </p>
              <p className="text-blue-100 text-sm">Réponse rapide garantie</p>
            </div>
          </div>

          {/* Right – CTA. Full width while stacked so it is easy to tap, then
              intrinsic width once it sits beside the message. */}
          <Button
            href="/contact"
            variant="outline"
            className="border-white/50 text-white hover:bg-white/15 hover:border-white whitespace-nowrap flex-shrink-0 w-full sm:w-auto"
          >
            Demander un devis →
          </Button>
        </div>
      </Container>
    </section>
  );
}

function PhoneIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"
        fill="white"
      />
    </svg>
  );
}
