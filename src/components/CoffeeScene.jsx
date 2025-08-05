import { Canvas } from '@react-three/fiber';
import { Suspense, useEffect, useState } from 'react';
import { 
  AdaptiveDpr, 
  AdaptiveEvents, 
  OrbitControls, 
  BakeShadows,
  PerspectiveCamera
} from '@react-three/drei';
import { 
  EffectComposer, 
  Bloom,
  ChromaticAberration,
  Vignette
} from '@react-three/postprocessing';
import CoffeeCup3D from './CoffeeCup3D';
import { ErrorBoundary } from 'react-error-boundary';

export default function CoffeeScene({ scrollYProgress }) {
  const [isMobile, setIsMobile] = useState(false);

  // Check if we're on mobile for responsive adjustments
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="w-full h-full absolute inset-0 z-10 pointer-events-none">
      <ErrorBoundary
        fallback={
          <div className="flex items-center justify-center h-full">
            <div className="text-mocha text-center bg-cream/20 backdrop-blur-sm p-4 rounded-lg">
              Something went wrong with the 3D coffee cup rendering.
            </div>
          </div>
        }
      >
        <Canvas 
          camera={{ 
            position: isMobile ? [0, 0, 6] : [0, 0, 5], 
            fov: isMobile ? 50 : 45
          }} 
          shadows
          dpr={[1, 2]}
          style={{ 
            pointerEvents: 'auto', // Enable interaction with the 3D object
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            mixBlendMode: 'normal'
          }}
          performance={{ min: 0.5 }}
        >
          <Suspense fallback={null}>
            {/* Enhanced camera setup with better positioning */}
            <PerspectiveCamera 
              makeDefault 
              position={isMobile ? [0, 0.5, 5] : [-1.8, 0.8, 3.5]} 
              fov={isMobile ? 50 : 30}
              near={0.1}
              far={100}
            />
            
            <CoffeeCup3D scrollYProgress={scrollYProgress} />
            
            {/* Enhanced controls with better default rotation */}
            <OrbitControls 
              enablePan={false}
              enableZoom={false}
              minPolarAngle={Math.PI / 6}
              maxPolarAngle={Math.PI / 2.2}
              minAzimuthAngle={-Math.PI / 4}
              maxAzimuthAngle={Math.PI / 3}
              enableDamping={true}
              dampingFactor={0.05}
            />
            
            {/* Post processing effects for photorealistic rendering */}
            <EffectComposer>
              <Bloom 
                intensity={0.15} 
                luminanceThreshold={0.8} 
                luminanceSmoothing={0.9} 
              />
              <ChromaticAberration 
                offset={[0.0005, 0.0005]} 
              />
              <Vignette 
                offset={0.1} 
                darkness={0.3} 
                eskil={false} 
              />
            </EffectComposer>
            
            {/* Performance optimizations */}
            <BakeShadows />
            <AdaptiveDpr pixelated />
            <AdaptiveEvents />
          </Suspense>
        </Canvas>
      </ErrorBoundary>
      
      {/* Optional loading indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-sm text-mocha/50 font-light italic">
        Hover to interact with cup
      </div>
    </div>
  );
}
