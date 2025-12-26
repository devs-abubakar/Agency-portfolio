'use client';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Sphere } from '@react-three/drei';
import { useRef, useState } from 'react';

function Orb() {
  const mesh = useRef();
  const material = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame(({ mouse }) => {
    if (!mesh.current || !material.current) return;

    // Smooth rotation
    mesh.current.rotation.y += (mouse.x * 0.8 - mesh.current.rotation.y) * 0.08;
    mesh.current.rotation.x += (-mouse.y * 0.8 - mesh.current.rotation.x) * 0.08;

    // Distortion
    const targetDistort = hovered ? 0.6 : 0.35;
    material.current.distort += (targetDistort - material.current.distort) * 0.18;

    // 🔥 Glow (THIS is the missing part)
    const targetGlow = hovered ? 1.5 : 0.3;
    material.current.emissiveIntensity +=
      (targetGlow - material.current.emissiveIntensity) * 0.12;
  });

  return (
    <Sphere
      ref={mesh}
      args={[1.2, 64, 64]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <MeshDistortMaterial
        ref={material}
        color="#3b82f6"
        emissive="#3b82f6"
        emissiveIntensity={0.3}
        roughness={0.25}
        speed={1.5}
        distort={0.35}
        wireframe
      />
    </Sphere>
  );
}

export default function AiOrb() {
  return (
    <Canvas
      camera={{ position: [0, 0, 4] }}

      eventPrefix="client"
      style={{ width: '100%', height: '100%' }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[2, 2, 2]} intensity={1} />
      <Orb />
    </Canvas>
  );
}
