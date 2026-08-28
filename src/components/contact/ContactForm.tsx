import type { ReactNode } from "react";
import { site } from "@/data/site";

const fieldClassName =
  "min-h-12 w-full max-w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base text-navy-900 shadow-sm transition-colors placeholder:text-slate-400 hover:border-slate-400 focus:border-brand-600 focus:outline-2 focus:outline-brand-600 focus:outline-offset-2 disabled:cursor-not-allowed disabled:bg-slate-100";

export default function ContactForm() {
  return (
    <section aria-labelledby="contact-form-heading">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.15em] text-brand-700">
          Votre demande
        </p>
        <h2 id="contact-form-heading" className="section-title mt-3 text-navy-800">
          Présentez-nous votre besoin
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
          L’envoi en ligne n’est pas encore disponible. Ce formulaire présente les informations
          utiles à préparer&nbsp;; pour nous écrire maintenant, utilisez l’adresse e-mail indiquée
          dans la rubrique «&nbsp;Nos coordonnées&nbsp;».
        </p>
      </div>

      <form className="grid gap-6" aria-describedby="form-delivery-note">
        <p
          id="form-delivery-note"
          className="rounded-xl border border-brand-300 bg-brand-100 px-4 py-3 text-sm leading-6 text-navy-800"
        >
          Les informations saisies ci-dessous ne sont ni transmises ni enregistrées. L’envoi en
          ligne sera activé lorsqu’un service de traitement sécurisé sera disponible. Pour
          transmettre votre demande aujourd’hui, écrivez à{" "}
          <a
            href={site.contact.email.href}
            className="font-semibold text-brand-700 underline decoration-brand-600/40 underline-offset-4"
          >
            {site.contact.email.address}
          </a>
          .
        </p>

        <div className="grid gap-6 sm:grid-cols-2">
          <Field label="Nom complet" htmlFor="full-name" required>
            <input
              id="full-name"
              name="fullName"
              type="text"
              autoComplete="name"
              required
              aria-required="true"
              className={fieldClassName}
            />
          </Field>

          <Field label="E-mail" htmlFor="email" required hint="Exemple : nom@entreprise.fr">
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              inputMode="email"
              required
              aria-required="true"
              aria-describedby="email-hint"
              className={fieldClassName}
            />
          </Field>

          <Field label="Téléphone" htmlFor="phone" hint="Facultatif">
            <input
              id="phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              inputMode="tel"
              aria-describedby="phone-hint"
              className={fieldClassName}
            />
          </Field>

          <Field label="Type de projet ou service" htmlFor="project-type">
            <select
              id="project-type"
              name="projectType"
              defaultValue=""
              className={fieldClassName}
            >
              <option value="">Sélectionner une option</option>
              <option value="installation-vmc">Installation de VMC</option>
              <option value="ventilation-professionnelle">Ventilation professionnelle</option>
              <option value="ventilation-industrielle">Ventilation industrielle</option>
              <option value="extraction-traitement-air">Extraction ou traitement de l’air</option>
              <option value="desenfumage">Désenfumage</option>
              <option value="maintenance-entretien">Maintenance ou entretien</option>
              <option value="renovation">Rénovation d’une installation</option>
              <option value="autre">Autre besoin</option>
            </select>
          </Field>

          <Field label="Type de bâtiment" htmlFor="building-type">
            <select
              id="building-type"
              name="buildingType"
              defaultValue=""
              className={fieldClassName}
            >
              <option value="">Sélectionner une option</option>
              <option value="logement-individuel">Maison ou logement individuel</option>
              <option value="residence-collective">Résidence ou habitat collectif</option>
              <option value="bureaux-commerce">Bureaux ou commerce</option>
              <option value="local-activite">Local d’activité</option>
              <option value="site-industriel">Site industriel</option>
              <option value="autre">Autre bâtiment</option>
            </select>
          </Field>
        </div>

        <Field
          label="Message / description du besoin"
          htmlFor="message"
          required
          hint="Précisez si possible les espaces concernés, leurs usages et l’installation existante."
        >
          <textarea
            id="message"
            name="message"
            rows={7}
            required
            aria-required="true"
            aria-describedby="message-hint"
            className={`${fieldClassName} min-h-40 resize-y`}
          />
        </Field>

        <div className="flex items-start gap-3">
          <input
            id="consent"
            name="consent"
            type="checkbox"
            required
            aria-required="true"
            className="mt-0.5 h-6 w-6 shrink-0 rounded border-slate-400 text-brand-600 accent-brand-600"
          />
          <label htmlFor="consent" className="text-sm leading-6 text-slate-700">
            J’accepte que les informations que je choisis de transmettre soient utilisées
            uniquement pour répondre à ma demande. <span aria-hidden="true">*</span>
            <span className="sr-only"> Champ obligatoire.</span>
          </label>
        </div>

        <div className="flex flex-col items-start gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:items-center">
          <button
            type="submit"
            disabled
            aria-describedby="submit-help"
            className="inline-flex min-h-12 w-full cursor-not-allowed items-center justify-center rounded-full border border-slate-300 bg-slate-200 px-7 py-3 text-center font-semibold text-slate-600 sm:w-auto"
          >
            Envoi en ligne prochainement
          </button>
          <p id="submit-help" className="text-sm leading-6 text-slate-500">
            Aucun message ne part depuis ce formulaire pour le moment.
          </p>
        </div>
      </form>
    </section>
  );
}

interface FieldProps {
  label: string;
  htmlFor: string;
  required?: boolean;
  hint?: string;
  children: ReactNode;
}

function Field({ label, htmlFor, required = false, hint, children }: FieldProps) {
  return (
    <div className="grid min-w-0 content-start gap-2">
      <label htmlFor={htmlFor} className="text-sm font-semibold text-navy-800">
        {label}
        {required && (
          <>
            {" "}
            <span aria-hidden="true" className="text-brand-700">
              *
            </span>
            <span className="sr-only"> Champ obligatoire.</span>
          </>
        )}
      </label>
      {children}
      {hint && (
        <p id={`${htmlFor}-hint`} className="text-sm leading-5 text-slate-500">
          {hint}
        </p>
      )}
    </div>
  );
}
