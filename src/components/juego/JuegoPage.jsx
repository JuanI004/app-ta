import HourglassBackground from "../landing/HourglassBackground";

const TEAM_COLORS = [
  { number: 1, name: "Rojo", color: "#f4442e" },
  { number: 2, name: "Amarillo", color: "#ffc800" },
  { number: 3, name: "Azul", color: "#17313b" },
];

export default function JuegoPage({ config, onExit }) {
  return (
    <div className="relative  flex flex-col items-center min-h-screen bg-[#0f5462] overflow-hidden">
      <HourglassBackground tone="light" />
      <main className="relative container max-w-[750px] mx-auto pt-6 pb-20 px-4 flex flex-col items-center">
        <div className="flex w-full justify-between items-center">
          <div className="flex items-center gap-2">
            <span
              className="h-5 w-5 rounded-full border-2 border-[#17313b] "
              style={{ backgroundColor: TEAM_COLORS[0].color }}
            />
            <div className="flex flex-col -space-y-1">
              <span className="font-bold font-display text-lg text-[#fff7e8]/70 ">
                Describe
              </span>
              <h1 className="font-cta text-3xl text-[#ffc800]">Sofía</h1>
              <span className="font-display font-bold text-[#fff7e8] text-lg">
                Equipo {TEAM_COLORS[0].name}
              </span>
            </div>
          </div>
          <span className="px-4 py-2 rounded-full border-4 border-[#17313b] bg-[#ffc800] text-[#17313b] font-display font-bold text-lg">
            Ronda 2
          </span>
        </div>
        <div className="mt-3 px-10 mb-5 hover:cursor-pointer text-6xl font-cta text-[#f4442e] py-5 border-4 border-[#17313B] shadow-[0_8px_0_#17313B] hover:-translate-y-1 hover:shadow-[0_12px_0_#17313B] active:translate-y-1 active:shadow-[0_2px_0_#17313B] transition-transform duration-150 bg-[#fff7e8] rounded-full animate-bounce ">
          0:00
        </div>
        <div className="mt-3 h-80 w-120 px-10 mb-5 flex flex-col gap-4 items-center justify-center hover:cursor-pointer   py-5 border-6 border-[#17313B] shadow-[0_8px_0_#17313B] hover:-translate-y-1 hover:shadow-[0_12px_0_#17313B] active:translate-y-1 active:shadow-[0_2px_0_#17313B] transition-transform duration-150 bg-[#f4442e] rounded-[40px]">
          <p className="font-display font-bold text-lg text-[#fff7e8]/70">
            Palabra 1 de 6
          </p>
          <h1 className="font-cta text-5xl uppercase text-[#fff7e8]">Murga</h1>
        </div>
        <div className="flex w-full mb-8 justify-center gap-3 items-center">
          <button className="px-4 py-4 rounded-full border-4 border-[#17313b] bg-[#fff7e8] text-[#17313b] font-display font-bold text-lg shadow-[0_6px_0_#17313B] hover:-translate-y-1 hover:shadow-[0_12px_0_#17313B] active:translate-y-1 active:shadow-[0_2px_0_#17313B] transition-transform duration-150">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="#000000"
              viewBox="0 0 256 256"
            >
              <path d="M208,72H128V32a8,8,0,0,0-13.66-5.66l-96,96a8,8,0,0,0,0,11.32l96,96A8,8,0,0,0,128,224V184h80a16,16,0,0,0,16-16V88A16,16,0,0,0,208,72Zm0,96H120a8,8,0,0,0-8,8v28.69L35.31,128,112,51.31V80a8,8,0,0,0,8,8h88Z"></path>
            </svg>
          </button>
          {[...Array(6)].map((_, i) => (
            <span
              key={i}
              className="h-5 w-5 bg-[#fff7e8] rounded-full border-2 border-[#17313b] "
            />
          ))}
          <button className="px-4 py-4 rounded-full border-4 border-[#17313b] bg-[#fff7e8] text-[#17313b] font-display font-bold text-lg shadow-[0_6px_0_#17313B] hover:-translate-y-1 hover:shadow-[0_12px_0_#17313B] active:translate-y-1 active:shadow-[0_2px_0_#17313B] transition-transform duration-150">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="#000000"
              viewBox="0 0 256 256"
            >
              <path d="M237.66,122.34l-96-96A8,8,0,0,0,128,32V72H48A16,16,0,0,0,32,88v80a16,16,0,0,0,16,16h80v40a8,8,0,0,0,13.66,5.66l96-96A8,8,0,0,0,237.66,122.34ZM144,204.69V176a8,8,0,0,0-8-8H48V88h88a8,8,0,0,0,8-8V51.31L220.69,128Z"></path>
            </svg>
          </button>
        </div>
        <button className="mt-3 w-[460px] px-10 mb-2 hover:cursor-pointer text-2xl font-cta text-[#fff7e8] py-5 border-4 border-[#17313B] shadow-[0_8px_0_#17313B] hover:-translate-y-1 hover:shadow-[0_12px_0_#17313B] active:translate-y-1 active:shadow-[0_2px_0_#17313B] transition-transform duration-150 bg-[#0f6e56] rounded-full ">
          ¡Acertada!
        </button>
        <button className="mt-3 w-[460px] px-10  hover:cursor-pointer text-xl font-cta text-[#17313b] py-5 border-4 border-[#17313B] shadow-[0_8px_0_#17313B] hover:-translate-y-1 hover:shadow-[0_12px_0_#17313B] active:translate-y-1 active:shadow-[0_2px_0_#17313B] transition-transform duration-150 bg-[#fff7e8]/70 rounded-full ">
          Pasar
        </button>
      </main>
    </div>
  );
}
