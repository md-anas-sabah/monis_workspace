import type { Selection } from "@/lib/catalog";

/**
 * Hand-drawn SVG room that assembles itself from the current selection.
 * Layout map (viewBox 760×520): floor lamp + beanbag in the left corner,
 * chair ~x200, desk x300–648, coffee cart ~x672, monstera at the right edge.
 * The desk top + everything on it lives in one group so the standing desk
 * can physically rise.
 */
export function WorkspaceScene({
  selection,
  dusk,
}: {
  selection: Selection;
  dusk: boolean;
}) {
  const monitorCount =
    selection.monitor === "single"
      ? 1
      : selection.monitor === "dual"
        ? 2
        : selection.monitor === "triple"
          ? 3
          : 0;
  const standing = selection.desk === "adjustable";
  const lift = standing ? -34 : 0;
  const duskOpacity = (value: number) => (dusk ? value : 0);

  const monitorCenters =
    monitorCount === 1
      ? [474]
      : monitorCount === 2
        ? [416, 532]
        : monitorCount === 3
          ? [364, 474, 584]
          : [];

  return (
    <svg
      viewBox="0 0 760 520"
      className="block h-auto w-full"
      role="img"
      aria-label="Illustration of your configured workspace"
    >
      <defs>
        <linearGradient id="wallDay" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f7e9c9" />
          <stop offset="1" stopColor="#efd9ae" />
        </linearGradient>
        <linearGradient id="wallDusk" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#453963" />
          <stop offset="1" stopColor="#714861" />
        </linearGradient>
        <linearGradient id="floorDay" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#d9b283" />
          <stop offset="1" stopColor="#c69c6b" />
        </linearGradient>
        <linearGradient id="floorDusk" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#54405e" />
          <stop offset="1" stopColor="#43334c" />
        </linearGradient>
        <linearGradient id="skyDay" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#9fd4e8" />
          <stop offset="0.62" stopColor="#cfe8dd" />
          <stop offset="1" stopColor="#f9e5ae" />
        </linearGradient>
        <linearGradient id="skyDusk" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#232a58" />
          <stop offset="0.7" stopColor="#54406e" />
          <stop offset="1" stopColor="#b96a6e" />
        </linearGradient>
        <linearGradient id="bambooTop" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#cf9254" />
          <stop offset="1" stopColor="#b87c40" />
        </linearGradient>
        <linearGradient id="screenGlass" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#16352c" />
          <stop offset="1" stopColor="#0a1f19" />
        </linearGradient>
        <radialGradient id="lampGlow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#ffd98a" stopOpacity="0.85" />
          <stop offset="1" stopColor="#ffd98a" stopOpacity="0" />
        </radialGradient>
        <mask id="windowMask">
          <rect x="92" y="76" width="142" height="188" rx="14" fill="#fff" />
        </mask>
      </defs>

      {/* ---------- Walls & window ---------- */}
      <rect x="0" y="0" width="760" height="402" fill="url(#wallDay)" />
      <rect
        className="dusk-fade"
        x="0"
        y="0"
        width="760"
        height="402"
        fill="url(#wallDusk)"
        opacity={duskOpacity(1)}
      />

      {/* Window */}
      <rect x="82" y="66" width="162" height="208" rx="20" fill="#fdf6e4" />
      <rect
        className="dusk-fade"
        x="82"
        y="66"
        width="162"
        height="208"
        rx="20"
        fill="#2b2440"
        opacity={duskOpacity(0.55)}
      />
      <g mask="url(#windowMask)">
        <rect x="92" y="76" width="142" height="188" fill="url(#skyDay)" />
        <rect
          className="dusk-fade"
          x="92"
          y="76"
          width="142"
          height="188"
          fill="url(#skyDusk)"
          opacity={duskOpacity(1)}
        />
        {/* sea */}
        <rect
          x="92"
          y="216"
          width="142"
          height="48"
          fill="#69b8bd"
          opacity="0.85"
        />
        <rect
          className="dusk-fade"
          x="92"
          y="216"
          width="142"
          height="48"
          fill="#2c2a55"
          opacity={duskOpacity(0.85)}
        />
        {/* sun */}
        <g className="dusk-fade" opacity={dusk ? 0 : 1}>
          <g className="rays" stroke="#f2c860" strokeWidth="3" strokeLinecap="round">
            <path d="M163 106v-12M163 172v12M130 139h-12M208 139h-12M140 116l-8-8M187 162l8 8M187 116l8-8M140 162l-8 8" />
          </g>
          <circle cx="163" cy="139" r="24" fill="#f5c860" />
          <circle cx="163" cy="139" r="24" fill="#fff" opacity="0.25" />
        </g>
        {/* moon + stars */}
        <g className="dusk-fade" opacity={duskOpacity(1)}>
          <path
            d="M178 120a20 20 0 1 1-24-19.5 16 16 0 1 0 24 19.5Z"
            fill="#f6ecd2"
          />
          <circle className="twinkle" cx="112" cy="100" r="2" fill="#f6ecd2" />
          <circle
            className="twinkle"
            cx="205"
            cy="92"
            r="1.6"
            fill="#f6ecd2"
            style={{ animationDelay: "0.7s" }}
          />
          <circle
            className="twinkle"
            cx="127"
            cy="146"
            r="1.5"
            fill="#f6ecd2"
            style={{ animationDelay: "1.3s" }}
          />
          <circle
            className="twinkle"
            cx="216"
            cy="140"
            r="1.8"
            fill="#f6ecd2"
            style={{ animationDelay: "1.9s" }}
          />
        </g>
        {/* palm fronds peeking in */}
        <g fill="#2c6645" opacity="0.7">
          <path d="M234 210c-26-16-52-16-70 2 24 10 48 10 70-2Z" />
          <path d="M234 232c-22-6-42 0-56 16 20 4 40-1 56-16Z" />
        </g>
      </g>
      {/* window frame bars */}
      <rect x="159" y="76" width="6" height="188" rx="3" fill="#fdf6e4" />
      <rect x="92" y="164" width="142" height="6" rx="3" fill="#fdf6e4" />
      <rect
        className="dusk-fade"
        x="159"
        y="76"
        width="6"
        height="188"
        rx="3"
        fill="#2b2440"
        opacity={duskOpacity(0.5)}
      />
      <rect
        className="dusk-fade"
        x="92"
        y="164"
        width="142"
        height="6"
        rx="3"
        fill="#2b2440"
        opacity={duskOpacity(0.5)}
      />
      {/* sill */}
      <rect x="74" y="272" width="178" height="10" rx="5" fill="#e8d5ac" />

      {/* ---------- Fairy lights ---------- */}
      <path
        d="M0 24 Q 190 58 380 30 T 760 26"
        fill="none"
        stroke="#a08c66"
        strokeWidth="1.6"
        opacity="0.5"
      />
      {[
        [38, 32],
        [96, 40],
        [154, 46],
        [212, 48],
        [270, 46],
        [328, 40],
        [386, 33],
        [444, 30],
        [502, 32],
        [560, 36],
        [618, 38],
        [676, 35],
        [734, 30],
      ].map(([x, y], i) => (
        <g key={i}>
          <circle
            className="dusk-fade"
            cx={x}
            cy={y + 7}
            r="8"
            fill="#ffd98a"
            opacity={duskOpacity(0.35)}
          />
          <circle
            cx={x}
            cy={y + 7}
            r="3"
            fill={dusk ? "#ffd98a" : "#d9c49a"}
            className="dusk-fade"
          />
        </g>
      ))}

      {/* ---------- Wall art ---------- */}
      <g>
        <rect x="402" y="92" width="66" height="86" rx="8" fill="#fdf6e4" />
        <path d="M415 160c0-26 9-44 20-44s20 18 20 44Z" fill="#d28459" />
        <circle cx="435" cy="112" r="9" fill="#eab94a" />
        <rect x="488" y="118" width="56" height="66" rx="8" fill="#fdf6e4" />
        <g stroke="#2c6645" strokeWidth="2.4" strokeLinecap="round" fill="none">
          <path d="M516 172v-38" />
          <path d="M516 146c-8-2-13-8-14-16 8 1 13 7 14 16Z" />
          <path d="M516 152c8-2 13-8 14-16-8 1-13 7-14 16Z" />
        </g>
      </g>

      {/* ---------- Floor ---------- */}
      <rect x="0" y="398" width="760" height="122" fill="url(#floorDay)" />
      <rect
        className="dusk-fade"
        x="0"
        y="398"
        width="760"
        height="122"
        fill="url(#floorDusk)"
        opacity={duskOpacity(1)}
      />
      <rect x="0" y="394" width="760" height="7" fill="#00000012" />
      {/* moonlight pool from the window */}
      <path
        className="dusk-fade"
        d="M86 398h172l36 78H50Z"
        fill="#bcd2ff"
        opacity={duskOpacity(0.1)}
      />

      {/* Rug */}
      <g>
        <ellipse cx="400" cy="468" rx="298" ry="38" fill="#c06a3e" opacity="0.4" />
        <ellipse
          cx="400"
          cy="468"
          rx="266"
          ry="32"
          fill="none"
          stroke="#fdf6e4"
          strokeWidth="2.5"
          opacity="0.5"
        />
        <ellipse
          cx="400"
          cy="468"
          rx="228"
          ry="26"
          fill="none"
          stroke="#824227"
          strokeWidth="2"
          opacity="0.35"
        />
      </g>

      {/* ---------- Chill corner: floor lamp ---------- */}
      {selection.lamp === "floor-lamp" && (
        <g key="floor-lamp" className="scene-pop">
          <ellipse cx="82" cy="477" rx="30" ry="7" fill="#241e14" opacity="0.12" />
          <rect x="79" y="196" width="6" height="278" rx="3" fill="#5b5246" />
          <ellipse cx="82" cy="474" rx="24" ry="6" fill="#5b5246" />
          <path
            d="M52 148h60l-8 52H60Z"
            fill="#f6ead0"
            stroke="#dcc9a2"
            strokeWidth="2"
          />
          <path
            className="dusk-fade"
            d="M52 148h60l-8 52H60Z"
            fill="#ffd98a"
            opacity={duskOpacity(0.5)}
          />
        </g>
      )}

      {/* ---------- Chill corner: beanbag ---------- */}
      {selection.extra === "beanbag" && (
        <g key="beanbag" className="scene-pop">
          <ellipse cx="112" cy="492" rx="58" ry="10" fill="#241e14" opacity="0.12" />
          <path
            d="M112 414c30 0 52 26 52 52 0 18-18 26-52 26s-52-8-52-26c0-26 22-52 52-52Z"
            fill="#d28459"
          />
          <path
            d="M112 414c30 0 52 26 52 52 0 6-2 11-6 15-4-30-20-48-46-52 8-6 0-15 0-15Z"
            fill="#fdf6e4"
            opacity="0.18"
          />
          <path
            d="M84 430c10 16 12 38 6 56"
            fill="none"
            stroke="#824227"
            strokeWidth="2"
            opacity="0.4"
          />
        </g>
      )}

      {/* ---------- Chair ---------- */}
      {selection.chair === "ergonomic" && (
        <g key="ergonomic" className="scene-pop">
          <ellipse cx="200" cy="486" rx="66" ry="10" fill="#241e14" opacity="0.14" />
          {/* base */}
          <g stroke="#33302b" strokeWidth="7" strokeLinecap="round" fill="none">
            <path d="M200 434v34" />
            <path d="M200 462c-16 2-30 8-40 16M200 462c16 2 30 8 40 16M200 464c-6 6-10 12-12 18M200 464c6 6 10 12 12 18" />
          </g>
          <circle cx="158" cy="481" r="5" fill="#33302b" />
          <circle cx="242" cy="481" r="5" fill="#33302b" />
          <circle cx="186" cy="486" r="5" fill="#33302b" />
          <circle cx="214" cy="486" r="5" fill="#33302b" />
          {/* seat + back */}
          <rect x="162" y="398" width="76" height="20" rx="10" fill="#33302b" />
          <rect x="167" y="304" width="66" height="102" rx="28" fill="#2c6645" />
          <rect
            x="176"
            y="314"
            width="48"
            height="82"
            rx="20"
            fill="none"
            stroke="#0c231a"
            strokeWidth="2"
            opacity="0.35"
          />
          <path
            d="M181 352h38"
            stroke="#0c231a"
            strokeWidth="2"
            opacity="0.35"
          />
          <rect x="181" y="286" width="38" height="20" rx="10" fill="#33302b" />
          {/* armrest */}
          <path
            d="M156 380v22M156 380h12"
            stroke="#33302b"
            strokeWidth="6"
            strokeLinecap="round"
            fill="none"
          />
        </g>
      )}
      {selection.chair === "lounge" && (
        <g key="lounge" className="scene-pop">
          <ellipse cx="200" cy="486" rx="66" ry="10" fill="#241e14" opacity="0.14" />
          {/* wooden legs */}
          <g stroke="#8b5e34" strokeWidth="6" strokeLinecap="round">
            <path d="M160 448l-10 34M240 448l10 34M178 450l-4 32M222 450l4 32" />
          </g>
          {/* body */}
          <path
            d="M145 448V370c0-32 24-52 55-52s55 20 55 52v78Z"
            fill="#f3e9d7"
          />
          <path
            d="M145 448V370c0-32 24-52 55-52"
            fill="none"
            stroke="#dccca6"
            strokeWidth="3"
            opacity="0.8"
          />
          {/* arms */}
          <rect x="133" y="392" width="26" height="58" rx="13" fill="#e8dcc4" />
          <rect x="241" y="392" width="26" height="58" rx="13" fill="#e8dcc4" />
          {/* seat cushion */}
          <rect x="152" y="414" width="96" height="26" rx="13" fill="#e8dcc4" />
          {/* bouclé stitches */}
          <g stroke="#c9b68e" strokeWidth="2" fill="none" opacity="0.7">
            <path d="M175 352c4 3 8 3 12 0M198 340c4 3 8 3 12 0M215 360c4 3 8 3 12 0" />
          </g>
          {/* throw pillow */}
          <rect
            x="164"
            y="376"
            width="40"
            height="40"
            rx="10"
            fill="#c06a3e"
            transform="rotate(-8 184 396)"
          />
        </g>
      )}

      {/* ---------- Desk shadow (static) ---------- */}
      <ellipse cx="474" cy="487" rx="196" ry="12" fill="#241e14" opacity="0.13" />

      {/* ---------- Desk legs (variant) ---------- */}
      {selection.desk === "bamboo" && (
        <g key="bamboo-legs" className="scene-pop">
          <g stroke="#a96f38" strokeWidth="10" strokeLinecap="round">
            <path d="M330 328l-12 146" />
            <path d="M618 328l12 146" />
          </g>
          <g stroke="#c08447" strokeWidth="10" strokeLinecap="round" opacity="0.75">
            <path d="M366 328l-8 140" />
            <path d="M582 328l8 140" />
          </g>
          {/* bamboo nodes */}
          <g stroke="#8a5827" strokeWidth="2.4" opacity="0.7">
            <path d="M320 382h14M324 430h14M624 382h14M622 430h14" />
          </g>
        </g>
      )}
      {selection.desk === "adjustable" && (
        <g key="standing-legs" className="scene-pop">
          <rect x="348" y="292" width="14" height="172" rx="6" fill="#47423b" />
          <rect x="586" y="292" width="14" height="172" rx="6" fill="#47423b" />
          <rect x="318" y="462" width="74" height="11" rx="5.5" fill="#33302b" />
          <rect x="556" y="462" width="74" height="11" rx="5.5" fill="#33302b" />
          {/* controller with LED */}
          <rect x="600" y="336" width="20" height="13" rx="3" fill="#33302b" />
          <circle cx="606" cy="342.5" r="2.2" fill="#7de3a0" />
          <path
            d="M612 349c10 24 2 60-16 96"
            fill="none"
            stroke="#33302b"
            strokeWidth="2.4"
            opacity="0.5"
          />
        </g>
      )}

      {/* ---------- Desk top + everything riding on it ---------- */}
      <g className="desk-lift" style={{ transform: `translateY(${lift}px)` }}>
        {/* monitors */}
        {monitorCount > 0 && (
          <g key={`monitors-${monitorCount}`} className="scene-pop">
            {monitorCenters.map((cx) => (
              <g key={cx}>
                <rect
                  x={cx - 22}
                  y={306}
                  width="44"
                  height="6"
                  rx="3"
                  fill="#33302b"
                />
                <rect x={cx - 5} y={278} width="10" height="30" fill="#33302b" />
                <rect
                  x={cx - 52}
                  y={202}
                  width="104"
                  height="78"
                  rx="9"
                  fill="#2a2620"
                />
                <rect
                  x={cx - 46}
                  y={208}
                  width="92"
                  height="63"
                  rx="5"
                  fill="url(#screenGlass)"
                />
                {/* code lines */}
                <g opacity="0.9">
                  <rect x={cx - 38} y={216} width="30" height="4" rx="2" fill="#eab94a" />
                  <rect x={cx - 38} y={225} width="44" height="4" rx="2" fill="#8cb489" />
                  <rect x={cx - 30} y={234} width="36" height="4" rx="2" fill="#f6ecd2" opacity="0.75" />
                  <rect x={cx - 30} y={243} width="24" height="4" rx="2" fill="#d28459" />
                  <rect x={cx - 38} y={252} width="40" height="4" rx="2" fill="#8cb489" opacity="0.8" />
                </g>
                {/* dusk screen glow */}
                <rect
                  className="dusk-fade"
                  x={cx - 46}
                  y={208}
                  width="92"
                  height="63"
                  rx="5"
                  fill="#d8f7e2"
                  opacity={duskOpacity(0.14)}
                />
                <ellipse
                  className="dusk-fade"
                  cx={cx}
                  cy={240}
                  rx="70"
                  ry="52"
                  fill="url(#lampGlow)"
                  opacity={duskOpacity(0.3)}
                />
              </g>
            ))}
          </g>
        )}

        {/* laptop — always along for the ride */}
        <g>
          <rect x="448" y="260" width="52" height="38" rx="4" fill="#3b362f" />
          <rect x="452" y="264" width="44" height="30" rx="2.5" fill="#16352c" />
          <rect x="456" y="269" width="18" height="3" rx="1.5" fill="#eab94a" />
          <rect x="456" y="275" width="28" height="3" rx="1.5" fill="#8cb489" />
          <rect x="460" y="281" width="20" height="3" rx="1.5" fill="#f6ecd2" opacity="0.7" />
          <path d="M440 312v-9a3 3 0 0 1 3-3h62a3 3 0 0 1 3 3v9Z" fill="#4a453e" />
          <ellipse cx="528" cy="308" rx="8" ry="4.5" fill="#f6ecd2" />
        </g>

        {/* brass task lamp (left end of desk) */}
        {selection.lamp === "desk-lamp" && (
          <g key="desk-lamp" className="scene-pop">
            <ellipse cx="326" cy="311" rx="15" ry="4.5" fill="#8a6b2f" />
            <path
              d="M326 308 314 266l26-22"
              fill="none"
              stroke="#b08d3e"
              strokeWidth="5"
              strokeLinecap="round"
            />
            <path d="M334 236l24 10-11 20-21-12Z" fill="#c9a144" />
            <circle cx="349" cy="255" r="4" fill="#ffe9b0" />
            <ellipse
              className="dusk-fade"
              cx="362"
              cy="286"
              rx="64"
              ry="46"
              fill="url(#lampGlow)"
              opacity={duskOpacity(0.55)}
            />
          </g>
        )}

        {/* desk succulent (right end of desk) */}
        {selection.plant === "succulent" && (
          <g key="succulent" className="scene-pop">
            <g fill="#5d9366">
              <ellipse cx="622" cy="288" rx="5" ry="10" transform="rotate(-28 622 288)" />
              <ellipse cx="634" cy="288" rx="5" ry="10" transform="rotate(28 634 288)" />
              <ellipse cx="628" cy="284" rx="5.5" ry="12" />
              <ellipse cx="617" cy="292" rx="4" ry="7" transform="rotate(-52 617 292)" fill="#8cb489" />
              <ellipse cx="639" cy="292" rx="4" ry="7" transform="rotate(52 639 292)" fill="#8cb489" />
            </g>
            <path d="M614 296h28l-4 16h-20Z" fill="#c06a3e" />
            <rect x="612" y="294" width="32" height="6" rx="3" fill="#a35430" />
          </g>
        )}

        {/* desk top */}
        {selection.desk === "bamboo" ? (
          <g key="bamboo-top">
            <rect x="298" y="312" width="352" height="15" rx="7.5" fill="url(#bambooTop)" />
            <path d="M312 316h120M480 322h140" stroke="#a96f38" strokeWidth="1.6" opacity="0.6" />
            <rect x="298" y="312" width="352" height="4" rx="2" fill="#fff" opacity="0.25" />
          </g>
        ) : (
          <g key="standing-top">
            <rect x="298" y="312" width="352" height="15" rx="7.5" fill="#efe3cb" />
            <rect x="298" y="312" width="352" height="4" rx="2" fill="#fff" opacity="0.5" />
            <rect x="298" y="323" width="352" height="4" rx="2" fill="#d9c8a6" />
          </g>
        )}
      </g>

      {/* ---------- Coffee cart (right of desk) ---------- */}
      {selection.extra === "coffee" && (
        <g key="coffee" className="scene-pop">
          <ellipse cx="676" cy="476" rx="30" ry="7" fill="#241e14" opacity="0.12" />
          <g stroke="#8b5e34" strokeWidth="5" strokeLinecap="round">
            <path d="M660 396l-6 76M692 396l6 76" />
            <path d="M658 440h38" strokeWidth="3.5" />
          </g>
          <rect x="648" y="388" width="56" height="9" rx="4.5" fill="#a96f38" />
          {/* espresso machine */}
          <rect x="654" y="356" width="28" height="32" rx="5" fill="#33302b" />
          <rect x="658" y="362" width="20" height="9" rx="2.5" fill="#f6ecd2" opacity="0.85" />
          <circle cx="663" cy="380" r="2.2" fill="#eab94a" />
          <circle cx="671" cy="380" r="2.2" fill="#d28459" />
          {/* mug + steam */}
          <rect x="688" y="378" width="11" height="10" rx="2.5" fill="#c06a3e" />
          <g stroke="#f6ecd2" strokeWidth="2" strokeLinecap="round" fill="none">
            <path className="steam" d="M691 372c-1.5-2 1.5-3.5 0-6" />
            <path className="steam-late" d="M696 372c-1.5-2 1.5-3.5 0-6" />
          </g>
        </g>
      )}

      {/* ---------- Monstera (right edge) ---------- */}
      {selection.plant === "tropical" && (
        <g key="tropical" className="scene-pop">
          <ellipse cx="712" cy="484" rx="38" ry="8" fill="#241e14" opacity="0.13" />
          <g className="sway">
            <g stroke="#225239" strokeWidth="4" strokeLinecap="round" fill="none">
              <path d="M712 438c-2-40-8-70-24-96" />
              <path d="M712 438c2-36 10-64 26-84" />
              <path d="M712 438c0-30-2-56 4-78" />
            </g>
            {/* leaves */}
            <path
              d="M688 342c-26-8-40-28-38-52 24 2 40 20 38 52Z"
              fill="#2c6645"
            />
            <path
              d="M688 342c-4-30 4-50 24-62 8 22 0 44-24 62Z"
              fill="#3b7a52"
            />
            <path
              d="M738 354c24-12 34-32 28-56-22 6-34 26-28 56Z"
              fill="#2c6645"
            />
            <path
              d="M738 354c-10-26-6-46 10-62 12 20 8 42-10 62Z"
              fill="#5d9366"
            />
            <path
              d="M716 360c-20-16-26-36-16-58 18 10 24 30 16 58Z"
              fill="#225239"
            />
            {/* leaf slits */}
            <g stroke="#f7e9c9" strokeWidth="2" opacity="0.35">
              <path d="M668 306c8 8 14 18 18 30M746 316c-6 10-9 20-10 32" />
            </g>
          </g>
          {/* pot */}
          <path d="M684 438h58l-8 46h-42Z" fill="#c06a3e" />
          <rect x="680" y="432" width="66" height="12" rx="6" fill="#a35430" />
          <path d="M694 448c2 12 4 22 8 30" stroke="#824227" strokeWidth="2" opacity="0.5" fill="none" />
        </g>
      )}

      {/* ---------- Dusk atmosphere ---------- */}
      <rect
        className="dusk-fade"
        x="0"
        y="0"
        width="760"
        height="520"
        fill="#241e3f"
        opacity={duskOpacity(0.16)}
        style={{ mixBlendMode: "multiply" }}
      />
    </svg>
  );
}
