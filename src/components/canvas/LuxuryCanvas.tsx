"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import { useState, useRef, useEffect } from "react";

function GoldenDust(props: any) {
  const ref = useRef<any>(null);
  const [positions] = useState(() => {
    const arr = new Float32Array(1500 * 3);
    for (let i = 0; i < arr.length; i += 3) {
      // Create random positions in a cylinder or flat box spanning the view
      arr[i] = (Math.random() - 0.5) * 4;
      arr[i + 1] = (Math.random() - 0.5) * 4;
      arr[i + 2] = (Math.random() - 0.5) * 2;
    }
    return arr;
  });

  useFrame((state, delta) => {
    if (ref.current) {
      // Gentle floating rotation
      ref.current.rotation.x += delta * 0.02;
      ref.current.rotation.y += delta * 0.03;
      
      // Let positions drift slightly down
      const pos = ref.current.geometry.attributes.position.array;
      for (let i = 1; i < pos.length; i += 3) {
        pos[i] -= delta * 0.02; // drift downwards
        if (pos[i] < -2) {
          pos[i] = 2; // reset to top
        }
      }
      ref.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false} {...props}>
      <PointMaterial
        transparent
        color="#C8A96A"
        size={0.015}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.65}
      />
    </Points>
  );
}

export default function LuxuryCanvas() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
      <Canvas camera={{ position: [0, 0, 1.5], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 2, 2]} intensity={1} color="#C8A96A" />
        <GoldenDust />
      </Canvas>
    </div>
  );
}
