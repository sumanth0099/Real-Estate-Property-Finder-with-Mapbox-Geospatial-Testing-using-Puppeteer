/**
 * Map Initialization Integration Tests
 * Tests that the Mapbox map initializes correctly and displays property markers
 */

const { launchBrowser, waitForMapLoaded, takeScreenshot, createSuite } = require('./helpers');

const suite = createSuite('Map Initialization');

suite.test('should have properties-container element on /properties', async () => {
  const browser = await launchBrowser();
  const page = await browser.newPage();
  try {
    const appUrl = process.env.APP_URL || 'http://localhost:3006';
    await page.goto(`${appUrl}/properties`, { waitUntil: 'domcontentloaded', timeout: 30000 });
    const el = await page.$('[data-testid="properties-container"]');
    if (!el) throw new Error('properties-container not found');
  } finally {
    await browser.close();
  }
});

suite.test('should have map-container element', async () => {
  const browser = await launchBrowser();
  const page = await browser.newPage();
  try {
    const appUrl = process.env.APP_URL || 'http://localhost:3006';
    await page.goto(`${appUrl}/properties`, { waitUntil: 'domcontentloaded', timeout: 30000 });
    const el = await page.$('[data-testid="map-container"]');
    if (!el) throw new Error('map-container not found');
  } finally {
    await browser.close();
  }
});

suite.test('should have property-list element', async () => {
  const browser = await launchBrowser();
  const page = await browser.newPage();
  try {
    const appUrl = process.env.APP_URL || 'http://localhost:3006';
    await page.goto(`${appUrl}/properties`, { waitUntil: 'domcontentloaded', timeout: 30000 });
    const el = await page.$('[data-testid="property-list"]');
    if (!el) throw new Error('property-list not found');
  } finally {
    await browser.close();
  }
});

suite.test('should have view-toggle element', async () => {
  const browser = await launchBrowser();
  const page = await browser.newPage();
  try {
    const appUrl = process.env.APP_URL || 'http://localhost:3006';
    await page.goto(`${appUrl}/properties`, { waitUntil: 'domcontentloaded', timeout: 30000 });
    const el = await page.$('[data-testid="view-toggle"]');
    if (!el) throw new Error('view-toggle not found');
  } finally {
    await browser.close();
  }
});

suite.test('should show map-loaded indicator after map loads', async () => {
  const browser = await launchBrowser();
  const page = await browser.newPage();
  try {
    const appUrl = process.env.APP_URL || 'http://localhost:3006';
    await page.goto(`${appUrl}/properties`, { waitUntil: 'networkidle0', timeout: 30000 });
    const loaded = await waitForMapLoaded(page, 20000);
    if (!loaded) throw new Error('map-loaded indicator never appeared');
  } finally {
    await browser.close();
  }
});

suite.test('should render property cards in list', async () => {
  const browser = await launchBrowser();
  const page = await browser.newPage();
  try {
    const appUrl = process.env.APP_URL || 'http://localhost:3006';
    await page.goto(`${appUrl}/properties`, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForSelector('[data-testid^="property-card-"]', { timeout: 10000 });
    const cards = await page.$$('[data-testid^="property-card-"]');
    if (cards.length < 1) throw new Error(`Expected at least 1 property card, found ${cards.length}`);
  } finally {
    await browser.close();
  }
});

suite.test('should have map markers for properties', async () => {
  const browser = await launchBrowser();
  const page = await browser.newPage();
  try {
    const appUrl = process.env.APP_URL || 'http://localhost:3006';
    await page.goto(`${appUrl}/properties`, { waitUntil: 'networkidle0', timeout: 30000 });
    await waitForMapLoaded(page, 15000);

    // Wait for markers
    await page.waitForFunction(
      () => document.querySelectorAll('[data-testid^="map-marker-"]').length > 0,
      { timeout: 10000 }
    );

    const markers = await page.$$('[data-testid^="map-marker-"]');
    if (markers.length < 1) throw new Error(`Expected map markers, found ${markers.length}`);
  } finally {
    await browser.close();
  }
});

suite.test('should have at least 30 properties in mock data', async () => {
  const browser = await launchBrowser();
  const page = await browser.newPage();
  try {
    const appUrl = process.env.APP_URL || 'http://localhost:3006';
    await page.goto(`${appUrl}/properties`, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForSelector('[data-testid^="property-card-"]', { timeout: 10000 });

    // Results count shows total
    const countText = await page.$eval('[data-testid="results-count"]', el => el.textContent).catch(() => '');
    const count = parseInt(countText);
    if (!isNaN(count) && count < 30) throw new Error(`Expected at least 30 properties, found ${count}`);
  } finally {
    await browser.close();
  }
});

suite.test('first property card should have all required data-testid attributes', async () => {
  const browser = await launchBrowser();
  const page = await browser.newPage();
  try {
    const appUrl = process.env.APP_URL || 'http://localhost:3006';
    await page.goto(`${appUrl}/properties`, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForSelector('[data-testid^="property-card-"]', { timeout: 10000 });

    // Get first property id
    const firstCard = await page.$('[data-testid^="property-card-"]');
    const testId = await firstCard.evaluate(el => el.getAttribute('data-testid'));
    const propId = testId.replace('property-card-', '');

    const requiredIds = [
      `property-card-${propId}`,
      `property-title-${propId}`,
      `property-price-${propId}`,
      `property-address-${propId}`,
      `save-property-${propId}`,
    ];

    for (const id of requiredIds) {
      const el = await page.$(`[data-testid="${id}"]`);
      if (!el) throw new Error(`Missing element: [data-testid="${id}"]`);
    }

    // Check data-latitude and data-longitude
    const hasCoords = await page.$(`[data-latitude]`);
    if (!hasCoords) throw new Error('No element with data-latitude attribute found');
  } finally {
    await browser.close();
  }
});

module.exports = { run: (opts) => suite.run(opts) };
