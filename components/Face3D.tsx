"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { Suspense, useEffect, useRef, useState } from "react";
import * as THREE from "three";

function LoadNotifier({ onLoad }: { onLoad: () => void }) {
  useEffect(() => {
    onLoad();
  }, [onLoad]);
  return null;
}

function ParticleFace({ isHovered }: { isHovered: React.RefObject<boolean> }) {
  const { scene } = useGLTF("/face_mesh.glb");

  const pointsRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.PointsMaterial>(null);

  const meshes: THREE.Mesh[] = [];

  scene.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      meshes.push(child);
    }
  });

  useFrame(({ pointer }) => {
    if (!pointsRef.current) return;

    const targetX = isHovered.current ? pointer.x : 0;
    const targetY = isHovered.current ? pointer.y : 0;

    const elapsed = performance.now() * 0.001;
    pointsRef.current.rotation.x = THREE.MathUtils.lerp(
      pointsRef.current.rotation.x,
      Math.PI / 2 + targetY * 0.14 + Math.sin(elapsed * 0.8) * 0.025,
      0.06,
    );
    pointsRef.current.rotation.y = THREE.MathUtils.lerp(
      pointsRef.current.rotation.y,
      Math.PI + targetX * 0.28,
      0.06,
    );
    pointsRef.current.rotation.z = THREE.MathUtils.lerp(
      pointsRef.current.rotation.z,
      -Math.PI + targetX * 0.05,
      0.04,
    );

    if (materialRef.current) {
      const energy = Math.min(1, Math.abs(pointer.x) + Math.abs(pointer.y));
      materialRef.current.opacity = THREE.MathUtils.lerp(
        materialRef.current.opacity,
        0.78 + energy * 0.2,
        0.08,
      );
      materialRef.current.size = THREE.MathUtils.lerp(
        materialRef.current.size,
        0.026 + energy * 0.012,
        0.08,
      );
    }
  });

  const faceMesh = meshes[0];

  if (!faceMesh) return null;

  const geometry = faceMesh.geometry;

  return (
    <points
      ref={pointsRef}
      geometry={geometry}
      scale={12}
      rotation={[Math.PI / 2, Math.PI, -Math.PI]}
    >
      <pointsMaterial
        ref={materialRef}
        color="#00f5c4"
        size={0.03}
        sizeAttenuation
        transparent
        opacity={0.9}
      />
    </points>
  );
}

function isWebGLAvailable() {
  if (typeof window === "undefined") return true;
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch (e) {
    return false;
  }
}

export default function Face3D() {
  const isHovered = useRef(false);
  const [hasWebGL, setHasWebGL] = useState(true);

  useEffect(() => {
    const available = isWebGLAvailable();
    setHasWebGL(available);
    if (!available) {
      // Trigger loader exit event if WebGL is missing
      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("model-loaded"));
      }
    }
  }, []);

  const handleModelLoaded = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("model-loaded"));
    }
  };

  if (!hasWebGL) {
    return (
      <div className="face-fallback-wrap">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src="/profile2.png" 
          alt="Sanusha Senarathna" 
          className="face-fallback-img"
        />
      </div>
    );
  }

  return (
    <div
      className="face-canvas-wrap w-[280px] h-[280px] sm:w-[360px] sm:h-[360px] md:w-[450px] md:h-[450px] lg:w-[500px] lg:h-[500px]"
      onPointerEnter={() => {
        isHovered.current = true;
      }}
      onPointerLeave={() => {
        isHovered.current = false;
      }}
    >

      <Canvas camera={{ position: [0, 0, 3], fov: 45 }}>
        <ambientLight intensity={1.5} />
        <directionalLight
          position={[5, 5, 5]}
          intensity={2}
        />

        <Suspense fallback={null}>
          <ParticleFace isHovered={isHovered} />
          <LoadNotifier onLoad={handleModelLoaded} />
        </Suspense>
      </Canvas>
    </div>
  );
}
