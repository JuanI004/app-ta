import hourglassImg from "../../assets/hourglass.png";

const CELL_SIZE = 120;
const ICON_SIZE = 35;
const COLUMNS = 26;
const ROWS = 18;

export default function HourglassBackground() {
  const cells = Array.from({ length: COLUMNS * ROWS });

  return (
    <div
      className="absolute -inset-x-[500px] -inset-y-[300px] grid justify-center opacity-10 animate-[taDrift_16s_linear_infinite]"
      style={{
        gridTemplateColumns: `repeat(${COLUMNS}, ${CELL_SIZE}px)`,
        gridAutoRows: `${CELL_SIZE}px`,
      }}
    >
      {cells.map((_, i) => (
        <div key={i} className="flex items-center justify-center">
          <img
            src={hourglassImg}
            alt=""
            className="brightness-0 invert -rotate-[30deg]"
            style={{ width: ICON_SIZE, height: ICON_SIZE }}
          />
        </div>
      ))}
    </div>
  );
}
