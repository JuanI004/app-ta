import logoImg from "../../assets/logo.png";

export default function NavBar() {
  return (
    <nav className="fixed top-0 left-0 right-0 p-4 z-20">
      <div className="container mx-auto flex justify-between items-center">
        <img src={logoImg} alt="Logo" className="h-15 drop-shadow-xl" />
        <ul className="flex items-center gap-[26px] text-md font-display font-bold ">
          <li>
            <a
              href="#"
              className="text-[#B7DCDE] hover:text-[#FFC800] transition-colors duration-150"
            >
              Cómo se juega
            </a>
          </li>
          <li>
            <a
              href="#"
              className="text-[#B7DCDE] hover:text-[#FFC800] transition-colors duration-150"
            >
              Categorías
            </a>
          </li>
          <li>
            <a
              href="#"
              className="inline-block font-cta text-[#17313B] py-[10px] px-[18px] border-4 border-[#17313B] shadow-[0_4px_0_#17313B] hover:-translate-y-0.5 hover:shadow-[0_6px_0_#17313B] transition-transform duration-150 bg-[#FFC800] rounded-full"
            >
              Jugar
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
