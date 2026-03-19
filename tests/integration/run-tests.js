#!/usr/bin/env node
/**
 * Integration Test Runner
 * Runs all Puppeteer integration tests and generates reports
 */

const fs = require('fs');
const path = require('path');

const APP_URL = process.env.APP_URL || 'http://localhost:3006';
const RESULTS_DIR = path.join(__dirname, '../../test-results');
const SCREENSHOTS_DIR = path.join(RESULTS_DIR, 'screenshots');

// Ensure output dirs exist
[RESULTS_DIR, SCREENSHOTS_DIR].forEach(dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

const testFiles = [
  'map-initialization.test.js',
  'location-autocomplete.test.js',
  'geospatial-search.test.js',
  'map-interactions.test.js',
  'property-filtering.test.js',
  'saved-searches.test.js',
];

async function runTests() {
  const results = {
    timestamp: new Date().toISOString(),
    appUrl: APP_URL,
    suites: [],
    summary: { total: 0, passed: 0, failed: 0, skipped: 0 },
  };

  const geospatialResults = {
    timestamp: new Date().toISOString(),
    tests: [],
    summary: { total: 0, passed: 0, failed: 0 },
  };

  console.log('\n🏠 Real Estate App - Integration Test Suite');
  console.log('='.repeat(50));
  console.log(`📍 Target: ${APP_URL}\n`);

  for (const file of testFiles) {
    const filePath = path.join(__dirname, file);
    if (!fs.existsSync(filePath)) {
      console.warn(`⚠️  Test file not found: ${file}`);
      continue;
    }

    console.log(`\n📋 Running: ${file}`);
    console.log('-'.repeat(40));

    try {
      // Clear require cache
      delete require.cache[require.resolve(filePath)];
      const testModule = require(filePath);
      const suiteResults = await testModule.run({ appUrl: APP_URL, screenshotsDir: SCREENSHOTS_DIR });

      results.suites.push({ file, ...suiteResults });
      results.summary.total += suiteResults.total || 0;
      results.summary.passed += suiteResults.passed || 0;
      results.summary.failed += suiteResults.failed || 0;

      // Collect geospatial test results
      if (file.includes('geospatial') || file.includes('map')) {
        (suiteResults.tests || []).forEach(t => {
          geospatialResults.tests.push({ suite: file, ...t });
          geospatialResults.summary.total++;
          if (t.status === 'passed') geospatialResults.summary.passed++;
          else geospatialResults.summary.failed++;
        });
      }

      const statusIcon = suiteResults.failed > 0 ? '❌' : '✅';
      console.log(`${statusIcon} ${suiteResults.passed}/${suiteResults.total} tests passed`);

    } catch (err) {
      console.error(`❌ Failed to run ${file}:`, err.message);
      results.suites.push({ file, error: err.message, total: 0, passed: 0, failed: 1 });
      results.summary.failed++;
      results.summary.total++;
    }
  }

  // Write reports
  const reportPath = path.join(RESULTS_DIR, 'integration-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(results, null, 2));
  console.log(`\n📊 Report written to: ${reportPath}`);

  const geoPath = path.join(RESULTS_DIR, 'geospatial-test-summary.json');
  fs.writeFileSync(geoPath, JSON.stringify(geospatialResults, null, 2));
  console.log(`📍 Geospatial summary written to: ${geoPath}`);

  // Print summary
  console.log('\n' + '='.repeat(50));
  console.log('📈 FINAL SUMMARY');
  console.log('='.repeat(50));
  console.log(`✅ Passed:  ${results.summary.passed}`);
  console.log(`❌ Failed:  ${results.summary.failed}`);
  console.log(`📊 Total:   ${results.summary.total}`);
  console.log('='.repeat(50));

  const exitCode = results.summary.failed > 0 ? 1 : 0;
  process.exit(exitCode);
}

runTests().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
