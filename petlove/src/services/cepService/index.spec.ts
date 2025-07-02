import axios from 'axios';

import { CepService } from '.';

import { api } from '@/lib';
import { AuthorizationService } from '../authorizationService';

jest.mock('../AuthorizationService');
jest.mock('@/lib', () => ({
  api: {
    get: jest.fn()
  }
}));

describe('CepService', () => {
  const mockCep = '01204-000';

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('deve retornar os dados formatados corretamente quando a API responder com sucesso', async () => {
    (AuthorizationService as jest.Mock).mockResolvedValue({
      access_token: 'fake-token'
    });

    (api.get as jest.Mock).mockResolvedValue({
      data: {
        localidade: 'São Paulo',
        estado: 'São Paulo',
        bairro: 'Campos Elíseos',
        logradouro: 'R Guaianases',
        uf: 'SP'
      }
    });

    const result = await CepService(mockCep);

    expect(result).toEqual({
      cep: mockCep,
      address: `${mockCep} - São Paulo/São Paulo`,
      neighborhood: 'Campos Elíseos',
      selectedCity: 'São Paulo',
      selectedState: 'São Paulo',
      street: 'R Guaianases',
      stateCode: 'SP'
    });
  });

  it('deve retornar dados padrão quando ocorrer timeout na requisição', async () => {
    (AuthorizationService as jest.Mock).mockResolvedValue({
      access_token: 'fake-token'
    });

    const timeoutError = new axios.AxiosError('timeout');
    timeoutError.code = 'ECONNABORTED';

    (api.get as jest.Mock).mockRejectedValue(timeoutError);

    const result = await CepService(mockCep);

    expect(result).toEqual({
      cep: mockCep,
      address: `${mockCep} - Não encontrado`,
      neighborhood: '',
      selectedCity: '',
      selectedState: '',
      street: '',
      stateCode: ''
    });
  });

  it('deve retornar dados padrão quando ocorrer erro genérico na requisição', async () => {
    (AuthorizationService as jest.Mock).mockResolvedValue({
      access_token: 'fake-token'
    });

    (api.get as jest.Mock).mockRejectedValue(new Error('Erro qualquer'));

    const result = await CepService(mockCep);

    expect(result).toEqual({
      cep: mockCep,
      address: `${mockCep} - Não encontrado`,
      neighborhood: '',
      selectedCity: '',
      selectedState: '',
      street: '',
      stateCode: ''
    });
  });

  it('deve avisar se a resposta da API estiver incompleta', async () => {
  const warnSpy = jest.spyOn(console, 'warn').mockImplementation();

  (AuthorizationService as jest.Mock).mockResolvedValue({
    access_token: 'fake-token'
  });

  (api.get as jest.Mock).mockResolvedValue({
    data: {
      bairro: 'Campos Elíseos', // faltando `localidade` e `estado`
      logradouro: 'R Guaianases',
      uf: 'SP'
    }
  });

  const result = await CepService(mockCep);

  expect(warnSpy).toHaveBeenCalledWith(
    'Resposta incompleta da API de CEP:',
    expect.any(Object)
  );

  warnSpy.mockRestore();
});


  it('deve tratar erro Axios com código diferente de ECONNABORTED', async () => {
  const error = new axios.AxiosError('Erro 500');
  error.code = 'ERR_BAD_RESPONSE';

  (AuthorizationService as jest.Mock).mockResolvedValue({
    access_token: 'fake-token'
  });

  (api.get as jest.Mock).mockRejectedValue(error);

  const result = await CepService(mockCep);

  expect(result.address).toContain('Não encontrado');
});

});
