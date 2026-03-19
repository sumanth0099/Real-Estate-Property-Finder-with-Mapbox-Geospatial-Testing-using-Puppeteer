import { haversineDistance, isPointInPolygon, formatPrice, mockGeocode } from './geo';

describe('Geospatial Utilities', () => {
  describe('haversineDistance', () => {
    it('should calculate distance between two points correctly', () => {
      // San Francisco to Los Angeles is roughly 560km
      const sf = { lat: 37.7749, lng: -122.4194 };
      const la = { lat: 34.0522, lng: -118.2437 };
      const dist = haversineDistance(sf.lat, sf.lng, la.lat, la.lng);
      expect(dist).toBeGreaterThan(500);
      expect(dist).toBeLessThan(600);
    });

    it('should return 0 for the same point', () => {
      const dist = haversineDistance(37.7749, -122.4194, 37.7749, -122.4194);
      expect(dist).toBe(0);
    });
  });

  describe('isPointInPolygon', () => {
    const polygon = {
      type: 'Polygon',
      coordinates: [[
        [-122.45, 37.75],
        [-122.40, 37.75],
        [-122.40, 37.80],
        [-122.45, 37.80],
        [-122.45, 37.75]
      ]]
    };

    it('should return true for a point inside the polygon', () => {
      expect(isPointInPolygon(37.77, -122.42, polygon)).toBe(true);
    });

    it('should return false for a point outside the polygon', () => {
      expect(isPointInPolygon(37.70, -122.42, polygon)).toBe(false);
    });
  });

  describe('formatPrice', () => {
    it('should format price as USD currency', () => {
      expect(formatPrice(500000)).toBe('$500,000');
      expect(formatPrice(1250000)).toBe('$1,250,000');
    });
  });

  describe('mockGeocode', () => {
    it('should return location for known cities', () => {
      const results = mockGeocode('San Francisco');
      expect(results.length).toBe(1);
      expect(results[0].name).toContain('San Francisco');
    });

    it('should return empty array for unknown locations', () => {
      const results = mockGeocode('Mars');
      expect(results.length).toBe(0);
    });
  });
});
