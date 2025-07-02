import React from "react";
import { Footer } from "../../../src/components";

export default {
  title: "Components/Footer",
  component: Footer,
  parameters: {
    layout: 'padded',
  },
};

const quickLinks = [
  { name: "Seguro Auto", url: "#", icon: "" },
  { name: "Seguro Residencial", url: "#", icon: "" },
  { name: "Seguro Vida", url: "#", icon: "" },
  { name: "Previdência", url: "#", icon: "" }
];

const aboutUs = [
  { name: "Sobre nós", url: "#", icon: "" },
  { name: "Carreiras", url: "#", icon: "" },
  { name: "Imprensa", url: "#", icon: "" },
  { name: "Responsabilidade Social", url: "#", icon: "" }
];

const bottomLinks = [
  { name: "Termos de Uso", url: "#", icon: "" },
  { name: "Política de Privacidade", url: "#", icon: "" },
  { name: "Cookies", url: "#", icon: "" }
];

const socialMedia = [
  { url: "#", icon: "icon-porto-ic-facebook" as const, name: "Facebook" },
  { url: "#", icon: "icon-porto-ic-twitter" as const, name: "Twitter" },
  { url: "#", icon: "icon-porto-ic-instagram" as const, name: "Instagram" },
  { url: "#", icon: "icon-porto-ic-linkedin" as const, name: "LinkedIn" }
];

const buttonsAppStore = [
  { name: "App Store", url: "#", icon: "" },
  { name: "Google Play", url: "#", icon: "" }
];

export const DefaultFooter = () => (
  <Footer
    titleAboutUs="Sobre Nós"
    aboutUs={aboutUs}
    titleQuickLinks="Links Rápidos"
    quickLinks={quickLinks}
    bottomLinks={bottomLinks}
    titleSocialMedia="Siga-nos nas redes sociais"
    socialMedia={socialMedia}
    titleAppStore="Baixe nosso aplicativo"
    buttonsAppStore={buttonsAppStore}
    partners={[]}
  />
);

export const WithoutLogo = () => (
  <Footer
    titleAboutUs="Sobre Nós"
    aboutUs={aboutUs.slice(0, 3)}
    titleQuickLinks="Links Rápidos"
    quickLinks={quickLinks.slice(0, 3)}
    bottomLinks={bottomLinks}
    titleSocialMedia=""
    socialMedia={[]}
    titleAppStore=""
    buttonsAppStore={[]}
    partners={[]}
  />
);

export const WithoutLinks = () => (
  <Footer
    titleAboutUs=""
    aboutUs={[]}
    titleQuickLinks=""
    quickLinks={[]}
    bottomLinks={bottomLinks}
    titleSocialMedia="Siga-nos nas redes sociais"
    socialMedia={socialMedia}
    titleAppStore="Baixe nosso aplicativo"
    buttonsAppStore={buttonsAppStore}
    partners={[]}
  />
);

export const WithoutSocialMedia = () => (
  <Footer
    titleAboutUs="Sobre Nós"
    aboutUs={aboutUs.slice(0, 3)}
    titleQuickLinks="Links Rápidos"
    quickLinks={quickLinks.slice(0, 3)}
    bottomLinks={bottomLinks}
    titleSocialMedia=""
    socialMedia={[]}
    titleAppStore="Baixe nosso aplicativo"
    buttonsAppStore={buttonsAppStore}
    partners={[]}
  />
);

export const WithCustomBackground = () => (
  <Footer
    titleAboutUs="Sobre Nós"
    aboutUs={aboutUs.slice(0, 2)}
    titleQuickLinks="Links Rápidos"
    quickLinks={quickLinks.slice(0, 2)}
    bottomLinks={bottomLinks}
    titleSocialMedia="Siga-nos nas redes sociais"
    socialMedia={socialMedia.slice(0, 3)}
    titleAppStore="Baixe nosso aplicativo"
    buttonsAppStore={buttonsAppStore}
    partners={[]}
    // Nota: backgroundColor não é uma prop suportada pelo componente atual
    // Esta prop seria implementada em uma versão futura
  />
);

export const WithCustomTextColor = () => (
  <Footer
    titleAboutUs="Sobre Nós"
    aboutUs={aboutUs.slice(0, 2)}
    titleQuickLinks="Links Rápidos"
    quickLinks={quickLinks.slice(0, 2)}
    bottomLinks={bottomLinks}
    titleSocialMedia="Siga-nos nas redes sociais"
    socialMedia={socialMedia.slice(0, 3)}
    titleAppStore="Baixe nosso aplicativo"
    buttonsAppStore={buttonsAppStore}
    partners={[]}
    // Nota: textColor não é uma prop suportada pelo componente atual
    // Esta prop seria implementada em uma versão futura
  />
);

export const WithAdditionalContent = () => (
  <Footer
    titleAboutUs="Sobre Nós"
    aboutUs={aboutUs.slice(0, 2)}
    titleQuickLinks="Links Rápidos"
    quickLinks={quickLinks.slice(0, 2)}
    bottomLinks={bottomLinks}
    titleSocialMedia="Siga-nos nas redes sociais"
    socialMedia={socialMedia.slice(0, 2)}
    titleAppStore="Baixe nosso aplicativo"
    buttonsAppStore={buttonsAppStore}
    partners={[]}
    // Nota: additionalContent não é uma prop suportada pelo componente atual
    // Esta prop seria implementada em uma versão futura
  />
);
