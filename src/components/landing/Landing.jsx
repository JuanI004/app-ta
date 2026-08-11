import HourglassBackground from "./HourglassBackground";
import titleImg from "../../assets/title.png";

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

const CATEGORIES = [
  {
    id: 1,
    name: "Modo Uruguayo",
    emoji: "🇺🇾",
    color: "#fff7e8",
    textColor: "#17313b",
    indexColor: "#ffc800",
    description: "Modismos, murga, mate y quilombo. El mazo más nuestro.",
  },
  {
    id: 2,
    name: "Historia",
    emoji: "📜",
    color: "#0f5462",
    textColor: "#fff7e8",
    indexColor: "#ffc800",
    description: "Próceres, fechas patrias y hechos que todos deberían saber.",
  },
  {
    id: 3,
    name: "Geografía",
    emoji: "🗺️",
    color: "#ffc800",
    textColor: "#1e313b",
    indexColor: "#f4442e",
    description:
      "Países, capitales, ríos y lugares que viste una vez en un mapa.",
  },
  {
    id: 4,
    name: "Deportes",
    emoji: "⚽",
    color: "#f4442e",
    textColor: "#fff7e8",
    indexColor: "#ffc800",
    description: "Fútbol, básquet, rugby y todo lo que se discute en el asado.",
  },
];

const CARD_TILTS = ["rotate-1", "-rotate-2", "rotate-2", "-rotate-1"];

function DiagonalSeam({ color }) {
  return (
    <div
      aria-hidden="true"
      className="relative h-14 w-full -mt-14"
      style={{
        backgroundColor: color,
        clipPath: "polygon(0 100%, 100% 0, 100% 100%)",
      }}
    />
  );
}

export default function Landing({ onJugar }) {
  return (
    <div className="relative flex flex-col items-center min-h-screen bg-[#0F5462] overflow-hidden">
      <HourglassBackground />

      <main className="relative h-screen flex-grow w-[520px] max-w-full flex flex-col items-center justify-center gap-3 p-4">
        <div className="relative">
          <span
            aria-hidden="true"
            className="hidden sm:block absolute -left-16 top-6 text-4xl animate-[taFloat_5s_ease-in-out_infinite] [animation-delay:0.3s]"
            style={{ "--ta-float-rot": "-12deg" }}
          >
            🎲
          </span>
          <span
            aria-hidden="true"
            className="hidden sm:block absolute -right-14 bottom-10 text-4xl animate-[taFloat_6s_ease-in-out_infinite] [animation-delay:1s]"
            style={{ "--ta-float-rot": "10deg" }}
          >
            🧉
          </span>
          <img
            src={titleImg}
            alt="Title"
            className="h-[313px] mb-1 drop-shadow-[0_18px_24px_rgba(0,0,0,0.28)] animate-[taWiggle_4s_ease-in-out_infinite,taPopIn_0.6s_ease-out_both]"
          />
        </div>
        <h1 className="text-[44px] leading-tight text-center font-display font-extrabold text-[#FFF7E8] animate-[taPopIn_0.6s_ease-out_both] [animation-delay:0.1s]">
          El juego de palabras
          <br />
          que te va a hacer gritar.
        </h1>
        <p className="font-display font-semibold text-xl text-[#B7DCDE] text-center animate-[taPopIn_0.6s_ease-out_both] [animation-delay:0.2s]">
          4 a 12 jugadores, dos equipos, un reloj corriendo.
        </p>
        <button
          onClick={onJugar}
          className="mt-3 hover:cursor-pointer text-2xl w-full font-cta text-[#FFF7E8] py-5 border-4 border-[#17313B] shadow-[0_8px_0_#17313B] hover:-translate-y-1 hover:shadow-[0_12px_0_#17313B] active:translate-y-1 active:shadow-[0_2px_0_#17313B] transition-transform duration-150 bg-[#F4442E] rounded-full animate-[taPulse_2.4s_ease-in-out_infinite,taPopIn_0.6s_ease-out_both] [animation-delay:0.3s]"
        >
          Jugar offline
        </button>
        <button
          onClick={onJugar}
          className="mt-3 mb-15 hover:cursor-pointer text-2xl w-full font-cta text-[#17313B] py-5 border-4 border-[#17313B] shadow-[0_8px_0_#17313B] hover:-translate-y-1 hover:shadow-[0_12px_0_#17313B] active:translate-y-1 active:shadow-[0_2px_0_#17313B] transition-transform duration-150 bg-[#ffc800] rounded-full animate-[taPulse_2.4s_ease-in-out_infinite,taPopIn_0.6s_ease-out_both] [animation-delay:0.3s]"
        >
          Jugar online
        </button>
      </main>

      <DiagonalSeam color="#f4442e" />
      <section
        id="como-se-juega"
        className="relative flex flex-col items-center justify-center w-full pt-4 pb-16 bg-[#f4442e]"
      >
        <span className="inline-block -rotate-2 font-cta text-xs px-4 py-1.5 mb-4 rounded-full border-2 border-[#17313b] bg-[#ffc800] text-[#17313b]">
          ¿Cómo se juega?
        </span>
        <h2 className="text-4xl mb-8 font-display font-extrabold text-[#17313b] text-center px-4">
          Cuatro pasos y a los gritos.
        </h2>
        <ul className="flex flex-wrap gap-4 justify-center px-4">
          {STEPS.map((step, i) => (
            <li
              key={step.id}
              style={{ backgroundColor: step.color }}
              className={`relative flex mt-3 text-2xl font-cta text-[#FFF7E8] py-8 px-6 border-4 border-[#17313B] shadow-[0_8px_0_#17313B] flex-col gap-3 w-[250px] p-4 rounded-[40px] ${CARD_TILTS[i % CARD_TILTS.length]} hover:rotate-0 hover:-translate-y-2 hover:scale-[1.03] hover:z-10 transition-transform duration-200`}
            >
              <div
                style={{ backgroundColor: step.indexColor }}
                className="w-10 h-10 mb-2 flex items-center justify-center rounded-full text-[#17313b] font-bold text-lg"
              >
                {step.id}
              </div>
              <h4
                className="font-display font-bold text-2xl"
                style={{ color: step.textColor }}
              >
                {step.title}
              </h4>
              <p
                className="font-display font-semibold text-sm"
                style={{ color: step.textColor }}
              >
                {step.description}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <DiagonalSeam color="#ffc800" />
      <section
        id="categorias"
        className="relative flex flex-col items-center justify-center w-full pt-4 pb-16 bg-[#ffc800]"
      >
        <span className="inline-block rotate-2 font-cta text-xs px-4 py-1.5 mb-4 rounded-full border-2 border-[#17313b] bg-[#f4442e] text-[#fff7e8]">
          Categorías
        </span>
        <h2 className="text-4xl mb-8 font-display font-extrabold text-[#17313b] text-center px-4">
          Elegí tu mazo.
        </h2>
        <ul className="flex flex-wrap gap-4 justify-center px-4">
          {CATEGORIES.map((category, i) => (
            <li
              key={category.id}
              style={{ backgroundColor: category.color }}
              className={`relative flex mt-3 text-2xl font-cta text-[#FFF7E8] py-8 px-6 border-4 border-[#17313B] shadow-[0_8px_0_#17313B] flex-col gap-3 w-[250px] p-4 rounded-[40px] ${CARD_TILTS[(i + 1) % CARD_TILTS.length]} hover:rotate-0 hover:-translate-y-2 hover:scale-[1.03] hover:z-10 transition-transform duration-200`}
            >
              <div className="w-10 h-10 text-4xl mb-2 flex items-center justify-center font-bold">
                {category.emoji}
              </div>
              <h4
                className="font-display font-bold text-2xl"
                style={{ color: category.textColor }}
              >
                {category.name}
              </h4>
              <p
                className="font-display font-semibold text-sm"
                style={{ color: category.textColor }}
              >
                {category.description}
              </p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
