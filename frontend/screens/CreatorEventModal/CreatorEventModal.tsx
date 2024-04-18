import { Modal } from "react-native";
import { IEvent } from "../../interfaces/ModelInterfaces";
import { TabBackground } from "../../components/TabBackground/TabBackground";
import { CreatorEventTab } from "./components/CreatorEventTab/CreatorEventTab";
import CreatorPeo

interface EventProps {
    modalVisible: boolean;
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
    event: IEvent | null;
}

export function CreatorEventModal({
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
                <CreatorEventTab event={event} />
                <PeopleTab event={event} />
            </TabBackground>
        </Modal>
    );
}
