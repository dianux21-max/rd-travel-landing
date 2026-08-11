"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

const VIOLET = new THREE.Color("#8b3fe8");
const MAGENTA = new THREE.Color("#c2298a");
const AMBER = new THREE.Color("#e0824a");

function useReducedMotion() {
  return useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);
}

function GlobeCore() {
  const group = useRef<THREE.Group>(null);
  const reducedMotion = useReducedMotion();

  useFrame((_, delta) => {
    if (reducedMotion || !group.current) return;
    group.current.rotation.y += delta * 0.18;
    group.current.rotation.x = Math.sin(Date.now() * 0.00015) * 0.08;
  });

  return (
    <group ref={group}>
      {/* Core sphere */}
      <mesh>
        <icosahedronGeometry args={[1.15, 2]} />
        <meshStandardMaterial
          color={VIOLET}
          emissive={VIOLET}
          emissiveIntensity={0.25}
          roughness={0.35}
          metalness={0.5}
          wireframe
        />
      </mesh>
      <mesh>
        <icosahedronGeometry args={[1.1, 1]} />
        <meshStandardMaterial
          color={MAGENTA}
          emissive={MAGENTA}
          emissiveIntensity={0.35}
          roughness={0.25}
          metalness={0.6}
          transparent
          opacity={0.18}
        />
      </mesh>

      {/* Orbit ring: flight path */}
      <mesh rotation={[Math.PI / 2.4, 0.3, 0]}>
        <torusGeometry args={[1.75, 0.02, 16, 120]} />
        <meshStandardMaterial
          color={AMBER}
          emissive={AMBER}
          emissiveIntensity={0.6}
          roughness={0.3}
        />
      </mesh>

      {/* Small accent node traveling the ring */}
      <OrbitDot reducedMotion={reducedMotion} />
    </group>
  );
}

function OrbitDot({ reducedMotion }: { reducedMotion: boolean }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = reducedMotion ? 0.6 : clock.getElapsedTime() * 0.5;
    const radius = 1.75;
    ref.current.position.set(Math.cos(t) * radius, Math.sin(t * 0.6) * 0.4, Math.sin(t) * radius * 0.42);
  });
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.06, 16, 16]} />
      <meshStandardMaterial color={AMBER} emissive={AMBER} emissiveIntensity={1.4} />
    </mesh>
  );
}

export default function HeroScene() {
  const reducedMotion = useReducedMotion();

  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 4.4], fov: 42 }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.7} />
      <pointLight position={[3, 2, 4]} intensity={45} color="#ffffff" />
      <pointLight position={[-3, -2, -2]} intensity={25} color="#c2298a" />
      <pointLight position={[0, 3, -3]} intensity={15} color="#a78bfa" />
      <Float
        speed={reducedMotion ? 0 : 1.4}
        rotationIntensity={reducedMotion ? 0 : 0.35}
        floatIntensity={reducedMotion ? 0 : 0.9}
      >
        <GlobeCore />
      </Float>
    </Canvas>
  );
}
