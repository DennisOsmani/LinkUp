import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { styles } from "./PublicFeedStyles";
import EventCardFeed from "../EventCardFeed/EventCardFeed";
import { getEventsInCity, getHostForEvent } from "../../../../api/EventAPI";
import { joinOpenEvent } from "../../../../api/EventRelationAPI";
import { useEffect, useState } from "react";
import { IEvent } from "../../../../interfaces/ModelInterfaces";
import { useTokenProvider } from "../../../../providers/TokenProvider";
import { useLocation } from "../../../../providers/LocationProvider";
import { Feather } from "@expo/vector-icons";
import { colors } from "../../../../styles/colors";

export default function PublicFeed() {
  const [events, setEvents] = useState<IEvent[] | undefined>([]);
  const [hostNames, setHostNames] = useState<{ [eventId: string]: string }>({});
  const { token } = useTokenProvider();
  const [fetchingEvents, setFetchingEvents] = useState<boolean>(true);
  const { location, loading, address } = useLocation();
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [searchText, setSearchText] = useState("");
  const [selectedCity, setSelectedCity] = useState<string | null>(null); 

  useEffect(() => {
    if (location && address) {
      fetchEvents(address);
    }
  }, [location]);

  const fetchEvents = async (city: string) => {
    try {
      setSelectedCity(city);
      const eventsData: IEvent[] | undefined = await getEventsInCity(
        token,
        city
      );
      setEvents(eventsData);
      const hostNamesObj: { [eventId: string]: string } = {};
      const promises = eventsData?.map(async (event) => {
        const host = await getHostForEvent(token, event.eventID);
        hostNamesObj[event.eventID] = `${host?.firstname} ${host?.lastname}`;
      });

      await Promise.all(promises || []);
      setHostNames(hostNamesObj);
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setFetchingEvents(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    if (address) {
      if (selectedCity && selectedCity != null) {
        fetchEvents(selectedCity);
      } else {
        fetchEvents(address);
      }
    } else {
      setRefreshing(false);
    }
  };

  const formatDate = (startDate: string, endDate?: string) => {
    const startDateTemp = new Date(startDate);
    const endDateTemp = endDate ? new Date(endDate) : null;

    const startDateTime = new Date(
      startDateTemp.setHours(startDateTemp.getHours() + 2)
    );
    const endDateTime = endDateTemp
      ? new Date(endDateTemp.setHours(endDateTemp.getHours() + 2))
      : null;

    const formatDateTime = (dateTime: Date) => {
      const month = dateTime.toLocaleString("no-NB", { month: "short" });
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
        ).substring(7, 14)}`;
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
      return `>  ${minCapacity}`;
    } else if (maxCapacity) {
      return `<  ${maxCapacity}`;
    } else {
      return "0 - 1000";
    }
  };

  const handleJoinPress = async (eventId: number) => {
    try {
      await joinOpenEvent(token, eventId);
      setEvents((prevEvents) =>
        prevEvents?.filter((event) => event.eventID !== eventId)
      );
    } catch (error) {
      console.error("Error joining event:", error);
    }
  };

  const handleSearchTextChange = (text: string) => {
    setSearchText(text);
  };

  const handleSearchSubmit = () => {
    if (searchText.trim() !== "") {
      const cleanedCity = searchText.trim().replace(/[^a-zA-Z\s]/g, "");
      fetchEvents(cleanedCity);
      setSearchText("");
    }
  };

  return (
    <ScrollView
      style={styles.scrollView}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {loading || fetchingEvents ? (
        <View style={styles.midscreenMessages}>
          <ActivityIndicator size="large" color="#5A5DF0" />
          <Text style={styles.midscreenMessagesText}>
            Henter eventer i din by...
          </Text>
        </View>
      ) : (
        <View style={styles.wrapper}>
          <View style={styles.topSection}>
            <View style={styles.topLeftSection}>
              <Feather
                style={styles.mapFeather}
                name="map-pin"
                size={22}
                color={colors.black}
              />
              <Text style={styles.topSectionText}> {selectedCity}</Text>
            </View>
            <View style={styles.searchBar}>
              <Feather
                style={styles.searchFeather}
                name="search"
                size={20}
                color={colors.grey}
              />
              <TextInput
                onChangeText={handleSearchTextChange}
                onSubmitEditing={handleSearchSubmit}
                style={styles.searchInput}
                value={searchText}
                placeholder="Endre by . . ."
              />
            </View>
          </View>
          {events && events.length > 0 ? (
            events?.map((event) => (
              <EventCardFeed
                key={event.eventID}
                numberOfPeople={formatCapacityRange(
                  event.minCapacity?.toString(),
                  event.maxCapacity?.toString()
                )}
                dateTime={formatDate(
                  event.eventDateTimeStart,
                  event.eventDateTimeEnd
                )}
                title={event.eventName}
                hostName={hostNames[event.eventID] || ""}
                bio={event.eventDescription}
                address={`${
                  event.location.postalcode === null
                    ? ""
                    : event.location.postalcode + ", "
                } ${event.location.city}`}
                imageSource={event.frontImage}
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
