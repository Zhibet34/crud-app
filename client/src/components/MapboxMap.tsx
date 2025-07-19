// MapboxMap.tsx
import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = 'pk.eyJ1IjoiYmFoYTgxOSIsImEiOiJjbWQ2c2trangwM21nMmxvOXRzNmN1ZmY2In0.8T9oIx29mNiqK0F-A4MLQg';

interface MapboxMapProps {
    geometry?: {
        coordinates: [number, number] | { lng: number; lat: number } | { lon: number; lat: number };
    };
}

function MapboxMap({ geometry }: MapboxMapProps) {
    const mapContainer = useRef<HTMLDivElement>(null);
    const mapRef = useRef<mapboxgl.Map | null>(null);
    const markerRef = useRef<mapboxgl.Marker | null>(null);

    const normalizeCoordinates = (coords: any): [number, number] => {
        if (Array.isArray(coords)) {
            return [coords[0], coords[1]];
        }
        if ('lng' in coords) {
            return [coords.lng, coords.lat];
        }
        if ('lon' in coords) {
            return [coords.lon, coords.lat];
        }
        throw new Error('Invalid coordinate format');
    };

    useEffect(() => {
        if (!mapContainer.current) return;

        // Default coordinates if none provided
        const defaultCoords: [number, number] = [-73.968285, 40.785091];
        let centerCoords = defaultCoords;

        try {
            if (geometry?.coordinates) {
                centerCoords = normalizeCoordinates(geometry.coordinates);
            }
        } catch (e) {
            console.error('Invalid coordinates:', e);
        }

        // Initialize map
        mapRef.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v12',
            center: centerCoords,
            zoom: 15,
            antialias: true
        });

        // Add marker if coordinates exist
        if (geometry?.coordinates) {
            try {
                const markerCoords = normalizeCoordinates(geometry.coordinates);
                markerRef.current = new mapboxgl.Marker()
                    .setLngLat(markerCoords)
                    .addTo(mapRef.current);
            } catch (e) {
                console.error('Failed to create marker:', e);
            }
        }

        // Debug events
        mapRef.current.on('load', () => console.log("Map loaded"));
        mapRef.current.on('error', (e) => console.error("Map error:", e.error));

        return () => {
            if (markerRef.current) markerRef.current.remove();
            if (mapRef.current) mapRef.current.remove();
        };
    }, [geometry]);

    return (
        <div 
            ref={mapContainer}
            style={{ 
                width: "100%", 
                height: "350px",
            }}
        />
    );
}

export default MapboxMap;