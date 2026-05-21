import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import type { Group } from 'three';

interface FoodModelProps {
  type: 'tomato' | 'avocado' | 'sushi' | 'croissant' | 'lemon' | 'pepper';
  position: [number, number, number];
  scale?: number;
  scrollProgress: React.RefObject<number>;
}

function Tomato() {
  const bodyGeo = useMemo(() => {
    const geo = new THREE.SphereGeometry(0.45, 64, 64);
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const y = pos.getY(i);
      const factor = 1 - Math.pow(y / 0.45, 2) * 0.15;
      pos.setX(i, pos.getX(i) * factor);
      pos.setZ(i, pos.getZ(i) * factor);
      if (y > 0.3) {
        pos.setY(i, y - (y - 0.3) * 0.3);
      }
    }
    geo.computeVertexNormals();
    return geo;
  }, []);

  return (
    <group>
      <mesh geometry={bodyGeo}>
        <meshPhysicalMaterial
          color="#cc2936"
          roughness={0.35}
          metalness={0.0}
          clearcoat={0.8}
          clearcoatRoughness={0.15}
          sheen={0.3}
          sheenColor="#ff6b6b"
        />
      </mesh>
      <mesh position={[0, 0.42, 0]} rotation={[0.1, 0, 0.15]}>
        <cylinderGeometry args={[0.015, 0.025, 0.18, 8]} />
        <meshPhysicalMaterial color="#3d6b35" roughness={0.7} />
      </mesh>
      {[0, 1, 2, 3, 4].map((i) => (
        <mesh
          key={i}
          position={[
            Math.cos((i / 5) * Math.PI * 2) * 0.08,
            0.43,
            Math.sin((i / 5) * Math.PI * 2) * 0.08,
          ]}
          rotation={[0.5 - Math.random() * 0.3, (i / 5) * Math.PI * 2, 0.3]}
        >
          <planeGeometry args={[0.12, 0.06]} />
          <meshPhysicalMaterial
            color="#4a8c3f"
            roughness={0.5}
            side={THREE.DoubleSide}
            transparent
            opacity={0.9}
          />
        </mesh>
      ))}
    </group>
  );
}

function AvocadoModel() {
  const { scene } = useGLTF('/models/avocado.glb');
  const cloned = useMemo(() => scene.clone(true), [scene]);
  return <primitive object={cloned} scale={12} />;
}

function SushiRoll() {
  return (
    <group rotation={[Math.PI / 2, 0, 0]}>
      <mesh>
        <cylinderGeometry args={[0.38, 0.38, 0.45, 64]} />
        <meshPhysicalMaterial color="#1a1a1a" roughness={0.9} metalness={0} />
      </mesh>
      <mesh position={[0, 0.005, 0]}>
        <cylinderGeometry args={[0.34, 0.34, 0.46, 64]} />
        <meshPhysicalMaterial
          color="#f5f0e1"
          roughness={0.6}
          clearcoat={0.2}
          clearcoatRoughness={0.8}
        />
      </mesh>
      <mesh position={[0.08, 0.01, 0]}>
        <cylinderGeometry args={[0.12, 0.12, 0.47, 32]} />
        <meshPhysicalMaterial
          color="#e8734a"
          roughness={0.4}
          clearcoat={0.6}
          clearcoatRoughness={0.2}
          sheen={0.4}
          sheenColor="#ff9a76"
        />
      </mesh>
      <mesh position={[-0.06, 0.01, 0.08]}>
        <cylinderGeometry args={[0.06, 0.06, 0.47, 16]} />
        <meshPhysicalMaterial color="#2d8c4e" roughness={0.5} />
      </mesh>
      <mesh position={[-0.06, 0.01, -0.06]}>
        <cylinderGeometry args={[0.04, 0.04, 0.47, 16]} />
        <meshPhysicalMaterial color="#f5c542" roughness={0.5} />
      </mesh>
    </group>
  );
}

function Croissant() {
  const geo = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.5, 0, 0),
      new THREE.Vector3(-0.3, 0.15, 0),
      new THREE.Vector3(0, 0.22, 0),
      new THREE.Vector3(0.3, 0.15, 0),
      new THREE.Vector3(0.5, 0, 0),
    ]);
    return new THREE.TubeGeometry(curve, 40, 0.12, 16, false);
  }, []);

  return (
    <group>
      <mesh geometry={geo}>
        <meshPhysicalMaterial
          color="#c8903c"
          roughness={0.5}
          metalness={0.0}
          clearcoat={0.4}
          clearcoatRoughness={0.3}
          sheen={0.6}
          sheenColor="#e8b95c"
        />
      </mesh>
      <mesh geometry={geo} scale={[0.97, 0.97, 0.97]}>
        <meshPhysicalMaterial
          color="#d4a04a"
          roughness={0.6}
          transparent
          opacity={0.5}
        />
      </mesh>
    </group>
  );
}

function Lemon() {
  const geo = useMemo(() => {
    const g = new THREE.SphereGeometry(0.35, 64, 64);
    const pos = g.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const z = pos.getZ(i);
      const stretch = 1 + Math.abs(y) * 0.6;
      pos.setY(i, y * stretch);
      const squeeze = 1 - Math.abs(y / 0.35) * 0.15;
      pos.setX(i, x * squeeze);
      pos.setZ(i, z * squeeze);
    }
    g.computeVertexNormals();
    return g;
  }, []);

  return (
    <mesh geometry={geo}>
      <meshPhysicalMaterial
        color="#f0d020"
        roughness={0.45}
        metalness={0.0}
        clearcoat={0.6}
        clearcoatRoughness={0.25}
        sheen={0.3}
        sheenColor="#fff176"
      />
    </mesh>
  );
}

function BellPepper() {
  const geo = useMemo(() => {
    const g = new THREE.SphereGeometry(0.4, 64, 64);
    const pos = g.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const z = pos.getZ(i);
      const angle = Math.atan2(z, x);
      const lobes = 1 + Math.sin(angle * 4) * 0.12;
      pos.setX(i, x * lobes);
      pos.setZ(i, z * lobes);
      if (y > 0.25) {
        const t = (y - 0.25) / 0.15;
        pos.setX(i, pos.getX(i) * (1 - t * 0.5));
        pos.setZ(i, pos.getZ(i) * (1 - t * 0.5));
      }
    }
    g.computeVertexNormals();
    return g;
  }, []);

  return (
    <group>
      <mesh geometry={geo}>
        <meshPhysicalMaterial
          color="#d42c2c"
          roughness={0.3}
          metalness={0.0}
          clearcoat={0.9}
          clearcoatRoughness={0.1}
          sheen={0.5}
          sheenColor="#ff5252"
        />
      </mesh>
      <mesh position={[0, 0.42, 0]}>
        <cylinderGeometry args={[0.02, 0.03, 0.2, 8]} />
        <meshPhysicalMaterial color="#2e7d32" roughness={0.6} />
      </mesh>
    </group>
  );
}

const foodComponents: Record<string, React.FC> = {
  tomato: Tomato,
  avocado: AvocadoModel,
  sushi: SushiRoll,
  croissant: Croissant,
  lemon: Lemon,
  pepper: BellPepper,
};

export default function FoodModel({ type, position, scale = 1, scrollProgress }: FoodModelProps) {
  const groupRef = useRef<Group>(null);
  const initialPos = useRef(position);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    const progress = scrollProgress.current ?? 0;

    const scatter = progress * 4;
    const dir = [
      initialPos.current[0] > 0 ? 1 : -1,
      initialPos.current[1] > 0 ? 1 : -0.5,
      -1,
    ];

    groupRef.current.position.x = initialPos.current[0] + dir[0] * scatter;
    groupRef.current.position.y = initialPos.current[1] + dir[1] * scatter * 0.5;
    groupRef.current.position.z = initialPos.current[2] + dir[2] * scatter;

    groupRef.current.rotation.x = Math.sin(t * 0.3) * 0.05 + progress * 0.3;
    groupRef.current.rotation.y = t * 0.15;
    groupRef.current.rotation.z = Math.cos(t * 0.2) * 0.03;
  });

  const FoodComponent = foodComponents[type];

  return (
    <Float speed={1.5} rotationIntensity={0.15} floatIntensity={0.4}>
      <group ref={groupRef} position={position} scale={scale}>
        <FoodComponent />
      </group>
    </Float>
  );
}

useGLTF.preload('/models/avocado.glb');
