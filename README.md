# Diakhite Air Proteger

Site officiel de Diakhite Air Proteger : ventilation, chauffage, climatisation,
hydraulique, plomberie et solutions CVC pour les bâtiments.

Production : https://air-proteger.com

Repository: https://github.com/jymax4rl/Diakhite-air-proteger

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm start` | Run the production server |
| `npm run lint` | Run ESLint |

## Routes principales

- `/` — présentation commerciale
- `/services` — vue éditoriale des services
- `/services/ventilation`
- `/services/chauffage`
- `/services/climatisation`
- `/services/hydraulique`
- `/services/plomberie`
- `/services/cvc`
- `/realisations` — projet CVC et ventilation documenté en vidéo
- `/contact` — téléphone et préparation d’une demande
- `/mentions-legales`
- `/sitemap.xml` et `/robots.txt`

Les demandes de devis pointent vers `/contact#demande`. Aucun formulaire
n’envoie ni ne stocke de données actuellement : un transport sécurisé, une
destination validée et les informations de confidentialité doivent être définis
avant son activation. Aucune adresse e-mail publique n’est configurée.

Les médias de réalisation sont décrits dans `src/data/projects.ts`. Le dépôt
conserve uniquement le poster vidéo léger ; les vidéos et photographies
publiques assainies sont livrées et optimisées par Cloudinary.
