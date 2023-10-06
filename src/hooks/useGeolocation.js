import { useState, useEffect } from "react";

export function useGeolocation(defaultPosition = null) {
  const [isLoading, setIsLoading] = useState(false);
  const [position, setPosition] = useState(defaultPosition);
  const [error, setError] = useState(null);

  // Define the getPosition function
  function getPosition() {
    if (!navigator.geolocation) {
      setError("Your browser doesn't support geolocation");
      return;
    }

    setIsLoading(true);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setIsLoading(false);
      },
      (error) => {
        setError(error.message);
        setIsLoading(false);
      }
    );
  }

  // Call getPosition when the component mounts
  useEffect(() => {
    getPosition();
  }, []);

  return { isLoading, position, error, getPosition };
}
