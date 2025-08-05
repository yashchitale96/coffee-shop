import { Canvas } from '@react-three/fiber';
import { PresentationControls, Environment } from '@react-three/drei';
import { Suspense, useState } from 'react';
import React from 'react';
import CoffeeModel from './CoffeeModel';
import { useScroll } from 'framer-motion';

// Error boundary component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

export default function Scene() {
  const { scrollYProgress } = useScroll();
  const [canvasError, setCanvasError] = useState(false);

  // Fallback content when 3D rendering fails
  const fallbackContent = (
    <div className="h-screen w-full fixed top-0 left-0 flex items-center justify-center pointer-events-none">
      <div className="bg-cream/50 p-8 rounded-lg backdrop-blur-md">
        <h3 className="font-serif text-2xl text-mocha">Artisan Coffee Experience</h3>
        <p className="text-charcoal">Scroll to explore our story</p>
      </div>
    </div>
  );

  return (
    <div className="h-screen w-full fixed top-0 left-0 pointer-events-none">
      {!canvasError ? (
        <ErrorBoundary fallback={fallbackContent}>
          <Canvas
            camera={{ position: [0, 0, 5], fov: 45 }}
            shadows
            onCreated={(state) => {
              // Add error handling for WebGL context loss
              const canvas = state.gl.domElement;
              canvas.addEventListener('webglcontextlost', () => {
                setCanvasError(true);
              });
            }}
          >
            <Suspense fallback={null}>
              <PresentationControls 
                global
                config={{ mass: 2, tension: 500 }}
                snap={{ mass: 4, tension: 1500 }}
                rotation={[0, 0, 0]}
                polar={[-Math.PI / 3, Math.PI / 3]}
                azimuth={[-Math.PI / 1.4, Math.PI / 2]}
              >
                <CoffeeModel scrollYProgress={scrollYProgress} />
              </PresentationControls>
              <Environment preset="city" />
            </Suspense>
            <ambientLight intensity={0.5} />
            <directionalLight 
              position={[10, 10, 5]} 
              intensity={1} 
              castShadow 
              shadow-mapSize={[1024, 1024]} 
            />
          </Canvas>
        </ErrorBoundary>
      ) : fallbackContent}
    </div>
  );
}
