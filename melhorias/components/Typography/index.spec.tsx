import React from 'react';
import { render, screen } from '@testing-library/react';
import { Typography } from './index';

// Definindo o tipo ColorToken para o teste
type ColorToken = string;

describe('<Typography />', () => {
  it('deve renderizar o componente com valores padrão', () => {
    render(<Typography>Test Text</Typography>);
    const element = screen.getByText('Test Text');
    
    expect(element).toBeInTheDocument();
    expect(element.tagName.toLowerCase()).toBe('h1');
    expect(element).toHaveClass('typography');
    expect(element).toHaveClass('--title1');
    expect(element).toHaveClass('--color-neutral-900');
    expect(element).toHaveClass('--font-weight-regular');
    expect(element).toHaveClass('--font-style-normal');
  });

  it('deve renderizar com o elemento HTML correto', () => {
    render(<Typography as="h2">Heading 2</Typography>);
    const element = screen.getByText('Heading 2');
    expect(element.tagName.toLowerCase()).toBe('h2');
  });

  it('deve renderizar com o elemento HTML p', () => {
    render(<Typography as="p">Paragraph</Typography>);
    const element = screen.getByText('Paragraph');
    expect(element.tagName.toLowerCase()).toBe('p');
  });

  it('deve renderizar com o elemento HTML span', () => {
    render(<Typography as="span">Span Text</Typography>);
    const element = screen.getByText('Span Text');
    expect(element.tagName.toLowerCase()).toBe('span');
  });

  it('deve renderizar com o elemento HTML label', () => {
    render(<Typography as="label">Label Text</Typography>);
    const element = screen.getByText('Label Text');
    expect(element.tagName.toLowerCase()).toBe('label');
  });

  it('deve aplicar a variante title1 corretamente', () => {
    render(<Typography variant="title1">Title 1</Typography>);
    expect(screen.getByText('Title 1')).toHaveClass('--title1');
  });

  it('deve aplicar a variante title2 corretamente', () => {
    render(<Typography variant="title2">Title 2</Typography>);
    expect(screen.getByText('Title 2')).toHaveClass('--title2');
  });

  it('deve aplicar a variante title3 corretamente', () => {
    render(<Typography variant="title3">Title 3</Typography>);
    expect(screen.getByText('Title 3')).toHaveClass('--title3');
  });

  it('deve aplicar a variante title4 corretamente', () => {
    render(<Typography variant="title4">Title 4</Typography>);
    expect(screen.getByText('Title 4')).toHaveClass('--title4');
  });

  it('deve aplicar a variante title5 corretamente', () => {
    render(<Typography variant="title5">Title 5</Typography>);
    expect(screen.getByText('Title 5')).toHaveClass('--title5');
  });

  it('deve aplicar a variante title6 corretamente', () => {
    render(<Typography variant="title6">Title 6</Typography>);
    expect(screen.getByText('Title 6')).toHaveClass('--title6');
  });

  it('deve aplicar a variante body1 corretamente', () => {
    render(<Typography variant="body1">Body 1</Typography>);
    expect(screen.getByText('Body 1')).toHaveClass('--body1');
  });

  it('deve aplicar a variante body2 corretamente', () => {
    render(<Typography variant="body2">Body 2</Typography>);
    expect(screen.getByText('Body 2')).toHaveClass('--body2');
  });

  it('deve aplicar a variante caption corretamente', () => {
    render(<Typography variant="caption">Caption</Typography>);
    expect(screen.getByText('Caption')).toHaveClass('--caption');
  });

  it('deve aplicar a variante label corretamente', () => {
    render(<Typography variant="label">Label</Typography>);
    expect(screen.getByText('Label')).toHaveClass('--label');
  });

  it('deve aplicar a variante overline corretamente', () => {
    render(<Typography variant="overline">Overline</Typography>);
    expect(screen.getByText('Overline')).toHaveClass('--overline');
  });

  it('deve aplicar a variante button corretamente', () => {
    render(<Typography variant="button">Button</Typography>);
    expect(screen.getByText('Button')).toHaveClass('--button');
  });

  it('deve aplicar a cor corretamente', () => {
    render(<Typography color="brand-insurance-500">Colored Text</Typography>);
    expect(screen.getByText('Colored Text')).toHaveClass('--color-brand-insurance-500');
  });

  it('deve aplicar o peso da fonte corretamente', () => {
    const weights: Array<'light' | 'regular' | 'medium' | 'semibold' | 'bold'> = [
      'light', 'regular', 'medium', 'semibold', 'bold'
    ];
    
    weights.forEach(weight => {
      const { getByText } = render(
        <Typography weight={weight}>{`${weight} text`}</Typography>
      );
      expect(getByText(`${weight} text`)).toHaveClass(`--font-weight-${weight}`);
    });
  });

  it('deve aplicar o estilo da fonte corretamente', () => {
    render(<Typography fontStyle="italic">Italic Text</Typography>);
    expect(screen.getByText('Italic Text')).toHaveClass('--font-style-italic');
    
    render(<Typography fontStyle="normal">Normal Text</Typography>);
    expect(screen.getByText('Normal Text')).toHaveClass('--font-style-normal');
  });

  it('deve mesclar className adicional', () => {
    render(<Typography className="custom-class">Custom Class</Typography>);
    expect(screen.getByText('Custom Class')).toHaveClass('custom-class');
  });

  it('deve passar props adicionais para o elemento', () => {
    render(<Typography data-testid="typography-test">Test Props</Typography>);
    expect(screen.getByTestId('typography-test')).toBeInTheDocument();
  });

  it('deve renderizar o texto padrão quando children não é fornecido', () => {
    render(<Typography />);
    expect(screen.getByText('Typography')).toBeInTheDocument();
  });

  it('deve aplicar múltiplas propriedades corretamente', () => {
    render(
      <Typography
        variant="body1"
        as="p"
        color="neutral-500"
        weight="bold"
        fontStyle="italic"
        className="custom-class"
        data-testid="multi-props"
      >
        Multiple Props
      </Typography>
    );
    
    const element = screen.getByTestId('multi-props');
    expect(element.tagName.toLowerCase()).toBe('p');
    expect(element).toHaveClass('typography');
    expect(element).toHaveClass('--body1');
    expect(element).toHaveClass('--color-neutral-500');
    expect(element).toHaveClass('--font-weight-bold');
    expect(element).toHaveClass('--font-style-italic');
    expect(element).toHaveClass('custom-class');
    expect(element).toHaveTextContent('Multiple Props');
  });
});
