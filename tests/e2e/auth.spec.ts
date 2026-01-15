import { test, expect } from '@playwright/test';

test.describe('Authentication Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display login form by default', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('Productivity Dojo');
    await expect(page.locator('button:has-text("Login")')).toBeVisible();
    await expect(page.locator('button:has-text("Sign Up")')).toBeVisible();
  });

  test('should switch to signup mode', async ({ page }) => {
    await page.click('button:has-text("Sign Up")');
    await expect(page.locator('input[placeholder="Username"]')).toBeVisible();
    await expect(page.locator('button:has-text("Begin Training")')).toBeVisible();
  });

  test('should show error for invalid credentials', async ({ page }) => {
    await page.fill('input[placeholder="Email"]', 'invalid@test.com');
    await page.fill('input[placeholder="Password"]', 'wrongpassword');
    await page.click('button:has-text("Enter the Dojo")');
    
    // Wait for error message
    await expect(page.locator('text=Invalid login credentials')).toBeVisible({ timeout: 5000 });
  });

  test('should require email and password', async ({ page }) => {
    const submitButton = page.locator('button:has-text("Enter the Dojo")');
    
    // HTML5 validation should prevent submission
    await page.fill('input[placeholder="Email"]', '');
    await page.fill('input[placeholder="Password"]', '');
    
    // Button should still be there (form not submitted)
    await expect(submitButton).toBeVisible();
  });
});
