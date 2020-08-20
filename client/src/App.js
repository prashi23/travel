import * as React from 'react';
import { useState, useEffect } from 'react';
import ReactMapGL, {Marker, Popup} from 'react-map-gl';
import { listLogEntries } from './API';

const App = () => {
  const [logEntries, setLogEntries] = useState([]);
  const [showPopup, setShowPopup] = useState({};)
  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '100vh',
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 3
  });

  useEffect(() => {
    (async () => {
      const logEntries = await listLogEntries();
      setLogEntries(logEntries);
    })();
  }, []);

  return (
    <ReactMapGL
      {...viewport}
      mapStyle="mapbox://styles/duckduckhunt/cke1xw4bx0e6919n2nvq8be18"
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      onViewportChange={setViewport}
    > 
    {
      logEntries.map(entry => (
        <>
        <Marker
          key={entry._id} 
          latitude={entry.latitude} 
          longitude={entry.longitude} 
          //offsetLeft={-12} 
          //offsetTop={-24}
          >
          <div>
            <img 
            className="marker" 
            style={{
              height: `${12 * viewport.zoom}px`,
              width: `${12 * viewport.zoom}px`,
            }}
            src= "https://i.imgur.com/y0G5YTX.png" 
            alt="marker" />
          </div>
        </Marker>
{
  showPopup[entry._id] ? (
    <Popup
latitude={37.78}
longitude={-122.41}
closeButton={true}
closeOnClick={false}
onClose={() => this.setState({showPopup: false})}
anchor="top" >
<div>You are here</div>
</Popup>
  ) : null
}
</>
      ))
    }

    </ReactMapGL>
);
  }
export default App;