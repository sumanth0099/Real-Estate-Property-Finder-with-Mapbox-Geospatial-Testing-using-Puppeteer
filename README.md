# 🏠 Real Estate Property Finder

A full-featured real estate platform with interactive Mapbox maps, advanced geospatial search, and comprehensive Puppeteer integration tests.

## Features

- **Interactive Map** – Mapbox GL JS with property markers, popups, and clustering
- **Geospatial Search** – Radius-based filtering using the Haversine formula
- **Draw Boundary** – Polygon drawing to filter properties within a custom area
- **Location Autocomplete** – Mapbox Geocoding API integration with mock fallback
- **Advanced Filters** – Price range, bedrooms, property type
- **Property Detail** – Full page with coordinates, nearby amenities, and mini-map
- **Saved Searches** – Save, load, and delete search criteria
- **Integration Tests** – Full Puppeteer suite with 40+ test cases
- **Docker** – One-command setup with Docker Compose

## Quick Start

### Prerequisites

- [Docker](https://www.docker.com/) & Docker Compose
- (For local dev) Node.js 18+

### 1. Clone and Configure

```bash
cp .env.example .env.test
# For development with real map tiles, add your Mapbox token:
# MAPBOX_ACCESS_TOKEN=pk.eyJ1Ijoi...
```

> **Note:** The app works without a real Mapbox token — it gracefully falls back to a mock map mode that still supports all DOM interactions and testing.

### 2. Run with Docker Compose

```bash
# Start the application
docker-compose up -d app

# The app will be available at:
# http://localhost:3006
```

### 3. Run Integration Tests

```bash
# Run tests against the Docker app
docker-compose up puppeteer-integration-tests

# Or run tests standalone (app must be running)
docker-compose run puppeteer-integration-tests

# Test results are written to ./test-results/
```

### 4. One-Command Full Run

```bash
docker-compose up
```

This starts the app and runs all integration tests. The test service exits when done.

---

## Local Development

```bash
npm install
cp .env.example .env.local
# Edit .env.local with your Mapbox token
npm start
# App runs at http://localhost:3006
```

## Running Tests Locally

```bash
# Make sure app is running first (npm start)
npm run test:integration

# Results appear in ./test-results/
```

---

## Project Structure

```
.
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── FilterPanel.jsx          # Search filters bar
│   │   ├── LocationAutocomplete.jsx # Mapbox geocoding autocomplete
│   │   ├── MapContainer.jsx         # Mapbox GL JS map wrapper
│   │   └── PropertyCard.jsx         # Property list card
│   ├── data/
│   │   └── properties.js            # Mock dataset (35 properties)
│   ├── pages/
│   │   ├── PropertiesPage.jsx       # /properties - main listing
│   │   ├── PropertyDetailPage.jsx   # /property/:id
│   │   ├── SavedSearchesPage.jsx    # /saved-searches
│   │   └── SearchPage.jsx           # /search - advanced search
│   ├── styles/
│   │   └── App.css
│   ├── utils/
│   │   └── geo.js                   # Haversine, polygon filtering, geocoding
│   ├── App.jsx
│   └── index.js
├── tests/
│   └── integration/
│       ├── helpers.js               # Shared Puppeteer utilities
│       ├── run-tests.js             # Test runner & report generator
│       ├── map-initialization.test.js
│       ├── location-autocomplete.test.js
│       ├── geospatial-search.test.js
│       ├── map-interactions.test.js
│       ├── property-filtering.test.js
│       └── saved-searches.test.js
├── test-results/                    # Generated after running tests
│   ├── integration-report.json
│   ├── geospatial-test-summary.json
│   └── screenshots/
├── .env.example
├── .env.test
├── docker-compose.yml
├── Dockerfile
├── Dockerfile.test
└── README.md
```

---

## Pages & Routes

| Route | Description |
|---|---|
| `/properties` | Main listing with split map/list view and filters |
| `/property/:id` | Full property detail with map, coordinates, amenities |
| `/search` | Advanced search with full-page map |
| `/saved-searches` | View, load, and delete saved searches |

---

## Mock Data

35 properties distributed across:
- **San Francisco, CA** – 11 properties (Downtown, Mission, Nob Hill, Marina, etc.)
- **Los Angeles, CA** – 12 properties (Beverly Hills, Venice, Malibu, Hollywood Hills, etc.)
- **New York, NY** – 12 properties (Manhattan, Brooklyn, Tribeca, Harlem, etc.)

Each property includes: id, title, price, address, city, state, zipcode, latitude, longitude, bedrooms, bathrooms, sqft, propertyType, yearBuilt, lotSize, images, description, features.

---

## Integration Tests

Six test suites covering all core requirements:

| Test File | Coverage |
|---|---|
| `map-initialization.test.js` | DOM elements, map loaded, markers, data-testid attributes |
| `location-autocomplete.test.js` | Search input, suggestions, map centering |
| `geospatial-search.test.js` | Radius slider, boundary drawing, filter elements |
| `map-interactions.test.js` | Marker clicks, card highlighting, view toggle |
| `property-filtering.test.js` | Price, bedrooms, property detail page |
| `saved-searches.test.js` | Save, load, delete, empty state |

### Test Reports

After running tests, these files are generated in `./test-results/`:
- `integration-report.json` – Full test results for all suites
- `geospatial-test-summary.json` – Geospatial-specific test summary
- `screenshots/` – Failure screenshots (if any)

---

## Environment Variables

| Variable | Required | Default | Description |
|---|---|---|---|
| `MAPBOX_ACCESS_TOKEN` | No | mock token | Mapbox public access token |
| `MAPBOX_STYLE` | No | streets-v11 | Mapbox style URL |
| `REACT_APP_MAPBOX_ACCESS_TOKEN` | No | mock token | Build-time token for React |
| `REACT_APP_MAPBOX_STYLE` | No | streets-v11 | Build-time style for React |
| `PORT` | No | 3006 | App server port |
| `APP_URL` | No | http://localhost:3006 | Test target URL |

---

## Geospatial Implementation

### Haversine Formula
Calculates great-circle distance between two lat/lng points on Earth's surface (implemented in `src/utils/geo.js`):

```js
function haversineDistance(lat1, lng1, lat2, lng2) {
  const R = 6371; // Earth radius in km
  // ... spherical law of haversines
}
```

### Point-in-Polygon
Ray casting algorithm to determine if a property coordinate lies within a drawn polygon boundary.

### Radius Search
Filters the client-side dataset using Haversine distance from a selected location center point.

---

## Tech Stack

- **React 18** with React Router v6
- **Mapbox GL JS** v2.x with `@mapbox/mapbox-gl-draw`
- **Puppeteer** v21 for headless Chromium testing
- **Docker** multi-stage build (Node 18 Alpine)
- **serve** for static file serving in production

---

## Troubleshooting

**Map not rendering?**
The app works in mock mode without a valid Mapbox token. All `data-testid` attributes and filtering still work correctly.

**Tests timing out?**
Increase timeouts in `tests/integration/helpers.js`. Docker networking may add ~5s startup overhead.

**Docker build slow?**
First build installs Chromium and all dependencies. Subsequent builds use the layer cache.
