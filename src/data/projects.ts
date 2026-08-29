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
