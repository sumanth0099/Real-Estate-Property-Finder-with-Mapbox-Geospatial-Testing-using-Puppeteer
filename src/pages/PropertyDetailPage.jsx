import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import properties, { amenities } from '../data/properties';
import MapContainer from '../components/MapContainer';
import { haversineDistance, formatPrice } from '../utils/geo';

function PropertyDetailPage({ savedProperties, toggleSaveProperty }) {
  const { id } = useParams();
  const property = properties.find(p => p.id === parseInt(id));

  const nearbyAmenities = useMemo(() => {
    if (!property) return [];
    return amenities
      .map(a => ({
        ...a,
        distance: haversineDistance(property.latitude, property.longitude, a.latitude, a.longitude)
      }))
      .sort((a, b) => a.distance - b.distance)
      .slice(0, 5);
  }, [property]);

  if (!property) {
    return (
      <div style={{ padding: 32, textAlign: 'center' }}>
        <h2>Property not found</h2>
        <Link to="/properties" className="btn-back">← Back to Properties</Link>
      </div>
    );
  }

  const isSaved = savedProperties.includes(property.id);
  const center = { lat: property.latitude, lng: property.longitude };

  return (
    <div data-testid="property-detail-container" className="property-detail-container">
      <Link to="/properties" className="btn-back">← Back to Properties</Link>

      <div className="property-detail-header">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12 }}>
          <div>
            <h1 data-testid="property-title" className="property-detail-title">
              {property.title}
            </h1>
            <div data-testid="property-price" className="property-detail-price">
              {formatPrice(property.price)}
            </div>
            <div data-testid="property-full-address" className="property-detail-address">
              📍 {property.address}, {property.city}, {property.state} {property.zipcode}
            </div>
          </div>
          <button
            data-testid={`save-property-${property.id}`}
            className={`btn-save${isSaved ? ' saved' : ''}`}
            style={{ padding: '10px 20px', fontSize: '0.95rem' }}
            onClick={() => toggleSaveProperty(property.id)}
          >
            {isSaved ? '❤️ Saved' : '🤍 Save Property'}
          </button>
        </div>

        <div className="property-stats">
          <div className="stat">
            <div className="stat-value">{property.bedrooms === 0 ? 'Studio' : property.bedrooms}</div>
            <div className="stat-label">Bedrooms</div>
          </div>
          <div className="stat">
            <div className="stat-value">{property.bathrooms}</div>
            <div className="stat-label">Bathrooms</div>
          </div>
          <div className="stat">
            <div className="stat-value">{property.sqft.toLocaleString()}</div>
            <div className="stat-label">Sq Ft</div>
          </div>
          <div className="stat">
            <div className="stat-value">{property.yearBuilt}</div>
            <div className="stat-label">Year Built</div>
          </div>
          <div className="stat">
            <div className="stat-value">{property.propertyType}</div>
            <div className="stat-label">Type</div>
          </div>
        </div>
      </div>

      <div className="property-detail-grid">
        <div>
          {property.images && property.images[0] && (
            <img
              src={property.images[0]}
              alt={property.title}
              style={{ width: '100%', height: 320, objectFit: 'cover', borderRadius: 12, marginBottom: 16 }}
              onError={e => { e.target.style.display = 'none'; }}
            />
          )}

          <div style={{ background: 'white', borderRadius: 12, padding: 20, marginBottom: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
            <h3 style={{ marginBottom: 12 }}>About this Property</h3>
            <p style={{ color: '#555', lineHeight: 1.6 }}>{property.description}</p>
          </div>

          {property.features && property.features.length > 0 && (
            <div className="property-features">
              <h3>Features & Amenities</h3>
              <div className="features-list">
                {property.features.map((f, i) => (
                  <span key={i} className="feature-tag">✓ {f}</span>
                ))}
              </div>
            </div>
          )}
        </div>

        <div>
          <div className="property-map-section">
            <h3>Location</h3>
            <div data-testid="property-map" className="property-map">
              <MapContainer
                properties={[property]}
                center={center}
                zoom={14}
                style={{ height: '100%' }}
              />
            </div>
            <div
              data-testid="property-coordinates"
              className="property-coordinates"
            >
              📍 {property.latitude.toFixed(4)}°N, {Math.abs(property.longitude).toFixed(4)}°W
            </div>
          </div>

          <div data-testid="nearby-amenities" className="nearby-amenities">
            <h3>🏪 Nearby Amenities</h3>
            {nearbyAmenities.map(amenity => (
              <div key={amenity.id} className="amenity-item">
                <span>
                  {amenity.type === 'park' ? '🌳' :
                   amenity.type === 'hospital' ? '🏥' :
                   amenity.type === 'grocery' ? '🛒' : '🏪'} {amenity.name}
                </span>
                <span className="amenity-distance">
                  {amenity.distance.toFixed(1)} km
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PropertyDetailPage;
