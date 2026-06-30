"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";

interface Branch {
  start: THREE.Vector3;
  end: THREE.Vector3;
  level: number;
}

function DecisionTreeMesh() {
  const groupRef = useRef<THREE.Group>(null);
  const pointsRef = useRef<THREE.Points>(null);

  // Generate recursive branching tree matching Decision Tree / Machine Learning structure
  const { linePositions, leafPositions } = useMemo(() => {
    const branches: Branch[] = [];
    const leaves: THREE.Vector3[] = [];

    function generateBranch(
      start: THREE.Vector3,
      direction: THREE.Vector3,
      length: number,
      level: number,
      maxLevel: number
    ) {
      const end = new THREE.Vector3().addVectors(
        start,
        new THREE.Vector3().copy(direction).multiplyScalar(length)
      );
      branches.push({ start, end, level });

      if (level === maxLevel) {
        leaves.push(end);
        return;
      }

      // Branching factor of 3 for 3D fullness
      const nextLevel = level + 1;
      const nextLength = length * 0.72; // Decreasing branch length
      const subBranches = 3;

      for (let i = 0; i < subBranches; i++) {
        const nextDir = direction.clone();
        
        // Define branch angles to look organic and structured in 3D
        const angle = 0.42; // Radians branching angle
        const angleOffset = (i * 2 * Math.PI) / subBranches;
        
        // Rotate around orthogonal axis
        const rotAxis = new THREE.Vector3(
          Math.cos(angleOffset),
          0,
          Math.sin(angleOffset)
        ).normalize();
        
        nextDir.applyAxisAngle(rotAxis, angle).normalize();

        generateBranch(end, nextDir, nextLength, nextLevel, maxLevel);
      }
    }

    // Set root node coordinate offset and upward growth direction
    const startPos = new THREE.Vector3(0, -0.9, 0);
    const initDir = new THREE.Vector3(0, 1, 0);
    generateBranch(startPos, initDir, 0.65, 0, 4);

    // Convert branches to line segment positions
    const lPos = new Float32Array(branches.length * 2 * 3);
    branches.forEach((b, idx) => {
      const startIdx = idx * 6;
      lPos[startIdx] = b.start.x;
      lPos[startIdx + 1] = b.start.y;
      lPos[startIdx + 2] = b.start.z;

      lPos[startIdx + 3] = b.end.x;
      lPos[startIdx + 4] = b.end.y;
      lPos[startIdx + 5] = b.end.z;
    });

    // Convert leaves to point positions
    const pPos = new Float32Array(leaves.length * 3);
    leaves.forEach((l, idx) => {
      pPos[idx * 3] = l.x;
      pPos[idx * 3 + 1] = l.y;
      pPos[idx * 3 + 2] = l.z;
    });

    return { linePositions: lPos, leafPositions: pPos };
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.12; // Slow, elegant rotation
      // Soft organic breeze sway
      groupRef.current.rotation.z = Math.sin(time * 0.6) * 0.03;
    }
    if (pointsRef.current) {
      // Dynamic pulsing effect on the decision node points
      const material = pointsRef.current.material as THREE.PointsMaterial;
      if (material) {
        material.size = 0.03 + Math.sin(time * 3.0) * 0.008;
      }
    }
  });

  return (
    <group ref={groupRef}>
      {/* ML Decision Tree Branching Lines */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#0a99ff"
          transparent
          opacity={0.35}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>

      {/* ML Decision Leaf Nodes */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[leafPositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#00f5c4"
          size={0.03}
          transparent
          opacity={0.85}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}

export default function Education3D() {
  return (
    <div style={{ width: "100%", height: "480px" }} className="section-3d-canvas">
      <Canvas camera={{ position: [0, 0, 3.7], fov: 45 }} style={{ background: "transparent" }}>
        <ambientLight intensity={1.0} />
        <DecisionTreeMesh />
      </Canvas>
    </div>
  );
}
