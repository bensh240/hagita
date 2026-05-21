import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, Environment, ContactShadows } from '@react-three/drei';
import type { Group } from 'three';

interface TableSceneProps {
  scrollProgress: React.RefObject<number>;
  isMobile: boolean;
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function smoothstep(t: number) {
  t = Math.max(0, Math.min(1, t));
  return t * t * (3 - 2 * t);
}

function AvocadoModel({ scrollProgress }: { scrollProgress: React.RefObject<number> }) {
  const { scene } = useGLTF('/models/avocado.glb');
  const cloned = useMemo(() => scene.clone(true), [scene]);
  const ref = useRef<Group>(null);

  useFrame(() => {
    if (!ref.current) return;
    const t = smoothstep(scrollProgress.current ?? 0);

    ref.current.position.x = lerp(-2.8, -0.5, t);
    ref.current.position.y = lerp(-0.3, 0.3, t) + Math.sin(t * Math.PI) * 1.2;
    ref.current.position.z = lerp(0.8, 0.2, t);

    ref.current.rotation.y = lerp(0.3, Math.PI * 2.3, t);
    ref.current.rotation.x = Math.sin(t * Math.PI) * 0.25;

    const s = lerp(8, 5, t);
    ref.current.scale.setScalar(s);
  });

  return (
    <group ref={ref}>
      <primitive object={cloned} />
    </group>
  );
}

function FishModel({ scrollProgress }: { scrollProgress: React.RefObject<number> }) {
  const { scene } = useGLTF('/models/fish.glb');
  const cloned = useMemo(() => scene.clone(true), [scene]);
  const ref = useRef<Group>(null);

  useFrame(() => {
    if (!ref.current) return;
    const t = smoothstep(scrollProgress.current ?? 0);

    ref.current.position.x = lerp(2.8, 0.5, t);
    ref.current.position.y = lerp(-0.2, 0, t) + Math.sin(t * Math.PI) * 1.5;
    ref.current.position.z = lerp(-0.8, -0.2, t);

    ref.current.rotation.y = lerp(-0.5, -Math.PI * 1.8, t);
    ref.current.rotation.z = Math.sin(t * Math.PI) * 0.15;

    const s = lerp(1.2, 0.7, t);
    ref.current.scale.setScalar(s);
  });

  return (
    <group ref={ref}>
      <primitive object={cloned} />
    </group>
  );
}

function DishModel({ scrollProgress }: { scrollProgress: React.RefObject<number> }) {
  const { scene } = useGLTF('/models/dish.glb');
  const cloned = useMemo(() => scene.clone(true), [scene]);
  const ref = useRef<Group>(null);

  useFrame(() => {
    if (!ref.current) return;
    const t = smoothstep(scrollProgress.current ?? 0);

    ref.current.position.set(0, lerp(-2.5, -0.8, t), 0);
    ref.current.rotation.y = t * Math.PI * 0.5;

    const s = lerp(0, 2.5, t);
    ref.current.scale.setScalar(s);
    ref.current.visible = t > 0.05;
  });

  return (
    <group ref={ref}>
      <primitive object={cloned} />
    </group>
  );
}

export default function TableScene({ scrollProgress, isMobile }: TableSceneProps) {
  return (
    <>
      <Environment preset="city" environmentIntensity={0.35} />

      <ambientLight intensity={0.25} color="#c4d4e0" />
      <directionalLight
        position={[5, 8, 3]}
        intensity={3}
        color="#fff5ee"
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-bias={-0.0001}
      />
      <directionalLight position={[-4, 3, -2]} intensity={0.6} color="#F4A261" />
      <spotLight position={[0, 10, 4]} angle={0.3} penumbra={1} intensity={1.8} color="#fff" castShadow />

      <AvocadoModel scrollProgress={scrollProgress} />
      {!isMobile && <FishModel scrollProgress={scrollProgress} />}
      <DishModel scrollProgress={scrollProgress} />

      <ContactShadows
        position={[0, -1.5, 0]}
        opacity={0.4}
        scale={12}
        blur={2.5}
        far={4}
      />
    </>
  );
}

useGLTF.preload('/models/avocado.glb');
useGLTF.preload('/models/fish.glb');
useGLTF.preload('/models/dish.glb');
