import { useEffect } from "react";
import {
  useSharedValue,
  useAnimatedStyle,
  withDelay,
  withTiming,
  withRepeat,
  withSequence,
  Easing,
} from "react-native-reanimated";

export function usePopIn(delay = 0) {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withDelay(
      delay,
      withTiming(1, { duration: 600, easing: Easing.out(Easing.cubic) })
    );
  }, []);

  return useAnimatedStyle(() => ({
    opacity: progress.value,
    transform: [
      { translateY: (1 - progress.value) * 18 },
      { scale: 0.94 + progress.value * 0.06 },
    ],
  }));
}

export function useWiggle() {
  const rot = useSharedValue(-2.5);

  useEffect(() => {
    rot.value = withRepeat(
      withTiming(2.5, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    );
  }, []);

  return useAnimatedStyle(() => ({
    transform: [{ rotate: `${rot.value}deg` }],
  }));
}

export function usePulse(delay = 0) {
  const scale = useSharedValue(1);

  useEffect(() => {
    scale.value = withDelay(
      delay,
      withRepeat(
        withSequence(
          withTiming(1.045, { duration: 1080, easing: Easing.inOut(Easing.ease) }),
          withTiming(0.985, { duration: 360, easing: Easing.inOut(Easing.ease) }),
          withTiming(1, { duration: 960, easing: Easing.inOut(Easing.ease) })
        ),
        -1
      )
    );
  }, []);

  return useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));
}

export function useFloat(delay = 0, rotateDeg = "0deg") {
  const y = useSharedValue(0);

  useEffect(() => {
    y.value = withDelay(
      delay,
      withRepeat(
        withTiming(-12, { duration: 2500, easing: Easing.inOut(Easing.ease) }),
        -1,
        true
      )
    );
  }, []);

  return useAnimatedStyle(() => ({
    transform: [{ translateY: y.value }, { rotate: rotateDeg }],
  }));
}
