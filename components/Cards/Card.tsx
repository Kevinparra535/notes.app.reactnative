import React from "react";
import { Text, View, StyleSheet, TouchableHighlight } from "react-native";

import Spacings from "@/constants/Spacings";
import Colors from "@/constants/Colors";
import Fonts from "@/constants/Fonts";
import { Icons } from "../Icons";

type Props = {
  item: string;
};

const Card = ({ item }: Props) => {
  const handlePress = () => {
    console.log("Pressed");
  };

  return (
    <TouchableHighlight onPress={handlePress} style={styles.container}>
      <>
        <View style={styles.subContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.label}>Label</Text>
            <Text style={styles.title}>{item}</Text>
            <Text style={styles.subTitle}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa
              nisi illum saepe fuga autem dolorem voluptatum...
            </Text>
          </View>
          <View style={styles.icons}>
            <Icons
              style={styles.icon}
              name="heart-outline"
              onPress={() => console.log("Pressed")}
            />
            <Icons
              style={styles.icon}
              name="trash-outline"
              onPress={() => console.log("Pressed")}
            />
          </View>
        </View>

        <View style={styles.footer}>
          <View style={styles.date}>
            <Icons name="time-outline" size={15} />

            <Text style={styles.dateText}>Sep 16, 2023; 12:15 PM</Text>
          </View>

          <View style={styles.cta}>
            <Icons
              name="trash-outline"
              onPress={() => console.log("Pressed")}
            />
          </View>
        </View>
      </>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
    justifyContent: "space-between",
    marginBottom: Spacings.space,
    height: 280,
    borderRadius: Spacings.spacex2,
    backgroundColor: "green",
  },

  subContainer: {
    paddingHorizontal: Spacings.space,
    flexDirection: "row",
    justifyContent: "space-between",
    height: 160,
  },

  textContainer: {
    paddingVertical: Spacings.space,
    flex: 1,
    height: 160,
  },

  label: {
    marginTop: Spacings.spacex2,
    marginBottom: Spacings.space,
    width: 100,
    overflow: "hidden",
    ...Fonts.bodyText,
  },

  title: {
    marginBottom: Spacings.space,
    ...Fonts.header2,
  },

  subTitle: {
    ...Fonts.bodyText,
  },

  icons: {
    paddingTop: Spacings.spacex4,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "column",
    width: 75,
    height: 160,
    borderBottomRightRadius: Spacings.spacex2,
  },

  icon: {
    padding: Spacings.space,
    marginBottom: Spacings.space,
    borderRadius: Spacings.spacex2,
    overflow: "hidden",
    backgroundColor: Colors.light.light,
  },

  footer: {
    paddingHorizontal: Spacings.space,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    height: 100,
  },

  cta: {
    position: "absolute",
    top: 15,
    right: 15,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    width: 70,
    height: 70,
    borderRadius: Spacings.spacex4,
    overflow: "hidden",
    backgroundColor: "white",
  },

  date: {
    padding: Spacings.space,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: Spacings.spacex2,
    overflow: "hidden",
    backgroundColor: "white",
  },

  dateText: {
    marginLeft: 5,
    ...Fonts.bodyText,
    fontSize: 12,
  },
});

export default Card;
