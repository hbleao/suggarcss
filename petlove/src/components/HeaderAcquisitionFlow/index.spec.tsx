import { render, screen } from '@testing-library/react';
import { HeaderAcquisitionFlow } from '.';

const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
	useRouter: () => ({
		push: mockPush,
	}),
}));

// Mock do componente Image do Next.js para evitar problemas de contexto
jest.mock('next/image', () => ({
	__esModule: true,
	default: ({ src, alt, onClick, className }: { src: string; alt: string; onClick?: () => void; className?: string }) => {
		// Se tiver onClick, envolvemos em um botão para acessibilidade
		if (onClick) {
			return (
				<button 
					type="button"
					className={className}
					onClick={onClick}
					data-testid="next-image-button"
				>
					<img 
						src={typeof src === 'string' ? src : '/mock-image.png'} 
						alt={alt} 
						data-testid="next-image" 
					/>
				</button>
			);
		}

		// Sem onClick, apenas retornamos a imagem
		return (
			<img 
				src={typeof src === 'string' ? src : '/mock-image.png'} 
				alt={alt} 
				className={className} 
				data-testid="next-image" 
			/>
		);
	},
}));

type MakeSutProps = {
	goBackLink?: string;
	hasGoBackLink?: boolean;
	hasShoppingCart?: boolean;
};

const makeSut = ({
	goBackLink = '',
	hasGoBackLink,
	hasShoppingCart,
}: MakeSutProps) => {
	return render(
		<HeaderAcquisitionFlow
			goBackLink={goBackLink}
			hasGoBackLink={hasGoBackLink}
			hasShoppingCart={hasShoppingCart}
		/>,
	);
};

describe('HeaderAcquisitionFlow', () => {
	it('Should be render correctly', async () => {
		makeSut({});

		const images = await screen.findAllByRole('img');
		const arrowLeft = images[0];
		const logo = images[1];
		const iconCart = images[2];

		expect(arrowLeft).toHaveAttribute('alt', 'Icone de seta para esquerda');
		expect(logo).toHaveAttribute('alt', 'Logo da porto');
		expect(iconCart).toHaveAttribute('alt', 'Icone shopping de compras');
	});

	it('Should be possible to not render the arrow icon', () => {
		makeSut({ hasGoBackLink: false });

		const arrowLeft = screen.queryAllByRole('img');
		expect(arrowLeft.length).toBe(2);

		const arrowLeftElement = document.querySelector(
			'[alt="Icone de seta para esquerda"]',
		);
		expect(arrowLeftElement).not.toBeInTheDocument();
	});

	it('Should be possible to not render the shopping cart', () => {
		makeSut({ hasShoppingCart: false });

		const arrowLeft = screen.queryAllByRole('img');
		expect(arrowLeft.length).toBe(2);

		const arrowLeftElement = document.querySelector(
			'[alt="Icone shopping de compras"]',
		);
		expect(arrowLeftElement).not.toBeInTheDocument();
	});
});
