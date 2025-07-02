import React from "react";
import { Link } from "../../../src/components";

// Criando um wrapper para o Link que não depende do Next.js
const LinkWrapper = (props) => {
  // Mock do componente NextLink
  const OriginalLink = Link;
  const MockedLink = (props) => {
    // Substituindo o NextLink por um elemento <a> normal
    const NextLinkMock = ({ href, children, ...rest }) => (
      <a href={href} {...rest}>{children}</a>
    );
    
    // @ts-ignore - Ignorando erros de tipo para o mock
    OriginalLink.prototype.NextLink = NextLinkMock;
    
    return <OriginalLink {...props} />;
  };
  
  return <MockedLink {...props} />;
};

export default {
  title: "Components/Link",
  component: LinkWrapper,
  parameters: {
    layout: 'padded',
  },
};

export const DefaultLink = () => (
  <LinkWrapper href="https://example.com">Link padrão</LinkWrapper>
);

export const PrimaryLink = () => (
  <LinkWrapper href="https://example.com" styles="primary">Link primário</LinkWrapper>
);

export const SecondaryLink = () => (
  <LinkWrapper href="https://example.com" styles="secondary">Link secundário</LinkWrapper>
);

export const GhostLink = () => (
  <LinkWrapper href="https://example.com" styles="ghost">Link fantasma</LinkWrapper>
);

export const SmallLink = () => (
  <LinkWrapper href="https://example.com" size="small">Link pequeno</LinkWrapper>
);

export const LargeLink = () => (
  <LinkWrapper href="https://example.com" size="large">Link grande</LinkWrapper>
);

export const DisabledLink = () => (
  <LinkWrapper href="https://example.com" disabled>Link desabilitado</LinkWrapper>
);

export const FluidWidthLink = () => (
  <div style={{ width: "300px", border: "1px dashed #ccc", padding: "10px" }}>
    <LinkWrapper href="https://example.com" width="fluid">Link com largura fluida</LinkWrapper>
  </div>
);

export const WithIcon = () => (
  <LinkWrapper href="https://example.com">
    <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" aria-label="Ícone de informação">
        <title>Ícone de informação</title>
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
      </svg>
      Link com ícone
    </span>
  </LinkWrapper>
);

export const ExternalLink = () => (
  <LinkWrapper 
    href="https://example.com" 
    target="_blank" 
    rel="noopener noreferrer"
  >
    Link externo (abre em nova aba)
  </LinkWrapper>
);
