import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import { styles } from "./PublicFeedStyles";
import EventCardFeed from "../Components/EventCardFeed";
import { getEventsInCity, getHostForEvent } from "../../../api/EventAPI";
import { joinOpenEvent } from "../../../api/EventRelationAPI";
import { useEffect, useState } from "react";
import { IEvent } from "../../../interfaces/ModelInterfaces";
import { useTokenProvider } from "../../../providers/TokenProvider";
import * as Location from "expo-location";

const imageSource = require("../../../assets/cbum.jpg");

export default function PublicFeed() {
  const [events, setEvents] = useState<IEvent[] | undefined>([]);
  const [hostNames, setHostNames] = useState<{ [eventId: string]: string }>({});
  const { token, setToken } = useTokenProvider();
  const [location, setLocation] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [fetchingEvents, setFetchingEvents] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      const loc = await Location.getCurrentPositionAsync();
      setLocation(loc);
      const address = await Location.reverseGeocodeAsync({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
      });
      if (address && address.length > 0) {
        setLocation((prevLocation: any) => ({
          ...prevLocation,
          city: address[0].city,
        }));
        setLoading(false);
        console.log("found location");
      }
    })();
  }, []);

  useEffect(() => {
    if (location && location.city) {
      fetchEvents();
    }
  }, [location]);

  const fetchEvents = async () => {
    try {
      const cityToFetch = location.city;
      const eventsData: IEvent[] | undefined = await getEventsInCity(
        token,
        cityToFetch
      );
      setEvents(eventsData);
      eventsData?.forEach(async (event) => {
        const host = await getHostForEvent("TOKEN", event.eventID);
        setHostNames((prevState) => ({
          ...prevState,
          [event.eventID]: `${host?.firstname} ${host?.lastname}`,
        }));
      });
      setFetchingEvents(false);
      console.log("got events");
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const formatDate = (startDate: string, endDate?: string) => {
    const startDateTime = new Date(startDate);
    const endDateTime = endDate ? new Date(endDate) : null;

    const formatDateTime = (dateTime: Date) => {
      const month = dateTime.toLocaleString("default", { month: "short" });
      const day = dateTime.getDate();
      const hours = dateTime.getHours();
      const minutes = dateTime.getMinutes();
      return `${day}. ${month} ${hours}:${minutes.toString().padStart(2, "0")}`;
    };

    if (endDate) {
      const sameDay =
        startDateTime.toDateString() === endDateTime!.toDateString();
      if (sameDay) {
        return `${formatDateTime(startDateTime)} - ${formatDateTime(
          endDateTime!
        ).substring(8, 14)}`;
      } else {
        return `${formatDateTime(startDateTime)} - ${formatDateTime(
          endDateTime!
        )}`;
      }
    } else {
      return formatDateTime(startDateTime);
    }
  };

  const formatCapacityRange = (minCapacity?: string, maxCapacity?: string) => {
    if (minCapacity && maxCapacity) {
      return `${minCapacity} - ${maxCapacity}`;
    } else if (minCapacity) {
      return `${minCapacity}+`;
    } else if (maxCapacity) {
      return `${maxCapacity}-`;
    } else {
      return "∞";
    }
  };

  const handleJoinPress = async (eventId: number) => {
    try {
      await joinOpenEvent(token, eventId);
      // Remove the event from the events array
      setEvents((prevEvents) =>
        prevEvents?.filter((event) => event.eventID !== eventId)
      );
    } catch (error) {
      console.error("Error joining event:", error);
    }
  };

  return (
    <ScrollView>
      {loading ? (
        // Show loader if loading is true
        <View style={styles.midscreenMessages}>
          <ActivityIndicator size="large" color="#5A5DF0" />
          <Text style={styles.midscreenMessagesText}>
            Henter eventer i din by...
          </Text>
        </View>
      ) : fetchingEvents ? (
        // Show loader if events are being fetched
        <View style={styles.midscreenMessages}>
          <ActivityIndicator size="large" color="#5A5DF0" />
          <Text style={styles.midscreenMessagesText}>
            Henter eventer i din by...
          </Text>
        </View>
      ) : (
        <View style={styles.wrapper}>
          {events && events.length > 0 ? (
            events?.map((event) => (
              <EventCardFeed
                key={event.eventID}
                numberOfPeople={formatCapacityRange(
                  event.minCapacity,
                  event.maxCapacity
                )}
                dateTime={formatDate(
                  event.eventDateTimeStart,
                  event.eventDateTimeEnd
                )}
                title={event.eventName}
                hostName={hostNames[event.eventID] || ""}
                bio={event.eventDescription}
                address={`${event.location.postalcode}, ${event.location.city}`}
                imageSource={imageSource}
                onJoinPress={() => handleJoinPress(event.eventID)}
              />
            ))
          ) : (
            <View style={styles.midscreenMessages}>
              <Text style={styles.midscreenMessagesText}>
                Det er for tiden ingen eventer i din by!
              </Text>
            </View>
          )}
        </View>
      )}
    </ScrollView>
  );
}
