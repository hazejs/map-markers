import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Marker {
  id: string;
  latitude: number;
  longitude: number;
  counter: number;
}

interface MarkersState {
  markers: Marker[];
}

const initialState: MarkersState = {
  markers: [
    { id: 'marker1', latitude: 32.088777452, longitude: 34.781800515, counter: 0 },
    { id: 'marker2', latitude: 32.076593575, longitude: 34.793269694, counter: 0 },
    { id: 'marker3', latitude: 32.064936193, longitude: 34.763176778, counter: 0 },
  ],
};

const markersSlice = createSlice({
  name: 'markers',
  initialState,
  reducers: {
    incrementCounter(state, action: PayloadAction<string>) {
      const marker = state.markers.find(marker => marker.id === action.payload);
      if (marker) {
        marker.counter++;
      }
    },
  },
});

export const { incrementCounter } = markersSlice.actions;
export default markersSlice.reducer;
