import { FlatList, ScrollView, StyleSheet, Text } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import Fonts from "@/constants/Fonts";
import Spacings from "@/constants/Spacings";
import Card from "@/components/Cards/Card";

export default function HomeScreen() {
  return (
    <SafeAreaProvider>
      <ScrollView style={styles.container}>
        <FlatList
          data={["One", "Two", "Three"]}
          renderItem={({ item }) => <Card item={item} />}
        />
      </ScrollView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: Spacings.space,
    flex: 1,
  },

  title: {
    ...Fonts.header1,
  },
});
