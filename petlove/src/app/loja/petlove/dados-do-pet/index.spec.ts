import { expect, test } from '@playwright/test';

test.describe('Dados do pet', () => {
  test('Should be able to render all page elements correctly', async ({ page }) => {
    await page.goto('http://localhost:3000/loja/petlove/dados-do-pet');

    await expect(page).toHaveTitle(/Plano de Saúde para Pets: Ambulatorial, Essencial e Completo | Porto/);

    const title = await page.getByRole('heading', { name: 'Proteja agora quem você ama!' });
    await expect(title).toBeVisible();

    const subtitle = await page.getByRole('heading', { name: 'Para encontrar o plano ideal, precisamos de alguns dados do seu pet.' });
    await expect(subtitle).toBeVisible();

    const input = await page.getByRole('textbox', { name: '' });
    await expect(input).toBeVisible();

    const catButton = await page.getByRole('button', { name: 'Gato' });
    await expect(catButton).toBeVisible();

    const dogButton = await page.getByRole('button', { name: 'Cachorro' });
    await expect(dogButton).toBeVisible();

    const buttonSubmit = await page.getByRole('button', { name: 'Continuar' });
    await expect(buttonSubmit).toBeVisible();
  });

  test('Should be able to initialize the page with correct state', async ({ page }) => {
    await page.goto('http://localhost:3000/loja/petlove/dados-do-pet');

    const catButton = await page.getByRole('button', { name: 'Gato' });
    await expect(catButton).toHaveClass('section__btn section__btn-active');

    const buttonSubmit = await page.getByRole('button', { name: 'Continuar' });
    await expect(buttonSubmit).toBeDisabled();
  });

  test('Should be able to enable button', async ({ page }) => {
    await page.goto('http://localhost:3000/loja/petlove/dados-do-pet');

    await page.getByRole('textbox').fill('gato');

    const buttonSubmit = await page.getByRole('button', { name: 'Continuar' });
    await expect(buttonSubmit).not.toBeDisabled();
    await buttonSubmit.click();

    await expect(page).toHaveURL('http://localhost:3000/loja/petlove/cep');
  });

  test('Should be able to select a dog in to normal flow', async ({ page }) => {
    await page.goto('http://localhost:3000/loja/petlove/dados-do-pet');

    await page.getByRole('textbox').fill('Cachorro');

    const dogButton = await page.getByRole('button', { name: 'Cachorro' });
    await dogButton.click();
    await expect(dogButton).toHaveClass('section__btn section__btn-active');

    const buttonSubmit = await page.getByRole('button', { name: 'Continuar' });
    await buttonSubmit.click();

    await expect(page).toHaveURL('http://localhost:3000/loja/petlove/cep');
  });

  test('Should be able to select a cat in to normal flow', async ({ page }) => {
    await page.goto('http://localhost:3000/loja/petlove/dados-do-pet');

    await page.getByRole('textbox').fill('Gato');

    const dogButton = await page.getByRole('button', { name: 'Cachorro' });
    await dogButton.click();

    const catButton = await page.getByRole('button', { name: 'Gato' });
    await catButton.click();
    await expect(catButton).toHaveClass('section__btn section__btn-active');

    const buttonSubmit = await page.getByRole('button', { name: 'Continuar' });
    await buttonSubmit.click();

    await expect(page).toHaveURL('http://localhost:3000/loja/petlove/cep');
  });
})
