# PROJECT_CONTEXT.md — site Diakhite Air Proteger

**Audience :** assistant de développement découvrant le dépôt.
**Objet :** état technique et fonctionnel fiable après le repositionnement commercial Phase 1.

| Champ | Valeur |
| --- | --- |
| Branche | `cursor/phase1-commercial-repositioning-95cc` |
| Base de production | `origin/main` à `fe2f385` |
| État documenté | `WORKTREE` après l’implémentation Phase 1 |
| Domaine officiel | `https://air-proteger.com` |
| Marque publique | `Diakhite Air Proteger` |
| Dénomination légale | `AIR PROTEGER` |

Ce document décrit l’arbre source immédiatement avant son commit de documentation. Le code et la
documentation Next.js correspondant à la version installée restent prioritaires en cas d’écart.

## 1. Résumé

- Site marketing français pour les services techniques du bâtiment.
- Offre publique : ventilation, chauffage, climatisation, hydraulique, plomberie et sanitaire,
  ainsi qu’une approche coordonnée CVC.
- Stack : Next.js 16.3.2 App Router, React 19.2.8, TypeScript 5.9.3 strict et Tailwind CSS 4.3.3.
- Le catalogue typé `src/data/services.ts` est l’unique source commerciale des six services.
- Les six pages de service sont générées statiquement par `src/app/services/[slug]/page.tsx`.
- Le téléphone public confirmé est `06 51 64 46 57` (`tel:+33651644657`).
- Aucune adresse e-mail publique n’est configurée.
- Le formulaire de contact ne transmet et ne stocke aucune donnée. Son bouton reste désactivé.
- Tous les appels à devis pointent vers `/contact#demande`; aucune route `/devis` n’est créée.
- Les pages minces `/a-propos`, `/realisations` et `/blog` sont en `noindex,follow`.
- `sitemap.ts` et `robots.ts` exposent uniquement le domaine officiel.

## 2. Règles Next.js 16

Lire la documentation versionnée dans `node_modules/next/dist/docs/` avant toute modification.

- Turbopack est utilisé par défaut par `next dev` et `next build`.
- `params` est asynchrone. La route service utilise
  `PageProps<"/services/[slug]">` et attend `props.params`.
- Les helpers `PageProps` et `LayoutProps` sont globaux; ne pas les importer.
- Exécuter `npx next typegen` avant `npx tsc --noEmit`.
- `next lint` n’existe plus; le script `npm run lint` exécute ESLint directement.
- La route dynamique retourne six paramètres par `generateStaticParams`.
- `dynamicParams = false` garantit un HTTP 404 pour tout slug inconnu.
- `robots.ts` et `sitemap.ts` utilisent les conventions `MetadataRoute`.

## 3. Sources de vérité

### 3.1 Entreprise

`src/data/site.ts` centralise :

- marque publique : `Diakhite Air Proteger`;
- domaine : `https://air-proteger.com`;
- téléphone affiché : `06 51 64 46 57`;
- téléphone E.164 : `+33651644657`;
- dénomination légale : `AIR PROTEGER`;
- forme : Société par actions simplifiée (SAS);
- SIREN : `987 925 013`;
- SIRET du siège : `987 925 013 00011`;
- RCS : `987 925 013 R.C.S. Meaux`;
- TVA : `FR 94 987 925 013`;
- code APE : `43.22B`;
- siège : `10 avenue Normandie Niemen, 77290 Mitry-Mory`.

Le siège est présenté comme adresse administrative. Il ne prouve ni accueil du public ni zone
d’intervention. Ne jamais extrapoler une zone géographique à partir de cette adresse.

`organizationId` vaut `${site.url}/#organization` et sert de référence stable aux schémas Service.

### 3.2 Catalogue commercial

`src/data/services.ts` exporte :

- `serviceSlugs`;
- `ServiceSlug`;
- `ServiceIcon`;
- l’interface `Service`;
- le tableau readonly `services`;
- `getService(slug)`.

Ordre canonique :

1. `/services/ventilation` — installation, entretien, maintenance, dépannage, VMC, extraction
   d’air et ventilation professionnelle;
2. `/services/chauffage` — installation, entretien, maintenance et dépannage;
3. `/services/climatisation` — installation, entretien, maintenance et dépannage;
4. `/services/hydraulique` — réseaux hydrauliques techniques du bâtiment et du CVC;
5. `/services/plomberie` — installation, dépannage, recherche de fuite, réparation et sanitaire;
6. `/services/cvc` — coordination chauffage, ventilation, climatisation et hydraulique,
   maintenance des installations et interventions pour les professionnels.

Le CVC est une approche d’ensemble, pas une duplication des pages de discipline. L’hydraulique
technique reste distincte de la plomberie et du sanitaire.

Le catalogue alimente la page d’accueil, le hub `/services`, les pages détaillées, les options du
formulaire, le pied de page, les données structurées et le sitemap. Ne créer aucun tableau de
services concurrent.

`src/data/service-page.ts` ne contient plus de taxonomie. Il conserve seulement les thèmes
d’approche et les étapes éditoriales du hub.

## 4. Routes

| Route | État | Indexation |
| --- | --- | --- |
| `/` | page commerciale multi-services | index, follow |
| `/services` | hub éditorial | index, follow |
| `/services/ventilation` | détail statique | index, follow |
| `/services/chauffage` | détail statique | index, follow |
| `/services/climatisation` | détail statique | index, follow |
| `/services/hydraulique` | détail statique | index, follow |
| `/services/plomberie` | détail statique | index, follow |
| `/services/cvc` | hub CVC coordonné | index, follow |
| `/contact` | téléphone et préparation de demande | index, follow |
| `/mentions-legales` | informations légales vérifiées | index, follow |
| `/a-propos` | contenu en préparation | noindex, follow |
| `/realisations` | contenu en préparation | noindex, follow |
| `/blog` | contenu en préparation | noindex, follow |
| `/robots.txt` | généré par `robots.ts` | technique |
| `/sitemap.xml` | généré par `sitemap.ts` | technique |

Les anciens segments de service orientés types de bâtiment n’ont jamais été matérialisés et ne
font l’objet d’aucune redirection. Aucun détail de réalisation fictif n’existe.

Le choix `/devis` est volontaire : pas de route ni de contenu dupliqué. Le point canonique de
conversion est `/contact#demande` tant qu’aucun transport de formulaire n’est actif.

## 5. Page d’accueil

Composition dans `src/app/page.tsx` :

1. `Hero`;
2. `Services`;
3. `AboutPreview`;
4. `Projects`;
5. `ContactCTA`.

Le hero annonce immédiatement « Ventilation, plomberie et CVC pour vos bâtiments », puis le cycle
« Installation · Dépannage · Entretien · Maintenance ». Les deux actions sont le téléphone et
`/contact#demande`.

L’image de hero reste
`public/images/hero/conduits-ventilation-metalliques-professionnels.jpg`, chargée avec
`loading="eager"`, `fetchPriority="high"` et `sizes="100vw"`.

La section services affiche les six entrées canoniques et conserve le carrousel mobile qui devient
une grille à deux colonnes puis trois colonnes.

`AboutPreview` ne publie aucune statistique, ancienneté, satisfaction, garantie ou bouton vidéo.
Il explique sobrement les cinq disciplines, le CVC et le cycle d’intervention.

`Projects` ne présente aucune image de stock comme réalisation et aucune ville, date ou référence
inventée. La section signale que les références validées seront publiées plus tard.

## 6. Hub et détails de services

`src/app/services/page.tsx` conserve l’architecture éditoriale :

- hero illustré;
- introduction transversale;
- grille éditoriale issue du catalogue;
- approche;
- processus;
- CTA téléphone et demande.

Le JSON-LD du hub contient un `BreadcrumbList` et un `ItemList` de six `Service`. Chaque URL est
la route canonique, et chaque fournisseur référence l’Organization globale par `@id`.

`src/app/services/[slug]/page.tsx` :

- attend les paramètres Next.js 16;
- appelle `notFound()` si nécessaire;
- génère metadata, canonical, Open Graph et Twitter uniques;
- contient exactement un H1;
- affiche uniquement le périmètre confirmé du catalogue;
- publie un `BreadcrumbList` et un `Service` JSON-LD;
- référence l’Organization existante sans la dupliquer;
- montre sur CVC les quatre disciplines coordonnées;
- propose le téléphone et `/contact#demande`.

Aucun schéma ne contient zone desservie, prix, avis, note, certification ou qualification.

## 7. Contact, conversion et confidentialité

`src/app/contact/page.tsx` a un positionnement multi-services et une canonical officielle.

`ContactForm` :

- porte l’ancre `id="demande"` avec compensation du header fixe;
- propose les six services du catalogue;
- demande une ville de projet sans affirmer qu’elle est desservie;
- inclut nom, e-mail du demandeur, téléphone, bâtiment, message et consentement;
- n’a ni action, ni Server Action, ni endpoint, ni transport, ni stockage;
- explique que les données saisies ne sont ni transmises ni enregistrées;
- conserve un bouton désactivé.

`ContactDetails` rend le téléphone très visible et qualifie le siège comme adresse administrative.

Avant activation du formulaire, il faut fournir :

1. une destination de réception validée;
2. un transport sécurisé;
3. une protection contre les abus;
4. les durées et finalités de conservation;
5. une politique de confidentialité validée;
6. les informations exactes du responsable de traitement.

Le lien public vers une politique inexistante a été supprimé. Aucun analytics n’est installé.

## 8. SEO et données structurées

- `metadataBase` dérive de `site.url`.
- La page d’accueil a sa canonical et ses champs Open Graph/Twitter.
- Les pages services, contact et mentions légales utilisent le domaine officiel.
- Le layout publie exactement une `Organization` par page.
- Le type retenu reste `Organization`; ne pas utiliser `LocalBusiness` sans locaux clients,
  horaires et zone de service confirmés.
- Les pages détaillées publient un seul objet `Service` et un fil d’Ariane.
- Les trois pages minces sont exclues du sitemap et configurées en `noindex,follow`.
- Le sitemap comprend accueil, hub services, six détails, contact et mentions légales.
- `robots.txt` autorise l’exploration et indique le sitemap officiel.

## 9. Navigation et accessibilité

`SiteShell` reste l’unique propriétaire de l’état du menu. L’ordre DOM est impératif :

```tsx
<Navbar />
<MobileMenu />
<main />
```

Le menu doit rester frère du header, car le `backdrop-filter` du header crée un contexte
d’empilement. Le header est en z-60 et le menu en z-50.

Le menu mobile :

- est fermé par le hamburger, les liens et Échap;
- verrouille `<html>` et `<body>`;
- déplace le focus sur le premier lien;
- piège Tab et Maj+Tab;
- restaure explicitement le focus sur `#mobile-menu-toggle`;
- se ferme au passage au breakpoint desktop.

Les boutons téléphone et hamburger mesurent au moins 44 × 44 px. Les icônes décoratives sont
masquées aux technologies d’assistance. Une règle globale `prefers-reduced-motion` neutralise le
défilement fluide, les animations et les transitions.

## 10. Images et performance

Toute image rendue passe par `src/data/images.ts`.

Images locales conservées :

- hero principal;
- hero services/CVC;
- chauffage;
- climatisation;
- ventilation professionnelle;
- hydraulique;
- plomberie.

Les SVG de scaffold, anciens placeholders, images de projets fictifs et JPEG de services sans
consommateur ont été supprimés après vérification de l’absence de références.

Le travail Core Web Vitals de la branche dédiée a été intégré :

- image LCP en eager + priorité réseau haute;
- largeurs Next Image incluant 480 et 1440;
- préchargement de Geist Mono désactivé.

Les mesures locales antérieures étaient 3,041 s avant et 3,048 s après, soit du bruit de mesure :
ne pas revendiquer une amélioration LCP. La livraison prioritaire et le choix de charge utile ont
été améliorés, avec CLS resté à 0.

## 11. Design et composants

- Tailwind v4 est configuré dans `src/app/globals.css`; ne jamais ajouter
  `tailwind.config.js`.
- Les tokens de couleur sont dans `@theme`.
- Les espacements globaux utilisent `--gutter`, `--section-py`, `--band-py` et `--content-max`.
- Réutiliser `site-container`, `section-y`, `band-y`, `hero-title`, `section-title` et `lead`.
- `scroll-snap-row` possède lui-même le basculement flex vers grid à 768 px.
- Les Server Components restent la règle. Les feuilles clientes sont `SiteShell`, `MobileMenu` et
  `ProcessCarousel`.
- Ne pas déplacer le menu dans le header et ne pas convertir ses styles inline sans revérifier
  empilement, sortie animée, focus et verrouillage du scroll.

## 12. Commandes

```bash
npm install
npm run dev
npx next typegen
npx tsc --noEmit
npm run lint
npx eslint src/ --max-warnings 0
npm run build
npm start
```

`next typegen` doit précéder TypeScript sur un checkout propre.

## 13. Faits manquants et garde-fous

Ne pas inventer :

- zone géographique;
- accueil au siège;
- adresse e-mail publique;
- références de projet;
- ancienneté, statistiques ou satisfaction;
- certifications, qualifications, assurances ou garanties;
- délai de réponse ou service d’urgence;
- gratuité d’un devis;
- marques ou modèles d’équipement;
- avis, notes, tarifs ou horaires.

Travail restant dépendant d’informations externes :

- activation sécurisée du formulaire et politique de confidentialité;
- adresse e-mail publique éventuelle;
- zone d’intervention;
- références et photos de réalisations validées;
- présentation de l’entreprise;
- contenus de blog;
- certifications, assurances et avis uniquement après preuve.

## 14. Validation Phase 1

Vérifications réalisées sur l’arbre source :

- `npx next typegen` : succès;
- `npx tsc --noEmit` : succès;
- `npm run lint` : succès sur le source final;
- `npx eslint src/ --max-warnings 0` : succès;
- `npm run build` : succès, 18 pages statiques générées;
- accueil, hub, six services, contact et mentions légales : HTTP 200;
- slug de service invalide : HTTP 404;
- sitemap et robots : HTTP 200;
- crawl statique : 15 destinations/ancres internes valides;
- canonical, Open Graph, JSON-LD, sitemap et robots : domaine officiel;
- une Organization par page et un Service sur chaque détail;
- navigateur : largeurs 375, 390, 430, 768, 1024, 1280, 1440 et 1920 sans overflow;
- toutes les routes vérifiées à 390 et 1440 px : un H1, aucune image cassée, aucune erreur runtime;
- menu mobile : ouverture, focus initial, piège, Échap, restauration et scroll lock vérifiés;
- navigation desktop vérifiée à 1024 px.

Toujours refaire les validations affectées après une modification.
