"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { MeshReflectorMaterial, PerspectiveCamera } from "@react-three/drei";
import CarModel, { CarProgress } from "./CarModel";

type Props = {
  progressRef: React.MutableRefObject<CarProgress>;
  idleSpin?: boolean;
  cameraPosition?: [number, number, number];
  fov?: number;
  className?: string;
};

function Rig() {
  return (
    <>
      {/* key light — cold white, raking across the body */}
      <directionalLight position={[4, 5, 3]} intensity={2.2} color="#ffffff" castShadow />
      {/* venom rim light from behind */}
      <pointLight position={[-3, 1.5, -4]} intensity={6} color="#F5C400" distance={12} />
      {/* soft fill so black panels don't go full-crush */}
      <ambientLight intensity={0.18} />
      <hemisphereLight args={["#3a3a40", "#08080a", 0.35]} />
    </>
  );
}

function Floor() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.62, 0]} receiveShadow>
      <planeGeometry args={[24, 24]} />
      <MeshReflectorMaterial
        blur={[300, 80]}
        resolution={1024}
        mixBlur={1}
        mixStrength={35}
        roughness={1}
        depthScale={1}
        minDepthThreshold={0.85}
        color="#050506"
        metalness={0.4}
      />
    </mesh>
  );
}

export default function CarScene({
  progressRef,
  idleSpin = false,
  cameraPosition = [3.4, 1.3, 4.2],
  fov = 32,
  className = "",
}: Props) {
  return (
    <div className={className}>
      <Canvas shadows dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }}>
        <color attach="background" args={["#0A0A0B"]} />
        <fog attach="fog" args={["#0A0A0B", 8, 16]} />
        <PerspectiveCamera makeDefault position={cameraPosition} fov={fov} />
        <Rig />
        <Suspense fallback={null}>
          <CarModel progressRef={progressRef} idleSpin={idleSpin} scale={1} />
          <Floor />
        </Suspense>
      </Canvas>
    </div>
  );
}
