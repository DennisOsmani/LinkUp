import {
  EventRelationParticipation,
  IUserWithEventParticipationDTO,
} from "../../../../../../interfaces/ModelInterfaces";
import { View, Text, Image } from "react-native";
import { styles } from "./RelatedUserCardStyles";
import { Feather } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { colors } from "../../../../../../styles/colors";

interface RelatedUserCardProps {
  user: IUserWithEventParticipationDTO;
}

export default function RelatedUserCard({ user }: RelatedUserCardProps) {
  const [participationColor, setParticipationColor] = useState<string>("");
  const [participationText, setParticipationText] = useState<string>("");

  useEffect(() => {
    parseEventParticipation();
  }, []);

  const calculateAge = (dateBorn: string): number => {
    const birthDate = new Date(dateBorn);

    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();

    const monthDiff = today.getMonth() - birthDate.getMonth();
    const dayDiff = today.getDate() - birthDate.getDate();

    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      age--;
    }
    return age;
  };

  const parseEventParticipation = (): void => {
    switch (user.participation) {
      case EventRelationParticipation.JOINED:
        setParticipationColor(colors.green);
        setParticipationText("Kommer");
        break;
      case EventRelationParticipation.DECLINED:
        setParticipationColor(colors.red);
        setParticipationText("Kommer ikke");
        break;
      case EventRelationParticipation.PENDING:
        setParticipationColor(colors.primary);
        setParticipationText("Invitert");
        break;
      case EventRelationParticipation.BAILED:
        setParticipationColor(colors.red);
        setParticipationText("Bailed");
        break;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={{
            uri: "https://cdn-main.newsner.com/wp-content/uploads/sites/16/2021/02/06065224/Skjermbilde-2021-02-25-kl.-16.46.21.jpg",
          }}
        />
      </View>

      <View style={styles.secondColumn}>
        <View style={styles.firstLine}>
          <View style={styles.wrapper}>
            <Feather name="user-check" size={20} color={"black"} />
            <Text style={styles.name}>
              {user.firstname + " " + user.lastname}
            </Text>
          </View>
          <Text style={styles.age}>
            {calculateAge(user.dateBorn.toString())} år
          </Text>
        </View>
        <View style={styles.secondLine}>
          <View
            style={{
              ...styles.participationIcon,
              backgroundColor: participationColor,
            }}
          >
            <Text style={styles.participationText}>{participationText}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}
