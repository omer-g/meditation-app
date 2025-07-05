import { test, expect } from '@playwright/test';

test.describe('Main Timer App Flow', () => {
  test('shows duration buttons and Start button on load', async ({ page }) => {
    await page.goto('/'); // relative to baseURL

    // Wait for hydration (duration buttons visible)
    await page.waitForSelector('.duration', { state: 'visible' });

    // Check a few duration buttons are visible (adjust if you have different durations)
    await expect(page.getByRole('button', { name: '5 minutes' })).toBeVisible();
    await expect(page.getByRole('button', { name: '10 minutes' })).toBeVisible();

    // The main action button should be visible and labeled "Start"
    await expect(page.getByRole('button', { name: 'Start' })).toBeVisible();
  });

  test('clicking Start hides duration buttons and changes button to Stop', async ({ page }) => {
    await page.goto('/');

    // Wait for hydration
    await page.waitForSelector('.duration', { state: 'visible' });

    // Click the main action button (should start the timer)
    const actionButton = page.getByRole('button', { name: 'Start' });
    await actionButton.click();

    // Duration buttons should now be hidden
    await expect(page.locator('.duration')).toBeHidden();

    // The action button should now be labeled "Stop"
    await expect(page.getByRole('button', { name: 'Stop' })).toBeVisible();
  });

  test('clicking Stop shows duration buttons again and changes button to Start', async ({ page }) => {
    await page.goto('/');

    // Wait for hydration
    await page.waitForSelector('.duration', { state: 'visible' });

    // Start the timer
    const actionButton = page.getByRole('button', { name: 'Start' });
    await actionButton.click();

    // Now stop the timer
    const stopButton = page.getByRole('button', { name: 'Stop' });
    await stopButton.click();

    // Duration buttons should be visible again
    await expect(page.locator('.duration')).toBeVisible();

    // The action button should be labeled "Start" again
    await expect(page.getByRole('button', { name: 'Start' })).toBeVisible();
  });

  test('can select a duration and start the timer', async ({ page }) => {
    await page.goto('/');

    // Wait for hydration
    await page.waitForSelector('.duration', { state: 'visible' });

    // Select a different duration (e.g., "10 minutes")
    const tenButton = page.getByRole('button', { name: '10 minutes' });
    await tenButton.click();

    // Now start the timer
    const actionButton = page.getByRole('button', { name: 'Start' });
    await actionButton.click();

    // Duration buttons should be hidden
    await expect(page.locator('.duration')).toBeHidden();

    // The action button should be labeled "Stop"
    await expect(page.getByRole('button', { name: 'Stop' })).toBeVisible();
  });
});
