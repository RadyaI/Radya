'use client'

import { MapContainer, TileLayer, Marker, Popup, Circle, useMapEvents, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect } from 'react';

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({ iconUrl: markerIcon.src, iconRetinaUrl: markerIcon2x.src, shadowUrl: markerShadow.src });

const userIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34], shadowSize: [41, 41]
});

const zombieIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34], shadowSize: [41, 41]
});

interface MapZombieProps {
    playerPos: { lat: number, lng: number } | null;
    zombies: any[];
    onMapClick: (lat: number, lng: number) => void;
    energy: number;
}

function CameraFollow({ pos }: { pos: { lat: number, lng: number } | null }) {
    const map = useMap();
    useEffect(() => {
        if (pos) map.setView([pos.lat, pos.lng], 17, { animate: true });
    }, [pos, map]);
    return null;
}

function MapEvents({ onMapClick }: { onMapClick: (lat: number, lng: number) => void }) {
    useMapEvents({
        click(e) {
            if (typeof onMapClick === 'function') {
                onMapClick(e.latlng.lat, e.latlng.lng);
            } else {
                console.warn("onMapClick belum siap atau undefined");
            }
        },
    });
    return null;
}

export default function MapZombie({ playerPos, zombies, onMapClick, energy }: MapZombieProps) {
    return (
        <MapContainer 
            center={playerPos ? [playerPos.lat, playerPos.lng] : [0,0]} 
            zoom={17} 
            className="h-full w-full bg-[#1a0505] z-0"
            zoomControl={false}
            scrollWheelZoom={false} 
            dragging={false}
        >
            <TileLayer
                attribution='&copy; CARTO'
                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            />
            
            <MapEvents onMapClick={onMapClick} />
            <CameraFollow pos={playerPos} />

            {playerPos && (
                <>
                    <Marker position={[playerPos.lat, playerPos.lng]} icon={userIcon} />
                    
                    <Circle 
                        center={[playerPos.lat, playerPos.lng]} 
                        radius={300}
                        pathOptions={{ 
                            color: energy >= 30 ? 'emerald' : 'gray', 
                            fillColor: 'transparent', 
                            weight: 1, 
                            dashArray: '5, 5',
                            opacity: 0.3
                        }} 
                    />

                    <Circle 
                        center={[playerPos.lat, playerPos.lng]} 
                        radius={30} 
                        pathOptions={{ color: 'transparent', fillColor: 'red', fillOpacity: 0.1 }} 
                    />
                </>
            )}

            {zombies.map((z, i) => (
                <Marker key={i} position={[z.lat, z.lng]} icon={zombieIcon} />
            ))}
        </MapContainer>
    );
}