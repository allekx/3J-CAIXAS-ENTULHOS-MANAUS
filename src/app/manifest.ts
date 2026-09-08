import type { MetadataRoute } from "next";
import { HOME_COMPANY } from "@/constants/home";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: HOME_COMPANY.commercialName,
    short_name: "3J Caixas",
    description:
      "Locação de caixa coletora de entulho 6 m³ em Manaus – AM.",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0a0a",
    theme_color: "#c9a227",
    lang: "pt-BR",
    icons: [
      {
        src: "/icons/icon-48.png",
        sizes: "48x48",
        type: "image/png",
      },
      {
        src: "/icons/icon-96.png",
        sizes: "96x96",
        type: "image/png",
      },
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
