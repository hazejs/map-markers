import './App.css';
import MapboxMap from './MapboxMap';
import { Provider } from 'react-redux';
import store from './redux/store';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <h1>Mapbox</h1>
        <MapboxMap />
      </div>
    </Provider>
    
  );
}

export default App;
