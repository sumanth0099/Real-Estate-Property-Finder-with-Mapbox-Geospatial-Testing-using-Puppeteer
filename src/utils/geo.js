
export function haversineDistance(lat1, lng1, lat2, lng2) {
  const R = 6371; 
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRad(deg) {
  return deg * (Math.PI / 180);
}


export function isPointInPolygon(lat, lng, polygon) {
  if (!polygon || !polygon.coordinates || !polygon.coordinates[0]) return false;
  const coords = polygon.coordinates[0];
  let inside = false;
  for (let i = 0, j = coords.length - 1; i < coords.length; j = i++) {
    const xi = coords[i][0], yi = coords[i][1];
    const xj = coords[j][0], yj = coords[j][1];
    const intersect =
      ((yi > lat) !== (yj > lat)) &&
      (lng < ((xj - xi) * (lat - yi)) / (yj - yi) + xi);
    if (intersect) inside = !inside;
  }
  return inside;
}

export function filterByRadius(properties, centerLat, centerLng, radiusKm) {
  return properties.filter(p =>
    haversineDistance(centerLat, centerLng, p.latitude, p.longitude) <= radiusKm
  );
}


export function filterByBoundary(properties, polygon) {
  return properties.filter(p =>
    isPointInPolygon(p.latitude, p.longitude, polygon)
  );
}


export function formatPrice(price) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(price);
}


export function mockGeocode(query) {
  const locations = {
    'san francisco': { lat: 37.7749, lng: -122.4194, name: 'San Francisco, CA' },
    'los angeles': { lat: 34.0522, lng: -118.2437, name: 'Los Angeles, CA' },
    'new york': { lat: 40.7128, lng: -74.0060, name: 'New York, NY' },
    'brooklyn': { lat: 40.6782, lng: -73.9442, name: 'Brooklyn, NY' },
    'manhattan': { lat: 40.7831, lng: -73.9712, name: 'Manhattan, NY' },
    'beverly hills': { lat: 34.0736, lng: -118.4004, name: 'Beverly Hills, CA' },
    'venice beach': { lat: 33.9850, lng: -118.4695, name: 'Venice Beach, CA' },
    'nob hill': { lat: 37.7918, lng: -122.4129, name: 'Nob Hill, San Francisco' },
  };
  const key = query.toLowerCase();
  for (const [k, v] of Object.entries(locations)) {
    if (key.includes(k)) return [v];
  }
  return [];
}