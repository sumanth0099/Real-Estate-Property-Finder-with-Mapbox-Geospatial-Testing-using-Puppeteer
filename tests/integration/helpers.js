/**
 * Shared test helpers for Puppeteer integration tests
 */

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const APP_URL = process.env.APP_URL || 'http://localhost:3006';

async function launchBrowser() {
  return puppeteer.launch({
    headless: 'new',
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-gpu',
      '--no-first-run',
      '--no-zygote',
      '--disable-web-security',
    ],
  });
}

async function waitForMapLoaded(page, timeout = 15000) {
  try {
    await page.waitForSelector('[data-testid="map-loaded"]', { timeout });
    return true;
  } catch {
    // Also check window flag
    try {
      await page.waitForFunction(() => window.mapboxMapLoaded === true, { timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }
}

async function takeScreenshot(page, screenshotsDir, name) {
  try {
    if (screenshotsDir) {
      const filePath = path.join(screenshotsDir, `${name}-${Date.now()}.png`);
      await page.screenshot({ path: filePath, fullPage: false });
      return filePath;
    }
  } catch (e) {
    // ignore screenshot errors
  }
  return null;
}

async function runTest(testFn, name) {
  const startTime = Date.now();
  try {
    await testFn();
    const duration = Date.now() - startTime;
    console.log(`  ✅ ${name} (${duration}ms)`);
    return { name, status: 'passed', duration };
  } catch (err) {
    const duration = Date.now() - startTime;
    console.log(`  ❌ ${name} - ${err.message}`);
    return { name, status: 'failed', error: err.message, duration };
  }
}

function createSuite(name) {
  const tests = [];
  let passed = 0;
  let failed = 0;

  return {
    test: (testName, fn) => tests.push({ name: testName, fn }),
    run: async (opts = {}) => {
      console.log(`\n  Suite: ${name}`);
      const results = [];
      for (const t of tests) {
        const result = await runTest(t.fn, t.name);
        results.push(result);
        if (result.status === 'passed') passed++;
        else failed++;
      }
      return {
        suite: name,
        tests: results,
        total: tests.length,
        passed,
        failed,
      };
    },
  };
}

module.exports = { launchBrowser, waitForMapLoaded, takeScreenshot, runTest, createSuite, APP_URL };
