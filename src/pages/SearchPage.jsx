import React, { useState, useMemo, useCallback } from 'react';
import properties from '../data/properties';
import MapContainer from '../components/MapContainer';
import PropertyCard from '../components/PropertyCard';
import LocationAutocomplete from '../components/LocationAutocomplete';
import { filterByRadius, filterByBoundary } from '../utils/geo';

const DEFAULT_CENTER = { lat: 37.7749, lng: -122.4194 };

function SearchPage({ savedProperties, toggleSaveProperty, saveSearch }) {
  const [location, setLocation] = useState(null);
  const [radius, setRadius] = useState(50);
  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [boundary, setBoundary] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [highlightedId, setHighlightedId] = useState(null);
  const [mapCenter, setMapCenter] = useState(DEFAULT_CENTER);


  const filteredProperties = useMemo(() => {
    let result = [...properties];

    if (priceMin) result = result.filter(p => p.price >= parseInt(priceMin));
    if (priceMax) result = result.filter(p => p.price <= parseInt(priceMax));
    if (bedrooms !== '') result = result.filter(p => p.bedrooms >= parseInt(bedrooms));
    if (propertyType) result = result.filter(p => p.propertyType === propertyType);

    if (boundary) {
      result = filterByBoundary(result, boundary);
    } else if (location) {
      result = filterByRadius(result, location.lat, location.lng, radius);
    }

    return result;
  }, [location, radius, priceMin, priceMax, bedrooms, propertyType, boundary]);

  const handleLocationSelect = useCallback((loc) => {
    setLocation(loc);
    setMapCenter({ lat: loc.lat, lng: loc.lng });
  }, []);

  const handleApply = useCallback(() => {
    // Already reactive via useMemo
  }, []);

  const handleSaveSearch = useCallback(() => {
    const criteria = [];
    if (location) criteria.push(`Location: ${location.name}`);
    if (radius) criteria.push(`Radius: ${radius}km`);
    if (priceMin) criteria.push(`Min: $${parseInt(priceMin).toLocaleString()}`);
    if (priceMax) criteria.push(`Max: $${parseInt(priceMax).toLocaleString()}`);
    if (bedrooms) criteria.push(`Beds: ${bedrooms}+`);
    if (propertyType) criteria.push(`Type: ${propertyType}`);

    saveSearch({
      name: `Search ${new Date().toLocaleDateString()}`,
      filters: { location, radius, priceMin, priceMax, bedrooms, propertyType },
      criteria,
      resultsCount: filteredProperties.length,
    });
    alert('Search saved!');
  }, [location, radius, priceMin, priceMax, bedrooms, propertyType, filteredProperties.length, saveSearch]);

  const handleDrawBoundary = useCallback(() => {
    setIsDrawing(prev => !prev);
    window.drawingMode = !isDrawing;
  }, [isDrawing]);

  const handleBoundaryDrawn = useCallback((polygon) => {
    setBoundary(polygon);
    setIsDrawing(false);
    window.drawingMode = false;
  }, []);

  const handleClearBoundary = useCallback(() => {
    setBoundary(null);
    setIsDrawing(false);
    window.drawingMode = false;
    if (window.mapboxDraw) window.mapboxDraw.deleteAll();
  }, []);

  return (
    <div className="search-page-container">
      {/* Filters Panel */}
      <div className="search-filters-panel">
        <h2>Advanced Search</h2>

        <div className="filter-section">
          <h3>Location</h3>
          <LocationAutocomplete
            onSelect={handleLocationSelect}
            placeholder="City, address, neighborhood..."
          />
        </div>

        <div className="filter-section">
          <h3>Search Radius</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8 }}>
            <input
              data-testid="search-radius-slider"
              type="range"
              min="1"
              max="100"
              value={radius}
              onChange={e => setRadius(parseInt(e.target.value))}
              className="full-width"
            />
            <span style={{ minWidth: 50, fontWeight: 600, color: '#1a1a2e' }}>{radius} km</span>
          </div>
        </div>

        <div className="filter-section">
          <h3>Price Range</h3>
          <div className="price-range-inputs">
            <input
              data-testid="price-min-input"
              type="number"
              placeholder="Min"
              value={priceMin}
              onChange={e => setPriceMin(e.target.value)}
            />
            <span>–</span>
            <input
              data-testid="price-max-input"
              type="number"
              placeholder="Max"
              value={priceMax}
              onChange={e => setPriceMax(e.target.value)}
            />
          </div>
        </div>

        <div className="filter-section">
          <h3>Bedrooms</h3>
          <select
            data-testid="bedrooms-select"
            value={bedrooms}
            onChange={e => setBedrooms(e.target.value)}
          >
            <option value="">Any</option>
            <option value="0">Studio</option>
            <option value="1">1+</option>
            <option value="2">2+</option>
            <option value="3">3+</option>
            <option value="4">4+</option>
          </select>
        </div>

        <div className="filter-section">
          <h3>Property Type</h3>
          <select data-testid="property-type-select" value={propertyType} onChange={e => setPropertyType(e.target.value)}>
            <option value="">All Types</option>
            <option value="Apartment">Apartment</option>
            <option value="House">House</option>
            <option value="Condo">Condo</option>
            <option value="Townhouse">Townhouse</option>
            <option value="Loft">Loft</option>
            <option value="Penthouse">Penthouse</option>
          </select>
        </div>

        <div className="filter-section">
          <h3>Draw Boundary</h3>
          <p style={{ fontSize: '0.8rem', color: '#888', marginBottom: 8 }}>
            Click to draw a polygon search area on the map
          </p>
          <button
            data-testid="draw-boundary-button"
            className={`btn-draw${isDrawing ? ' active' : ''}`}
            onClick={handleDrawBoundary}
            style={{ width: '100%', marginBottom: 8 }}
          >
            {isDrawing ? '✏️ Drawing... (click map to add points)' : '🔷 Draw Search Boundary'}
          </button>
          {boundary && (
            <button
              data-testid="clear-boundary-button"
              className="btn-clear"
              onClick={handleClearBoundary}
              style={{ width: '100%' }}
            >
              ✕ Clear Boundary
            </button>
          )}
        </div>

        <button
          data-testid="apply-filters-button"
          className="btn-apply"
          onClick={handleApply}
          style={{ width: '100%', padding: '12px', marginBottom: 8 }}
        >
          🔍 Apply Filters
        </button>

        <button
          data-testid="save-search-button"
          className="btn-save-search"
          onClick={handleSaveSearch}
          style={{ width: '100%', padding: '12px' }}
        >
          💾 Save This Search
        </button>

        <div data-testid="results-count" style={{ marginTop: 16, padding: '10px', background: '#f0f8ff', borderRadius: 8, textAlign: 'center', fontWeight: 600, color: '#1a1a2e' }}>
          {filteredProperties.length} {filteredProperties.length === 1 ? 'property' : 'properties'} found
        </div>

        {boundary && (
          <div data-testid="boundary-active" style={{ display: 'none' }} aria-hidden="true" />
        )}
      </div>

      {/* Map + Results */}
      <div className="search-map-area" style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ flex: 1, position: 'relative' }}>
          <MapContainer
            properties={filteredProperties}
            center={mapCenter}
            zoom={location ? 12 : 11}
            onMarkerClick={setHighlightedId}
            highlightedPropertyId={highlightedId}
            enableDraw={true}
            showDrawControls={isDrawing}
            onBoundaryDrawn={handleBoundaryDrawn}
            onBoundaryCleared={handleClearBoundary}
          />
        </div>
        <div style={{ height: '300px', overflowY: 'auto', background: '#f8f9fa', borderTop: '1px solid #eee', padding: 12, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          {filteredProperties.slice(0, 6).map(prop => (
            <div key={prop.id} style={{ width: 200 }}>
              <PropertyCard
                property={prop}
                isSaved={savedProperties.includes(prop.id)}
                onSave={toggleSaveProperty}
                isHighlighted={highlightedId === prop.id}
                onClick={() => setHighlightedId(prop.id)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
