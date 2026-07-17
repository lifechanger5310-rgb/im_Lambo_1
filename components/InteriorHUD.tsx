"use client";

export default function InteriorHUD() {
  return (
    <svg
      viewBox="0 0 480 360"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="hudGlow" cx="50%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#F5C400" stopOpacity="0.16" />
          <stop offset="100%" stopColor="#F5C400" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="wheelMetal" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2a2a2e" />
          <stop offset="100%" stopColor="#0f0f11" />
        </linearGradient>
      </defs>

      <rect x="0" y="0" width="480" height="360" fill="url(#hudGlow)" />

      {/* curved driver display arc */}
      <path
        d="M 60 90 A 210 210 0 0 1 420 90"
        fill="none"
        stroke="#1a1a1c"
        strokeWidth="14"
      />
      <path
        d="M 60 90 A 210 210 0 0 1 240 20"
        fill="none"
        stroke="#F5C400"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.9"
      />
      <path
        d="M 240 20 A 210 210 0 0 1 420 90"
        fill="none"
        stroke="#FF3B1F"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.55"
      />

      {/* telemetry ticks along the arc */}
      {Array.from({ length: 13 }).map((_, i) => {
        const angle = Math.PI * (1 + i / 12);
        const cx = 240,
          cy = 90,
          r1 = 195,
          r2 = 208;
        const x1 = cx + r1 * Math.cos(angle);
        const y1 = cy + r1 * Math.sin(angle);
        const x2 = cx + r2 * Math.cos(angle);
        const y2 = cy + r2 * Math.sin(angle);
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke={i % 3 === 0 ? "#F5C400" : "#3a3a3e"}
            strokeWidth={i % 3 === 0 ? 2 : 1}
          />
        );
      })}

      {/* center telemetry readout */}
      <text
        x="240"
        y="80"
        textAnchor="middle"
        fill="#F5C400"
        fontSize="34"
        fontFamily="var(--font-mono, monospace)"
        fontWeight="700"
      >
        APEX
      </text>
      <text
        x="240"
        y="102"
        textAnchor="middle"
        fill="#7a7a7e"
        fontSize="10"
        letterSpacing="3"
        fontFamily="var(--font-mono, monospace)"
      >
        DRIVE MODE
      </text>

      {/* steering wheel */}
      <g transform="translate(240,255)">
        <circle r="92" fill="none" stroke="url(#wheelMetal)" strokeWidth="20" />
        <circle r="92" fill="none" stroke="#000" strokeOpacity="0.4" strokeWidth="2" />
        <circle r="30" fill="#0f0f11" stroke="#2a2a2e" strokeWidth="2" />
        <path d="M -8 -14 L 8 -14 L 0 4 Z" fill="#F5C400" />
        {[-1, 1].map((side) => (
          <rect
            key={side}
            x={side === -1 ? -92 : 34}
            y={-6}
            width="58"
            height="12"
            rx="4"
            fill="#1a1a1c"
            stroke="#333"
          />
        ))}
        {[-58, 58].map((x) => (
          <circle key={x} cx={x} cy="0" r="4" fill="#FF3B1F" />
        ))}
      </g>

      {/* base panel grid */}
      <g opacity="0.25" stroke="#F5C400" strokeWidth="0.5">
        <line x1="20" y1="330" x2="460" y2="330" />
        <line x1="20" y1="340" x2="460" y2="340" />
      </g>
    </svg>
  );
}
