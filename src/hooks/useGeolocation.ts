import { useState, useEffect } from 'react';

interface GeolocationState {
  loaded: boolean;
  coordinates?: { lat: number; lng: number };
  error?: string;
}

export const useGeolocation = () => {
  const [location, setLocation] = useState<GeolocationState>({
    loaded: false,
  });

  const onSuccess = (location: GeolocationPosition) => {
    setLocation({
      loaded: true,
      coordinates: {
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      },
    });
  };

  const onError = (error: GeolocationPositionError) => {
    setLocation({
      loaded: true,
      error: error.message,
    });
  };

  useEffect(() => {
    if (!("geolocation" in navigator)) {
      onError({
        code: 0,
        message: "Geolocation not supported",
      } as GeolocationPositionError);
      return;
    }

    navigator.geolocation.getCurrentPosition(onSuccess, onError, {
        enableHighAccuracy: true, 
        timeout: 10000,
        maximumAge: 0
    });
  }, []);

  return location;
};