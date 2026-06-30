"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";

function NetworkMesh() {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);

  // Generate coordinates for random points distributed on a sphere shape
  const { positions, lineIndices } = useMemo(() => {
    const count = 70;
    const pos = new Float32Array(count * 3);
    const radius = 1.0;

    for (let i = 0; i < count; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;
    }

    // Identify close-proximity nodes and connect them with lines
    const indices: number[] = [];
    const maxDist = 0.55;
    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const dx = pos[i * 3] - pos[j * 3];
        const dy = pos[i * 3 + 1] - pos[j * 3 + 1];
        const dz = pos[i * 3 + 2] - pos[j * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (dist < maxDist) {
          indices.push(i, j);
        }
      }
    }

    return { positions: pos, lineIndices: new Uint16Array(indices) };
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (pointsRef.current) {
      pointsRef.current.rotation.y = time * 0.08;
      pointsRef.current.rotation.x = time * 0.04;
    }
    if (linesRef.current) {
      linesRef.current.rotation.y = time * 0.08;
      linesRef.current.rotation.x = time * 0.04;
    }
  });

  return (
    <group>
      {/* Network connection paths */}
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
          <bufferAttribute
            attach="index"
            args={[lineIndices, 1]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#00f5c4"
          transparent
          opacity={0.16}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>

      {/* Network vertex points */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#00f5c4"
          size={0.03}
          transparent
          opacity={0.75}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}

export default function Experience3D() {
  return (
    <div style={{ width: "100%", height: "480px" }} className="section-3d-canvas">
      <Canvas camera={{ position: [0, 0, 3.9], fov: 45 }} style={{ background: "transparent" }}>
        <ambientLight intensity={1.0} />
        <NetworkMesh />
      </Canvas>
    </div>
  );
}
