import { test, expect } from '@playwright/test';

test.describe('Calculator E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/');
  });

  test('should display initial value as 0', async ({ page }) => {
    await expect(page.locator('.text-3xl')).toHaveText('0');
  });

  test('should perform addition correctly', async ({ page }) => {
    await page.getByRole('button', { name: '1' }).click();
    await page.getByRole('button', { name: '+' }).click();
    await page.getByRole('button', { name: '2' }).click();
    await page.getByRole('button', { name: '=' }).click();
    await expect(page.locator('.text-3xl')).toHaveText('3');
  });

  test('should perform subtraction correctly', async ({ page }) => {
    await page.getByRole('button', { name: '5' }).click();
    await page.getByRole('button', { name: '-' }).click();
    await page.getByRole('button', { name: '3' }).click();
    await page.getByRole('button', { name: '=' }).click();
    await expect(page.locator('.text-3xl')).toHaveText('2');
  });

  test('should perform multiplication correctly', async ({ page }) => {
    await page.getByRole('button', { name: '4' }).click();
    await page.getByRole('button', { name: '×' }).click();
    await page.getByRole('button', { name: '3' }).click();
    await page.getByRole('button', { name: '=' }).click();
    await expect(page.locator('.text-3xl')).toHaveText('12');
  });

  test('should perform division correctly', async ({ page }) => {
    await page.getByRole('button', { name: '8' }).click();
    await page.getByRole('button', { name: '÷' }).click();
    await page.getByRole('button', { name: '2' }).click();
    await page.getByRole('button', { name: '=' }).click();
    await expect(page.locator('.text-3xl')).toHaveText('4');
  });

  test('should clear display when C is clicked', async ({ page }) => {
    await page.getByRole('button', { name: '9' }).click();
    await page.getByRole('button', { name: 'C' }).click();
    await expect(page.locator('.text-3xl')).toHaveText('0');
  });

  test('should toggle history panel', async ({ page }) => {
    await page.getByRole('button', { name: 'Show History' }).click();
    await expect(page.getByRole('heading', { name: 'History' })).toBeVisible();
    await page.getByRole('button', { name: 'Hide History' }).click();
    await expect(
      page.getByRole('heading', { name: 'History' }),
    ).not.toBeVisible();
  });

  test('should store calculation history and allow reuse', async ({ page }) => {
    await page.getByRole('button', { name: '5' }).click();
    await page.getByRole('button', { name: '+' }).click();
    await page.getByRole('button', { name: '5' }).click();
    await page.getByRole('button', { name: '=' }).click();

    await page.getByRole('button', { name: 'Show History' }).click();
    await expect(page.locator('.text-lg').first()).toHaveText('10');

    await page.locator('.text-lg').first().click();
    await expect(page.locator('.text-3xl')).toHaveText('10');
  });
});
