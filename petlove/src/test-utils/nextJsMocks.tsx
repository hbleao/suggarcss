jest.mock('next/image', () => ({
	__esModule: true,
	default: (props: {
		src: string;
		alt: string;
		width?: number | string;
		height?: number | string;
		[key: string]: unknown;
	}) => {
		const { src, alt, width, height, ...restProps } = props;
		return (
			<img
				src={src?.toString()}
				alt={alt || 'Image'}
				width={width}
				height={height}
				data-testid="next-image"
				{...restProps}
			/>
		);
	},
}));

jest.mock('next/link', () => ({
	__esModule: true,
	default: ({
		href,
		children,
		...props
	}: { href: string; children: React.ReactNode; [key: string]: unknown }) => (
		<a href={href} {...props}>
			{children}
		</a>
	),
}));

jest.mock('next/navigation', () => ({
	useRouter: jest.fn().mockReturnValue({
		push: jest.fn(),
		back: jest.fn(),
		forward: jest.fn(),
		refresh: jest.fn(),
		replace: jest.fn(),
		prefetch: jest.fn(),
	}),
	usePathname: jest.fn().mockReturnValue('/'),
	useSearchParams: jest.fn().mockReturnValue(new URLSearchParams()),
}));
