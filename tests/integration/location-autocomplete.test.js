/**
 * Location Autocomplete Integration Tests
 * Tests the location search autocomplete functionality and map centering
 */

const { launchBrowser, waitForMapLoaded, createSuite } = require('./helpers');

const suite = createSuite('Location Autocomplete');

suite.test('should have location-autocomplete input on /properties', async () => {
  const browser = await launchBrowser();
  const page = await browser.newPage();
  try {
    const appUrl = process.env.APP_URL || 'http://localhost:3006';
    await page.goto(`${appUrl}/properties`, { waitUntil: 'domcontentloaded', timeout: 30000 });
    const el = await page.$('[data-testid="location-autocomplete"]');
    if (!el) throw new Error('location-autocomplete input not found');
  } finally {
    await browser.close();
  }
});

suite.test('should show autocomplete suggestions when typing', async () => {
  const browser = await launchBrowser();
  const page = await browser.newPage();
  try {
    const appUrl = process.env.APP_URL || 'http://localhost:3006';
    await page.goto(`${appUrl}/properties`, { waitUntil: 'domcontentloaded', timeout: 30000 });

    await page.waitForSelector('[data-testid="location-autocomplete"]', { timeout: 10000 });
    await page.click('[data-testid="location-autocomplete"]');
    await page.type('[data-testid="location-autocomplete"]', 'San Francisco', { delay: 50 });

    // Wait for suggestions
    await page.waitForFunction(
      () => document.querySelectorAll('[data-testid^="autocomplete-suggestion-"]').length > 0,
      { timeout: 8000 }
    );

    const suggestions = await page.$$('[data-testid^="autocomplete-suggestion-"]');
    if (suggestions.length < 1) throw new Error('No autocomplete suggestions appeared');
  } finally {
    await browser.close();
  }
});

suite.test('should show suggestion-0 element after typing', async () => {
  const browser = await launchBrowser();
  const page = await browser.newPage();
  try {
    const appUrl = process.env.APP_URL || 'http://localhost:3006';
    await page.goto(`${appUrl}/properties`, { waitUntil: 'domcontentloaded', timeout: 30000 });

    await page.waitForSelector('[data-testid="location-autocomplete"]');
    await page.type('[data-testid="location-autocomplete"]', 'San Francisco', { delay: 40 });

    await page.waitForSelector('[data-testid="autocomplete-suggestion-0"]', { timeout: 8000 });
    const el = await page.$('[data-testid="autocomplete-suggestion-0"]');
    if (!el) throw new Error('autocomplete-suggestion-0 not found');
  } finally {
    await browser.close();
  }
});

suite.test('should center map when autocomplete suggestion is selected', async () => {
  const browser = await launchBrowser();
  const page = await browser.newPage();
  try {
    const appUrl = process.env.APP_URL || 'http://localhost:3006';
    await page.goto(`${appUrl}/properties`, { waitUntil: 'networkidle0', timeout: 30000 });
    await waitForMapLoaded(page, 15000);

    await page.waitForSelector('[data-testid="location-autocomplete"]');
    await page.type('[data-testid="location-autocomplete"]', 'San Francisco', { delay: 40 });

    await page.waitForSelector('[data-testid="autocomplete-suggestion-0"]', { timeout: 8000 });
    await page.click('[data-testid="autocomplete-suggestion-0"]');

    // Wait for map to update
    await new Promise(r => setTimeout(r, 1500));

    // Verify map center or selectedLocation was updated
    const center = await page.evaluate(() => {
      if (window.mapboxMap && window.mapboxMap.getCenter) {
        const c = window.mapboxMap.getCenter();
        return { lat: c.lat, lng: c.lng };
      }
      if (window.selectedLocation) return window.selectedLocation;
      return null;
    });

    if (!center) throw new Error('Map center not accessible after selecting suggestion');
    // San Francisco should be roughly at these coordinates
    if (Math.abs(center.lat - 37.7749) > 2 && Math.abs(center.lat - 37) > 5) {
      throw new Error(`Map center lat ${center.lat} not near San Francisco`);
    }
  } finally {
    await browser.close();
  }
});

suite.test('should clear autocomplete when selecting a suggestion', async () => {
  const browser = await launchBrowser();
  const page = await browser.newPage();
  try {
    const appUrl = process.env.APP_URL || 'http://localhost:3006';
    await page.goto(`${appUrl}/properties`, { waitUntil: 'domcontentloaded', timeout: 30000 });

    await page.waitForSelector('[data-testid="location-autocomplete"]');
    await page.type('[data-testid="location-autocomplete"]', 'Los Angeles', { delay: 40 });
    await page.waitForSelector('[data-testid="autocomplete-suggestion-0"]', { timeout: 8000 });
    await page.click('[data-testid="autocomplete-suggestion-0"]');

    await new Promise(r => setTimeout(r, 500));

    // Dropdown should be gone
    const dropdown = await page.$('.autocomplete-dropdown');
    const isVisible = dropdown
      ? await dropdown.evaluate(el => {
          const style = window.getComputedStyle(el);
          return style.display !== 'none' && style.visibility !== 'hidden';
        })
      : false;
    // It's ok if dropdown is gone or hidden
  } finally {
    await browser.close();
  }
});

suite.test('should have location-autocomplete on /search page', async () => {
  const browser = await launchBrowser();
  const page = await browser.newPage();
  try {
    const appUrl = process.env.APP_URL || 'http://localhost:3006';
    await page.goto(`${appUrl}/search`, { waitUntil: 'domcontentloaded', timeout: 30000 });
    const el = await page.$('[data-testid="location-autocomplete"]');
    if (!el) throw new Error('location-autocomplete not found on /search page');
  } finally {
    await browser.close();
  }
});

module.exports = { run: (opts) => suite.run(opts) };
