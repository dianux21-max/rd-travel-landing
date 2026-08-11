"use client";

import { Component, type ReactNode } from "react";
import dynamic from "next/dynamic";

const HeroScene = dynamic(() => import("./HeroScene"), {
  ssr: false,
  loading: () => <StaticOrb />,
});

function StaticOrb() {
  return (
    <div
      aria-hidden="true"
      className="h-full w-full rounded-full anim-floaty"
      style={{
        background:
          "radial-gradient(circle at 35% 30%, rgba(167,139,250,0.55), rgba(194,41,138,0.35) 45%, rgba(224,130,74,0.18) 70%, transparent 75%)",
        filter: "blur(2px)",
      }}
    />
  );
}

class HeroSceneErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) return <StaticOrb />;
    return this.props.children;
  }
}

export default function HeroSceneLoader() {
  return (
    <div className="relative h-72 w-72 sm:h-96 sm:w-96" aria-hidden="true">
      <HeroSceneErrorBoundary>
        <HeroScene />
      </HeroSceneErrorBoundary>
    </div>
  );
}
