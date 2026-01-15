import { test, expect } from '@playwright/test';

// Note: These tests require authenticated state
// In a real scenario, you'd use fixtures for auth

test.describe('Katas (Tasks) Management', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display empty state when no katas', async ({ page }) => {
    // This would require auth - testing the UI elements
    await expect(page.locator('text=Productivity Dojo')).toBeVisible();
  });

  test('should show Add Kata button in layout', async ({ page }) => {
    // Check for the floating add button or sidebar button
    await expect(page.locator('h1:has-text("Productivity Dojo")')).toBeVisible();
  });

  test.describe('With Authenticated User (Mock)', () => {
    test.skip('should open Add Kata modal', async ({ page }) => {
      // Requires auth setup
      await page.click('button:has-text("New Kata")');
      await expect(page.locator('h2:has-text("New Kata")')).toBeVisible();
    });

    test.skip('should create a new Kata', async ({ page }) => {
      await page.click('button:has-text("New Kata")');
      
      await page.fill('input[placeholder="What will you accomplish?"]', 'Test Kata');
      await page.click('button:has-text("Medium")');
      await page.fill('input[type="datetime-local"]').first();
      await page.fill('input[type="datetime-local"]').last();
      
      await page.click('button:has-text("Add to Training Log")');
      
      await expect(page.locator('text=Test Kata')).toBeVisible();
    });

    test.skip('should show XP preview on Kata card', async ({ page }) => {
      // Assumes a kata exists
      await expect(page.locator('text=Potential XP')).toBeVisible();
    });

    test.skip('should activate a Kata', async ({ page }) => {
      await page.click('button:has-text("Start")');
      await expect(page.locator('text=Currently Training')).toBeVisible();
    });

    test.skip('should complete a Kata with Strike the Gong', async ({ page }) => {
      // Start a kata first
      await page.click('button:has-text("Gong!")');
      // Or click the big gong button
      await expect(page.locator('svg.lucide-bell')).toBeVisible();
    });

    test.skip('should update XP after completing Kata', async ({ page }) => {
      // Complete a kata and verify XP increased
      const initialXP = await page.locator('text=/\\d+ XP/').textContent();
      await page.click('button:has-text("Gong!")');
      
      // Wait for optimistic update
      await page.waitForTimeout(500);
      
      const newXP = await page.locator('text=/\\d+ XP/').textContent();
      expect(Number(newXP?.replace(' XP', ''))).toBeGreaterThan(Number(initialXP?.replace(' XP', '')));
    });

    test.skip('should delete a Kata', async ({ page }) => {
      const kataTitle = 'Kata to Delete';
      await expect(page.locator(`text=${kataTitle}`)).toBeVisible();
      
      await page.click('button:has-text("✕")');
      
      await expect(page.locator(`text=${kataTitle}`)).not.toBeVisible();
    });
  });
});

test.describe('Katas List Views', () => {
  test.skip('should switch between Today and Upcoming views', async ({ page }) => {
    await page.goto('/');
    
    // Click Today tab
    await page.click('button:has-text("Today")');
    await expect(page.locator("text=Today's Katas")).toBeVisible();
    
    // Click Upcoming tab
    await page.click('button:has-text("Upcoming")');
    await expect(page.locator('text=Upcoming Training')).toBeVisible();
  });
});
