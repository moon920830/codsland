// components/LocationMap.js

import React, { useState } from 'react';
if (typeof window !== 'undefined') {
  // import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
  const { MapContainer, TileLayer, Marker, Popup } = require('react-leaflet');
}

const LocationMap = ({ onLocationSelect }) => {
  const [position, setPosition] = useState([37.7749, -122.4194]);

  const handleMapClick = (event) => {
    console.log(event.latlang);
    alert();
    const { lat, lng } = event.latlng;
    setPosition([lat, lng]);
    onLocationSelect({ lat, lng });
  };

  return (
    <MapContainer center={position} zoom={8} style={{ height: '400px', width: '100%' }} onClick={() => {alert()}}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={position}>
        <Popup>Your selected location</Popup>
      </Marker>
    </MapContainer>
  );
};

export default LocationMap;