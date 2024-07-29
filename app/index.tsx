import { FlatList, StatusBar, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useColorScheme } from "@/hooks/useColorScheme.web";

import Spacings from "@/constants/Spacings";
import Card from "@/components/Cards/Card";
import Colors from "@/constants/Colors";

type ColorProps = {
  [key: string]: {
    [x: string]: any;
    light: string;
  };
};

const colorScheme = useColorScheme();

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        renderItem={({ item }) => <Card item={item} />}
        data={["One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight"]}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: Spacings.space,
    marginTop: StatusBar.currentHeight || 0,
    flex: 1,
    flexGrow: 1,
    backgroundColor: (Colors as ColorProps)?.[colorScheme || "light"].bg.ligth,
  },
});
