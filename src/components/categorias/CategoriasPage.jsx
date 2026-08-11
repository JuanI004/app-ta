import title from "../../assets/title.png";
import { CATEGORIAS } from "../../utils/categoria";
import HourglassBackground from "../landing/HourglassBackground";

const CARD_TILTS = [
  "rotate-1",
  "-rotate-2",
  "rotate-2",
  "-rotate-1",
  "rotate-2",
  "-rotate-1",
];

export default function CategoriasPage({ onBack, onSelectCategoria }) {
  return (
    <div className="relative flex flex-col items-center min-h-screen bg-[#ffc800] overflow-hidden">
      <HourglassBackground tone="dark" />

      <nav className="relative w-full px-4 sm:px-6 py-3 sm:py-4 z-20">
        <div className="container mx-auto flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 hover:cursor-pointer group"
          >
            <img
              src={title}
              alt="Ta!"
              className="h-15 drop-shadow-lg transition-transform duration-150 group-hover:-rotate-3"
            />
          </button>
        </div>
      </nav>

      <main className="relative container mx-auto pt-6 pb-20 px-4 flex flex-col items-center">
        <span className="inline-block -rotate-2 font-cta text-xs px-4 py-1.5 mb-4 rounded-full border-2 border-[#17313b] bg-[#f4442e] text-[#fff7e8] animate-[taPopIn_0.5s_ease-out_both]">
          Paso 1 de 4
        </span>
        <h1 className="text-[32px]  sm:text-4xl md:text-5xl font-extrabold text-[#17313b] font-display text-center mb-2 animate-[taPopIn_0.5s_ease-out_both] [animation-delay:0.08s]">
          Elegí una categoría.
        </h1>
        <p className="font-display font-semibold text-[#17313b]/70 text-center mb-10 animate-[taPopIn_0.5s_ease-out_both] [animation-delay:0.16s]">
          {CATEGORIAS.length} categorías disponibles
        </p>

        <ul className="flex flex-wrap gap-5 justify-center max-w-5xl">
          {CATEGORIAS.map((category, i) => (
            <li
              key={category.id}
              style={{
                backgroundColor: category.color,
                animationDelay: `${0.2 + i * 0.05}s`,
              }}
              onClick={() => onSelectCategoria(category)}
              className={`cursor-pointer group relative flex text-2xl font-cta py-8 px-6 border-4 border-[#17313B] shadow-[0_8px_0_#17313B] flex-col gap-3 w-[240px] p-4 rounded-[36px] ${CARD_TILTS[i % CARD_TILTS.length]} hover:rotate-0 hover:-translate-y-2 hover:scale-[1.04] hover:z-10 transition-transform duration-200 animate-[taPopIn_0.5s_ease-out_both]`}
            >
              <div
                style={{ backgroundColor: category.indexColor }}
                className="w-14 h-14 text-3xl mb-1 flex items-center justify-center rounded-full border-2 border-[#17313b]/20 shadow-inner transition-transform duration-200 group-hover:scale-110 group-hover:rotate-6"
              >
                {category.emoji}
              </div>
              <h4
                className="font-display font-bold text-2xl leading-snug"
                style={{ color: category.textColor }}
              >
                {category.name}
              </h4>
              <p
                className="font-display font-semibold text-sm opacity-90"
                style={{ color: category.textColor }}
              >
                {category.description}
              </p>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
