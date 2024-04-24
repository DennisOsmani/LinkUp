import { Feather } from "@expo/vector-icons";
import { View, Image, Text, Pressable } from "react-native";
import { styles } from "./InviteUserCardStyles";
import { IUser } from "../../../../../../interfaces/ModelInterfaces";

interface InviteUserCardProps {
  user: IUser;
  addUserIdToInviteList: (userId: string) => void;
}

export default function InviteUserCard({
  user,
  addUserIdToInviteList,
}: InviteUserCardProps) {
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
          <Pressable
            onPress={() => addUserIdToInviteList(user.userID)}
            style={styles.inviteButton}
          >
            <Text style={styles.inviteText}>Inviter</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
