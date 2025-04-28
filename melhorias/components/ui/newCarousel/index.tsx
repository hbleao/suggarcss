// import { useEffect, useRef, useState } from "react";
// import "./styles.scss";

// interface CarouselProps {
// 	children: React.ReactNode[];
// 	autoPlay?: boolean;
// 	autoPlayInterval?: number;
// }

// export default function Carousel({
// 	children,
// 	autoPlay = false,
// 	autoPlayInterval = 3000,
// }: CarouselProps) {
// 	const [currentSlide, setCurrentSlide] = useState(0);
// 	const slideCount = children.length;
// 	const containerRef = useRef<HTMLDivElement>(null);
// 	const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

// 	const goToSlide = (index: number) => {
// 		if (index < 0) {
// 			index = slideCount - 1;
// 		} else if (index >= slideCount) {
// 			index = 0;
// 		}
// 		setCurrentSlide(index);
// 	};

// 	useEffect(() => {
// 		if (autoPlay) {
// 			autoPlayRef.current = setInterval(() => {
// 				setCurrentSlide((prev) => (prev + 1) % slideCount);
// 			}, autoPlayInterval);
// 			return () => {
// 				if (autoPlayRef.current) clearInterval(autoPlayRef.current);
// 			};
// 		}
// 	}, [autoPlay, autoPlayInterval, slideCount]);

// 	useEffect(() => {
// 		if (containerRef.current) {
// 			containerRef.current.style.transform = `translateX(-${currentSlide * 100}%)`;
// 		}
// 	}, [currentSlide]);

// 	return (
// 		<div className="carousel">
// 			<div
// 				ref={containerRef}
// 				className="carousel__track"
// 				style={{ width: `${slideCount * 100}%` }}
// 			>
// 				{children.map((child, index) => (
// 					<div key={index} className="carousel__slide">
// 						{child}
// 					</div>
// 				))}
// 			</div>
// 			<div className="carousel__controls">
// 				<button
// 					onClick={() => goToSlide(currentSlide - 1)}
// 					className="carousel__button"
// 				>
// 					◀
// 				</button>
// 				<button
// 					onClick={() => goToSlide(currentSlide + 1)}
// 					className="carousel__button"
// 				>
// 					▶
// 				</button>
// 			</div>
// 			<div className="carousel__dots">
// 				{children.map((_, index) => (
// 					<button
// 						key={index}
// 						onClick={() => goToSlide(index)}
// 						className={`carousel__dot ${index === currentSlide ? "active" : ""}`}
// 					></button>
// 				))}
// 			</div>
// 		</div>
// 	);
// }

import { useEffect, useRef, useState } from "react";
import "./styles.scss";

interface CarouselProps {
	children: React.ReactNode[];
	autoPlay?: boolean;
	autoPlayInterval?: number;
	slidesToShow?: number; // <= novo!
}

export default function Carousel({
	children,
	autoPlay = false,
	autoPlayInterval = 3000,
	slidesToShow = 1,
}: CarouselProps) {
	const [currentSlide, setCurrentSlide] = useState(0);
	const slideCount = children.length;
	const containerRef = useRef<HTMLDivElement>(null);
	const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

	const goToSlide = (index: number) => {
		if (index < 0) {
			index = Math.ceil(slideCount / slidesToShow) - 1;
		} else if (index >= Math.ceil(slideCount / slidesToShow)) {
			index = 0;
		}
		setCurrentSlide(index);
	};

	useEffect(() => {
		if (autoPlay) {
			autoPlayRef.current = setInterval(() => {
				setCurrentSlide(
					(prev) => (prev + 1) % Math.ceil(slideCount / slidesToShow),
				);
			}, autoPlayInterval);
			return () => {
				if (autoPlayRef.current) clearInterval(autoPlayRef.current);
			};
		}
	}, [autoPlay, autoPlayInterval, slideCount, slidesToShow]);

	useEffect(() => {
		if (containerRef.current) {
			containerRef.current.style.transform = `translateX(-${currentSlide * (100 / slidesToShow)}%)`;
		}
	}, [currentSlide, slidesToShow]);

	return (
		<div className="carousel">
			<div
				ref={containerRef}
				className="carousel__track"
				style={{ width: `${(slideCount * 100) / slidesToShow}%` }}
			>
				{children.map((child, index) => (
					<div
						key={index}
						className="carousel__slide"
						style={{ width: `${100 / slideCount}%` }}
					>
						{child}
					</div>
				))}
			</div>

			<div className="carousel__controls">
				<button
					onClick={() => goToSlide(currentSlide - 1)}
					className="carousel__button"
				>
					◀
				</button>
				<button
					onClick={() => goToSlide(currentSlide + 1)}
					className="carousel__button"
				>
					▶
				</button>
			</div>

			<div className="carousel__dots">
				{Array.from({ length: Math.ceil(slideCount / slidesToShow) }).map(
					(_, index) => (
						<button
							key={index}
							onClick={() => goToSlide(index)}
							className={`carousel__dot ${index === currentSlide ? "active" : ""}`}
						></button>
					),
				)}
			</div>
		</div>
	);
}
