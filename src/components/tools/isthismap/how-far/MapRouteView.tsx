'use client'

import { MapContainer, TileLayer, Marker, Popup, Polyline, useMapEvents, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useMemo, useRef, useEffect } from 'react';
import L from 'leaflet';

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

const targetIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34], shadowSize: [41, 41]
});

interface LocationTarget {
  name: string;
  lat: number;
  lng: number;
  icon: string;
}

interface MapRouteViewProps {
  userPos: { lat: number; lng: number } | undefined;
  onUserDragEnd: (pos: { lat: number, lng: number }) => void;
  targets: LocationTarget[];
  focusedTarget: { lat: number; lng: number } | null;
}

function CameraController({ target }: { target: { lat: number; lng: number } | null }) {
  const map = useMap();

  useEffect(() => {
    if (target) {
      map.flyTo([target.lat, target.lng], 6, {
        animate: true,
        duration: 2
      });
    }
  }, [target, map]);

  return null;
}

function DraggableMarker({ pos, onDragEnd }: { pos: { lat: number, lng: number }, onDragEnd: (pos: { lat: number, lng: number }) => void }) {
  const markerRef = useRef<L.Marker>(null);
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          const newPos = marker.getLatLng();
          onDragEnd({ lat: newPos.lat, lng: newPos.lng });
        }
      },
    }),
    [onDragEnd]
  );

  return (
    <Marker
      draggable={true}
      eventHandlers={eventHandlers}
      position={pos}
      ref={markerRef}
      icon={userIcon}
      zIndexOffset={1000}
    >
      <Popup>Geser aku sesuka hatimu! 📍</Popup>
    </Marker>
  )
}

export default function MapRouteView({ userPos, onUserDragEnd, targets, focusedTarget }: MapRouteViewProps) {
  const defaultCenter: [number, number] = [-2.5489, 118.0149];

  return (
    <MapContainer
      center={userPos ? [userPos.lat, userPos.lng] : defaultCenter}
      zoom={3}
      className="h-full w-full bg-zinc-900 z-0"
    >
      <TileLayer
        attribution='Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
      />

      <TileLayer
        url="https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}"
      />

      <CameraController target={focusedTarget} />

      {userPos && (
        <DraggableMarker pos={userPos} onDragEnd={onUserDragEnd} />
      )}

      {userPos && targets.map((target, idx) => (
        <div key={idx}>
          <Marker position={[target.lat, target.lng]} icon={targetIcon}>
            <Popup className="font-bold text-center">
              <span className="text-xl">{target.icon}</span><br />
              {target.name}
            </Popup>
          </Marker>

          <Polyline
            positions={[
              [userPos.lat, userPos.lng],
              [target.lat, target.lng]
            ]}
            pathOptions={{
              color: 'yellow',
              weight: 1,
              dashArray: '5, 10',
              opacity: 0.4
            }}
          />
        </div>
      ))}
    </MapContainer>
  );
}