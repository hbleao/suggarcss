import SlickSlider from 'react-slick';

import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

import './styles.scss';

import type { CarouselProps } from './types';

function SampleNextArrow(props) {
	const { className, onClick } = props;
	return (
		<svg
			width="48"
			height="48"
			viewBox="0 0 48 48"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className={className}
			onClick={onClick}
		>
			<circle cx="24" cy="24" r="24" fill="#EEF9FF" />
			<g opacity="0.8">
				<g clip-path="url(#clip0_773_49563)">
					<path
						d="M30.9339 36.9609C31.304 36.5167 31.23 35.7765 30.7858 35.4063L17.2391 24.0063L30.7858 12.6062C31.304 12.2361 31.304 11.5699 30.9339 11.0517C30.5638 10.6075 29.8235 10.5335 29.3794 10.9036L14.7962 23.118C14.5741 23.3401 14.426 23.6362 14.426 24.0063C14.426 24.3024 14.5741 24.6725 14.7962 24.8946L29.3794 37.0349C29.8235 37.4791 30.5638 37.405 30.9339 36.9609Z"
						fill="#0046C0"
					/>
				</g>
			</g>
			<defs>
				<clipPath id="clip0_773_49563">
					<rect
						width="26.6667"
						height="26.6667"
						fill="white"
						transform="translate(35.957 37.3333) rotate(180)"
					/>
				</clipPath>
			</defs>
		</svg>
	);
}

function SamplePrevArrow(props) {
	const { className, onClick } = props;
	return (
		<svg
			width="48"
			height="48"
			viewBox="0 0 48 48"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className={className}
			onClick={onClick}
		>
			<circle cx="24" cy="24" r="24" fill="#F2FAFF" />
			<g opacity="0.8">
				<g clip-path="url(#clip0_773_49562)">
					<path
						d="M17.3122 11.039C16.9421 11.4832 17.0161 12.2235 17.4603 12.5936L31.007 23.9937L17.4603 35.3937C16.9421 35.7639 16.9421 36.4301 17.3122 36.9483C17.6823 37.3924 18.4226 37.4665 18.8667 37.0963L33.4499 24.882C33.672 24.6599 33.8201 24.3638 33.8201 23.9937C33.8201 23.6975 33.672 23.3274 33.4499 23.1053L18.8667 10.965C18.4226 10.5209 17.6823 10.5949 17.3122 11.039Z"
						fill="#0046C0"
					/>
				</g>
			</g>
			<defs>
				<clipPath id="clip0_773_49562">
					<rect
						width="26.6667"
						height="26.6667"
						fill="white"
						transform="translate(12.2891 10.6667)"
					/>
				</clipPath>
			</defs>
		</svg>
	);
}

export const Carousel = ({
	settings,
	children,
	...restProps
}: CarouselProps) => {
	return (
		<div className="carousel" {...restProps}>
			<SlickSlider
				{...settings}
				nextArrow={<SamplePrevArrow />}
				prevArrow={<SampleNextArrow />}
			>
				{children}
			</SlickSlider>
		</div>
	);
};
