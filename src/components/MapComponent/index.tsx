import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fixing the default icon issue in React-Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

interface DraggableMarkerMapProps {
  latitude: number;
  longitude: number;
  onPositionChange?: (lat: number, lng: number) => void;
}

const DraggableMarkerMap: React.FC<DraggableMarkerMapProps> = ({
  latitude,
  longitude,
  onPositionChange,
}) => {
  const [position, setPosition] = useState<[number, number]>([
    latitude,
    longitude,
  ]);
  const [draggable, setDraggable] = useState<boolean>(true);

  const eventHandlers: any = {
    dragend(e: any) {
      const marker = e.target;
      const newLatLng = marker.getLatLng();
      setPosition([newLatLng.lat, newLatLng.lng]);
      if (onPositionChange) {
        onPositionChange(newLatLng.lat, newLatLng.lng);
      }
    },
  };

  useEffect(() => {
    setPosition([latitude, longitude]);
  }, [latitude, longitude]);

  return (
    <MapContainer
      center={position}
      zoom={13}
      style={{ height: '400px', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker
        position={position}
        draggable={draggable}
        eventHandlers={eventHandlers}
      />
    </MapContainer>
  );
};

export default DraggableMarkerMap;
