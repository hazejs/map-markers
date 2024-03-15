import React, { useEffect, useState } from 'react';
import { Dispatch } from 'redux';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './redux/store';
import { incrementCounter } from './redux/index';
import 'leaflet/dist/leaflet.css';
import './App.css';
import L from 'leaflet';

const MapComponent: React.FC = () => {
  const dispatch = useDispatch();
  const markers = useSelector((state: RootState) => state.markers.markers);

  return (
    <div style={{ width: '100%', height: '400px' }}>
      <MapContainer center={[32.088777452, 34.781800515]} zoom={12} style={{ width: '100%', height: '100%' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; OpenStreetMap contributors" />
        <Markers markers={markers} dispatch={dispatch} />
      </MapContainer>
    </div>
  );
};

interface MarkerData {
    id: string;
    latitude: number;
    longitude: number;
    counter: number;
}

const getRandomColor = () => {
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);
  return `rgb(${red},${green},${blue})`;
};

const Markers: React.FC<{ markers: MarkerData[]; dispatch: Dispatch }> = ({ markers, dispatch }) => {
  const map = useMap();
  const [colors, setColors] = useState<string[]>([]);

  useEffect(() => {
    if (colors.length !== markers.length) {
      const newColors = markers.map(() => getRandomColor());
      setColors(newColors);
    }

    markers.forEach((marker, index) => {
      const position: [number, number] = [marker.latitude, marker.longitude];
      const color = colors[index];
      const divIcon = L.divIcon({
        className: 'custom-marker',
        html: `<div style="display: flex; justify-content: center; align-items: center; position: relative;
         top: 6px; background-color: ${color}; height: 30px; width: 30px; border-radius: 50%; border: 1px solid black;">${marker.counter}</div>`,
      });
      L.marker(position, { icon: divIcon }).addTo(map).on('click', () => dispatch(incrementCounter(marker.id)));
    });
  }, [markers, dispatch, map, colors]);

  return null;
};

export default MapComponent;
