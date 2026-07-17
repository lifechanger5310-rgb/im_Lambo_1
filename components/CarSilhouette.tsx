type Props = {
  className?: string;
  strokeColor?: string;
  fillOpacity?: number;
  showGrid?: boolean;
};

/**
 * Abstract low-slung hypercar side profile, drawn as a technical
 * schematic rather than an attempted photoreal render. This is the
 * signature visual motif reused across hero / 360 / exploded / tech
 * sections so the whole page reads as one continuous engineering
 * document rather than stock photography.
 */
export default function CarSilhouette({
  className = "",
  strokeColor = "#F5C400",
  fillOpacity = 0.08,
  showGrid = false,
}: Props) {
  return (
    <svg
      viewBox="0 0 1200 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {showGrid && (
        <g opacity={0.15} stroke={strokeColor} strokeWidth={0.5}>
          {Array.from({ length: 24 }).map((_, i) => (
            <line key={`v${i}`} x1={i * 50} y1={0} x2={i * 50} y2={400} />
          ))}
          {Array.from({ length: 8 }).map((_, i) => (
            <line key={`h${i}`} x1={0} y1={i * 50} x2={1200} y2={i * 50} />
          ))}
        </g>
      )}

      {/* Ground shadow */}
      <ellipse cx="600" cy="345" rx="520" ry="14" fill={strokeColor} opacity={0.08} />

      {/* Main body silhouette */}
      <path
        d="M60 300
           C 90 260, 150 230, 230 222
           C 280 180, 340 130, 430 108
           C 500 90, 560 88, 610 90
           C 700 94, 760 118, 810 150
           C 870 140, 950 150, 1010 190
           C 1060 200, 1110 220, 1140 260
           L 1140 300
           C 1140 300, 1100 312, 1040 314
           C 1020 280, 980 258, 940 258
           C 900 258, 862 280, 848 314
           C 700 320, 500 320, 352 314
           C 338 280, 300 258, 260 258
           C 220 258, 182 280, 162 314
           C 110 312, 70 304, 60 300 Z"
        stroke={strokeColor}
        strokeWidth={2.5}
        fill={strokeColor}
        fillOpacity={fillOpacity}
        strokeLinejoin="round"
      />

      {/* Canopy / windshield line */}
      <path
        d="M420 110 C 460 96, 520 92, 580 96 C 630 100, 670 116, 700 148"
        stroke={strokeColor}
        strokeWidth={1.5}
        opacity={0.7}
      />

      {/* Front splitter */}
      <path d="M60 300 L 40 302 L 42 314 L 70 312" stroke={strokeColor} strokeWidth={2} fill="none" />

      {/* Rear wing */}
      <path d="M1010 150 L 1010 118 L 1070 118 L 1070 134" stroke={strokeColor} strokeWidth={2.5} fill="none" strokeLinecap="round" />
      <line x1="1010" y1="150" x2="1010" y2="190" stroke={strokeColor} strokeWidth={2} />

      {/* Wheels */}
      <circle cx="260" cy="314" r="56" stroke={strokeColor} strokeWidth={2.5} />
      <circle cx="260" cy="314" r="30" stroke={strokeColor} strokeWidth={1.5} opacity={0.6} />
      <circle cx="940" cy="314" r="56" stroke={strokeColor} strokeWidth={2.5} />
      <circle cx="940" cy="314" r="30" stroke={strokeColor} strokeWidth={1.5} opacity={0.6} />

      {/* Side intake detail */}
      <path d="M700 230 L 800 220 L 830 250 L 740 260 Z" stroke={strokeColor} strokeWidth={1.5} opacity={0.6} />

      {/* Door seam */}
      <path d="M500 130 C 520 180, 530 240, 520 290" stroke={strokeColor} strokeWidth={1} opacity={0.4} />
    </svg>
  );
}
