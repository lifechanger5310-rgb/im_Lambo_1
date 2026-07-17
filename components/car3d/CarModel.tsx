"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";

export type CarProgress = {
  /** current Y rotation in radians */
  rotation: number;
  /** 0 = assembled, 1 = fully exploded */
  explode: number;
  /** idle bob, 0-1 loops via internal clock, not driven externally */
};

type Props = {
  progressRef: React.MutableRefObject<CarProgress>;
  /** enable a slow idle rotation on top of progressRef.rotation (hero mode) */
  idleSpin?: boolean;
  scale?: number;
};

const VENOM = "#F5C400";
const DANGER = "#FF3B1F";
const PANEL = "#0f0f11";
const PANEL_LIGHT = "#1a1a1c";
const GLASS = "#07070a";

function lerpVec(v: THREE.Vector3, target: [number, number, number], t: number) {
  v.set(target[0] * t, target[1] * t, target[2] * t);
}

export default function CarModel({ progressRef, idleSpin = false, scale = 1 }: Props) {
  const root = useRef<THREE.Group>(null);
  const chassis = useRef<THREE.Group>(null);
  const powertrain = useRef<THREE.Group>(null);
  const battery = useRef<THREE.Group>(null);
  const aero = useRef<THREE.Group>(null);
  const wheelFL = useRef<THREE.Group>(null);
  const wheelFR = useRef<THREE.Group>(null);
  const wheelRL = useRef<THREE.Group>(null);
  const wheelRR = useRef<THREE.Group>(null);

  const tmp = useRef(new THREE.Vector3()).current;
  const clock = useRef(0);

  useFrame((_, delta) => {
    clock.current += delta;
    const p = progressRef.current;
    const spin = idleSpin ? clock.current * 0.18 : 0;

    if (root.current) {
      root.current.rotation.y = p.rotation + spin;
      root.current.position.y = idleSpin ? Math.sin(clock.current * 0.9) * 0.03 : 0;
    }
    if (chassis.current) {
      const s = 1 - p.explode * 0.18;
      chassis.current.scale.setScalar(s);
    }
    if (powertrain.current) {
      lerpVec(tmp, [0, 0.35, 1.25], p.explode);
      powertrain.current.position.set(tmp.x, tmp.y, tmp.z);
      powertrain.current.rotation.x = p.explode * 0.1;
    }
    if (battery.current) {
      lerpVec(tmp, [0, -0.55, 0.1], p.explode);
      battery.current.position.set(tmp.x, tmp.y, tmp.z);
    }
    if (aero.current) {
      lerpVec(tmp, [0, 0.55, 1.5], p.explode);
      aero.current.position.set(tmp.x, tmp.y, tmp.z);
    }
    const wheelOffsets: [React.RefObject<THREE.Group | null>, [number, number, number]][] = [
      [wheelFL, [0.35, -0.1, 0.4]],
      [wheelFR, [-0.35, -0.1, 0.4]],
      [wheelRL, [0.35, -0.1, -0.4]],
      [wheelRR, [-0.35, -0.1, -0.4]],
    ];
    for (const [ref, dir] of wheelOffsets) {
      if (ref.current) {
        lerpVec(tmp, dir, p.explode);
        ref.current.position.set(tmp.x, tmp.y, tmp.z);
      }
    }
  });

  return (
    <group ref={root} scale={scale} dispose={null}>
      {/* ===== CHASSIS / MONOCOQUE (core body, does not fly out — it just condenses) ===== */}
      <group ref={chassis}>
        {/* lower tub */}
        <RoundedBox args={[1.75, 0.42, 4.1]} radius={0.09} smoothness={4} position={[0, 0, 0]} castShadow receiveShadow>
          <meshPhysicalMaterial color={PANEL} metalness={0.75} roughness={0.28} clearcoat={0.6} />
        </RoundedBox>

        {/* nose wedge */}
        <RoundedBox
          args={[1.55, 0.3, 1.15]}
          radius={0.08}
          smoothness={4}
          position={[0, 0.02, 1.85]}
          rotation={[0.22, 0, 0]}
          castShadow
        >
          <meshPhysicalMaterial color={PANEL_LIGHT} metalness={0.8} roughness={0.22} clearcoat={0.7} />
        </RoundedBox>

        {/* cabin / canopy */}
        <RoundedBox args={[1.3, 0.34, 1.55]} radius={0.12} smoothness={4} position={[0, 0.36, -0.15]} castShadow>
          <meshPhysicalMaterial color={GLASS} metalness={0.2} roughness={0.05} transmission={0.55} thickness={0.4} />
        </RoundedBox>

        {/* rear deck */}
        <RoundedBox args={[1.65, 0.3, 1.0]} radius={0.07} smoothness={4} position={[0, 0.12, -1.65]} castShadow>
          <meshPhysicalMaterial color={PANEL} metalness={0.75} roughness={0.3} clearcoat={0.6} />
        </RoundedBox>

        {/* centerline hood stripe */}
        <mesh position={[0, 0.19, 1.6]}>
          <boxGeometry args={[0.16, 0.01, 1.6]} />
          <meshStandardMaterial color={VENOM} emissive={VENOM} emissiveIntensity={0.6} />
        </mesh>

        {/* side sill accents */}
        {[1, -1].map((side) => (
          <mesh key={side} position={[0.89 * side, -0.08, 0]}>
            <boxGeometry args={[0.04, 0.08, 3.2]} />
            <meshStandardMaterial color={VENOM} emissive={VENOM} emissiveIntensity={0.5} />
          </mesh>
        ))}

        {/* headlight strips */}
        {[1, -1].map((side) => (
          <mesh key={side} position={[0.62 * side, 0.12, 2.35]} rotation={[0, 0, 0]}>
            <boxGeometry args={[0.32, 0.05, 0.05]} />
            <meshStandardMaterial color={VENOM} emissive={VENOM} emissiveIntensity={1.4} toneMapped={false} />
          </mesh>
        ))}

        {/* taillight strip */}
        <mesh position={[0, 0.18, -2.08]}>
          <boxGeometry args={[1.5, 0.06, 0.04]} />
          <meshStandardMaterial color={DANGER} emissive={DANGER} emissiveIntensity={1.2} toneMapped={false} />
        </mesh>

        {/* front splitter */}
        <mesh position={[0, -0.24, 2.3]}>
          <boxGeometry args={[1.7, 0.03, 0.35]} />
          <meshStandardMaterial color="#050506" metalness={0.4} roughness={0.5} />
        </mesh>

        {/* rear diffuser fins */}
        {[-0.5, -0.17, 0.17, 0.5].map((x) => (
          <mesh key={x} position={[x, -0.2, -2.05]}>
            <boxGeometry args={[0.04, 0.12, 0.4]} />
            <meshStandardMaterial color="#050506" metalness={0.6} roughness={0.4} />
          </mesh>
        ))}
      </group>

      {/* ===== HYBRID POWERTRAIN (rear-mid engine block, explodes backward/up) ===== */}
      <group ref={powertrain} position={[0, 0.35, 1.25]}>
        <mesh castShadow>
          <boxGeometry args={[1.05, 0.5, 0.85]} />
          <meshStandardMaterial color="#2a2a2e" metalness={0.85} roughness={0.35} />
        </mesh>
        {[-0.3, 0, 0.3].map((z) => (
          <mesh key={z} position={[0, 0.32, z]}>
            <cylinderGeometry args={[0.08, 0.08, 0.14, 16]} />
            <meshStandardMaterial color={VENOM} emissive={VENOM} emissiveIntensity={0.4} metalness={0.6} roughness={0.3} />
          </mesh>
        ))}
      </group>

      {/* ===== BATTERY PACK (flat pack under cabin, explodes down) ===== */}
      <group ref={battery} position={[0, -0.55, 0.1]}>
        <RoundedBox args={[1.5, 0.14, 2.2]} radius={0.04} smoothness={3} castShadow>
          <meshStandardMaterial color="#151517" metalness={0.5} roughness={0.4} />
        </RoundedBox>
        <mesh position={[0, 0.08, 0]}>
          <boxGeometry args={[1.42, 0.01, 2.1]} />
          <meshStandardMaterial color={VENOM} emissive={VENOM} emissiveIntensity={0.9} toneMapped={false} />
        </mesh>
      </group>

      {/* ===== ACTIVE AERO (rear wing, explodes up/back) ===== */}
      <group ref={aero} position={[0, 0.55, 1.5]}>
        {[0.55, -0.55].map((x) => (
          <mesh key={x} position={[x, -0.22, 0]}>
            <boxGeometry args={[0.06, 0.4, 0.1]} />
            <meshStandardMaterial color="#0a0a0b" metalness={0.6} roughness={0.4} />
          </mesh>
        ))}
        <mesh rotation={[0.35, 0, 0]}>
          <boxGeometry args={[1.5, 0.04, 0.42]} />
          <meshStandardMaterial color="#0a0a0b" metalness={0.7} roughness={0.3} />
        </mesh>
        <mesh position={[0, 0, 0]} rotation={[0.35, 0, 0]}>
          <boxGeometry args={[1.5, 0.045, 0.04]} />
          <meshStandardMaterial color={VENOM} emissive={VENOM} emissiveIntensity={0.6} />
        </mesh>
      </group>

      {/* ===== CARBON-CERAMIC BRAKES (wheel + rotor assemblies, explode outward) ===== */}
      {[
        { ref: wheelFL, pos: [0.35, -0.1, 0.4] as [number, number, number] },
        { ref: wheelFR, pos: [-0.35, -0.1, 0.4] as [number, number, number] },
        { ref: wheelRL, pos: [0.35, -0.1, -0.4] as [number, number, number] },
        { ref: wheelRR, pos: [-0.35, -0.1, -0.4] as [number, number, number] },
      ].map((w, i) => (
        <group key={i} ref={w.ref} position={w.pos}>
          <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
            <cylinderGeometry args={[0.34, 0.34, 0.22, 24]} />
            <meshStandardMaterial color="#0a0a0a" metalness={0.2} roughness={0.85} />
          </mesh>
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.2, 0.2, 0.23, 6]} />
            <meshStandardMaterial color={VENOM} metalness={0.9} roughness={0.25} />
          </mesh>
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.24, 0.24, 0.24, 24]} />
            <meshStandardMaterial color={DANGER} emissive={DANGER} emissiveIntensity={0.25} metalness={0.4} roughness={0.5} />
          </mesh>
        </group>
      ))}
    </group>
  );
}
