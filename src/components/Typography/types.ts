import type { ReactNode } from 'react';
// import { ColorToken } from '@/styles/design-tokens'

export type Weight = 'light' | 'regular' | 'medium' | 'semibold' | 'bold';

export type FontStyle = 'italic' | 'normal';

export type HeadingTypes =
	| 'title1'
	| 'title2'
	| 'title3'
	| 'title4'
	| 'title5'
	| 'title6'
	| 'body1'
	| 'body2'
	| 'caption'
	| 'label'
	| 'overline'
	| 'button';

export type HeadingTags =
	| 'h1'
	| 'h2'
	| 'h3'
	| 'h4'
	| 'h5'
	| 'h6'
	| 'p'
	| 'span'
	| 'label';

export type TypographyProps = React.HTMLAttributes<HTMLElement> & {
	children?: ReactNode;
	as?: HeadingTags;
	variant?: HeadingTypes;
	color?: ColorToken;
	weight?: Weight;
	fontStyle?: FontStyle;
};
