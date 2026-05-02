import React from "react";
import { Timegroup, Text } from "@editframe/react";

const ANIMATIONS = `
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

  /* Scoped per-Text animations — applied to every auto-generated segment */
  .ef-anim-pop    > ef-text-segment { display: inline-block; animation: ef-show-pop    0.7s cubic-bezier(0.34, 1.56, 0.64, 1) both; animation-delay: var(--ef-stagger-offset); }
  .ef-anim-rise   > ef-text-segment { display: inline-block; animation: ef-show-rise   0.8s cubic-bezier(0.22, 1, 0.36, 1)    both; animation-delay: var(--ef-stagger-offset); }
  .ef-anim-chaos  > ef-text-segment { display: inline-block; animation: ef-show-chaos  1.0s cubic-bezier(0.22, 1, 0.36, 1)    both; animation-delay: var(--ef-stagger-offset); }
  .ef-anim-type   > ef-text-segment { display: inline-block; animation: ef-show-typeline 0.45s ease-out both; animation-delay: var(--ef-stagger-offset); }
  .ef-anim-fadeup > ef-text-segment { display: inline-block; animation: ef-show-fadeup 0.5s ease-out both; animation-delay: var(--ef-stagger-offset); }

  /* Scene crossfade keyframes */
  @keyframes ef-scene-fade-in  { from { opacity: 0 } to { opacity: 1 } }
  @keyframes ef-scene-fade-out { from { opacity: 1 } to { opacity: 0 } }

  /* Scene 3 — orbit ring rotation + dot fade-in */
  @keyframes ef-orbit-spin { from { transform: rotate(0deg); } to { transform: rotate(540deg); } }
  @keyframes ef-orbit-fade { from { opacity: 0; } to { opacity: 1; } }

  /* Scene 3 — center gradient bar grows */
  @keyframes ef-bar-grow { from { width: 0; opacity: 0.3; } to { width: 540px; opacity: 1; } }

  /* Scene 5 — grid tile bloom */
  @keyframes ef-tile-bloom {
    0%   { opacity: 0; transform: scale(0.2); }
    100% { opacity: 0.85; transform: scale(1); }
  }

  /* Scene 6 — concentric expanding rings */
  @keyframes ef-ring-expand {
    0%   { width: 0; height: 0; opacity: 0.7; }
    100% { width: 1800px; height: 1800px; opacity: 0; }
  }
`;

const SCENE_TRANSITION: React.CSSProperties = {
  animation:
    "ef-scene-fade-in 600ms ease-out both, " +
    "ef-scene-fade-out 600ms ease-in var(--ef-transition-out-start, 99s) both",
};

const SceneLabel = ({ index, total, title }: { index: number; total: number; title: string }) => (
  <div className="absolute top-12 left-12 right-12 flex items-center justify-between text-white/70 font-mono text-xl tracking-[0.3em] z-20">
    <span>
      EDITFRAME · SCENE {String(index).padStart(2, "0")} / {String(total).padStart(2, "0")}
    </span>
    <span className="text-cyan-300/90">{title}</span>
  </div>
);

const FeatureBadge = ({ children }: { children: React.ReactNode }) => (
  <div className="absolute bottom-20 left-12 right-12 flex items-center gap-4 font-mono text-base text-white/70 z-20">
    <span className="h-px flex-1 bg-white/20" />
    <span className="px-4 py-1.5 border border-white/20 rounded-full uppercase tracking-[0.25em] bg-black/40 backdrop-blur">
      {children}
    </span>
    <span className="h-px flex-1 bg-white/20" />
  </div>
);

const ProgressTimer = ({ duration }: { duration: string }) => (
  <Timegroup mode="fixed" duration={duration} className="absolute bottom-0 left-0 right-0 z-20">
    <div className="h-1 w-full bg-white/10">
      <div
        className="h-full bg-gradient-to-r from-cyan-300 via-fuchsia-400 to-amber-300"
        style={{ width: "calc(var(--ef-progress) * 100%)" }}
      />
    </div>
  </Timegroup>
);

export const Video = () => {
  return (
    <Timegroup
      workbench
      className="w-[1920px] h-[1080px] bg-slate-950 relative overflow-hidden text-white"
      mode="sequence"
      overlap="600ms"
    >
      <style dangerouslySetInnerHTML={{ __html: ANIMATIONS }} />
      {/* ============== SCENE 1 — HERO ============== */}
      <Timegroup
        mode="fixed"
        duration="4s"
        className="absolute inset-0 flex items-center justify-center"
        style={{
          ...SCENE_TRANSITION,
          background:
            "radial-gradient(circle at 30% 30%, rgba(34,211,238,0.25), transparent 55%), radial-gradient(circle at 70% 70%, rgba(217,70,239,0.25), transparent 55%), #020617",
        }}
      >
        <SceneLabel index={1} total={6} title="HERO · CHAR SPLIT" />

        {/* Background grid scaling with progress */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
            transform: "scale(calc(1 + var(--ef-progress) * 0.15))",
            opacity: "calc(var(--ef-progress) * 0.6 + 0.2)",
          }}
        />

        <div className="flex flex-col items-center gap-8 z-10">
          <Text
            split="char"
            stagger="55ms"
            duration="4s"
            className="ef-anim-pop text-[220px] font-black tracking-tight leading-none text-white"
            style={{
              textShadow: "0 0 80px rgba(34,211,238,0.5)",
            }}
          >
            EDITFRAME
          </Text>

          <Text
            split="word"
            stagger="80ms"
            duration="4s"
            className="ef-anim-fadeup text-3xl font-light tracking-[0.5em] text-cyan-200"
          >
            REAL VIDEO · WRITTEN IN REACT
          </Text>
        </div>

        <FeatureBadge>{'<Text split="char" stagger="55ms" />'}</FeatureBadge>
        <ProgressTimer duration="4s" />
      </Timegroup>

      {/* ============== SCENE 2 — WORD STAGGER ============== */}
      <Timegroup
        mode="fixed"
        duration="3.8s"
        className="absolute inset-0 flex items-center justify-center"
        style={{
          ...SCENE_TRANSITION,
          background:
            "linear-gradient(135deg, #0c1226 0%, #1e1b4b 50%, #311b92 100%)",
        }}
      >
        <SceneLabel index={2} total={6} title="WORD STAGGER" />

        <div className="flex flex-col items-start gap-8 max-w-[1500px] px-12 z-10">
          <Text
            split="word"
            stagger="120ms"
            duration="3.8s"
            className="ef-anim-rise text-7xl font-bold leading-tight text-white"
          >
            Animate every word, character, or line — with one prop.
          </Text>
          <Text
            split="word"
            stagger="60ms"
            duration="3.8s"
            className="ef-anim-type text-2xl font-mono text-fuchsia-300/90 mt-4"
          >
            split="word" stagger="120ms" — that's it.
          </Text>
        </div>

        <FeatureBadge>automatic per-segment timing</FeatureBadge>
        <ProgressTimer duration="3.8s" />
      </Timegroup>

      {/* ============== SCENE 3 — TIME-DRIVEN CSS ============== */}
      <Timegroup
        mode="fixed"
        duration="4.5s"
        className="absolute inset-0 flex items-center justify-center"
        style={{
          ...SCENE_TRANSITION,
          background:
            "radial-gradient(ellipse at center, #0a3d2c 0%, #021410 100%)",
        }}
      >
        <SceneLabel index={3} total={6} title="--ef-progress" />

        {/* Orbiting ring — wrapper spins via CSS animation, dots fade in via stagger */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: 0,
            height: 0,
            animation: "ef-orbit-spin 4.5s linear both",
          }}
        >
          {Array.from({ length: 8 }).map((_, i) => {
            const angle = (i / 8) * 360;
            const hue = (i * 360) / 8;
            return (
              <div
                key={i}
                style={{
                  position: "absolute",
                  width: "64px",
                  height: "64px",
                  marginLeft: "-32px",
                  marginTop: "-32px",
                  borderRadius: "50%",
                  background: `hsl(${hue}, 90%, 60%)`,
                  boxShadow: `0 0 70px hsl(${hue}, 90%, 60%)`,
                  transform: `rotate(${angle}deg) translateX(360px)`,
                  animation: "ef-orbit-fade 0.7s ease-out both",
                  animationDelay: `${i * 0.1}s`,
                }}
              />
            );
          })}
        </div>

        {/* Circular progress ring */}
        <svg className="absolute" width="640" height="640" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="46" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
          <circle
            cx="50"
            cy="50"
            r="46"
            fill="none"
            stroke="#22d3ee"
            strokeWidth="1.5"
            strokeLinecap="round"
            style={{
              strokeDasharray: "289.03",
              strokeDashoffset: "calc(289.03 * (1 - var(--ef-progress)))",
              transform: "rotate(-90deg)",
              transformOrigin: "center",
              filter: "drop-shadow(0 0 8px #22d3ee)",
            }}
          />
        </svg>

        {/* Center label + animated gradient bar via CSS keyframe */}
        <div className="z-10 flex flex-col items-center gap-8">
          <div
            style={{
              height: "100px",
              background: "linear-gradient(90deg, #22d3ee, #a78bfa, #f472b6)",
              borderRadius: "12px",
              boxShadow: "0 0 60px rgba(167,139,250,0.6)",
              animation: "ef-bar-grow 4.5s cubic-bezier(0.22, 1, 0.36, 1) both",
            }}
          />
          <Text
            split="word"
            stagger="80ms"
            duration="4.5s"
            className="ef-anim-fadeup text-3xl font-mono text-cyan-300 tracking-wider"
          >
            time-driven CSS variables
          </Text>
        </div>

        <FeatureBadge>calc(var(--ef-progress) * X) — every frame</FeatureBadge>
        <ProgressTimer duration="4.5s" />
      </Timegroup>

      {/* ============== SCENE 4 — SEED-DRIVEN CHAOS ============== */}
      <Timegroup
        mode="fixed"
        duration="3.8s"
        className="absolute inset-0 flex items-center justify-center"
        style={{
          ...SCENE_TRANSITION,
          background:
            "radial-gradient(circle at 50% 50%, #4c1d95 0%, #0f0a1e 100%)",
        }}
      >
        <SceneLabel index={4} total={6} title="--ef-seed CHAOS" />

        <div className="flex flex-col items-center gap-12 px-12 z-10">
          <Text
            split="char"
            stagger="40ms"
            duration="3.8s"
            className="ef-anim-chaos text-[140px] font-black tracking-tight text-amber-300 leading-none"
            style={{
              textShadow: "0 0 60px rgba(251,191,36,0.6)",
            }}
          >
            DETERMINISTIC RANDOMNESS
          </Text>
          <Text
            split="word"
            stagger="100ms"
            duration="3.8s"
            className="ef-anim-fadeup text-3xl font-mono text-amber-200/80 max-w-[1400px] text-center"
          >
            Every segment gets a stable random seed — chaos that renders identically every time.
          </Text>
        </div>

        <FeatureBadge>--ef-seed · per-segment 0..1</FeatureBadge>
        <ProgressTimer duration="3.8s" />
      </Timegroup>

      {/* ============== SCENE 5 — LAYERED MOTION GRID ============== */}
      <Timegroup
        mode="fixed"
        duration="4s"
        className="absolute inset-0 flex items-center justify-center"
        style={{
          ...SCENE_TRANSITION,
          background:
            "linear-gradient(180deg, #0b1020 0%, #1a103d 100%)",
        }}
      >
        <SceneLabel index={5} total={6} title="LAYERED COMPOSITION" />

        {/* 12x6 grid of pulsing tiles — animated via CSS keyframe with per-tile delay */}
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

        <div className="flex flex-col items-center gap-6 z-10 bg-slate-950/50 backdrop-blur-md rounded-3xl px-16 py-12 border border-white/10">
          <Text
            split="word"
            stagger="100ms"
            duration="4s"
            className="ef-anim-rise text-7xl font-black text-white text-center"
          >
            Compose layers like JSX.
          </Text>
          <Text
            split="word"
            stagger="60ms"
            duration="4s"
            className="ef-anim-fadeup text-2xl text-violet-300 font-mono tracking-wider"
          >
            64 tiles · 1 prop · 0 frames hand-keyed
          </Text>
        </div>

        <FeatureBadge>{"<Timegroup> trees, just like React"}</FeatureBadge>
        <ProgressTimer duration="4s" />
      </Timegroup>

      {/* ============== SCENE 6 — FINAL ============== */}
      <Timegroup
        mode="fixed"
        duration="4s"
        className="absolute inset-0 flex items-center justify-center"
        style={{
          ...SCENE_TRANSITION,
          background:
            "radial-gradient(circle at 50% 50%, #1e293b 0%, #020617 100%)",
        }}
      >
        <SceneLabel index={6} total={6} title="SHIP IT" />

        {/* Concentric expanding rings — staggered CSS animation */}
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              borderRadius: "50%",
              border: `2px solid hsl(${180 + i * 30}, 80%, 60%)`,
              animation: "ef-ring-expand 3s ease-out both",
              animationDelay: `${i * 0.3}s`,
            }}
          />
        ))}

        <div className="flex flex-col items-center gap-10 z-10">
          <Text
            split="char"
            stagger="50ms"
            duration="4s"
            className="ef-anim-pop text-[180px] font-black leading-none text-white"
            style={{
              textShadow: "0 0 100px rgba(168,85,247,0.6)",
            }}
          >
            JSX → MP4
          </Text>
          <Text
            split="word"
            stagger="120ms"
            duration="4s"
            className="ef-anim-fadeup text-4xl font-light tracking-[0.4em] text-cyan-200"
          >
            npx editframe render
          </Text>
          <div
            className="mt-8 flex items-center gap-3 text-white/60 font-mono text-lg"
            style={{ opacity: "calc(var(--ef-progress) * 1.5 - 0.5)" }}
          >
            <span className="w-3 h-3 rounded-full bg-emerald-400" />
            <span>editframe.com</span>
          </div>
        </div>

        <ProgressTimer duration="4s" />
      </Timegroup>
    </Timegroup>
  );
};
