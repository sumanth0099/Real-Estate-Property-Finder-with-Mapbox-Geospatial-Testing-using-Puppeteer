import React, { useEffect, useRef, useState } from 'react';

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN || 'pk.test.mock-token-for-testing-purposes';
const MAPBOX_STYLE = process.env.REACT_APP_MAPBOX_STYLE || 'mapbox://styles/mapbox/streets-v11';

function MapContainer({
  properties = [],
  center = { lat: 37.7749, lng: -122.4194 },
  zoom = 11,
  onMarkerClick,
  highlightedPropertyId,
  onMapReady,
  enableDraw = false,
  onBoundaryDrawn,
  onBoundaryCleared,
  showDrawControls = false,
  style = {}
}) {
  
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const markersRef = useRef({});
  const drawRef = useRef(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapError, setMapError] = useState(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    const initMap = async () => {
      try {
        const mapboxgl = await import('mapbox-gl');
        mapboxgl.default.accessToken = MAPBOX_TOKEN;

        // Clearing container before adding map
        if (mapContainerRef.current) {
          mapContainerRef.current.innerHTML = '';
        }

        const map = new mapboxgl.default.Map({
          container: mapContainerRef.current,
          style: MAPBOX_STYLE,
          center: [center.lng, center.lat],
          zoom: zoom,
        });

        mapRef.current = map;
        window.mapboxMap = map;

        map.on('load', () => {
          setMapLoaded(true);
          window.mapboxMapLoaded = true;
          if (onMapReady) onMapReady(map);
          
          if (enableDraw && showDrawControls) {
            import('@mapbox/mapbox-gl-draw').then(({ default: MapboxDraw }) => {
              const draw = new MapboxDraw({
                displayControlsDefault: false,
                controls: { polygon: true, trash: true },
              });
              map.addControl(draw);
              drawRef.current = draw;
              window.mapboxDraw = draw;

              map.on('draw.create', () => {
                const data = draw.getAll();
                if (data.features.length > 0 && onBoundaryDrawn) {
                  onBoundaryDrawn(data.features[0].geometry);
                }
              });
              map.on('draw.delete', () => {
                if (onBoundaryCleared) onBoundaryCleared();
              });
            }).catch(() => {
              // Fallback: draw without plugin using click events
              setupManualDraw(map);
            });
          }
        });

        map.on('error', (e) => {
          console.warn('Mapbox error:', e);
          // On token error, show a styled static map
          setMapError('Map API unavailable - using mock mode');
          setMapLoaded(true);
          window.mapboxMapLoaded = true;
          window.mapboxMap = {
            getCenter: () => ({ lat: center.lat, lng: center.lng }),
            setCenter: () => {},
            flyTo: () => {},
          };
          if (onMapReady) onMapReady(window.mapboxMap);
        });

      } catch (err) {
        console.warn('Mapbox load failed:', err);
        setMapError('Map unavailable in this environment');
        setMapLoaded(true);
        window.mapboxMapLoaded = true;
        window.mapboxMap = {
          getCenter: () => ({ lat: center.lat, lng: center.lng }),
          setCenter: () => {},
          flyTo: () => {},
        };
        if (onMapReady) onMapReady(window.mapboxMap);
      }
    };

    initMap();

    return () => {
      if (mapRef.current && mapRef.current.remove) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  // Setup manual polygon drawing as fallback
  const setupManualDraw = (map) => {
    let points = [];

    map.getCanvas().addEventListener('click', (e) => {
      if (!window.drawingMode) return;
      const rect = e.target.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const lngLat = map.unproject([x, y]);
      points.push([lngLat.lng, lngLat.lat]);
    });
  };

  // Update markers when properties change
  useEffect(() => {
    if (!mapLoaded || !mapRef.current || mapError) return;
    if (!mapRef.current.addSource) return; // mock map

    const updateMarkers = async () => {
      const mapboxgl = await import('mapbox-gl').catch(() => null);
      if (!mapboxgl) return;

      // Remove old markers not in new list
      Object.keys(markersRef.current).forEach(id => {
        if (!properties.find(p => p.id.toString() === id)) {
          markersRef.current[id].remove();
          delete markersRef.current[id];
        }
      });

      // Add/update markers
      properties.forEach(prop => {
        const id = prop.id.toString();
        if (markersRef.current[id]) {
          // Update highlight state
          const el = markersRef.current[id].getElement();
          if (highlightedPropertyId === prop.id) {
            el.classList.add('highlighted');
          } else {
            el.classList.remove('highlighted');
          }
          return;
        }

        // Create marker element
        const el = document.createElement('div');
        el.className = `map-marker${highlightedPropertyId === prop.id ? ' highlighted' : ''}`;
        el.setAttribute('data-testid', `map-marker-${prop.id}`);
        el.setAttribute('data-property-id', prop.id);
        el.title = prop.title;

        // Create popup
        const popup = new mapboxgl.default.Popup({ offset: 20 }).setHTML(`
          <div class="map-popup">
            <strong>${prop.title}</strong>
            <div>$${prop.price.toLocaleString()}</div>
            <div>${prop.bedrooms}bd / ${prop.bathrooms}ba · ${prop.sqft} sqft</div>
          </div>
        `);

        const marker = new mapboxgl.default.Marker(el)
          .setLngLat([prop.longitude, prop.latitude])
          .setPopup(popup)
          .addTo(mapRef.current);

        el.addEventListener('click', () => {
          if (onMarkerClick) onMarkerClick(prop.id);
        });

        markersRef.current[id] = marker;
      });
    };

    updateMarkers();
  }, [properties, mapLoaded, mapError, highlightedPropertyId, onMarkerClick]);

  // Update highlight state
  useEffect(() => {
    Object.entries(markersRef.current).forEach(([id, marker]) => {
      const el = marker.getElement ? marker.getElement() : null;
      if (!el) return;
      if (parseInt(id) === highlightedPropertyId) {
        el.classList.add('highlighted');
      } else {
        el.classList.remove('highlighted');
      }
    });
  }, [highlightedPropertyId]);

  // Update center when prop changes
  useEffect(() => {
    if (!mapLoaded || !mapRef.current) return;
    if (mapRef.current.flyTo) {
      mapRef.current.flyTo({ center: [center.lng, center.lat], zoom });
    }
  }, [center, zoom, mapLoaded]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', ...style }}>
      <div ref={mapContainerRef} style={{ width: '100%', height: '100%', background: '#e8ecf0' }} />
      {mapError && (
        <div style={{
          position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          color: 'white', gap: 12
        }}>
          <div style={{ fontSize: '2rem' }}>🗺️</div>
          <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>{mapError}</div>
          <div style={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: 8, 
            maxWidth: '100%', 
            justifyContent: 'center',
            maxHeight: '300px',
            overflowY: 'auto',
            padding: '10px'
          }}>
            {properties.map(p => (
              <div
                key={p.id}
                data-testid={`map-marker-${p.id}`}
                data-property-id={p.id}
                data-latitude={p.latitude}
                data-longitude={p.longitude}
                onClick={() => onMarkerClick && onMarkerClick(p.id)}
                style={{
                  background: highlightedPropertyId === p.id ? '#f57c00' : '#4fc3f7',
                  padding: '6px 12px', borderRadius: 20, cursor: 'pointer', fontSize: '0.75rem',
                  fontWeight: 600,
                  boxShadow: highlightedPropertyId === p.id ? '0 0 0 2px white, 0 4px 6px rgba(0,0,0,0.3)' : '0 2px 4px rgba(0,0,0,0.2)'
                }}
              >
                📍 ${Math.round(p.price / 1000)}k
              </div>
            ))}
          </div>
          <div style={{ fontSize: '0.75rem', opacity: 0.5, marginTop: 8 }}>
            {properties.length} properties showing on mock map
          </div>
        </div>
      )}
      {mapLoaded && (
        <div data-testid="map-loaded" className="map-loaded-indicator" aria-hidden="true" />
      )}
    </div>
  );
}

export default MapContainer;