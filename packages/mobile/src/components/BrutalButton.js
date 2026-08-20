import { Pressable } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

export default function BrutalButton({
  children,
  bg,
  onPress,
  style,
  shadowOffset = 8,
  pressOffset = 6,
  borderRadius = 999,
}) {
  const pressed = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    "worklet";
    const shadow = shadowOffset - pressed.value * pressOffset;
    return {
      transform: [{ translateY: pressed.value * pressOffset }],
      boxShadow: `0px ${shadow}px 0px #17313B`,
    };
  });

  return (
    <Pressable
      onPress={onPress}
      onPressIn={() => {
        pressed.value = withTiming(1, { duration: 90 });
      }}
      onPressOut={() => {
        pressed.value = withTiming(0, { duration: 140 });
      }}
      hitSlop={8}
    >
      <Animated.View
        style={[
          {
            backgroundColor: bg,
            borderWidth: 4,
            borderColor: "#17313B",
            borderRadius,
            alignItems: "center",
            justifyContent: "center",
          },
          animatedStyle,
          style,
        ]}
      >
        {children}
      </Animated.View>
    </Pressable>
  );
}
