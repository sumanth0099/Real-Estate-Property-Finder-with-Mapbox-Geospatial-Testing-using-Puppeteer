import React, { useState } from 'react';
import LocationAutocomplete from './LocationAutocomplete';

function FilterPanel({
  filters,
  onFilterChange,
  onApply,
  onSaveSearch,
  onDrawBoundary,
  onClearBoundary,
  isDrawing,
  hasBoundary,
  resultsCount,
}) {
  const [localFilters, setLocalFilters] = useState(filters);

  const update = (key, value) => {
    const updated = { ...localFilters, [key]: value };
    setLocalFilters(updated);
    onFilterChange(updated);
  };

  return (
    <div className="filter-panel">
      <div className="filter-group wide">
        <label>Location</label>
        <LocationAutocomplete
          onSelect={(loc) => update('location', loc)}
          placeholder="Search city, address..."
        />
      </div>

      <div className="filter-group">
        <label>Radius: <span className="slider-value">{localFilters.radius || 50} km</span></label>
        <input
          data-testid="search-radius-slider"
          type="range"
          min="1"
          max="100"
          value={localFilters.radius || 50}
          onChange={e => update('radius', parseInt(e.target.value))}
        />
      </div>

      <div className="filter-group">
        <label>Min Price ($)</label>
        <input
          data-testid="price-min-input"
          type="number"
          placeholder="0"
          value={localFilters.priceMin || ''}
          onChange={e => update('priceMin', e.target.value ? parseInt(e.target.value) : null)}
        />
      </div>

      <div className="filter-group">
        <label>Max Price ($)</label>
        <input
          data-testid="price-max-input"
          type="number"
          placeholder="Any"
          value={localFilters.priceMax || ''}
          onChange={e => update('priceMax', e.target.value ? parseInt(e.target.value) : null)}
        />
      </div>

      <div className="filter-group">
        <label>Bedrooms</label>
        <select
          data-testid="bedrooms-select"
          value={localFilters.bedrooms || ''}
          onChange={e => update('bedrooms', e.target.value ? parseInt(e.target.value) : null)}
        >
          <option value="">Any</option>
          <option value="0">Studio</option>
          <option value="1">1+</option>
          <option value="2">2+</option>
          <option value="3">3+</option>
          <option value="4">4+</option>
        </select>
      </div>

      <div className="filter-group">
        <label>Property Type</label>
        <select
          data-testid="property-type-select"
          value={localFilters.propertyType || ''}
          onChange={e => update('propertyType', e.target.value || null)}
        >
          <option value="">All Types</option>
          <option value="Apartment">Apartment</option>
          <option value="House">House</option>
          <option value="Condo">Condo</option>
          <option value="Townhouse">Townhouse</option>
          <option value="Loft">Loft</option>
          <option value="Penthouse">Penthouse</option>
        </select>
      </div>

      <button
        data-testid="draw-boundary-button"
        className={`btn-draw${isDrawing ? ' active' : ''}`}
        onClick={onDrawBoundary}
        title="Draw search boundary on map"
      >
        {isDrawing ? '✏️ Drawing...' : '🔷 Draw Boundary'}
      </button>

      {hasBoundary && (
        <button
          data-testid="clear-boundary-button"
          className="btn-clear"
          onClick={onClearBoundary}
        >
          ✕ Clear Boundary
        </button>
      )}

      <button
        data-testid="apply-filters-button"
        className="btn-apply"
        onClick={() => onApply(localFilters)}
      >
        🔍 Apply Filters
      </button>

      <button
        data-testid="save-search-button"
        className="btn-save-search"
        onClick={() => onSaveSearch(localFilters)}
      >
        💾 Save Search
      </button>

      {/* Results count removed to avoid redundancy with header */}

      {hasBoundary && (
        <div data-testid="boundary-active" style={{ display: 'none' }} aria-hidden="true" />
      )}
    </div>
  );
}

export default FilterPanel;
