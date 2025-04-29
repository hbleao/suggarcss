import { useEffect, useRef, useState } from "react";
import "./styles.scss";

interface CarouselProps {
	children: React.ReactNode[];
	autoPlay?: boolean;
	autoPlayInterval?: number;
	slidesToShow?: number;
	slidesToScroll?: number;
	gap?: number;
}

export default function Carousel({
	children,
	autoPlay = false,
	autoPlayInterval = 3000,
	slidesToShow = 1,
	slidesToScroll = 1,
	gap = 16,
}: CarouselProps) {
	const [currentSlide, setCurrentSlide] = useState(0);
	const slideCount = children.length;
	const containerRef = useRef<HTMLDivElement>(null);
	const wrapperRef = useRef<HTMLDivElement>(null);
	const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
	const startPos = useRef(0);
	const isDragging = useRef(false);

	const handleDragStart = (e: React.TouchEvent | React.MouseEvent) => {
		isDragging.current = true;
		if ("touches" in e) {
			startPos.current = e.touches[0].clientX;
		} else {
			startPos.current = e.clientX;
		}
	};

	const handleDragEnd = (e: React.TouchEvent | React.MouseEvent) => {
		if (!isDragging.current) return;
		let endPos = 0;
		if ("changedTouches" in e) {
			endPos = e.changedTouches[0].clientX;
		} else {
			endPos = e.clientX;
		}
		const distance = endPos - startPos.current;
		if (Math.abs(distance) > 50) {
			if (distance < 0) {
				goToSlide(currentSlide + slidesToScroll);
			} else {
				goToSlide(currentSlide - slidesToScroll);
			}
		}
		isDragging.current = false;
	};

	const goToSlide = (index: number) => {
		if (index < 0) {
			index = slideCount - 1;
		} else if (index >= slideCount) {
			index = 0;
		}
		setCurrentSlide(index);
	};

	useEffect(() => {
		if (autoPlay) {
			autoPlayRef.current = setInterval(() => {
				setCurrentSlide((prev) => (prev + slidesToScroll) % slideCount);
			}, autoPlayInterval);

			return () => {
				if (autoPlayRef.current) clearInterval(autoPlayRef.current);
			};
		}
	}, [autoPlay, autoPlayInterval, slideCount, slidesToScroll]);

	useEffect(() => {
		if (containerRef.current) {
			const slideWidth = containerRef.current.offsetWidth / slideCount;
			const totalGap = gap * currentSlide;
			const translateX = currentSlide * slideWidth + totalGap;
			containerRef.current.style.transform = `translateX(-${translateX}px)`;
		}
	}, [currentSlide, slideCount, gap]);

	useEffect(() => {
		if (wrapperRef.current && containerRef.current) {
			const activeSlide = containerRef.current.children[
				currentSlide
			] as HTMLElement;
			if (activeSlide) {
				wrapperRef.current.style.height = `${activeSlide.offsetHeight}px`;
			}
		}
	}, [currentSlide]);

	return (
		<div className="carousel" ref={wrapperRef}>
			<div
				ref={containerRef}
				className="carousel__track"
				style={{
					width: `${(slideCount * 100) / slidesToShow}%`,
					gap: `${gap}px`,
				}}
				onMouseDown={handleDragStart}
				onMouseUp={handleDragEnd}
				onMouseLeave={handleDragEnd}
				onTouchStart={handleDragStart}
				onTouchEnd={handleDragEnd}
			>
				{children.map((child, index) => (
					<div
						key={index}
						className="carousel__slide"
						style={{
							width: `${100 / slideCount}%`,
							padding: `0 ${gap / 2}px`,
							boxSizing: "border-box",
						}}
					>
						{child}
					</div>
				))}
			</div>

			<div className="carousel__controls">
				<button
					type="button"
					onClick={() => goToSlide(currentSlide - slidesToScroll)}
					className="carousel__button"
				>
					◀
				</button>
				<button
					type="button"
					onClick={() => goToSlide(currentSlide + slidesToScroll)}
					className="carousel__button"
				>
					▶
				</button>
			</div>

			<div className="carousel__dots">
				{Array.from({ length: Math.ceil(slideCount / slidesToScroll) }).map(
					(_, index) => (
						<button
							type="button"
							key={index}
							onClick={() => goToSlide(index * slidesToScroll)}
							className={`carousel__dot ${index * slidesToScroll === currentSlide ? "active" : ""}`}
						/>
					),
				)}
			</div>
		</div>
	);
}
