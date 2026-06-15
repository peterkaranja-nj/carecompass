'use client'

interface Clinic {
  id: string
  name: string
}

const PIN_POSITIONS = [
  { x: 192, y: 168 },
  { x: 334, y: 262 },
  { x: 462, y: 148 },
]

function Pin({ x, y, num, active, onClick }: { x: number; y: number; num: number; active: boolean; onClick: () => void }) {
  return (
    <g onClick={onClick} style={{ cursor: 'pointer' }}>
      <ellipse cx={x} cy={y + 4} rx={8} ry={4} fill="#000" opacity={0.15} />
      <path
        d={`M${x},${y} C${x - 3},${y - 6} ${x - 11},${y - 13} ${x - 9},${y - 21} A9,9,0,1,1,${x + 9},${y - 21} C${x + 11},${y - 13} ${x + 3},${y - 6} ${x},${y}Z`}
        fill={active ? '#00478d' : '#6b9fd4'}
        stroke="white"
        strokeWidth="1.5"
      />
      <circle cx={x} cy={y - 22} r={4} fill="white" opacity={0.3} />
      <text x={x} y={y - 19} textAnchor="middle" dominantBaseline="middle" fill="white" fontSize="9" fontFamily="sans-serif" fontWeight="700">
        {num}
      </text>
    </g>
  )
}

export function MapPlaceholder({
  clinics,
  activeId,
  onSelect,
}: {
  clinics: Clinic[]
  activeId: string
  onSelect: (id: string) => void
}) {
  return (
    <svg
      viewBox="0 0 600 380"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full absolute inset-0"
      aria-label="Map showing nearby clinics"
    >
      {/* ── Land background ─────────────────────────── */}
      <rect width="600" height="380" fill="#f2ede9" />

      {/* ── Green areas ─────────────────────────────── */}
      <rect x="390" y="0" width="210" height="134" fill="#d4eac9" />
      <rect x="0" y="255" width="165" height="125" fill="#d4eac9" />
      <rect x="245" y="80" width="150" height="54" fill="#d4eac9" opacity="0.65" />

      {/* Park tree dots */}
      {[
        [420,40],[455,28],[490,50],[525,35],[558,45],[575,65],[410,75],[448,88],[480,70],[510,82],[545,60],[570,88],
        [28,278],[55,265],[82,280],[110,270],[138,285],[162,268],[20,305],[48,318],[75,308],[105,322],[135,310],[160,300],
        [265,95],[295,85],[325,98],[355,90],[380,100],
      ].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="5" fill="#b8d9b2" />
      ))}
      <text x="492" y="68" textAnchor="middle" fill="#5a9e5a" fontSize="11" fontFamily="sans-serif" fontStyle="italic" opacity="0.9">Uhuru Park</text>
      <text x="82" y="316" textAnchor="middle" fill="#5a9e5a" fontSize="10" fontFamily="sans-serif" fontStyle="italic" opacity="0.9">City Park</text>

      {/* ── Water ───────────────────────────────────── */}
      <path d="M390,330 Q440,318 490,332 Q545,346 600,328 L600,380 L390,380Z" fill="#aad3df" opacity="0.6" />

      {/* ── Building fills (before roads) ───────────── */}
      {/* Top-left block */}
      <rect x="8" y="8" width="26" height="16" rx="1" fill="#d8cec4" />
      <rect x="38" y="6" width="18" height="20" rx="1" fill="#d8cec4" />
      <rect x="9" y="28" width="32" height="14" rx="1" fill="#d8cec4" />
      <rect x="45" y="30" width="22" height="12" rx="1" fill="#d8cec4" />
      <rect x="10" y="46" width="20" height="25" rx="1" fill="#d8cec4" />
      <rect x="34" y="50" width="38" height="20" rx="1" fill="#d8cec4" />
      {/* x=80-165, y=0-80 */}
      <rect x="88" y="6" width="30" height="18" rx="1" fill="#d8cec4" />
      <rect x="122" y="8" width="22" height="14" rx="1" fill="#d8cec4" />
      <rect x="148" y="6" width="14" height="22" rx="1" fill="#d8cec4" />
      <rect x="88" y="30" width="42" height="16" rx="1" fill="#d8cec4" />
      <rect x="134" y="28" width="28" height="20" rx="1" fill="#d8cec4" />
      <rect x="90" y="50" width="24" height="22" rx="1" fill="#d8cec4" />
      <rect x="118" y="52" width="20" height="18" rx="1" fill="#d8cec4" />
      <rect x="142" y="48" width="18" height="24" rx="1" fill="#d8cec4" />
      {/* x=80-165, y=80-135 */}
      <rect x="88" y="88" width="32" height="18" rx="1" fill="#d8cec4" />
      <rect x="124" y="86" width="20" height="22" rx="1" fill="#d8cec4" />
      <rect x="148" y="88" width="14" height="18" rx="1" fill="#d8cec4" />
      <rect x="88" y="112" width="52" height="16" rx="1" fill="#d8cec4" />
      <rect x="144" y="110" width="18" height="18" rx="1" fill="#d8cec4" />
      {/* x=165-245, y=0-80 */}
      <rect x="172" y="6" width="28" height="18" rx="1" fill="#d8cec4" />
      <rect x="204" y="8" width="36" height="14" rx="1" fill="#d8cec4" />
      <rect x="172" y="28" width="22" height="20" rx="1" fill="#d8cec4" />
      <rect x="198" y="26" width="44" height="16" rx="1" fill="#d8cec4" />
      <rect x="172" y="52" width="34" height="20" rx="1" fill="#d8cec4" />
      <rect x="210" y="50" width="30" height="22" rx="1" fill="#d8cec4" />
      {/* x=165-245, y=80-135 */}
      <rect x="172" y="88" width="30" height="16" rx="1" fill="#d8cec4" />
      <rect x="206" y="86" width="34" height="20" rx="1" fill="#d8cec4" />
      <rect x="172" y="110" width="66" height="18" rx="1" fill="#d8cec4" />
      {/* x=165-245, y=135-195 */}
      <rect x="172" y="143" width="26" height="16" rx="1" fill="#d8cec4" />
      <rect x="202" y="142" width="38" height="18" rx="1" fill="#d8cec4" />
      <rect x="172" y="163" width="30" height="24" rx="1" fill="#d8cec4" />
      <rect x="206" y="164" width="34" height="22" rx="1" fill="#d8cec4" />
      {/* x=165-245, y=195-255 */}
      <rect x="172" y="202" width="28" height="20" rx="1" fill="#d8cec4" />
      <rect x="204" y="200" width="36" height="18" rx="1" fill="#d8cec4" />
      <rect x="172" y="226" width="48" height="22" rx="1" fill="#d8cec4" />
      <rect x="224" y="224" width="16" height="24" rx="1" fill="#d8cec4" />
      {/* x=245-395, y=135-195 */}
      <rect x="252" y="142" width="34" height="20" rx="1" fill="#d8cec4" />
      <rect x="290" y="140" width="30" height="22" rx="1" fill="#d8cec4" />
      <rect x="324" y="142" width="24" height="18" rx="1" fill="#d8cec4" />
      <rect x="352" y="140" width="36" height="22" rx="1" fill="#d8cec4" />
      <rect x="254" y="168" width="52" height="20" rx="1" fill="#d8cec4" />
      <rect x="310" y="166" width="36" height="22" rx="1" fill="#d8cec4" />
      <rect x="350" y="168" width="36" height="20" rx="1" fill="#d8cec4" />
      {/* x=245-395, y=195-255 */}
      <rect x="252" y="202" width="36" height="18" rx="1" fill="#d8cec4" />
      <rect x="292" y="200" width="44" height="22" rx="1" fill="#d8cec4" />
      <rect x="340" y="202" width="48" height="20" rx="1" fill="#d8cec4" />
      <rect x="252" y="226" width="58" height="22" rx="1" fill="#d8cec4" />
      <rect x="314" y="224" width="38" height="24" rx="1" fill="#d8cec4" />
      <rect x="356" y="226" width="32" height="22" rx="1" fill="#d8cec4" />
      {/* x=395-475, y=135-255 */}
      <rect x="402" y="142" width="30" height="20" rx="1" fill="#d8cec4" />
      <rect x="436" y="140" width="32" height="24" rx="1" fill="#d8cec4" />
      <rect x="402" y="168" width="26" height="20" rx="1" fill="#d8cec4" />
      <rect x="432" y="166" width="36" height="22" rx="1" fill="#d8cec4" />
      <rect x="402" y="204" width="36" height="18" rx="1" fill="#d8cec4" />
      <rect x="442" y="202" width="28" height="22" rx="1" fill="#d8cec4" />
      <rect x="402" y="228" width="30" height="20" rx="1" fill="#d8cec4" />
      <rect x="436" y="226" width="32" height="22" rx="1" fill="#d8cec4" />
      {/* x=475-600, y=135-255 */}
      <rect x="482" y="142" width="44" height="20" rx="1" fill="#d8cec4" />
      <rect x="530" y="140" width="32" height="24" rx="1" fill="#d8cec4" />
      <rect x="566" y="142" width="28" height="20" rx="1" fill="#d8cec4" />
      <rect x="482" y="168" width="46" height="22" rx="1" fill="#d8cec4" />
      <rect x="532" y="166" width="62" height="20" rx="1" fill="#d8cec4" />
      <rect x="482" y="202" width="38" height="20" rx="1" fill="#d8cec4" />
      <rect x="524" y="200" width="52" height="24" rx="1" fill="#d8cec4" />
      <rect x="482" y="228" width="64" height="20" rx="1" fill="#d8cec4" />
      <rect x="550" y="226" width="44" height="22" rx="1" fill="#d8cec4" />
      {/* x=165-475, y=255-380 */}
      <rect x="172" y="262" width="30" height="20" rx="1" fill="#d8cec4" />
      <rect x="206" y="260" width="34" height="22" rx="1" fill="#d8cec4" />
      <rect x="172" y="288" width="64" height="14" rx="1" fill="#d8cec4" />
      <rect x="252" y="262" width="40" height="18" rx="1" fill="#d8cec4" />
      <rect x="296" y="260" width="52" height="22" rx="1" fill="#d8cec4" />
      <rect x="352" y="262" width="36" height="20" rx="1" fill="#d8cec4" />
      <rect x="252" y="286" width="56" height="14" rx="1" fill="#d8cec4" />
      <rect x="312" y="284" width="72" height="16" rx="1" fill="#d8cec4" />
      <rect x="402" y="262" width="30" height="20" rx="1" fill="#d8cec4" />
      <rect x="436" y="260" width="28" height="24" rx="1" fill="#d8cec4" />
      <rect x="482" y="262" width="38" height="20" rx="1" fill="#d8cec4" />
      <rect x="524" y="260" width="50" height="22" rx="1" fill="#d8cec4" />

      {/* ── Road casings ────────────────────────────── */}
      {/* Secondary */}
      <line x1="0" y1="80" x2="600" y2="80" stroke="#c8bfb5" strokeWidth="9" />
      <line x1="0" y1="195" x2="600" y2="195" stroke="#c8bfb5" strokeWidth="9" />
      <line x1="0" y1="305" x2="600" y2="305" stroke="#c8bfb5" strokeWidth="9" />
      <line x1="80" y1="0" x2="80" y2="380" stroke="#c8bfb5" strokeWidth="9" />
      <line x1="245" y1="0" x2="245" y2="380" stroke="#c8bfb5" strokeWidth="9" />
      <line x1="475" y1="0" x2="475" y2="380" stroke="#c8bfb5" strokeWidth="9" />
      {/* Primary */}
      <line x1="0" y1="135" x2="600" y2="135" stroke="#b8afa7" strokeWidth="15" />
      <line x1="0" y1="255" x2="600" y2="255" stroke="#b8afa7" strokeWidth="15" />
      <line x1="165" y1="0" x2="165" y2="380" stroke="#b8afa7" strokeWidth="15" />
      <line x1="395" y1="0" x2="395" y2="380" stroke="#b8afa7" strokeWidth="15" />

      {/* ── Road fills ──────────────────────────────── */}
      {/* Residential/tertiary */}
      {[50, 108, 160, 222, 280, 328].map(y => (
        <line key={y} x1="0" y1={y} x2="600" y2={y} stroke="white" strokeWidth="2.5" opacity="0.7" />
      ))}
      {[35, 120, 207, 290, 338, 435, 535].map(x => (
        <line key={x} x1={x} y1="0" x2={x} y2="380" stroke="white" strokeWidth="2.5" opacity="0.7" />
      ))}
      {/* Secondary */}
      <line x1="0" y1="80" x2="600" y2="80" stroke="white" strokeWidth="6" />
      <line x1="0" y1="195" x2="600" y2="195" stroke="white" strokeWidth="6" />
      <line x1="0" y1="305" x2="600" y2="305" stroke="white" strokeWidth="6" />
      <line x1="80" y1="0" x2="80" y2="380" stroke="white" strokeWidth="6" />
      <line x1="245" y1="0" x2="245" y2="380" stroke="white" strokeWidth="6" />
      <line x1="475" y1="0" x2="475" y2="380" stroke="white" strokeWidth="6" />
      {/* Primary */}
      <line x1="0" y1="135" x2="600" y2="135" stroke="white" strokeWidth="11" />
      <line x1="0" y1="255" x2="600" y2="255" stroke="white" strokeWidth="11" />
      <line x1="165" y1="0" x2="165" y2="380" stroke="white" strokeWidth="11" />
      <line x1="395" y1="0" x2="395" y2="380" stroke="white" strokeWidth="11" />
      {/* Primary centre dashes */}
      <line x1="0" y1="135" x2="600" y2="135" stroke="#d0c8c0" strokeWidth="1" strokeDasharray="16 12" />
      <line x1="0" y1="255" x2="600" y2="255" stroke="#d0c8c0" strokeWidth="1" strokeDasharray="16 12" />
      <line x1="165" y1="0" x2="165" y2="380" stroke="#d0c8c0" strokeWidth="1" strokeDasharray="16 12" />
      <line x1="395" y1="0" x2="395" y2="380" stroke="#d0c8c0" strokeWidth="1" strokeDasharray="16 12" />

      {/* ── Road name labels ─────────────────────────── */}
      <text x="22" y="130" fill="#8a7e74" fontSize="9" fontFamily="sans-serif" letterSpacing="0.4">Ngong Road</text>
      <text x="420" y="130" fill="#8a7e74" fontSize="9" fontFamily="sans-serif" letterSpacing="0.4">Ngong Road</text>
      <text x="168" y="250" fill="#8a7e74" fontSize="9" fontFamily="sans-serif" letterSpacing="0.4">Ralph Bunche Rd</text>
      <text x="276" y="76" fill="#8a7e74" fontSize="9" fontFamily="sans-serif" letterSpacing="0.4">Hospital Rd</text>
      <text x="22" y="195" fill="#8a7e74" fontSize="8.5" fontFamily="sans-serif" letterSpacing="0.3">Argwings Kodhek</text>

      {/* ── Clinic pins ─────────────────────────────── */}
      {clinics.slice(0, 3).map((clinic, i) => (
        <Pin
          key={clinic.id}
          x={PIN_POSITIONS[i].x}
          y={PIN_POSITIONS[i].y}
          num={i + 1}
          active={activeId === clinic.id}
          onClick={() => onSelect(clinic.id)}
        />
      ))}

      {/* ── Compass rose ─────────────────────────────── */}
      <g transform="translate(568, 32)">
        <circle cx="0" cy="0" r="16" fill="white" fillOpacity="0.92" stroke="#d0c8c0" strokeWidth="1" />
        <polygon points="0,-12 -4,-4 0,-7 4,-4" fill="#555" />
        <polygon points="0,12 -4,4 0,7 4,4" fill="#aaa" />
        <text x="0" y="-14" textAnchor="middle" fill="#444" fontSize="8" fontWeight="700" fontFamily="sans-serif">N</text>
      </g>

      {/* ── Scale bar ────────────────────────────────── */}
      <g transform="translate(18, 358)">
        <rect x="0" y="0" width="50" height="4" rx="1" fill="#666" />
        <rect x="50" y="0" width="50" height="4" rx="1" fill="white" stroke="#666" strokeWidth="0.8" />
        <text x="0" y="13" fill="#777" fontSize="7.5" fontFamily="sans-serif">0</text>
        <text x="44" y="13" fill="#777" fontSize="7.5" fontFamily="sans-serif">500m</text>
        <text x="94" y="13" fill="#777" fontSize="7.5" fontFamily="sans-serif">1km</text>
      </g>

      {/* ── Attribution ──────────────────────────────── */}
      <text x="594" y="376" textAnchor="end" fill="#bbb" fontSize="7.5" fontFamily="sans-serif">© OpenStreetMap contributors</text>
    </svg>
  )
}
