import "./global.css";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Text, View, Pressable, Modal, ScrollView } from "react-native";
import Animated from "react-native-reanimated";
import {
  useFonts,
  Baloo2_400Regular,
  Baloo2_700Bold,
  Baloo2_800ExtraBold,
} from "@expo-google-fonts/baloo-2";
import { ArchivoBlack_400Regular } from "@expo-google-fonts/archivo-black";
import {
  JetBrainsMono_400Regular,
  JetBrainsMono_700Bold,
} from "@expo-google-fonts/jetbrains-mono";
import titleImg from "./assets/title.png";
import HourglassBackground from "./src/components/HourglassBackground";
import BrutalButton from "./src/components/BrutalButton";
import {
  usePopIn,
  useWiggle,
  usePulse,
  useFloat,
} from "./src/hooks/useLandingMotion";

const STEPS = [
  {
    id: 1,
    title: "Formá tu equipo",
    color: "#0f5462",
    textColor: "#fff",
    indexColor: "#ffc800",
    description: "Armá dos o más equipos con los jugadores que tengas.",
  },
  {
    id: 2,
    title: "Describí contra el reloj",
    color: "#ffc800",
    textColor: "#1e313b",
    indexColor: "#f4442e",
    description:
      "En tu turno salen 6 palabras a la vez: describilas sin decirlas hasta que se acierten o se pasen.",
  },
  {
    id: 3,
    title: "Tirá el dado",
    color: "#0f5462",
    textColor: "#fff",
    indexColor: "#ffc800",
    description:
      "Al terminar el turno revisan los aciertos y tiran el dado: el resultado se resta.",
  },
  {
    id: 4,
    title: "Avanzá en el tablero",
    color: "#ffc800",
    textColor: "#1e313b",
    indexColor: "#f4442e",
    description:
      "Tu equipo se mueve según ese resultado (¡a veces toca retroceder!). Gana el primero en llegar a la meta.",
  },
];
export default function App() {
  const [showRules, setShowRules] = useState(false);
  const [fontsLoaded] = useFonts({
    Baloo2_400Regular,
    Baloo2_700Bold,
    Baloo2_800ExtraBold,
    ArchivoBlack_400Regular,
    JetBrainsMono_400Regular,
    JetBrainsMono_700Bold,
  });

  const imageEntrance = usePopIn(0);
  const headingEntrance = usePopIn(100);
  const subEntrance = usePopIn(200);
  const btn1Entrance = usePopIn(300);
  const btn2Entrance = usePopIn(400);
  const fabEntrance = usePopIn(600);
  const wiggleStyle = useWiggle();
  const pulse1 = usePulse(300);
  const pulse2 = usePulse(300);
  const diceFloat = useFloat(300, "-12deg");
  const mateFloat = useFloat(1000, "10deg");

  if (!fontsLoaded) {
    return <View className="flex-1 bg-[#0f5462]" />;
  }

  return (
    <View className="flex-1 bg-[#0f5462] items-center justify-center">
      <HourglassBackground />
      <Modal
        visible={showRules}
        transparent
        animationType="fade"
        onRequestClose={() => setShowRules(false)}
      >
        <Pressable
          className="flex-1 bg-black/60 items-center justify-center"
          onPress={() => setShowRules(false)}
        >
          <Pressable
            className="bg-[#ed422d] rounded-[30px] p-6 w-[85%] max-h-[70%]"
            onPress={() => {}}
          >
            <ScrollView contentContainerClassName="flex justify-center items-center">
              <Text className="font-display-bold  text-center text-md bg-[#ffc800] px-4 py-1 border-2 rounded-full border-[#17313b] mb-4">
                ¿Cómo se juega?
              </Text>
              <Text className="font-display-extrabold text-[#17313b] text-center text-4xl mb-4  px-6">
                Cuatro pasos y a los gritos.
              </Text>
              {STEPS.map((step, index) => (
                <View
                  key={step.id}
                  className="mb-4 p-4 rounded-lg border-4 rounded-[25px] border-[#17313b] w-[90%]"
                  style={{ backgroundColor: step.color }}
                >
                  <Text
                    className="font-cta  w-10 h-9 mb-4 rounded-full text-[#17313b] text-2xl text-center"
                    style={{
                      backgroundColor: step.indexColor,
                    }}
                  >
                    {index + 1}
                  </Text>
                  <Text
                    className="font-display-bold text-2xl mb-2"
                    style={{ color: step.textColor }}
                  >
                    {step.title}
                  </Text>
                  <Text
                    className="font-display-bold text-lg"
                    style={{ color: step.textColor }}
                  >
                    {step.description}
                  </Text>
                </View>
              ))}
            </ScrollView>
          </Pressable>
        </Pressable>
      </Modal>
      <View className="flex-1 items-center justify-center w-full px-6">
        <Animated.View style={imageEntrance} className="items-center">
          <Animated.Text
            style={diceFloat}
            className="absolute -left-8 top-4 text-4xl"
          >
            🎲
          </Animated.Text>
          <Animated.Text
            style={mateFloat}
            className="absolute -right-6 bottom-8 text-4xl"
          >
            🧉
          </Animated.Text>
          <Animated.Image
            source={titleImg}
            resizeMode="contain"
            style={[{ width: 260, height: 260 }, wiggleStyle]}
          />
        </Animated.View>

        <Animated.Text
          style={headingEntrance}
          className="font-display-extrabold text-[#FFF7E8] text-center text-[38px] leading-[42px] mt-1 px-2"
        >
          {"El juego de palabras\nque te va a hacer gritar."}
        </Animated.Text>

        <Animated.Text
          style={subEntrance}
          className="font-display-bold text-[#B7DCDE] text-center text-xl mt-4 px-4"
        >
          4 a 12 jugadores, dos equipos, un reloj corriendo.
        </Animated.Text>

        <Animated.View style={[btn1Entrance, pulse1]} className="w-full mt-7">
          <BrutalButton
            bg="#F4442E"
            style={{ paddingVertical: 20 }}
            onPress={() => console.log("Jugar")}
          >
            <Text className="font-cta text-2xl text-[#FFF7E8]">
              Jugar offline
            </Text>
          </BrutalButton>
        </Animated.View>

        <Animated.View style={[btn2Entrance, pulse2]} className="w-full mt-4">
          <BrutalButton
            bg="#FFC800"
            style={{ paddingVertical: 20 }}
            onPress={() => console.log("Jugar")}
          >
            <Text className="font-cta text-2xl text-[#17313B]">
              Jugar online
            </Text>
          </BrutalButton>
        </Animated.View>
      </View>

      <Animated.View style={fabEntrance} className="absolute bottom-6 right-6">
        <BrutalButton
          bg="#FFC800"
          shadowOffset={6}
          pressOffset={4}
          style={{ width: 56, height: 56 }}
          onPress={() => setShowRules(true)}
        >
          <Text className="font-display-extrabold text-[#17313b] text-2xl">
            ?
          </Text>
        </BrutalButton>
      </Animated.View>
      <StatusBar style="auto" />
    </View>
  );
}
