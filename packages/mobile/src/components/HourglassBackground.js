import { useEffect } from "react";
import { View, Image, Dimensions } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from "react-native-reanimated";
import hourglassImg from "../../assets/hourglass.png";

const CELL_SIZE = 120;
const ICON_SIZE = 35;
const { width, height } = Dimensions.get("window");
const COLUMNS = Math.ceil(width / CELL_SIZE) + 2;
const ROWS = Math.ceil(height / CELL_SIZE) + 2;

export default function HourglassBackground({ tone = "light" }) {
  const offset = useSharedValue(0);

  useEffect(() => {
    offset.value = withRepeat(
      withTiming(CELL_SIZE, { duration: 16000, easing: Easing.linear }),
      -1,
      false
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: offset.value }, { translateY: offset.value }],
  }));

  const tintColor = tone === "dark" ? "#000000" : "#ffffff";

  return (
    <View
      pointerEvents="none"
      style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, overflow: "hidden", opacity: 0.1 }}
    >
      <Animated.View
        style={[
          { position: "absolute", left: -CELL_SIZE, top: -CELL_SIZE, flexDirection: "row", flexWrap: "wrap", width: COLUMNS * CELL_SIZE },
          animatedStyle,
        ]}
      >
        {Array.from({ length: COLUMNS * ROWS }).map((_, i) => (
          <View key={i} style={{ width: CELL_SIZE, height: CELL_SIZE, alignItems: "center", justifyContent: "center" }}>
            <Image
              source={hourglassImg}
              style={{ width: ICON_SIZE, height: ICON_SIZE, tintColor, transform: [{ rotate: "-30deg" }] }}
            />
          </View>
        ))}
      </Animated.View>
    </View>
  );
}
