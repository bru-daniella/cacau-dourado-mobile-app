import { ImageBackground, StyleSheet, View } from "react-native";

export default function Banner({ message, onClose, imageSource }) {
  return (
    <View
      visible={true}
      style={{
        borderRadius: 4,
        margin: 10,
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
      }}
    >
      <ImageBackground
        source={imageSource}
        resizeMode="cover"
        style={{
          height: 200,
          width: 365,
        }}
      >
        {message}
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  bannerImage: {
    width: "100%",
    height: 150,
  },
});
