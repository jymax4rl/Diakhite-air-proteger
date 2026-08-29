import Link from "next/link";
import { site } from "@/data/site";

export default function ContactDetails() {
  return (
    <aside
      className="rounded-2xl border border-white/10 bg-navy-800 p-6 text-white shadow-xl shadow-navy-950/20 sm:p-8 lg:sticky lg:top-24"
      aria-labelledby="contact-details-heading"
    >
      <p className="text-sm font-semibold uppercase tracking-[0.15em] text-brand-400">
        Contact direct
      </p>
      <h2 id="contact-details-heading" className="mt-3 text-2xl font-bold tracking-tight">
        Appeler maintenant
      </h2>
      <p className="mt-4 text-sm leading-6 text-slate-300">
        Le téléphone est le canal de contact disponible pendant la préparation de l’envoi en
        ligne.
      </p>

      <address className="mt-8 not-italic">
        <ul className="grid gap-4">
          <li>
            <a
              href={site.contact.phone.href}
              className="group flex min-h-14 items-center gap-4 rounded-xl border border-brand-400/50 bg-brand-600/15 p-4 transition-colors hover:border-brand-400 hover:bg-brand-600/25 focus-visible:outline-brand-400"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-brand-600 text-white">
                <PhoneIcon />
              </span>
              <span className="min-w-0">
                <span className="block text-xs font-semibold uppercase tracking-[0.12em] text-slate-300">
                  Téléphone
                </span>
                <span className="mt-1 block text-base font-semibold text-white">
                  {site.contact.phone.display}
                </span>
              </span>
            </a>
          </li>
          <li className="flex min-h-14 items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-4">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-brand-600 text-white">
              <LocationIcon />
            </span>
            <span>
              <span className="block text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
                Siège social
              </span>
              <span className="mt-1 block text-sm font-semibold text-white sm:text-base">
                {site.company.registeredAddress.display}
              </span>
              <span className="mt-1 block text-xs leading-5 text-slate-400">
                Adresse administrative, sans indication d’accueil du public.
              </span>
            </span>
          </li>
        </ul>
      </address>

      <div className="mt-8 border-t border-white/10 pt-6">
        <h3 className="text-sm font-semibold text-white">Préparer votre échange</h3>
        <p className="mt-2 text-sm leading-6 text-slate-300">
          Consultez les solutions proposées pour identifier le sujet le plus proche de votre
          besoin.
        </p>
        <Link
          href="/services"
          className="mt-4 inline-flex min-h-11 items-center font-semibold text-brand-300 underline decoration-brand-400/40 underline-offset-4 transition-colors hover:text-white"
        >
          Découvrir nos services <span aria-hidden="true">&nbsp;→</span>
        </Link>
      </div>
    </aside>
  );
}

function PhoneIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M4 3h2.5l1.3 3.7-1.6 1.4a12.8 12.8 0 0 0 5.7 5.7l1.4-1.6L17 13.5V16a1 1 0 0 1-1 1A13 13 0 0 1 3 4a1 1 0 0 1 1-1Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M16 8c0 4.5-6 9-6 9s-6-4.5-6-9a6 6 0 1 1 12 0Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="10" cy="8" r="2" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
