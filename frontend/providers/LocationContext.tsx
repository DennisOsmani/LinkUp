import React, { createContext, useContext, useEffect, useState } from "react";
import * as Location from "expo-location";

const LocationContext = createContext<{
  location: Location.LocationObject | null;
  loading: boolean;
}>({
  location: null,
  loading: true,
});

export const useLocation = () => useContext(LocationContext);

export const LocationProvider = ({ children }) => {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          // Handle permission denied
          return;
        }
        const loc = await Location.getLastKnownPositionAsync();
        if (loc) {
          setLocation(loc);
          setLoading(false);
        } else {
          const newLoc = await Location.getCurrentPositionAsync();
          setLocation(newLoc);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching location:", error);
        // Handle error
      }
    };

    fetchLocation();
  }, []);

  return (
    <LocationContext.Provider value={{ location, loading }}>
      {children}
    </LocationContext.Provider>
  );
};
