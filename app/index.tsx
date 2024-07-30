import {
  Dimensions,
  ListRenderItem,
  ListRenderItemInfo,
  StyleSheet,
} from "react-native";
import { FlashList } from "@shopify/flash-list";
import { SafeAreaView } from "react-native-safe-area-context";

import { useColorScheme } from "@/hooks/useColorScheme.web";

import Spacings from "@/constants/Spacings";
import Card from "@/components/Cards/Card";
import Colors from "@/constants/Colors";
import { useRef } from "react";

import { IColorProps } from "@/expo-env";

const colorScheme = useColorScheme();

export default function HomeScreen() {
  const flashListRef = useRef<FlashList<number>>(null);

  const renderItem = ({ index }: { index: number }) => {
    return <Card index={index.toString()} />;
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlashList
        ref={flashListRef}
        renderItem={renderItem}
        estimatedItemSize={200}
        data={new Array<number>(100)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacings.space,
    flex: 1,
    flexGrow: 1,
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
    backgroundColor: (Colors as IColorProps)?.[colorScheme || "light"].bg.ligth,
  },
});
