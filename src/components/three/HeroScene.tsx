import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Preload } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import * as THREE from 'three';
import TableScene from './TableScene';

interface HeroSceneProps {
  scrollProgress: React.RefObject<number>;
  isMobile: boolean;
}

export default function HeroScene({ scrollProgress, isMobile }: HeroSceneProps) {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 3, 7], fov: 35, near: 0.1, far: 50 }}
      dpr={isMobile ? [1, 1.5] : [1, 2]}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
      }}
      gl={{
        antialias: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.1,
      }}
    >
      <color attach="background" args={['#0f1e28']} />

      <Suspense fallback={null}>
        <TableScene scrollProgress={scrollProgress} isMobile={isMobile} />

        <EffectComposer multisampling={0}>
          <Bloom
            luminanceThreshold={0.7}
            luminanceSmoothing={0.4}
            intensity={0.4}
            mipmapBlur
          />
          <Vignette
            offset={0.3}
            darkness={0.7}
            blendFunction={BlendFunction.NORMAL}
          />
        </EffectComposer>

        <Preload all />
      </Suspense>
    </Canvas>
  );
}
