import { Modal, View, Text, Pressable } from "react-native";
import { styles } from "./EventModalStyles";
import { IEvent } from "../../interfaces/ModelInterfaces";
import { TabBackground } from "../../components/TabBackground/TabBackground";
import { EventTab } from "./components/EventTab/EventTab";
import { PeopleTab } from "./components/PeopleTab/PeopleTab";

interface EventProps {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  event: IEvent | null;
}

export function EventModal({
  modalVisible,
  setModalVisible,
  event,
}: EventProps) {
  return (
    <Modal animationType="slide" visible={modalVisible}>
      <TabBackground firstTab="Event" secondTab="Folk">
        <EventTab
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          event={event}
        />
        <PeopleTab />
      </TabBackground>
    </Modal>
  );
}
