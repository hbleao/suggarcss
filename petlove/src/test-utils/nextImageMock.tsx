import React from 'react';

interface NextImageProps {
  src: string;
  alt: string;
  width?: number | string;
  height?: number | string;
  [key: string]: unknown;
}

// Mock para o componente Image do Next.js
const NextImageMock = ({ src, alt, width, height, ...props }: NextImageProps) => {
  return (
    <img
      src={src}
      alt={alt || 'Image'} // Garantir que sempre tenha um alt
      width={width}
      height={height}
      data-testid="next-image"
      {...props}
    />
  );
};

export default NextImageMock;
