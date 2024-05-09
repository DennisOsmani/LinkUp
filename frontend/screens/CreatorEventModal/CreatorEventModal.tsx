import { Modal } from "react-native";
import { IEvent } from "../../interfaces/ModelInterfaces";
import { TabBackground } from "../../components/TabBackground/TabBackground";
import { CreatorEventTab } from "./components/CreatorEventTab/CreatorEventTab";
import { CreatorPeopleTab } from "./components/CreatorPeopleTab/CreatorPeopleTab";

interface CreatorEventModalProps {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  event: IEvent | undefined;
  edit: boolean;
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
}

export function CreatorEventModal({
  modalVisible,
  setModalVisible,
  event,
  edit,
  setEdit,
}: CreatorEventModalProps) {
  const handleBack = () => setModalVisible(false);

  return (
    <Modal animationType="slide" visible={modalVisible}>
      <TabBackground
        firstTab="Event"
        secondTab="Folk"
        backButton={true}
        handleBack={handleBack}
      >
        <CreatorEventTab
          setEventModalVisible={setModalVisible}
          event={event}
          edit={edit}
          setEdit={setEdit}
        />
        <CreatorPeopleTab event={event} />
      </TabBackground>
    </Modal>
  );
}
