import NavBar from "./NavBar";
import HourglassBackground from "./HourglassBackground";
import titleImg from "../../assets/title.png";

export default function Landing() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-[#0F5462] overflow-hidden">
      <HourglassBackground />
      <NavBar />
      <main className="relative flex-grow w-[520px] flex flex-col items-center justify-center gap-3 p-4">
        <img
          src={titleImg}
          alt="Title"
          className="h-[313px] mb-1 drop-shadow-[0_18px_24px_rgba(0,0,0,0.28)] animate-[taWiggle_4s_ease-in-out_infinite]"
        />
        <h1 className="text-[44px] leading-tight text-center font-display font-extrabold text-[#FFF7E8]">
          El juego de palabras
          <br />
          que te va a hacer gritar.
        </h1>
        <p className="font-display font-semibold text-xl text-[#B7DCDE] text-center">
          4 a 12 jugadores, dos equipos, un reloj corriendo.
        </p>
        <button className="mt-3 text-2xl w-full font-cta text-[#FFF7E8] py-5 border-4 border-[#17313B] shadow-[0_8px_0_#17313B] hover:-translate-y-1 hover:shadow-[0_12px_0_#17313B] active:translate-y-1 active:shadow-[0_2px_0_#17313B] transition-transform duration-150 bg-[#F4442E] rounded-full animate-[taPulse_2.4s_ease-in-out_infinite]">
          Jugar ahora
        </button>
        <button className="mt-2 w-full py-[18px] text-[#FFF7E8] font-display rounded-full font-bold text-[17px] border-4 border-white/55 hover:border-[#FFC800] hover:text-[#FFC800] transition-colors duration-150">
          Cómo se juega
        </button>
      </main>
    </div>
  );
}
