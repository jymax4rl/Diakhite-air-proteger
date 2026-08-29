# PROJECT_CONTEXT.md — site Diakhite Air Proteger

**Audience :** assistant de développement découvrant le dépôt.
**Objet :** état technique et fonctionnel fiable après le remplacement du visuel Unsplash
d’accueil et le chargement immédiat du symbole de marque dans la barre de navigation.

| Champ | Valeur |
| --- | --- |
| Branche | `cursor/homepage-verified-media-95cc` |
| Base de production | `origin/main` à `1aa92ea` |
| État documenté | `WORKTREE` |
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
- `/realisations` présente une intervention CVC réelle avec une vidéo publique assainie et deux
  aperçus photographiques distincts.
- Les pages minces `/a-propos` et `/blog` restent en `noindex,follow`.
- `sitemap.ts` et `robots.ts` exposent uniquement le domaine officiel.
- Le logo fourni par le propriétaire alimente le lockup partagé, le schema Organization et les
  icônes d’application (`favicon.ico`, `icon.jpg`, `apple-icon.png`).

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
| `/realisations` | intervention CVC et ventilation réelle | index, follow |
| `/blog` | contenu en préparation | noindex, follow |
| `/robots.txt` | généré par `robots.ts` | technique |
| `/sitemap.xml` | généré par `sitemap.ts` | technique |
| `/favicon.ico` | fallback de marque 16, 32 et 48 px | technique |
| `/icon.jpg` | icône d’application 512 px | technique |
| `/apple-icon.png` | icône Apple 180 px | technique |

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
Il explique sobrement les cinq disciplines, le CVC et le cycle d’intervention. L’illustration
réutilise `images.servicePage.hydraulicNetwork` (photographie locale déjà au catalogue), chargée
paresseusement. Aucune image Unsplash n’est servie. Le bouton renvoie vers `/services`, car
`/a-propos` reste en préparation.

`Projects` présente le poster local de la réalisation CVC validée et renvoie vers
`/realisations#intervention-cvc-toiture`. La page d’accueil ne contient aucun élément `<video>` :
le poster est chargé paresseusement sous la ligne de flottaison.

## 6. Réalisations et médias Cloudinary

`src/data/projects.ts` est la source typée du projet publié. Elle centralise titre, description,
texte alternatif, durée, date d’import confirmée, identifiant public Cloudinary et URL de livraison.
Le helper local construit l’URL depuis le cloud `dyrjziqft`, la version de l’asset et la
transformation `f_mp4,q_auto:good,vc_h264`. Aucun SDK, secret ou identifiant privé n’est exposé.
Une source WebM n’est pas générée : le MP4 H.264 de 4,1 Mo est compatible avec les navigateurs
cibles, et une variante supplémentaire augmenterait le coût de transformation sans gain mesuré.

La route `/realisations` :

- contient exactement un H1 et un projet éditorial ancré;
- affiche un poster local via `next/image` et un lecteur HTML5 natif;
- utilise `controls`, `playsInline`, `muted` et `preload="none"`, sans autoplay ni boucle;
- accompagne la vidéo silencieuse d’une description textuelle; aucune piste de sous-titres n’est
  nécessaire puisqu’il n’y a ni audio ni parole;
- relie les services CVC et ventilation ainsi que `/contact#demande`;
- publie metadata canonique, Open Graph/Twitter et un `VideoObject` fondé sur les faits de l’asset.

Le montage public dure 18,8 s, mesure 720 × 1280 et contient uniquement une piste H.264 yuv420p à
30 i/s. L’audio, les chapitres, les flux de données et les métadonnées source ont été supprimés
avant import. Seul le poster léger
`public/images/realisations/intervention-cvc-ventilation-toiture.jpg` est versionné; aucune vidéo
n’est commise.

L’asset public assaini est
`air-proteger/videos/intervention-cvc-ventilation-toiture` dans `Air proteger/Videos`. L’original
est conservé dans Cloudinary sous
`air-proteger/private/intervention-cvc-toiture-original`, avec le type de livraison
`authenticated`; son ancienne URL publique a été invalidée. Ne jamais remettre cet original en
livraison publique ni copier ses métadonnées.

`galleryPhotos` centralise séparément les deux photographies visibles, avec asset ID public,
public ID sémantique, version, titre, alt, légende, dimensions et URLs Cloudinary. Ces images sont
présentées comme aperçus d’interventions techniques distincts; aucune relation avec le chantier de
la vidéo n’est affirmée.

- `air-proteger/realisations/reseaux-ventilation-plafond` : master public assaini 1500 × 2000,
  recadrage éditorial `c_fill,g_north,ar_16:9,w_1600`;
- `air-proteger/realisations/gaines-ventilation-local-technique` : master public assaini
  2000 × 1500, recadrage éditorial `c_fill,g_auto,ar_4:3,w_1600`.

Les URLs visibles ajoutent `f_auto,q_auto:good`; `next/image` réserve les proportions, produit les
tailles responsives et charge les deux images paresseusement. `next.config.ts` autorise uniquement
`https://res.cloudinary.com/dyrjziqft/image/upload/**` pour ces images distantes. L’image 16:9 est
également le visuel Open Graph/Twitter de `/realisations`; le `VideoObject` reste inchangé et aucun
`ImageObject` redondant n’est publié.

Les deux fichiers publics proviennent de copies transformées dont les métadonnées EXIF, XMP, GPS et
de localisation ont été supprimées. Les originaux haute définition restent conservés avec le type
`authenticated` sous :

- `air-proteger/private/reseaux-ventilation-plafond-original`;
- `air-proteger/private/gaines-ventilation-local-technique-original`.

Les trois photos retenues par l’audit pour non-publication — `IMG_0120_rr9ots`,
`IMG_0113_c6jyth` et `IMG_0131_e9wfim` — restent hors du code et n’ont pas été renommées,
supprimées ou modifiées par cette intégration.

## 7. Hub et détails de services

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

## 8. Contact, conversion et confidentialité

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

## 9. SEO et données structurées

- `metadataBase` dérive de `site.url`.
- La page d’accueil a sa canonical et ses champs Open Graph/Twitter.
- Les pages services, contact et mentions légales utilisent le domaine officiel.
- Le layout publie exactement une `Organization` par page.
- Le type retenu reste `Organization`; ne pas utiliser `LocalBusiness` sans locaux clients,
  horaires et zone de service confirmés.
- Les pages détaillées publient un seul objet `Service` et un fil d’Ariane.
- Les deux pages minces restantes sont exclues du sitemap et configurées en `noindex,follow`.
- Le sitemap comprend accueil, hub services, six détails, réalisations, contact et mentions légales.
- `/realisations` publie un `VideoObject` avec nom, description, poster, date d’import, durée,
  contenu optimisé et référence à l’Organization globale.
- `robots.txt` autorise l’exploration et indique le sitemap officiel.

## 10. Navigation et accessibilité

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

## 11. Images et performance

Toute image rendue passe par `src/data/images.ts`, y compris le logo public et sa variante blanche
utilisée sur les surfaces sombres.

Les icônes d’application font exception à ce registre : Next.js exige leur colocalisation dans
`src/app`. `favicon.ico` fournit le fallback navigateur multi-format, `icon.jpg` la version 512 px et
`apple-icon.png` la version tactile 180 px. Ces trois fichiers utilisent le symbole maison et
turbine fourni par le propriétaire. Next.js détecte automatiquement ces conventions et injecte
leurs liens dans le `<head>`; ne pas les remplacer par des metadata manuelles.

`src/components/ui/BrandLogo.tsx` est l’unique lockup visuel du header et du footer. Il affiche la
variante blanche transparente `images.logo.markLight` sur le bleu de marque, puis les deux lignes
de nom provenant de `site.brand`. La barre de navigation passe `loading="eager"` : le symbole est
au-dessus de la ligne de flottaison et ne doit pas attendre le chargement paresseux. Le pied de
page conserve la valeur par défaut `lazy`. Ne pas ajouter `preload` ni `fetchPriority="high"` sur
ce pictogramme de 28 px, afin de ne pas concurrencer l’image LCP du hero. Ne pas réintroduire des
SVG `LogoIcon` dupliqués.

Le schema Organization expose `images.logo.primary` comme logo public absolu. L’image Open Graph
reste la photographie du hero : le logo n’est pas substitué à l’image éditoriale de partage.

Images locales conservées :

- hero principal;
- hero services/CVC;
- chauffage;
- climatisation;
- ventilation professionnelle;
- hydraulique;
- plomberie.
- poster de la réalisation CVC en toiture.

Les deux photos de galerie ne sont pas dupliquées localement : leurs masters publics assainis et
leurs transformations optimisées sont servis par Cloudinary. `next.config.ts` n’autorise comme
motif distant que `https://res.cloudinary.com/dyrjziqft/image/upload/**`. Le motif Unsplash a été
retiré : plus aucune page ne le consomme.

Les SVG de scaffold, anciens placeholders, images distantes Unsplash, images de projets fictifs et
JPEG de services sans consommateur ont été supprimés après vérification de l’absence de références.

Le travail Core Web Vitals de la branche dédiée a été intégré :

- image LCP en eager + priorité réseau haute;
- largeurs Next Image incluant 480 et 1440;
- préchargement de Geist Mono désactivé.

Les mesures locales antérieures étaient 3,041 s avant et 3,048 s après, soit du bruit de mesure :
ne pas revendiquer une amélioration LCP. La livraison prioritaire et le choix de charge utile ont
été améliorés, avec CLS resté à 0.

## 12. Design et composants

- Tailwind v4 est configuré dans `src/app/globals.css`; ne jamais ajouter
  `tailwind.config.js`.
- Les tokens de couleur sont dans `@theme`.
- Les espacements globaux utilisent `--gutter`, `--section-py`, `--band-py` et `--content-max`.
- Réutiliser `site-container`, `section-y`, `band-y`, `hero-title`, `section-title` et `lead`.
- `scroll-snap-row` possède lui-même le basculement flex vers grid à 768 px.
- Les Server Components restent la règle. Les feuilles clientes sont `SiteShell`, `MobileMenu` et
  `ProcessCarousel`.
- `BrandLogo` centralise le symbole maison/turbine et le wordmark utilisés par `Navbar` et `Footer`.
  `Navbar` lui transmet `loading="eager"` ; `Footer` laisse le chargement paresseux.
- Ne pas déplacer le menu dans le header et ne pas convertir ses styles inline sans revérifier
  empilement, sortie animée, focus et verrouillage du scroll.

## 13. Commandes

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

## 14. Faits manquants et garde-fous

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
- autres références et photos de réalisations validées;
- présentation de l’entreprise;
- contenus de blog;
- certifications, assurances et avis uniquement après preuve.

## 15. Validation de la réalisation vidéo

Vérifications réalisées sur l’arbre source :

- `npx next typegen` : succès;
- `npx tsc --noEmit` : succès;
- `npm run lint` : succès sur le source final;
- `npx eslint src/ --max-warnings 0` : succès;
- `npm run build` : succès, 20 pages statiques générées;
- build : routes metadata `/favicon.ico`, `/icon.jpg` et `/apple-icon.png` générées;
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
- `/realisations` : HTTP 200, indexable, un H1 et `VideoObject` valide;
- Cloudinary : asset public et transformation H.264 optimisée en HTTP 200;
- téléchargement public : 720 × 1280, 18,8 s, H.264 yuv420p, sans audio ni métadonnée
  identifiante;
- ancien URL de l’original : HTTP 404; URL authenticated non signée : HTTP 401;
- navigateur : `/realisations` vérifiée à 375, 390, 430, 768, 1440 et 1920 px sans overflow;
- lecteur au repos sans requête vidéo, puis lecture réussie sur interaction, sans erreur console;
- accueil : aucun `<video>` et aucune requête Cloudinary vidéo.
- galerie : deux images publiques assainies, avec masters de 864 783 et 481 917 octets;
- copies publiques et anciennes URLs versionnées : contenu identique et sans marqueur EXIF, XMP,
  GPS ou localisation;
- archives originales non signées : HTTP 401;
- recadrages Cloudinary 1600 × 900 et 1600 × 1200 : HTTP 200;
- galerie vérifiée à 375, 390, 430, 768, 1440 et 1920 px : proportions correctes, lazy loading,
  aucun débordement, aucune image cassée et aucune erreur console;
- accueil inchangé : aucune requête aux deux photos de galerie et aucune requête vidéo.

Toujours refaire les validations affectées après une modification.
