import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import * as Location from "expo-location";

interface LocationContextType {
  location: Location.LocationObject | null;
  loading: boolean;
  address: string | null;
}

const initialLocationContext: LocationContextType = {
  location: null,
  loading: true,
  address: null,
};

const LocationContext = createContext<LocationContextType>(
  initialLocationContext
);

export const useLocation = () => useContext(LocationContext);

export const LocationProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [address, setAddress] = useState<string | null>(null);

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
          cacheAddress(loc);
        } else {
          const newLoc = await Location.getCurrentPositionAsync();
          setLocation(newLoc);
          setLoading(false);
          cacheAddress(newLoc);
        }
      } catch (error) {
        console.error("Error fetching location:", error);
        // Handle error
      }
    };

    fetchLocation();
  }, []);

  const cacheAddress = async (loc: Location.LocationObject) => {
    try {
      const address = await Location.reverseGeocodeAsync({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
      });
      if (address && address.length > 0) {
        setAddress(address[0].city); // Cache the city
      }
    } catch (error) {
      console.error("Error caching address:", error);
    }
  };

  return (
    <LocationContext.Provider value={{ location, loading, address }}>
      {children}
    </LocationContext.Provider>
  );
};
