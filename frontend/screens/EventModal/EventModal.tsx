import { Modal } from "react-native";
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
    const handleBack = () => setModalVisible(false);

    return (
        <Modal animationType="slide" visible={modalVisible}>
            <TabBackground
                firstTab="Event"
                secondTab="Folk"
                backButton={true}
                handleBack={handleBack}
            >
                <EventTab event={event} />
                <PeopleTab event={event} />
            </TabBackground>
        </Modal>
    );
}
