import React, { useState, useEffect } from "react";
import GoogleMapReact from "google-map-react";
import axios from "axios";

function GeocodedMap(props) {
  const [location, setLocation] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  const AnyReactComponent = ({ text }) => <div>{text}</div>;

  useEffect(() => {
    if (!props.city || !props.state) return;
    const geocodeAddress = () => {
      const { city, state } = props;
      const address = `${city}, ${state}`;
      const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
      axios
        .get(`https://maps.googleapis.com/maps/api/geocode/json`, {
          params: {
            address: address,
            key: apiKey,
          },
        })
        .then((response) => {
          const { lat, lng } = response.data.results[0].geometry.location;
          setLocation({ latitude: lat, longitude: lng });
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Geocoding error:", error);
          setIsLoading(false);
        });
    };

    geocodeAddress();
  }, [props]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ width: "100%", height: "200px" }}>
      <GoogleMapReact
        zoom={12}
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
        defaultCenter={{
          lat: location.latitude,
          lng: location.longitude,
        }}
      >
        <AnyReactComponent
          lat={location.latitude}
          lng={location.longitude}
          text="My Marker"
        />
      </GoogleMapReact>
    </div>
  );
}

export default GeocodedMap;
