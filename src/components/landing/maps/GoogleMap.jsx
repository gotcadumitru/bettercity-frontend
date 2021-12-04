import GoogleMapReact from 'google-map-react';
import React, { useEffect, useState } from 'react';

const Marker = ({ text }) => <div className="google-map__marker">{text}</div>;

const GoogleMap = ({ onChange, isDisabled, height, markers, ...props }) => {
  const [selectedMarker, setSelectedMarker] = useState([]);

  useEffect(() => {
    if (selectedMarker.length) {
      onChange(selectedMarker);
    }
    // eslint-disable-next-line
  }, [selectedMarker]);
  return (
    <div style={{ height, width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyDRvC6Q5uvEzTFo_CB0RiegSYQ-PxNNUEc' }}
        defaultCenter={{
          lat: 45.75597730618024,
          lng: 21.22962774095996,
        }}
        defaultZoom={13}
        yesIWantToUseGoogleMapApiInternals
        onClick={(value) => {
          if (isDisabled) return;
          setSelectedMarker([value.lat, value.lng]);
        }}
        on
      >
        {markers.map((marker) => (
          <Marker key={marker.text} {...marker} />
        ))}
      </GoogleMapReact>
    </div>
  );
};
export default GoogleMap;
