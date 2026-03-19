import React, { useState, useMemo, useCallback } from 'react';
import properties from '../data/properties';
import MapContainer from '../components/MapContainer';
import PropertyCard from '../components/PropertyCard';
import FilterPanel from '../components/FilterPanel';
import { filterByRadius, filterByBoundary } from '../utils/geo';

const DEFAULT_FILTERS = {
  location: null,
  radius: 50,
  priceMin: null,
  priceMax: null,
  bedrooms: null,
  propertyType: null,
};

const DEFAULT_CENTER = { lat: 37.7749, lng: -122.4194 };

function PropertiesPage({ savedProperties, toggleSaveProperty, saveSearch }) {
  const [view, setView] = useState('split');
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [appliedFilters, setAppliedFilters] = useState(DEFAULT_FILTERS);
  const [mapCenter, setMapCenter] = useState(DEFAULT_CENTER);
  const [highlightedId, setHighlightedId] = useState(null);
  const [boundary, setBoundary] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const filteredProperties = useMemo(() => {
    let result = [...properties];

    if (appliedFilters.priceMin) {
      result = result.filter(p => p.price >= appliedFilters.priceMin);
    }
    if (appliedFilters.priceMax) {
      result = result.filter(p => p.price <= appliedFilters.priceMax);
    }
    if (appliedFilters.bedrooms !== null && appliedFilters.bedrooms !== '') {
      result = result.filter(p => p.bedrooms >= appliedFilters.bedrooms);
    }
    if (appliedFilters.propertyType) {
      result = result.filter(p => p.propertyType === appliedFilters.propertyType);
    }
    if (boundary) {
      result = filterByBoundary(result, boundary);
    } else if (appliedFilters.location && appliedFilters.radius) {
      result = filterByRadius(
        result,
        appliedFilters.location.lat,
        appliedFilters.location.lng,
        appliedFilters.radius
      );
    }

    return result;
  }, [appliedFilters, boundary]);

  const handleApply = useCallback((f) => {
    setAppliedFilters(f);
    if (f.location) {
      setMapCenter({ lat: f.location.lat, lng: f.location.lng });
      if (window.mapboxMap && window.mapboxMap.flyTo) {
        window.mapboxMap.flyTo({ center: [f.location.lng, f.location.lat], zoom: 12 });
      }
    }
  }, []);

  const handleSaveSearch = useCallback((f) => {
    const criteria = [];
    if (f.location) criteria.push(`Location: ${f.location.name}`);
    if (f.radius) criteria.push(`Radius: ${f.radius}km`);
    if (f.priceMin) criteria.push(`Min: $${f.priceMin.toLocaleString()}`);
    if (f.priceMax) criteria.push(`Max: $${f.priceMax.toLocaleString()}`);
    if (f.bedrooms) criteria.push(`Beds: ${f.bedrooms}+`);

    saveSearch({
      name: `Search ${new Date().toLocaleDateString()}`,
      filters: f,
      criteria,
      resultsCount: filteredProperties.length,
    });
    alert('Search saved!');
  }, [filteredProperties.length, saveSearch]);

  const handleMarkerClick = useCallback((propertyId) => {
    setHighlightedId(propertyId);
    const el = document.querySelector(`[data-testid="property-card-${propertyId}"]`);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, []);

  const handleDrawBoundary = useCallback(() => {
    setIsDrawing(prev => !prev);
    if (window.mapboxDraw) {
      if (!isDrawing) {
        window.mapboxDraw.changeMode('draw_polygon');
      } else {
        window.mapboxDraw.changeMode('simple_select');
      }
    }
  }, [isDrawing]);

  const handleBoundaryDrawn = useCallback((polygon) => {
    setBoundary(polygon);
    setIsDrawing(false);
  }, []);

  const handleClearBoundary = useCallback(() => {
    setBoundary(null);
    setIsDrawing(false);
    if (window.mapboxDraw) {
      window.mapboxDraw.deleteAll();
    }
  }, []);

  const showList = view === 'list' || view === 'split';
  const showMap = view === 'map' || view === 'split';

  return (
    <div data-testid="properties-container" style={{
      display: 'flex',
      flexDirection: 'column',
      height: 'calc(100vh - 60px)',
      overflow: 'hidden'
    }}>
      {/* Filters */}
      <FilterPanel
        filters={filters}
        onFilterChange={setFilters}
        onApply={handleApply}
        onSaveSearch={handleSaveSearch}
        onDrawBoundary={handleDrawBoundary}
        onClearBoundary={handleClearBoundary}
        isDrawing={isDrawing}
        hasBoundary={!!boundary}
        resultsCount={filteredProperties.length}
      />

      {/* View toggle header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '8px 16px',
        background: 'white',
        borderBottom: '1px solid #eee',
        flexShrink: 0
      }}>
        <span data-testid="results-count" style={{ fontSize: '0.85rem', color: '#666' }}>
          {filteredProperties.length} {filteredProperties.length === 1 ? 'property' : 'properties'} found
        </span>
        <div data-testid="view-toggle" className="view-toggle">
          <button className={`toggle-btn${view === 'list' ? ' active' : ''}`} onClick={() => setView('list')}>☰ List</button>
          <button className={`toggle-btn${view === 'split' ? ' active' : ''}`} onClick={() => setView('split')}>⊞ Split</button>
          <button className={`toggle-btn${view === 'map' ? ' active' : ''}`} onClick={() => setView('map')}>🗺 Map</button>
        </div>
      </div>

      {/* Main content area */}
      <div style={{
        display: 'flex',
        flex: 1,
        minHeight: 0
      }}>
        {/* Property List */}
        {showList && (
          <div style={{
            width: view === 'list' ? '100%' : '420px',
            minWidth: view === 'list' ? 0 : '320px',
            background: 'white',
            borderRight: view === 'split' ? '1px solid #e0e0e0' : 'none',
            overflowY: 'auto'
          }}>
            <div data-testid="property-list" style={{
              padding: '12px',
              display: 'flex',
              flexDirection: view === 'list' ? 'row' : 'column',
              flexWrap: view === 'list' ? 'wrap' : 'nowrap',
              gap: '12px'
            }}>
              {filteredProperties.map(prop => (
                <div key={prop.id} style={view === 'list' ? { width: 'calc(33.333% - 8px)', minWidth: '280px' } : {}}>
                  <PropertyCard
                    property={prop}
                    isSaved={savedProperties.includes(prop.id)}
                    onSave={toggleSaveProperty}
                    isHighlighted={highlightedId === prop.id}
                    onClick={() => setHighlightedId(prop.id)}
                  />
                </div>
              ))}
              {filteredProperties.length === 0 && (
                <div style={{ padding: '32px 16px', textAlign: 'center', color: '#888', width: '100%' }}>
                  No properties match your filters
                </div>
              )}
            </div>
          </div>
        )}

        {/* Map */}
        {showMap && (
          <div data-testid="map-container" style={{
            flex: 1,
            position: 'relative',
            minHeight: '300px'
          }}>
            <MapContainer
              properties={filteredProperties}
              center={mapCenter}
              zoom={11}
              onMarkerClick={handleMarkerClick}
              highlightedPropertyId={highlightedId}
              enableDraw={true}
              showDrawControls={isDrawing}
              onBoundaryDrawn={handleBoundaryDrawn}
              onBoundaryCleared={handleClearBoundary}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default PropertiesPage;
