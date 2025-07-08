import { faker } from '@faker-js/faker';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';

import { useTracking } from '@/hooks';
import ScreenPetSelection from './page';

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    prefetch: jest.fn(),
    refresh: jest.fn(),
  }),
}));

jest.mock('@/hooks', () => ({
  useTracking: jest.fn(),
}));

const makeSut = () => {
  return render(<ScreenPetSelection />);
}

describe('Pagina dados do pet', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  it('should render correctly', () => {
    makeSut();

    const inputElement = screen.queryByRole('textbox');
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute('name', 'petName');

    const buttonCatElement = screen.getByTitle('Gato');
    expect(buttonCatElement).toHaveAttribute('class', 'section__btn section__btn-active');
    expect(buttonCatElement).toBeInTheDocument();

    const buttonDogElement = screen.getByTitle('Cachorro');
    expect(buttonDogElement).toBeInTheDocument();
  });

  it('should render ProgressBar with correct props', () => {
    makeSut();

    const progressBar = document.querySelector('.progressBar');
    expect(progressBar).toBeInTheDocument();
    expect(progressBar).toHaveAttribute('aria-valuemin', '0')
    expect(progressBar).toHaveAttribute('aria-valuenow', '20')
  });

  it('should call useTracking hook on component mount', () => {
    makeSut();

    expect(useTracking).toHaveBeenCalledWith();
  });

  it('should complete the form when "cat" is selected is by default', () => {
    const animal = faker.animal.cat();
    makeSut();

    const button = screen.queryByText('Continuar');
    expect(button).toHaveAttribute('class', 'btn --disabled-primary --large --fluid');

    const inputElement = screen.queryByRole('textbox') as HTMLInputElement;
    fireEvent.change(inputElement, { target: { value: animal } });

    expect(button).not.toHaveAttribute('class', '--disabled');
  });

  it('should complete the form when "cat" is selected', () => {
    const animal = faker.animal.cat();
    makeSut();

    const button = screen.queryByText('Continuar');
    expect(button).toHaveAttribute('class', 'btn --disabled-primary --large --fluid');

    const inputElement = screen.queryByRole('textbox') as HTMLInputElement;
    fireEvent.change(inputElement, { target: { value: animal } });

    const catButton = screen.queryByTitle('Gato') as HTMLButtonElement;
    fireEvent.click(catButton);

    expect(button).not.toHaveAttribute('class', '--disabled');
  });

  it('should complete the form when "dog" is selected', () => {
    const animal = faker.animal.dog();
    makeSut();

    const button = screen.queryByText('Continuar');
    expect(button).toHaveAttribute('class', 'btn --disabled-primary --large --fluid');

    const inputElement = screen.queryByRole('textbox') as HTMLInputElement;
    fireEvent.change(inputElement, { target: { value: animal } });

    const catButton = screen.queryByTitle('Cachorro') as HTMLButtonElement;
    fireEvent.click(catButton);

    expect(button).not.toHaveAttribute('class', '--disabled');
  });
});
