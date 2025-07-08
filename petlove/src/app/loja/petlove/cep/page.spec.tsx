import { cepMask } from "@/utils";
import { faker } from "@faker-js/faker";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Cep from './page';

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    prefetch: jest.fn(),
    refresh: jest.fn(),
  }),
  useSearchParams: () => ({
    get: jest.fn()
  })
}));

jest.mock('@/hooks', () => ({
  __esModule: true,
  useDebouncedValue: jest.fn((val) => val),
  useTracking: jest.fn(),
}));

const makeSut = () => {
  return render(<Cep />);
}

describe('CEP Page', () => {
  it('Should correctly render the page', () => {
    makeSut();

    const titleElement = screen.getByText('Cuidamos do seu pet onde ele estiver');
    expect(titleElement).toBeInTheDocument();

    const subtitleElement = screen.getByText('Agora, informe a região onde seu pet mora para encontrarmos o plano ideal.');
    expect(subtitleElement).toBeInTheDocument();

    const inputCepElement = screen.getByLabelText('CEP');
    expect(inputCepElement).toBeInTheDocument();

    const linkElement = screen.getByText('Não sei o CEP');
    expect(linkElement).toBeInTheDocument();

    const buttonElement = screen.getByText('Continuar');
    expect(buttonElement).toBeInTheDocument();
  });

  it('Should be able to format the CEP value', async () => {
    makeSut();
    const cep = faker.number.int({ min: 10000000, max: 11000000 });

    const inputCepElement = screen.getByLabelText('CEP');
    fireEvent.change(inputCepElement, { target: { value: cep } });

    const filledInputCepElement = screen.getByLabelText('CEP') as HTMLInputElement;
    expect(filledInputCepElement.value).toEqual(cepMask(String(cep)));
  });

  it('Should be able to search for a valid CEP with coverage', async () => {
    makeSut();

    const cep = faker.number.int({ min: 10000000, max: 11000000 });

    const inputCepElement = screen.getByLabelText('CEP');
    fireEvent.change(inputCepElement, { target: { value: cep } });


    const loaderElement = await screen.findByTestId('loaderButton');
    expect(loaderElement).toBeInTheDocument();

    await waitFor(() => {
      expect(loaderElement).not.toBeInTheDocument();
    });


  });

  it.skip('Should be able to search for a valid CEP without coverage', () => { });
  it.skip('Should be able to search for an invalid CEP', () => { });

  it.skip('Should open the postal guide modal when clicking the "Não sei o CEP" link', () => { });
  it.skip('Should be able to search for states', () => { });
  it.skip('Should be able to search for cities based on the selected state', () => { });
  it.skip('Should be able to search for a valid address after selecting city and state', () => { });
  it.skip('Should be able to search for an invalid address after selecting city and state', () => { });
});





