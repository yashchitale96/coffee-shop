import { useRef, useState, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { PresentationControls, Environment, Float, ContactShadows } from '@react-three/drei';
import { 
  MeshPhysicalMaterial, 
  DoubleSide, 
  RingGeometry 
} from 'three';
import { useTransform } from 'framer-motion';
import { createPlaceholderCoffeeModel } from '../utils/modelUtils';

// Steam particle component
const SteamParticle = ({ index, totalParticles }) => {
  const ref = useRef();
  
  // Calculate positions along a rising spiral pattern
  const t = index / (totalParticles - 1);
  const height = t * 1.8;
  const spiralWidth = 0.15 * (1 - t * 0.7); // Narrows as it rises
  const initialX = Math.sin(index * 1.2) * spiralWidth;
  const initialZ = Math.cos(index * 1.2) * spiralWidth;
  
  // Particle gets smaller and more transparent as it rises
  const size = 0.18 - t * 0.12;
  const opacity = 0.5 - t * 0.4;
  
  useFrame(({ clock }) => {
    const time = clock.getElapsedTime() + index;
    
    // Add subtle movement to each particle
    ref.current.position.y = height + Math.sin(time * 0.5) * 0.05;
    ref.current.position.x = initialX + Math.sin(time * 0.3) * 0.02;
    ref.current.position.z = initialZ + Math.cos(time * 0.4) * 0.02;
    
    // Subtle scale pulsing
    const scale = size * (1 + Math.sin(time * 0.8) * 0.1);
    ref.current.scale.set(scale, scale * 1.5, scale);
    
    // Fade in/out effect
    if (ref.current.material) {
      ref.current.material.opacity = opacity * (0.7 + Math.sin(time * 0.5) * 0.3);
    }
  });
  
  return (
    <mesh ref={ref} position={[initialX, height, initialZ]}>
      <sphereGeometry args={[1, 16, 12]} />
      <meshPhysicalMaterial 
        color="#FFFFFF" 
        transparent={true} 
        opacity={opacity}
        roughness={1}
        emissive="#FFFFFF"
        emissiveIntensity={0.3}
        fog={true}
        depthWrite={false}
      />
    </mesh>
  );
};

// Coffee bean component
const CoffeeBean = ({ position, rotation, scale, color }) => {
  const ref = useRef();
  
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    
    // Apply subtle floating motion
    ref.current.position.y += Math.sin(t * 0.5 + position[1]) * 0.0005;
    
    // Apply subtle rotation
    ref.current.rotation.x += 0.0005;
    ref.current.rotation.z += 0.0003;
  });
  
  return (
    <mesh 
      ref={ref} 
      position={position} 
      rotation={rotation} 
      scale={scale}
    >
      <ellipsoidGeometry args={[1, 1, 1, 16, 16]} />
      <meshPhysicalMaterial 
        color={color} 
        roughness={0.7}
        clearcoat={0.2}
        clearcoatRoughness={0.3}
      />
    </mesh>
  );
};

export default function CoffeeCup3D({ scrollYProgress }) {
  const group = useRef();
  const steamRef = useRef();
  const rippleRef = useRef();
  const [model, setModel] = useState(null);
  
  // Transform values based on scroll for interactive effects
  const rotationY = useTransform(scrollYProgress, [0, 0.5], [0, Math.PI * 0.25]);
  const rotationX = useTransform(scrollYProgress, [0, 0.5], [0.1, -0.2]);
  const positionY = useTransform(scrollYProgress, [0, 0.5], [0, -1]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  
  // Coffee bean definitions
  const coffeeBeans = [
    {
      position: [1.2, 0, 0.5],
      rotation: [Math.PI / 6, Math.PI / 3, 0],
      scale: [0.08, 0.04, 0.15],
      color: "#3E2723"
    },
    {
      position: [-1.0, 0.05, -0.2],
      rotation: [Math.PI / 5, Math.PI / 1.5, Math.PI / 3],
      scale: [0.09, 0.04, 0.14],
      color: "#4E342E"
    },
    {
      position: [0.6, 0.05, -1.1],
      rotation: [Math.PI / 3, Math.PI / 4, Math.PI / 2],
      scale: [0.08, 0.03, 0.12],
      color: "#3E2723"
    },
    {
      position: [-0.7, 0.08, 0.8],
      rotation: [Math.PI / 4, Math.PI / 2.5, Math.PI / 5],
      scale: [0.07, 0.035, 0.13],
      color: "#4E342E"
    }
  ];
  
  // Load coffee cup model
  useEffect(() => {
    const placeholderModel = createPlaceholderCoffeeModel();
    setModel(placeholderModel);
  }, []);
  
  // Advanced animation effects
  useFrame((state) => {
    if (!group.current) return;
    
    const t = state.clock.getElapsedTime();
    
    // Apply motion values with subtle organic movement
    group.current.rotation.y = rotationY.get() + Math.sin(t * 0.2) * 0.05;
    group.current.rotation.x = rotationX.get() + Math.sin(t * 0.3) * 0.02;
    group.current.position.y = positionY.get() + Math.sin(t * 0.5) * 0.05;
    
    // Slightly adjust scale based on breathing motion
    const breathingScale = scale.get() * (1 + Math.sin(t * 0.8) * 0.005);
    group.current.scale.setScalar(breathingScale);
    
    // Subtle z-axis rotation to make it feel alive
    group.current.rotation.z = Math.sin(t * 0.3) * 0.01;
    
    // Animate ripple effect
    if (rippleRef.current) {
      // Update the geometry with new inner radius for ripple effect
      const innerRadius = 0.2 + Math.sin(t * 1.5) * 0.1;
      rippleRef.current.geometry.dispose();
      rippleRef.current.geometry = new RingGeometry(innerRadius, 0.64, 64);
      
      // Update opacity based on animation cycle
      if (rippleRef.current.material) {
        rippleRef.current.material.opacity = 0.1 + Math.sin(t * 1.5) * 0.05;
      }
    }
    
    // If model is loaded, animate coffee surface
    if (model) {
      // Find the coffee surface in the model (typically at children[4])
      const coffeeSurface = model.children.find(child => 
        child.material && child.material.color && child.material.color.r < 0.3);
      
      if (coffeeSurface) {
        // Subtle bobbing motion for the coffee surface
        coffeeSurface.position.y = 0.675 + Math.sin(t * 1.2) * 0.005;
      }
    }
  });

  return (
    <group ref={group}>
      <PresentationControls
        global
        rotation={[0.13, 0.1, 0]}
        polar={[-0.4, 0.2]}
        azimuth={[-1, 0.75]}
        config={{ mass: 2, tension: 400 }}
        snap={{ mass: 4, tension: 400 }}
      >
        <Float rotationIntensity={0.2} floatIntensity={0.5}>
          {/* Render the coffee cup model */}
          {model && <primitive object={model} position={[0, -0.5, 0]} />}
          
          {/* Floating coffee beans for visual interest */}
          <group position={[0, -0.7, 0]}>
            {coffeeBeans.map((bean, index) => (
              <CoffeeBean 
                key={index}
                position={bean.position}
                rotation={bean.rotation}
                scale={bean.scale}
                color={bean.color}
              />
            ))}
          </group>
          
          {/* Add a subtle ripple animation using a ring geometry */}
          <mesh 
            ref={rippleRef}
            position={[0, 0.676, 0]} 
            rotation={[-Math.PI / 2, 0, 0]}
          >
            <ringGeometry args={[0.2, 0.64, 64]} />
            <meshPhysicalMaterial 
              color="#4E342E"
              transparent={true}
              opacity={0.1}
              roughness={0.1}
              metalness={0.3}
              emissive="#4E342E"
              emissiveIntensity={0.05}
              clearcoat={1.0}
              clearcoatRoughness={0.1}
              side={DoubleSide}
            />
          </mesh>
          
          {/* Realistic Steam Effect */}
          <group ref={steamRef} position={[0, 0.7, 0]}>
            {/* More complex steam particle system */}
            {[...Array(12)].map((_, i) => (
              <SteamParticle key={i} index={i} totalParticles={12} />
            ))}
          </group>
        </Float>
      </PresentationControls>
      
      {/* Enhanced contact shadows for photorealistic grounding */}
      <ContactShadows 
        position={[0, -0.88, 0]}
        opacity={0.7}
        scale={10}
        blur={2.5}
        far={1}
        resolution={1024}
        color="#5A3921"
      />
      
      {/* Secondary softer shadow for ambient occlusion effect */}
      <ContactShadows 
        position={[0, -0.87, 0]}
        opacity={0.2}
        scale={15}
        blur={5}
        far={5}
        resolution={512}
        color="#000000"
      />
      
      {/* Professional studio lighting setup */}
      <ambientLight intensity={0.2} />
      
      {/* Key light - main light source */}
      <spotLight 
        position={[4, 6, 4]} 
        angle={0.25}
        penumbra={0.9}
        intensity={1.2} 
        castShadow 
        color="#FFF8E1"
        shadow-mapSize-width={2048} 
        shadow-mapSize-height={2048}
        shadow-bias={-0.0001}
      />
      
      {/* Fill light - reduces harsh shadows */}
      <pointLight 
        position={[-4, 2, -3]} 
        intensity={0.4} 
        color="#FFECB3" 
      />
      
      {/* Rim light for edge highlights */}
      <spotLight 
        position={[0, 2, -5]} 
        intensity={0.6} 
        color="#BBDEFB"
        angle={0.5}
        penumbra={0.7}
      />
      
      {/* Bottom fill for subtle cup bottom illumination */}
      <pointLight 
        position={[0, -2, 2]} 
        intensity={0.2} 
        color="#E1F5FE" 
        distance={5}
        decay={2}
      />
      
      {/* Environment map for realistic reflections */}
      <Environment preset="apartment" />
    </group>
  );
}
