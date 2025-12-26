"use client";
import React, { Suspense, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Sphere, Torus, Box } from "@react-three/drei";
import { useMotionValue, useTransform } from "framer-motion";

const ScrollReactiveModel = ({ scrollYProgress }) => {
  const groupRef = useRef();

  // Link scrollYProgress to transforms
  const rotationY = useTransform(scrollYProgress, [0, 1], [0, Math.PI * 2]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.3, 0.8]);
  const posY = useTransform(scrollYProgress, [0, 1], [0, 2]);

  // Update 3D model per frame
  useFrame(() => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = rotationY.get();
    groupRef.current.scale.set(scale.get(), scale.get(), scale.get());
    groupRef.current.position.y = posY.get();
  });

  return (
    <group ref={groupRef}>
      {/* Core sphere */}
      <Sphere args={[1, 64, 64]}>
        <meshStandardMaterial
          color="#4f46e5"
          emissive="#6366f1"
          roughness={0.3}
          metalness={0.7}
        />
      </Sphere>

      {/* Rotating rings */}
      <Torus args={[1.5, 0.02, 16, 100]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color="#10b981" emissive="#06b6d4" />
      </Torus>
      <Torus args={[1.7, 0.02, 16, 100]} rotation={[Math.PI / 2.5, 0, 0]}>
        <meshStandardMaterial color="#f97316" emissive="#fbbf24" />
      </Torus>

      {/* Floating cubes */}
      {[...Array(6)].map((_, i) => (
        <Box
          key={i}
          args={[0.1, 0.1, 0.1]}
          position={[Math.sin(i) * 2, i * 0.3, Math.cos(i) * 1.5]}
        >
          <meshStandardMaterial color={`hsl(${i * 60}, 80%, 50%)`} />
        </Box>
      ))}
    </group>
  );
};

export const Interactive3DSection = () => {
  const scrollYProgress = useMotionValue(0);

  // Update scrollYProgress
  React.useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      scrollYProgress.set(scrollTop / docHeight);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollYProgress]);

  return (
    <div className="w-full h-screen bg-transparent">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <Suspense fallback={null}>
          <ScrollReactiveModel scrollYProgress={scrollYProgress} />
        </Suspense>
        <OrbitControls enablePan={false} enableZoom={false} enableRotate={false} />
      </Canvas>
    </div>
  );
};
