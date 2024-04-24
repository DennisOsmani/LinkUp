import { View, Text, Pressable } from "react-native";
import { styles } from "./EventsStyles";
import { getUserJoinedEvents } from "../../api/EventAPI";
import { useLocation } from "../../providers/LocationProvider";
import { useTokenProvider } from "../../providers/TokenProvider";
import { useEffect, useState } from "react";
import { IEvent } from "../../interfaces/ModelInterfaces";
import { EventModal } from "../EventModal/EventModal";
import { TabBackground } from "../../components/TabBackground/TabBackground";

export default function Events() {
  const [events, setEvents] = useState<IEvent[] | undefined>([]);
  const [event, setEvent] = useState<IEvent | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const { address } = useLocation();
  const { token } = useTokenProvider();

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      if (token && address) {
        const response: IEvent[] | undefined = await getUserJoinedEvents(token);
        setEvents(response);
      }
    } catch (error) {
      console.error("Error while fetching" + error);
    }
  };

  const handleEventPressed = (event: IEvent) => {
    setEvent(event);
    setModalVisible(true);
  };

  return (
    <>
      <EventModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        event={event}
      />

      <TabBackground firstTab="Joined" secondTab="Invited">
        <View style={styles.eventsContainer}>
          <Text style={styles.containerHeader}>Events</Text>

          {events &&
            events.map((event: IEvent) => (
              <Pressable
                onPress={() => handleEventPressed(event)}
                style={styles.eventButton}
              >
                <Text>{event.eventName}</Text>
              </Pressable>
            ))}
        </View>
      </TabBackground>
    </>
  );
}
