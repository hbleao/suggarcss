// src/mocks/handlers.ts
import { http } from 'msw';

const baseUrl = process.env.NEXT_PUBLIC_SENSEDIA_CLOUD_URL;
const assistantPath = process.env.NEXT_PUBLIC_ASSISTANT_SERVICE_PATH;
const acquisitionPath = process.env.NEXT_PUBLIC_ACQUISITION_SERVICE_PATH;

export const cepHandlers = [
  // GET /guia-postal/cep?zipCode=...
  http.get(`${baseUrl}/${assistantPath}/guia-postal/cep`, async (req, res, ctx) => {
    const zipCode = req.url.searchParams.get('zipCode');

    if (zipCode === '00000000') {
      return res(ctx.status(404), ctx.json({ message: 'Invalid CEP' }));
    }

    return res(
      ctx.status(200),
      ctx.json({
        bairro: 'Centro',
        cep: zipCode,
        estado: 'SP',
        localidade: 'São Paulo',
        logradouro: 'Rua dos Testes',
        uf: 'SP',
      })
    );
  }),

  // POST /petlove/cobertura
  http.post(`${baseUrl}/${acquisitionPath}/petlove/cobertura`, async (req, res, ctx) => {
    const { locality, state } = await req.json();

    if (locality === 'São Paulo' && state === 'SP') {
      return res(
        ctx.status(200),
        ctx.json({
          coverage: true,
          ibge: '3550308',
        })
      );
    }

    return res(
      ctx.status(200),
      ctx.json({
        coverage: false,
        ibge: '',
      })
    );
  }),
];
