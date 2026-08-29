import { images } from "@/data/images";

const cloudinary = {
  cloudName: "dyrjziqft",
  deliveryType: "upload",
} as const;

interface CloudinaryVideoSource {
  publicId: string;
  version: number;
  format: "mp4";
  transformation: string;
  type: "video/mp4";
}

function cloudinaryVideoUrl(source: CloudinaryVideoSource) {
  return [
    `https://res.cloudinary.com/${cloudinary.cloudName}`,
    "video",
    cloudinary.deliveryType,
    source.transformation,
    `v${source.version}`,
    `${source.publicId}.${source.format}`,
  ].join("/");
}

interface CloudinaryImageSource {
  publicId: string;
  version: number;
  transformation: string;
  format?: "jpg";
}

function cloudinaryImageUrl(source: CloudinaryImageSource) {
  return [
    `https://res.cloudinary.com/${cloudinary.cloudName}`,
    "image",
    cloudinary.deliveryType,
    source.transformation,
    `v${source.version}`,
    `${source.publicId}.${source.format ?? "jpg"}`,
  ].join("/");
}

const roofInterventionSource = {
  publicId: "air-proteger/videos/intervention-cvc-ventilation-toiture",
  version: 1788007446,
  format: "mp4",
  transformation: "f_mp4,q_auto:good,vc_h264",
  type: "video/mp4",
} as const satisfies CloudinaryVideoSource;

export interface Project {
  id: string;
  title: string;
  description: string;
  visualDescription: string;
  poster: string;
  posterAlt: string;
  cloudinaryPublicId: string;
  video: {
    source: {
      src: string;
      type: "video/mp4";
    };
    width: number;
    height: number;
    durationSeconds: number;
    durationIso: string;
    uploadDate: string;
  };
}

export const projects = [
  {
    id: "intervention-cvc-toiture",
    title: "Intervention CVC et ventilation en toiture",
    description:
      "Une intervention technique autour d’un équipement CVC et de réseaux de ventilation en toiture, avec gaines rectangulaires galvanisées et conduit spiralé.",
    visualDescription:
      "La vidéo silencieuse montre différents plans des gaines métalliques, de l’équipement technique, d’un raccord étanché et d’une traversée de toiture.",
    poster: images.projects.cvcRoof,
    posterAlt:
      "Équipement CVC et raccords de ventilation installés sur une toiture",
    cloudinaryPublicId: roofInterventionSource.publicId,
    video: {
      source: {
        src: cloudinaryVideoUrl(roofInterventionSource),
        type: roofInterventionSource.type,
      },
      width: 720,
      height: 1280,
      durationSeconds: 18.8,
      durationIso: "PT18.8S",
      uploadDate: "2026-08-29T12:44:06Z",
    },
  },
] as const satisfies readonly Project[];

export const featuredProject = projects[0];

export interface GalleryPhoto {
  assetId: string;
  publicId: string;
  title: string;
  alt: string;
  caption: string;
  src: string;
  socialSrc: string;
  width: number;
  height: number;
}

const galleryPhotoSources = [
  {
    assetId: "6a71663670f245f14eeb687a2d0a9d42",
    publicId: "air-proteger/realisations/reseaux-ventilation-plafond",
    version: 1788008152,
    title: "Réseaux de ventilation en plafond",
    alt: "Réseaux de gaines de ventilation isolées installés sous un plafond technique",
    caption:
      "Vue d’ensemble de réseaux de ventilation isolés intégrés sous le plafond.",
    crop: "c_fill,g_north,ar_16:9,w_1600",
    width: 1600,
    height: 900,
  },
  {
    assetId: "f4f5a1d7567ba47165321b2d8abad505",
    publicId:
      "air-proteger/realisations/gaines-ventilation-local-technique",
    version: 1788008178,
    title: "Gaines de ventilation en local technique",
    alt: "Réseau de gaines métalliques raccordé à une unité de ventilation dans un local technique",
    caption:
      "Installation de gaines métalliques et d’une unité de ventilation en local technique.",
    crop: "c_fill,g_auto,ar_4:3,w_1600",
    width: 1600,
    height: 1200,
  },
] as const;

export const galleryPhotos = galleryPhotoSources.map(
  ({ crop, version, ...photo }) => ({
    ...photo,
    src: cloudinaryImageUrl({
      publicId: photo.publicId,
      version,
      transformation: `${crop}/f_auto,q_auto:good`,
    }),
    socialSrc: cloudinaryImageUrl({
      publicId: photo.publicId,
      version,
      transformation: `${crop}/f_jpg,q_auto:good`,
    }),
  })
) satisfies readonly GalleryPhoto[];
