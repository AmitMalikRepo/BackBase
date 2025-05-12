import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  retries: process.env.CI ? 2 : 0,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  workers: process.env.CI ? 2 : 1,
  reporter: [['html', { open: 'never' }]],
  use: {
    headless: process.env.CI ? true : false,
    baseURL: 'http://localhost:8080/',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    viewport: { width: 1440, height: 1080 },
    video: 'on',
  },

  projects: [
    {
      name: 'Spring Petclinic',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
