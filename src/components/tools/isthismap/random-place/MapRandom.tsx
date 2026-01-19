'use client'

import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect } from 'react';
import L from 'leaflet';

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({ iconUrl: markerIcon.src, iconRetinaUrl: markerIcon2x.src, shadowUrl: markerShadow.src });

const portalIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-violet.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34], shadowSize: [41, 41]
});

interface MapRandomProps {
  coords: { lat: number; lng: number } | null;
}

function FlyToLocation({ coords }: MapRandomProps) {
  const map = useMap();
  
  useEffect(() => {
    if (coords) {
      map.flyTo([coords.lat, coords.lng], 6, {
        animate: true,
        duration: 3
      });
    }
  }, [coords, map]);

  return null;
}

export default function MapRandom({ coords }: MapRandomProps) {
  return (
    <MapContainer 
      center={[0, 0]} 
      zoom={2} 
      className="h-full w-full bg-[#050505] z-0"
      minZoom={2}
    >
      <TileLayer
        attribution='&copy; CARTO'
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      />
      
      <FlyToLocation coords={coords} />

      {coords && (
        <Marker position={[coords.lat, coords.lng]} icon={portalIcon}>
          <Popup>You landed here! 🎉</Popup>
        </Marker>
      )}
    </MapContainer>
  );
}