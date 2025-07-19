import { useEffect, useRef  } from "react";
import mapboxgl from "mapbox-gl";
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = 'eyJ1IjoiYmFoYTgxOSIsImEiOiJjbWQ2c2trangwM21nMmxvOXRzNmN1ZmY2In0';

interface Place {
    _id: string,
    geometry?: {
        coordinates: [number, number] | { lng: number; lat: number } | { lon: number; lat: number };
    };
    title: string,
    address: string
}

interface MapboxMapProps {
    geometry?: {
        coordinates: [number, number] | {lng: number; lat: number} | {lon: number; lat:number};
    };
    places?: Place[];
};

function HomeMap({geometry, places}: MapboxMapProps){
    const mapContainer = useRef<HTMLDivElement>(null);
    const mapRef = useRef<mapboxgl.Map | null>(null);
    const markerRef = useRef<mapboxgl.Marker[]>([]);

    const normalizeCoordinates = (coords: any): [number, number] => {
        if (Array.isArray(coords)){
            return [coords[0], coords[1]];
        }
        if('lng' in coords){
            return [coords.lng, coords.lat];
        }
        if('lon' in coords){
            return [coords.lon, coords.lat];
        }
        throw new Error("invalid coordinate format");
    };

    useEffect(()=>{
        if(!mapContainer.current) return;

        const defaultCoords: [number, number] = [-73.968285, 40.785091];
        let centerCoords = defaultCoords;

        try {
            if(geometry?.coordinates){
                centerCoords = normalizeCoordinates(geometry.coordinates);
            }
        } catch (error) {
            console.error('invalid coordinates: ', error)
        }

        mapRef.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v12',
            center: centerCoords,
            zoom: 2.5, 
            antialias: true
        });

    },[geometry]);

    useEffect(()=>{
        if(!mapRef.current || !places) return;

        // Clear existing markers
        markerRef.current.forEach(marker => marker.remove());
        markerRef.current = [];

        // Add new markers for each place
        places.forEach(place => {
            if(!place.geometry?.coordinates) return;
            try {
                const coords = normalizeCoordinates(place.geometry.coordinates);
                const marker = new mapboxgl.Marker()
                    .setLngLat(coords)
                    .setPopup(new mapboxgl.Popup().setHTML(`<div style="display: flex; flex-align: column; justify-content: evenly">
                        <h1 style="font-bold; font-size: 16px; text-align: center;  color: red">${place.title}<h1/>
                         <p style="font-size: 12px; margin: 0; color:#0000FF ;">${place.address}</p>
                        </div>`))
                    .addTo(mapRef.current!);
                markerRef.current.push(marker)
            } catch (error) {
                console.error(`Error creating marker for place ${place._id}:`, error);
            }
        })
    }, [places])

    return (
        <div
            ref={mapContainer}
            style={{
                width: '100%',
                height: '400px'
            }}
        />
    )
};

export default HomeMap