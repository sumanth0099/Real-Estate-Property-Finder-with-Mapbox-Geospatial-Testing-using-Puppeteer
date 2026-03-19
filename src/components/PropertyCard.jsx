import React from 'react';
import { Link } from 'react-router-dom';
import { formatPrice } from '../utils/geo';

function PropertyCard({ property, isSaved, onSave, isHighlighted, onClick }) {
  const { id, title, price, address, city, state, bedrooms, bathrooms, sqft, propertyType, images, latitude, longitude } = property;

  return (
    <div
      data-testid={`property-card-${id}`}
      className={`property-card${isHighlighted ? ' highlighted' : ''}`}
      onClick={onClick}
    >
      {images && images[0] && (
        <img
          data-testid={`property-image-${id}`}
          src={images[0]}
          alt={title}
          loading="lazy"
          onError={e => { e.target.style.display = 'none'; }}
        />
      )}
      <div className="property-card-body">
        <div
          data-testid={`property-title-${id}`}
          className="property-title"
        >
          {title}
        </div>
        <div
          data-testid={`property-price-${id}`}
          className="property-price"
        >
          {formatPrice(price)}
        </div>
        <div
          data-testid={`property-address-${id}`}
          className="property-address"
          data-latitude={latitude}
          data-longitude={longitude}
        >
          📍 {address}, {city}, {state}
        </div>
        <div className="property-meta">
          <span>🛏 {bedrooms === 0 ? 'Studio' : `${bedrooms} bd`}</span>
          <span>🚿 {bathrooms} ba</span>
          <span>📐 {sqft.toLocaleString()} sqft</span>
          <span>🏠 {propertyType}</span>
        </div>
        <div className="property-card-actions">
          <button
            data-testid={`save-property-${id}`}
            className={`btn-save${isSaved ? ' saved' : ''}`}
            onClick={e => { e.stopPropagation(); onSave(id); }}
          >
            {isSaved ? '❤️ Saved' : '🤍 Save'}
          </button>
          <Link
            to={`/property/${id}`}
            className="btn-detail"
            onClick={e => e.stopPropagation()}
          >
            View Details →
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PropertyCard;
