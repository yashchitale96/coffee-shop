import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useScroll } from 'framer-motion';
import { gsap } from 'gsap';

export function CoffeeCup({ scrollYProgress }) {
  const cup = useRef();
  
  // Create a reference for our timeline
  const tl = useRef();

  useEffect(() => {
    // Create the animation timeline
    tl.current = gsap.timeline({
      paused: true,
    });

    // Add animations to the timeline
    tl.current
      .to(cup.current.rotation, { y: Math.PI * 2, duration: 2 }, 0)
      .to(cup.current.position, { y: 0.5, duration: 1 }, 0)
      .to(cup.current.scale, { x: 1.2, y: 1.2, z: 1.2, duration: 1 }, 0);

    return () => {
      // Clean up the timeline
      tl.current.kill();
    };
  }, []);

  // Update animation based on scroll progress
  useFrame(() => {
    if (tl.current) {
      tl.current.progress(scrollYProgress.current);
    }
  });

  return (
    <group ref={cup} dispose={null} position={[0, -0.5, 0]} scale={0.8}>
      {/* This is a placeholder for the 3D model */}
      {/* In a real implementation, you would import a GLTF model */}
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[1, 0.8, 1.5, 32]} />
        <meshStandardMaterial color="#6F4E37" roughness={0.5} />
      </mesh>
      <mesh position={[0, 0.8, 0]} castShadow>
        <cylinderGeometry args={[1, 1, 0.1, 32]} />
        <meshStandardMaterial color="#36454F" roughness={0.2} />
      </mesh>
      <group position={[1.2, 0.2, 0]}>
        <mesh castShadow>
          <torusGeometry args={[0.3, 0.1, 16, 32, Math.PI]} />
          <meshStandardMaterial color="#6F4E37" roughness={0.5} />
        </mesh>
      </group>
    </group>
  );
}

export function CoffeeSteam({ scrollYProgress }) {
  const steamRef = useRef();
  
  useFrame(() => {
    if (steamRef.current) {
      // Animate the steam opacity and position based on scroll
      const progress = scrollYProgress.current;
      steamRef.current.material.opacity = progress * 0.8;
      steamRef.current.position.y = 1 + progress * 2;
    }
  });
  
  return (
    <group>
      <mesh ref={steamRef} position={[0, 1.5, 0]}>
        <sphereGeometry args={[0.6, 8, 8]} />
        <meshStandardMaterial 
          color="white" 
          transparent 
          opacity={0} 
          roughness={1} 
          emissive="white"
          emissiveIntensity={0.2}
        />
      </mesh>
    </group>
  );
}

export default function CoffeeModel({ scrollYProgress }) {
  return (
    <>
      <CoffeeCup scrollYProgress={scrollYProgress} />
      <CoffeeSteam scrollYProgress={scrollYProgress} />
    </>
  );
}
