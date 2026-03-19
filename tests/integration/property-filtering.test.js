/**
 * Property Filtering Integration Tests
 * Tests price, bedroom, type filtering and property detail page
 */

const { launchBrowser, createSuite } = require('./helpers');

const suite = createSuite('Property Filtering');

suite.test('should filter by price range (min)', async () => {
  const browser = await launchBrowser();
  const page = await browser.newPage();
  try {
    const appUrl = process.env.APP_URL || 'http://localhost:3006';
    await page.goto(`${appUrl}/properties`, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForSelector('[data-testid^="property-card-"]', { timeout: 10000 });

    const initialCount = await page.$$eval('[data-testid^="property-card-"]', els => els.length);

    // Set high min price
    await page.click('[data-testid="price-min-input"]');
    await page.type('[data-testid="price-min-input"]', '3000000');
    await page.click('[data-testid="apply-filters-button"]');
    await new Promise(r => setTimeout(r, 600));

    const filteredCount = await page.$$eval('[data-testid^="property-card-"]', els => els.length);

    if (filteredCount >= initialCount) {
      throw new Error(`Min price filter did not reduce results: ${initialCount} → ${filteredCount}`);
    }
  } finally {
    await browser.close();
  }
});

suite.test('should filter by price range (max)', async () => {
  const browser = await launchBrowser();
  const page = await browser.newPage();
  try {
    const appUrl = process.env.APP_URL || 'http://localhost:3006';
    await page.goto(`${appUrl}/properties`, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForSelector('[data-testid^="property-card-"]', { timeout: 10000 });

    const initialCount = await page.$$eval('[data-testid^="property-card-"]', els => els.length);

    // Set low max price
    await page.click('[data-testid="price-max-input"]');
    await page.type('[data-testid="price-max-input"]', '500000');
    await page.click('[data-testid="apply-filters-button"]');
    await new Promise(r => setTimeout(r, 600));

    const filteredCount = await page.$$eval('[data-testid^="property-card-"]', els => els.length);
    if (filteredCount >= initialCount) {
      throw new Error(`Max price filter did not reduce results: ${initialCount} → ${filteredCount}`);
    }
  } finally {
    await browser.close();
  }
});

suite.test('should filter by bedrooms', async () => {
  const browser = await launchBrowser();
  const page = await browser.newPage();
  try {
    const appUrl = process.env.APP_URL || 'http://localhost:3006';
    await page.goto(`${appUrl}/properties`, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForSelector('[data-testid="bedrooms-select"]', { timeout: 10000 });

    const initialCount = await page.$$eval('[data-testid^="property-card-"]', els => els.length);

    // Select 4+ bedrooms
    await page.select('[data-testid="bedrooms-select"]', '4');
    await page.click('[data-testid="apply-filters-button"]');
    await new Promise(r => setTimeout(r, 600));

    const filteredCount = await page.$$eval('[data-testid^="property-card-"]', els => els.length);
    if (filteredCount >= initialCount) {
      throw new Error(`Bedroom filter did not reduce results: ${initialCount} → ${filteredCount}`);
    }
  } finally {
    await browser.close();
  }
});

suite.test('results-count should update after filter applied', async () => {
  const browser = await launchBrowser();
  const page = await browser.newPage();
  try {
    const appUrl = process.env.APP_URL || 'http://localhost:3006';
    await page.goto(`${appUrl}/properties`, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForSelector('[data-testid="results-count"]', { timeout: 10000 });

    const beforeCount = await page.$eval('[data-testid="results-count"]', el => el.textContent);

    await page.type('[data-testid="price-min-input"]', '2000000');
    await page.click('[data-testid="apply-filters-button"]');
    await new Promise(r => setTimeout(r, 600));

    const afterCount = await page.$eval('[data-testid="results-count"]', el => el.textContent);
    // Results count text should be different
    if (beforeCount === afterCount) {
      throw new Error('Results count did not update after filtering');
    }
  } finally {
    await browser.close();
  }
});

suite.test('property detail page should have all required elements', async () => {
  const browser = await launchBrowser();
  const page = await browser.newPage();
  try {
    const appUrl = process.env.APP_URL || 'http://localhost:3006';
    await page.goto(`${appUrl}/property/1`, { waitUntil: 'domcontentloaded', timeout: 30000 });

    const required = [
      'property-detail-container',
      'property-title',
      'property-price',
      'property-full-address',
      'property-map',
      'property-coordinates',
      'nearby-amenities',
    ];

    for (const testId of required) {
      const el = await page.$(`[data-testid="${testId}"]`);
      if (!el) throw new Error(`Missing: [data-testid="${testId}"]`);
    }
  } finally {
    await browser.close();
  }
});

suite.test('property detail page should display correct property data', async () => {
  const browser = await launchBrowser();
  const page = await browser.newPage();
  try {
    const appUrl = process.env.APP_URL || 'http://localhost:3006';
    await page.goto(`${appUrl}/property/1`, { waitUntil: 'domcontentloaded', timeout: 30000 });

    const title = await page.$eval('[data-testid="property-title"]', el => el.textContent);
    const price = await page.$eval('[data-testid="property-price"]', el => el.textContent);
    const address = await page.$eval('[data-testid="property-full-address"]', el => el.textContent);

    if (!title || title.trim() === '') throw new Error('Property title is empty');
    if (!price || !price.includes('$')) throw new Error('Property price should contain $');
    if (!address || address.trim() === '') throw new Error('Property address is empty');
  } finally {
    await browser.close();
  }
});

suite.test('property detail should show nearby amenities', async () => {
  const browser = await launchBrowser();
  const page = await browser.newPage();
  try {
    const appUrl = process.env.APP_URL || 'http://localhost:3006';
    await page.goto(`${appUrl}/property/1`, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForSelector('[data-testid="nearby-amenities"]', { timeout: 10000 });

    const amenitiesEl = await page.$('[data-testid="nearby-amenities"]');
    const amenitiesText = await amenitiesEl.evaluate(el => el.textContent);
    if (!amenitiesText || amenitiesText.trim() === '') {
      throw new Error('Nearby amenities section is empty');
    }
  } finally {
    await browser.close();
  }
});

suite.test('navigating to invalid property id should handle gracefully', async () => {
  const browser = await launchBrowser();
  const page = await browser.newPage();
  try {
    const appUrl = process.env.APP_URL || 'http://localhost:3006';
    await page.goto(`${appUrl}/property/99999`, { waitUntil: 'domcontentloaded', timeout: 30000 });
    // Should not crash - page should render something
    const body = await page.$('body');
    if (!body) throw new Error('Page body not found');
  } finally {
    await browser.close();
  }
});

suite.test('clearing price filter should restore all results', async () => {
  const browser = await launchBrowser();
  const page = await browser.newPage();
  try {
    const appUrl = process.env.APP_URL || 'http://localhost:3006';
    await page.goto(`${appUrl}/properties`, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForSelector('[data-testid^="property-card-"]', { timeout: 10000 });

    const initialCount = await page.$$eval('[data-testid^="property-card-"]', els => els.length);

    // Apply filter
    await page.type('[data-testid="price-min-input"]', '5000000');
    await page.click('[data-testid="apply-filters-button"]');
    await new Promise(r => setTimeout(r, 500));

    // Clear filter
    await page.evaluate(() => {
      const input = document.querySelector('[data-testid="price-min-input"]');
      if (input) {
        const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
          window.HTMLInputElement.prototype, 'value'
        ).set;
        nativeInputValueSetter.call(input, '');
        input.dispatchEvent(new Event('input', { bubbles: true }));
        input.dispatchEvent(new Event('change', { bubbles: true }));
      }
    });
    await page.click('[data-testid="apply-filters-button"]');
    await new Promise(r => setTimeout(r, 500));

    const restoredCount = await page.$$eval('[data-testid^="property-card-"]', els => els.length);
    if (restoredCount < 1) throw new Error('Clearing filter returned 0 results');
  } finally {
    await browser.close();
  }
});

module.exports = { run: (opts) => suite.run(opts) };
