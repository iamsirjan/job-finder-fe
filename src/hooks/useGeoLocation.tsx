import { useState, useEffect } from 'react';

interface GeolocationOptions {
  enableHighAccuracy?: boolean;
  timeout?: number;
  maximumAge?: number;
}

interface GeolocationState {
  latitude: number | null;
  longitude: number | null;
  accuracy: number | null;
  error: string | null;
}

function useGeolocation(options?: GeolocationOptions): GeolocationState {
  const [state, setState] = useState<GeolocationState>({
    latitude: null,
    longitude: null,
    accuracy: null,
    error: null,
  });

  useEffect(() => {
    if (!navigator.geolocation) {
      setState((prevState) => ({
        ...prevState,
        error: 'Geolocation is not supported by your browser',
      }));
      return;
    }

    const successHandler = (position: GeolocationPosition) => {
      setState({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        accuracy: position.coords.accuracy,
        error: null,
      });
    };

    const errorHandler = (error: GeolocationPositionError) => {
      setState((prevState) => ({
        ...prevState,
        error: error.message,
      }));
    };

    const id = navigator.geolocation.watchPosition(
      successHandler,
      errorHandler,
      options,
    );

    return () => navigator.geolocation.clearWatch(id);
  }, [options]);

  return state;
}

export default useGeolocation;
