import React from "react";
import { Timegroup, Text } from "@editframe/react";

const ANIMATIONS = `
  /* ============ Per-segment text animations ============ */
  @keyframes ef-show-rise {
    from { opacity: 0; transform: translateY(60px) scale(0.85); filter: blur(8px); }
    to   { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
  }
  @keyframes ef-show-pop {
    0%   { opacity: 0; transform: scale(0.2) rotate(-12deg); }
    60%  { opacity: 1; transform: scale(1.18) rotate(2deg); }
    100% { opacity: 1; transform: scale(1) rotate(0); }
  }
  @keyframes ef-show-chaos {
    from {
      opacity: 0;
      transform:
        translateX(calc(var(--ef-seed) * 480px - 240px))
        translateY(calc(var(--ef-seed) * 320px - 160px))
        rotate(calc(var(--ef-seed) * 720deg - 360deg))
        scale(0.3);
      filter: blur(12px);
    }
    to {
      opacity: 1;
      transform: translateX(0) translateY(0) rotate(0) scale(1);
      filter: blur(0);
    }
  }
  @keyframes ef-show-typeline {
    from { opacity: 0; transform: translateX(-32px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes ef-show-fadeup {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes ef-show-lineslide {
    from { opacity: 0; transform: translateX(-60px); filter: blur(6px); }
    to   { opacity: 1; transform: translateX(0); filter: blur(0); }
  }
  @keyframes ef-show-glitch {
    0%   { opacity: 0; transform: translateX(-12px) skewX(-8deg); filter: hue-rotate(120deg); }
    35%  { opacity: 1; transform: translateX(6px) skewX(4deg); filter: hue-rotate(-90deg); }
    70%  { opacity: 1; transform: translateX(-3px) skewX(-1deg); filter: hue-rotate(30deg); }
    100% { opacity: 1; transform: translateX(0) skewX(0); filter: hue-rotate(0); }
  }

  /* Per-Text scoped animations */
  .ef-anim-pop    > ef-text-segment { display: inline-block; animation: ef-show-pop      0.7s cubic-bezier(0.34, 1.56, 0.64, 1) both; animation-delay: var(--ef-stagger-offset); }
  .ef-anim-rise   > ef-text-segment { display: inline-block; animation: ef-show-rise     0.8s cubic-bezier(0.22, 1, 0.36, 1)    both; animation-delay: var(--ef-stagger-offset); }
  .ef-anim-chaos  > ef-text-segment { display: inline-block; animation: ef-show-chaos    1.0s cubic-bezier(0.22, 1, 0.36, 1)    both; animation-delay: var(--ef-stagger-offset); }
  .ef-anim-type   > ef-text-segment { display: inline-block; animation: ef-show-typeline 0.45s ease-out                          both; animation-delay: var(--ef-stagger-offset); }
  .ef-anim-fadeup > ef-text-segment { display: inline-block; animation: ef-show-fadeup   0.5s ease-out                           both; animation-delay: var(--ef-stagger-offset); }
  .ef-anim-line   > ef-text-segment { display: block;        animation: ef-show-lineslide 0.85s cubic-bezier(0.22, 1, 0.36, 1)   both; animation-delay: var(--ef-stagger-offset); }
  .ef-anim-glitch > ef-text-segment { display: inline-block; animation: ef-show-glitch   0.6s steps(8, end)                      both; animation-delay: var(--ef-stagger-offset); }

  /* ============ Scene transitions ============ */
  @keyframes ef-scene-fade-in  { from { opacity: 0 } to { opacity: 1 } }
  @keyframes ef-scene-fade-out { from { opacity: 1 } to { opacity: 0 } }

  /* ============ Background motion ============ */
  @keyframes ef-orbit-spin { from { transform: rotate(0deg); }    to { transform: rotate(540deg); } }
  @keyframes ef-orbit-fade { from { opacity: 0; }                 to { opacity: 1; } }
  @keyframes ef-bar-grow   { from { width: 0; opacity: 0.3; }     to { width: 100%; opacity: 1; } }
  @keyframes ef-tile-bloom {
    0%   { opacity: 0; transform: scale(0.2); }
    100% { opacity: 0.55; transform: scale(1); }
  }
  @keyframes ef-ring-expand {
    0%   { width: 0;      height: 0;      opacity: 0.7; border-width: 3px; }
    100% { width: 1800px; height: 1800px; opacity: 0;   border-width: 1px; }
  }
  @keyframes ef-hue-shift {
    0%   { filter: hue-rotate(-15deg); }
    100% { filter: hue-rotate(45deg); }
  }
  @keyframes ef-pulse {
    0%, 100% { opacity: 0.5; }
    50%      { opacity: 1; }
  }
  @keyframes ef-marquee {
    from { transform: translateX(0); }
    to   { transform: translateX(-50%); }
  }
  @keyframes ef-typein {
    from { clip-path: inset(0 100% 0 0); }
    to   { clip-path: inset(0 0 0 0); }
  }
  @keyframes ef-cursor-blink {
    0%, 49%  { opacity: 1; }
    50%, 99% { opacity: 0; }
    100%     { opacity: 1; }
  }
  @keyframes ef-card-float {
    0%   { opacity: 0; transform: translateY(40px) rotateX(20deg); }
    100% { opacity: 1; transform: translateY(0)    rotateX(0); }
  }
  @keyframes ef-vinyl-spin {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }
  @keyframes ef-progress-fill {
    from { width: 0; }
    to   { width: var(--bar-final, 100%); }
  }
`;

const SCENE_TRANSITION: React.CSSProperties = {
  animation:
    "ef-scene-fade-in 600ms ease-out both, " +
    "ef-scene-fade-out 600ms ease-in var(--ef-transition-out-start, 99s) both",
};

/* ====== Track list data ====== */
const TRACKS: Array<{ no: string; len: string; title: string; feat?: string }> = [
  { no: "01", len: "3:42", title: "Dust In Orbit" },
  { no: "02", len: "4:18", title: "After The Signal", feat: "with KAIRO" },
  { no: "03", len: "3:51", title: "Glass Highway" },
  { no: "04", len: "5:07", title: "Midnight Transmission" },
  { no: "05", len: "4:33", title: "Polaris (Slowed)" },
  { no: "06", len: "3:29", title: "Echoes Out West", feat: "feat. JUNE" },
  { no: "07", len: "4:11", title: "City of Mirrors" },
  { no: "08", len: "6:24", title: "Coda — Return Home" },
];

const STATS: Array<{ value: string; label: string; bar: string }> = [
  { value: "1.4B+", label: "TOTAL STREAMS", bar: "84%" },
  { value: "#1", label: "IN 12 COUNTRIES", bar: "100%" },
  { value: "47w", label: "ON THE BILLBOARD", bar: "62%" },
];

/* ====== Reusable atoms ====== */
const Vignette = () => (
  <div
    style={{
      position: "absolute",
      inset: 0,
      pointerEvents: "none",
      background:
        "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.7) 100%)",
    }}
  />
);

const Scanlines = () => (
  <div
    style={{
      position: "absolute",
      inset: 0,
      pointerEvents: "none",
      background:
        "repeating-linear-gradient(0deg, transparent 0 3px, rgba(255,255,255,0.04) 3px 4px)",
      mixBlendMode: "overlay",
    }}
  />
);

const HUDCorner = ({
  text,
  align,
  color = "rgba(255,255,255,0.55)",
}: {
  text: string;
  align: "tl" | "tr" | "bl" | "br";
  color?: string;
}) => {
  const pos: React.CSSProperties = { position: "absolute" };
  if (align.startsWith("t")) pos.top = 56;
  if (align.endsWith("l")) pos.left = 56;
  if (align.startsWith("b")) pos.bottom = 56;
  if (align.endsWith("r")) pos.right = 56;
  return (
    <div
      style={{
        ...pos,
        fontFamily: "ui-monospace, SFMono-Regular, monospace",
        fontSize: 18,
        letterSpacing: "0.3em",
        color,
        textTransform: "uppercase",
        zIndex: 30,
      }}
    >
      {text}
    </div>
  );
};

export const Video = () => {
  return (
    <Timegroup
      workbench
      className="w-[1920px] h-[1080px] bg-black relative overflow-hidden text-white"
      mode="sequence"
      overlap="600ms"
    >
      <style dangerouslySetInnerHTML={{ __html: ANIMATIONS }} />

      {/* ============================================================
           SCENE 1 — COLD OPEN  ·  TRANSMISSION ESTABLISHED
         ============================================================ */}
      <Timegroup
        mode="fixed"
        duration="3.2s"
        className="absolute inset-0 flex items-center justify-center"
        style={{
          ...SCENE_TRANSITION,
          background:
            "radial-gradient(ellipse at center, #062014 0%, #000 100%)",
        }}
      >
        <Scanlines />
        <HUDCorner text="◉ TRANSMISSION ESTABLISHED" align="tl" color="rgba(74,222,128,0.85)" />
        <HUDCorner text="T-MINUS 03:42:11" align="tr" color="rgba(74,222,128,0.85)" />
        <HUDCorner text="CH 04 / FREQ 88.13 MHz" align="bl" color="rgba(74,222,128,0.6)" />
        <HUDCorner text="◇ DECRYPTING…" align="br" color="rgba(74,222,128,0.6)" />

        <div className="z-10 flex flex-col items-center gap-10">
          <Text
            split="char"
            stagger="40ms"
            duration="3.2s"
            className="ef-anim-glitch font-mono font-black text-emerald-300 leading-none"
            style={{ fontSize: 156, letterSpacing: "0.04em", textShadow: "0 0 60px rgba(74,222,128,0.5)" }}
          >
            INCOMING SIGNAL
          </Text>
          <div
            className="font-mono text-xl text-emerald-200/70 tracking-[0.4em]"
            style={{
              animation: "ef-typein 1.6s steps(40, end) both, ef-pulse 2s ease-in-out 1.6s infinite",
              borderRight: "2px solid rgba(74,222,128,0.8)",
              padding: "4px 12px",
            }}
          >
            decoding… 0x4D69646E69676874
          </div>
        </div>
        <Vignette />
      </Timegroup>

      {/* ============================================================
           SCENE 2 — ARTIST REVEAL  ·  ASTRA
         ============================================================ */}
      <Timegroup
        mode="fixed"
        duration="3.6s"
        className="absolute inset-0 flex items-center justify-center"
        style={{
          ...SCENE_TRANSITION,
          background:
            "radial-gradient(circle at 30% 30%, rgba(34,211,238,0.18), transparent 55%), radial-gradient(circle at 70% 70%, rgba(217,70,239,0.22), transparent 55%), #020617",
        }}
      >
        <HUDCorner text="ARTIST · 001" align="tl" />
        <HUDCorner text="MERIDIAN RECORDS — MR-2026" align="tr" />

        {/* Background orbit ring softly spinning */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: 0,
            height: 0,
            opacity: 0.45,
            animation: "ef-orbit-spin 4s linear both",
          }}
        >
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i / 12) * 360;
            const hue = (i * 360) / 12;
            return (
              <div
                key={i}
                style={{
                  position: "absolute",
                  width: "26px",
                  height: "26px",
                  marginLeft: "-13px",
                  marginTop: "-13px",
                  borderRadius: "50%",
                  background: `hsl(${hue}, 90%, 65%)`,
                  boxShadow: `0 0 40px hsl(${hue}, 90%, 65%)`,
                  transform: `rotate(${angle}deg) translateX(540px)`,
                  animation: "ef-orbit-fade 0.5s ease-out both",
                  animationDelay: `${i * 0.06}s`,
                }}
              />
            );
          })}
        </div>

        {/* Vertical text on left */}
        <div
          style={{
            position: "absolute",
            left: 100,
            top: "50%",
            transform: "translateY(-50%) rotate(-90deg)",
            transformOrigin: "left center",
            fontFamily: "monospace",
            color: "rgba(255,255,255,0.4)",
            letterSpacing: "0.5em",
            fontSize: 14,
          }}
        >
          MERIDIAN ⌁ AURORA SESSIONS ⌁ 2026
        </div>

        <div className="z-10 flex flex-col items-center gap-4">
          <Text
            split="word"
            stagger="120ms"
            duration="3.6s"
            className="ef-anim-fadeup text-2xl font-light tracking-[0.7em] text-cyan-200/80 uppercase"
          >
            meridian records presents
          </Text>
          <Text
            split="char"
            stagger="55ms"
            duration="3.6s"
            className="ef-anim-pop font-black tracking-tight leading-none text-white"
            style={{ fontSize: 320, textShadow: "0 0 100px rgba(34,211,238,0.6)" }}
          >
            ASTRA
          </Text>
          <Text
            split="word"
            stagger="80ms"
            duration="3.6s"
            className="ef-anim-fadeup text-xl font-mono tracking-[0.4em] text-fuchsia-300/80"
          >
            — the third album —
          </Text>
        </div>
        <Vignette />
      </Timegroup>

      {/* ============================================================
           SCENE 3 — ALBUM TITLE  ·  MIDNIGHT TRANSMISSIONS
         ============================================================ */}
      <Timegroup
        mode="fixed"
        duration="4.2s"
        className="absolute inset-0 flex items-center justify-center"
        style={{
          ...SCENE_TRANSITION,
          background:
            "linear-gradient(135deg, #1a0938 0%, #4c1d95 35%, #b91c5c 100%)",
        }}
      >
        <HUDCorner text="ALBUM" align="tl" />
        <HUDCorner text="LP · 8 TRACKS · 35:35" align="tr" />

        {/* Gradient hue shift overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at 70% 30%, rgba(245,158,11,0.35), transparent 60%), radial-gradient(circle at 20% 80%, rgba(34,211,238,0.3), transparent 60%)",
            animation: "ef-hue-shift 4.2s ease-in-out both",
          }}
        />

        <div className="z-10 flex flex-col items-center gap-2">
          <Text
            split="char"
            stagger="60ms"
            duration="4.2s"
            className="ef-anim-rise font-black tracking-tight leading-none text-white"
            style={{ fontSize: 200, letterSpacing: "-0.02em" }}
          >
            MIDNIGHT
          </Text>
          <Text
            split="char"
            stagger="40ms"
            duration="4.2s"
            className="ef-anim-chaos font-black tracking-tight leading-none text-amber-300"
            style={{
              fontSize: 200,
              letterSpacing: "-0.02em",
              textShadow: "0 0 80px rgba(251,191,36,0.6)",
            }}
          >
            TRANSMISSIONS
          </Text>
          <Text
            split="word"
            stagger="100ms"
            duration="4.2s"
            className="ef-anim-fadeup mt-8 text-xl font-mono tracking-[0.5em] text-white/60 uppercase"
          >
            an album in eight movements
          </Text>
        </div>
        <Vignette />
      </Timegroup>

      {/* ============================================================
           SCENE 4 — TRACK LIST  ·  3D PERSPECTIVE
         ============================================================ */}
      <Timegroup
        mode="fixed"
        duration="5.2s"
        className="absolute inset-0"
        style={{
          ...SCENE_TRANSITION,
          background:
            "linear-gradient(135deg, #0c1226 0%, #1e1b4b 50%, #2c1340 100%)",
        }}
      >
        <HUDCorner text="TRACK LIST · A-SIDE / B-SIDE" align="tl" />
        <HUDCorner text="P  2026 MERIDIAN RECORDS" align="bl" />

        {/* Subtle vertical scrolling ticker on the side */}
        <div
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            right: 60,
            width: 14,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            opacity: 0.4,
            fontFamily: "monospace",
            fontSize: 10,
            color: "rgba(255,255,255,0.5)",
            writingMode: "vertical-rl",
            letterSpacing: "0.3em",
          }}
        >
          <span>SIDE A</span>
          <span>SIDE B</span>
        </div>

        {/* Cover art (CSS-only) on the right */}
        <div
          style={{
            position: "absolute",
            right: 140,
            top: "50%",
            transform: "translateY(-50%) perspective(1600px) rotateY(-18deg) rotateX(4deg)",
            width: 540,
            height: 540,
            borderRadius: 8,
            background:
              "radial-gradient(circle at 35% 30%, #fde68a 0%, #f59e0b 25%, #be123c 60%, #1e0b3a 100%)",
            boxShadow:
              "0 50px 100px rgba(0,0,0,0.6), 0 0 80px rgba(245,158,11,0.3)",
            animation: "ef-card-float 1.2s cubic-bezier(0.22, 1, 0.36, 1) both",
          }}
        >
          {/* Vinyl */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: 380,
              height: 380,
              borderRadius: "50%",
              transform: "translate(-50%, -50%)",
              background:
                "repeating-radial-gradient(circle at center, #111 0px, #222 1px, #111 2px, #1a1a1a 3px), radial-gradient(circle, #555 0%, #111 100%)",
              boxShadow: "inset 0 0 60px rgba(0,0,0,0.8)",
              animation: "ef-vinyl-spin 5.2s linear both",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                width: 110,
                height: 110,
                borderRadius: "50%",
                transform: "translate(-50%, -50%)",
                background:
                  "radial-gradient(circle, #fde68a 0%, #be123c 100%)",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                width: 8,
                height: 8,
                borderRadius: "50%",
                transform: "translate(-50%, -50%)",
                background: "#000",
              }}
            />
          </div>
          {/* Title overlay */}
          <div
            style={{
              position: "absolute",
              top: 22,
              left: 22,
              right: 22,
              fontFamily: "monospace",
              fontSize: 14,
              letterSpacing: "0.4em",
              color: "rgba(0,0,0,0.7)",
            }}
          >
            ASTRA — MIDNIGHT TRANSMISSIONS
          </div>
        </div>

        {/* Tracks on left */}
        <div
          style={{
            position: "absolute",
            left: 140,
            top: "50%",
            transform: "translateY(-50%) perspective(1800px) rotateY(8deg)",
            width: 880,
          }}
        >
          {TRACKS.map((t, i) => (
            <div
              key={t.no}
              style={{
                display: "grid",
                gridTemplateColumns: "70px 110px 1fr 200px",
                alignItems: "baseline",
                padding: "14px 0",
                borderBottom: "1px solid rgba(255,255,255,0.08)",
                animation: "ef-show-lineslide 0.9s cubic-bezier(0.22, 1, 0.36, 1) both",
                animationDelay: `${0.2 + i * 0.18}s`,
              }}
            >
              <span
                style={{
                  fontFamily: "monospace",
                  fontSize: 22,
                  color: "rgba(244,114,182,0.85)",
                  letterSpacing: "0.1em",
                }}
              >
                {t.no}
              </span>
              <span
                style={{
                  fontFamily: "monospace",
                  fontSize: 18,
                  color: "rgba(255,255,255,0.4)",
                }}
              >
                {t.len}
              </span>
              <span
                style={{
                  fontFamily: "ui-sans-serif, system-ui, sans-serif",
                  fontSize: 36,
                  fontWeight: 700,
                  color: "white",
                  letterSpacing: "-0.01em",
                }}
              >
                {t.title}
              </span>
              <span
                style={{
                  fontFamily: "monospace",
                  fontSize: 14,
                  color: "rgba(167,139,250,0.7)",
                  letterSpacing: "0.15em",
                  textAlign: "right",
                }}
              >
                {t.feat ?? ""}
              </span>
            </div>
          ))}
        </div>
      </Timegroup>

      {/* ============================================================
           SCENE 5 — STATS  ·  GLASS CARDS OVER TILE GRID
         ============================================================ */}
      <Timegroup
        mode="fixed"
        duration="4.2s"
        className="absolute inset-0 flex items-center justify-center"
        style={{
          ...SCENE_TRANSITION,
          background:
            "linear-gradient(180deg, #0b1020 0%, #1a103d 100%)",
        }}
      >
        <HUDCorner text="ON RECORD" align="tl" />
        <HUDCorner text="VERIFIED · IFPI / RIAA" align="tr" />

        {/* Background tile grid */}
        {(() => {
          const cols = 12;
          const rows = 6;
          const tile = 110;
          const gap = 14;
          const totalW = cols * tile + (cols - 1) * gap;
          const totalH = rows * tile + (rows - 1) * gap;
          const startX = (1920 - totalW) / 2;
          const startY = (1080 - totalH) / 2;
          return Array.from({ length: rows * cols }).map((_, i) => {
            const row = Math.floor(i / cols);
            const col = i % cols;
            const dx = col - (cols - 1) / 2;
            const dy = row - (rows - 1) / 2;
            const distNorm =
              Math.sqrt(dx * dx + dy * dy) / Math.sqrt((cols / 2) ** 2 + (rows / 2) ** 2);
            const x = startX + col * (tile + gap);
            const y = startY + row * (tile + gap);
            const hue1 = (i * 9 + 200) % 360;
            const hue2 = (i * 9 + 280) % 360;
            return (
              <div
                key={i}
                style={{
                  position: "absolute",
                  left: `${x}px`,
                  top: `${y}px`,
                  width: `${tile}px`,
                  height: `${tile}px`,
                  borderRadius: "14px",
                  background: `linear-gradient(135deg, hsl(${hue1}, 85%, 60%), hsl(${hue2}, 85%, 60%))`,
                  boxShadow: `0 0 30px hsla(${hue1}, 85%, 60%, 0.4)`,
                  transformOrigin: "center",
                  animation: "ef-tile-bloom 1.6s cubic-bezier(0.22, 1, 0.36, 1) both",
                  animationDelay: `${distNorm * 0.9}s`,
                }}
              />
            );
          });
        })()}

        {/* Heading */}
        <div
          style={{
            position: "absolute",
            top: 130,
            left: 0,
            right: 0,
            textAlign: "center",
            zIndex: 20,
          }}
        >
          <Text
            split="word"
            stagger="120ms"
            duration="4.2s"
            className="ef-anim-fadeup font-mono text-lg tracking-[0.5em] text-white/70 uppercase"
          >
            on the record
          </Text>
        </div>

        {/* Stat cards */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 36,
            zIndex: 20,
          }}
        >
          {STATS.map((s, i) => (
            <div
              key={s.label}
              style={{
                width: 460,
                padding: "44px 44px 36px",
                borderRadius: 24,
                background: "rgba(15, 23, 42, 0.55)",
                backdropFilter: "blur(18px)",
                WebkitBackdropFilter: "blur(18px)",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                boxShadow: "0 30px 80px rgba(0,0,0,0.5)",
                animation: "ef-card-float 0.9s cubic-bezier(0.22, 1, 0.36, 1) both",
                animationDelay: `${0.3 + i * 0.2}s`,
                display: "flex",
                flexDirection: "column",
                gap: 24,
              }}
            >
              <div
                style={{
                  fontFamily: "ui-sans-serif, system-ui, sans-serif",
                  fontWeight: 900,
                  fontSize: 130,
                  lineHeight: 1,
                  letterSpacing: "-0.04em",
                  background:
                    "linear-gradient(135deg, #fde68a 0%, #f472b6 50%, #22d3ee 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                {s.value}
              </div>
              <div
                style={{
                  fontFamily: "monospace",
                  fontSize: 14,
                  letterSpacing: "0.35em",
                  color: "rgba(255, 255, 255, 0.65)",
                  textTransform: "uppercase",
                }}
              >
                {s.label}
              </div>
              <div
                style={{
                  height: 6,
                  borderRadius: 3,
                  background: "rgba(255,255,255,0.1)",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    background:
                      "linear-gradient(90deg, #22d3ee, #a78bfa, #f472b6)",
                    width: s.bar,
                    animation: "ef-bar-grow 1.6s cubic-bezier(0.22, 1, 0.36, 1) both",
                    animationDelay: `${0.6 + i * 0.2}s`,
                    transformOrigin: "left",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
        <Vignette />
      </Timegroup>

      {/* ============================================================
           SCENE 6 — DROP CTA  ·  OUT JUNE 13
         ============================================================ */}
      <Timegroup
        mode="fixed"
        duration="3.8s"
        className="absolute inset-0 flex items-center justify-center"
        style={{
          ...SCENE_TRANSITION,
          background:
            "radial-gradient(circle at 50% 50%, #1e293b 0%, #020617 100%)",
        }}
      >
        <HUDCorner text="06.13.2026 · 00:00 UTC" align="tl" color="rgba(244,114,182,0.85)" />
        <HUDCorner text="STREAM EVERYWHERE" align="tr" color="rgba(244,114,182,0.85)" />

        {/* Concentric expanding rings */}
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              borderRadius: "50%",
              border: `2px solid hsl(${300 + i * 12}, 85%, 65%)`,
              animation: "ef-ring-expand 3.4s ease-out both",
              animationDelay: `${i * 0.25}s`,
            }}
          />
        ))}

        <div className="z-10 flex flex-col items-center gap-6">
          <Text
            split="word"
            stagger="100ms"
            duration="3.8s"
            className="ef-anim-fadeup text-xl font-mono tracking-[0.6em] text-fuchsia-300 uppercase"
          >
            new album · out
          </Text>
          <Text
            split="char"
            stagger="50ms"
            duration="3.8s"
            className="ef-anim-pop font-black leading-none text-white"
            style={{
              fontSize: 280,
              letterSpacing: "-0.04em",
              textShadow: "0 0 100px rgba(217,70,239,0.6)",
            }}
          >
            06.13
          </Text>
          <Text
            split="word"
            stagger="120ms"
            duration="3.8s"
            className="ef-anim-fadeup text-2xl font-light tracking-[0.5em] text-cyan-200 uppercase"
          >
            stream everywhere
          </Text>
          <div
            style={{
              marginTop: 20,
              display: "flex",
              gap: 18,
              fontFamily: "monospace",
              fontSize: 14,
              letterSpacing: "0.35em",
              color: "rgba(255,255,255,0.5)",
              textTransform: "uppercase",
            }}
          >
            <span>· spotify</span>
            <span>· apple music</span>
            <span>· tidal</span>
            <span>· bandcamp</span>
            <span>· youtube</span>
          </div>
        </div>

        {/* Bottom marquee ticker */}
        <div
          style={{
            position: "absolute",
            bottom: 38,
            left: 0,
            right: 0,
            overflow: "hidden",
            height: 36,
            opacity: 0.7,
          }}
        >
          <div
            style={{
              display: "flex",
              whiteSpace: "nowrap",
              animation: "ef-marquee 12s linear both",
              fontFamily: "monospace",
              fontSize: 16,
              letterSpacing: "0.6em",
              color: "rgba(244,114,182,0.85)",
              textTransform: "uppercase",
            }}
          >
            {Array.from({ length: 2 }).map((_, k) => (
              <span key={k} style={{ paddingRight: 80 }}>
                ASTRA · MIDNIGHT TRANSMISSIONS · OUT 06.13.2026 · MERIDIAN RECORDS · ASTRA · MIDNIGHT TRANSMISSIONS · OUT 06.13.2026 · MERIDIAN RECORDS ·{" "}
              </span>
            ))}
          </div>
        </div>
        <Vignette />
      </Timegroup>
    </Timegroup>
  );
};
