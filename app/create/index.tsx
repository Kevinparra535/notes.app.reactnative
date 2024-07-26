import Fonts from "@/constants/Fonts";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function CreateScreen() {
  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <Text style={styles.title}>Crear Nota</Text>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    ...Fonts.header1,
  },
});
