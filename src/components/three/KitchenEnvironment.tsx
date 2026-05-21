import { Environment } from '@react-three/drei';

export default function KitchenEnvironment() {
  return (
    <>
      <ambientLight intensity={0.3} color="#fff5e6" />
      <directionalLight
        position={[5, 8, 3]}
        intensity={2}
        color="#fff8f0"
      />
      <directionalLight
        position={[-3, 4, -2]}
        intensity={0.5}
        color="#F4A261"
      />
      <pointLight position={[0, -3, 2]} intensity={0.3} color="#E63946" />
      <spotLight
        position={[0, 6, 4]}
        angle={0.5}
        penumbra={0.8}
        intensity={1}
        color="#fff"
      />
      <Environment preset="studio" environmentIntensity={0.5} />
      <fog attach="fog" args={['#1a3340', 10, 30]} />
    </>
  );
}
