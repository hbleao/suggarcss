export interface CardTaggingData {
  title?: string;
  label?: string;
  id?: string;
  // Permitindo propriedades adicionais com tipos específicos
  [key: string]: string | number | boolean | undefined;
}

export type OnCardClickFunction = (data: CardTaggingData) => void;

export type CarouselProps = {
	children: React.ReactNode[];
	autoPlay?: boolean;
	autoPlayInterval?: number;
	slidesToShow?: number;
	slidesToScroll?: number;
	dots?: boolean;
	arrows?: boolean;
	gap?: number;
	onCardClick?: OnCardClickFunction;
	cardTaggingData?: CardTaggingData[];
};
