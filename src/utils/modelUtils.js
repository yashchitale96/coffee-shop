import { useLoader } from '@react-three/fiber';
import { useEffect, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

// This is a custom hook to load GLTF models or fallback to a placeholder
export function useCoffeeModel(modelPath) {
  const [model, setModel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Try to load the actual model if path is provided
    if (modelPath) {
      const loader = new GLTFLoader();
      loader.load(
        modelPath,
        (gltf) => {
          // Clone the scene to avoid issues with multiple uses
          const clonedScene = gltf.scene.clone();
          
          // Process materials if needed
          clonedScene.traverse((child) => {
            if (child.isMesh) {
              // Enhance materials
              if (child.material) {
                child.material.roughness = 0.2;
                child.material.metalness = 0.3;
                child.castShadow = true;
                child.receiveShadow = true;
              }
            }
          });
          
          setModel(clonedScene);
          setLoading(false);
        },
        undefined,
        (err) => {
          console.error("Error loading coffee model:", err);
          setError(err);
          setLoading(false);
        }
      );
    } else {
      // If no model path, immediately set loading to false
      setLoading(false);
    }
  }, [modelPath]);

  return { model, loading, error };
}

// Create a highly detailed realistic coffee cup model using Three.js
export function createPlaceholderCoffeeModel() {
  const group = new THREE.Group();
  
  // Cup outer body - with subtle taper and high poly count for smoothness
  const cupOuterGeometry = new THREE.CylinderGeometry(0.7, 0.55, 1.4, 64, 6, true);
  const cupBodyTexture = createCeramicTexture();
  const cupMaterial = new THREE.MeshPhysicalMaterial({ 
    color: '#F5F5DC', // Off-white ceramic color
    roughness: 0.3, 
    metalness: 0.0,
    clearcoat: 0.2,
    clearcoatRoughness: 0.3,
    map: cupBodyTexture,
    envMapIntensity: 1.0,
    reflectivity: 0.2,
  });
  const cupOuter = new THREE.Mesh(cupOuterGeometry, cupMaterial);
  cupOuter.castShadow = true;
  cupOuter.receiveShadow = true;
  group.add(cupOuter);
  
  // Cup inner body - with wall thickness
  const cupInnerGeometry = new THREE.CylinderGeometry(0.65, 0.5, 1.4, 64, 6, true);
  const cupInnerMaterial = new THREE.MeshPhysicalMaterial({ 
    color: '#FFFFF0', // Slightly different inner color
    roughness: 0.2, 
    metalness: 0.0,
    clearcoat: 0.4,
    clearcoatRoughness: 0.2
  });
  const cupInner = new THREE.Mesh(cupInnerGeometry, cupInnerMaterial);
  cupInner.castShadow = true;
  cupInner.receiveShadow = true;
  group.add(cupInner);
  
  // Cup bottom
  const cupBottomGeometry = new THREE.CylinderGeometry(0.55, 0.55, 0.1, 64);
  const cupBottom = new THREE.Mesh(cupBottomGeometry, cupMaterial);
  cupBottom.position.y = -0.7;
  cupBottom.castShadow = true;
  cupBottom.receiveShadow = true;
  group.add(cupBottom);
  
  // Cup rim
  const rimGeometry = new THREE.TorusGeometry(0.7, 0.05, 16, 64);
  const rimMaterial = new THREE.MeshPhysicalMaterial({ 
    color: '#F5F5DC',
    roughness: 0.2, 
    metalness: 0.0,
    clearcoat: 0.3,
    clearcoatRoughness: 0.2
  });
  const rim = new THREE.Mesh(rimGeometry, rimMaterial);
  rim.position.y = 0.7;
  rim.rotation.x = Math.PI / 2;
  rim.castShadow = true;
  group.add(rim);
  
  // Coffee liquid with realistic surface
  const coffeeGeometry = new THREE.CylinderGeometry(0.64, 0.49, 0.25, 64, 4, true);
  const coffeeMaterial = new THREE.MeshPhysicalMaterial({ 
    color: '#3E2723', 
    roughness: 0.1, 
    metalness: 0.1,
    clearcoat: 1.0,
    clearcoatRoughness: 0.1,
    emissive: '#3E2723',
    emissiveIntensity: 0.2,
    envMapIntensity: 1.5,
    transmission: 0.05, // Slight transparency
  });
  const coffee = new THREE.Mesh(coffeeGeometry, coffeeMaterial);
  coffee.position.y = 0.55;
  group.add(coffee);
  
  // Coffee surface (separate for better reflection)
  const coffeeSurfaceGeometry = new THREE.CircleGeometry(0.64, 64);
  const coffeeSurface = new THREE.Mesh(coffeeSurfaceGeometry, coffeeMaterial);
  coffeeSurface.position.y = 0.675;
  coffeeSurface.rotation.x = -Math.PI / 2;
  group.add(coffeeSurface);
  
  // Advanced cup handle with better shape
  const handleCurvePoints = [];
  for (let i = 0; i <= 1; i += 0.1) {
    const angle = i * Math.PI;
    const x = 0.9 + 0.3 * Math.cos(angle);
    const y = 0.1 + 0.5 * Math.sin(angle);
    handleCurvePoints.push(new THREE.Vector3(x, y, 0));
  }
  
  const handleCurve = new THREE.CatmullRomCurve3(handleCurvePoints);
  const handleGeometry = new THREE.TubeGeometry(handleCurve, 32, 0.08, 16, false);
  const handle = new THREE.Mesh(handleGeometry, cupMaterial);
  handle.castShadow = true;
  group.add(handle);
  
  // Cup saucer
  const saucerTopGeometry = new THREE.CylinderGeometry(1.2, 1.2, 0.05, 64, 1);
  const saucerTop = new THREE.Mesh(saucerTopGeometry, cupMaterial);
  saucerTop.position.y = -0.8;
  saucerTop.castShadow = true;
  saucerTop.receiveShadow = true;
  group.add(saucerTop);
  
  // Saucer rim
  const saucerRimGeometry = new THREE.CylinderGeometry(1.2, 1.3, 0.08, 64, 1);
  const saucerRim = new THREE.Mesh(saucerRimGeometry, cupMaterial);
  saucerRim.position.y = -0.86;
  saucerRim.castShadow = true;
  saucerRim.receiveShadow = true;
  group.add(saucerRim);
  
  // Add subtle details - spoon
  const spoonHandlePoints = [];
  for (let i = 0; i <= 1; i += 0.1) {
    const t = i * Math.PI;
    const x = 0.8 + 0.4 * i;
    const y = -0.77 + Math.sin(i * 3) * 0.02;
    const z = 0.2;
    spoonHandlePoints.push(new THREE.Vector3(x, y, z));
  }
  
  const spoonHandleCurve = new THREE.CatmullRomCurve3(spoonHandlePoints);
  const spoonHandleGeometry = new THREE.TubeGeometry(spoonHandleCurve, 20, 0.03, 8, false);
  const spoonMaterial = new THREE.MeshStandardMaterial({
    color: '#D0D0D0',
    roughness: 0.1,
    metalness: 0.8,
  });
  const spoonHandle = new THREE.Mesh(spoonHandleGeometry, spoonMaterial);
  spoonHandle.castShadow = true;
  group.add(spoonHandle);
  
  // Spoon bowl
  const spoonBowlGeometry = new THREE.SphereGeometry(0.12, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2);
  const spoonBowl = new THREE.Mesh(spoonBowlGeometry, spoonMaterial);
  spoonBowl.scale.set(1, 0.4, 1);
  spoonBowl.position.set(0.7, -0.77, 0.2);
  spoonBowl.rotation.x = Math.PI;
  spoonBowl.castShadow = true;
  group.add(spoonBowl);
  
  return group;
}

// Function to create a subtle ceramic texture
function createCeramicTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  
  // Fill with base color
  ctx.fillStyle = '#F5F5DC';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Add subtle noise pattern to mimic ceramic texture
  for (let x = 0; x < canvas.width; x++) {
    for (let y = 0; y < canvas.height; y++) {
      if (Math.random() > 0.995) {
        const shade = Math.floor(Math.random() * 20);
        ctx.fillStyle = `rgba(0, 0, 0, ${0.03 + Math.random() * 0.02})`;
        ctx.fillRect(x, y, 1 + Math.random() * 2, 1 + Math.random() * 2);
      }
    }
  }
  
  // Add a few more pronounced speckles
  for (let i = 0; i < 200; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const size = 1 + Math.random() * 2;
    ctx.fillStyle = `rgba(120, 100, 80, ${0.05 + Math.random() * 0.05})`;
    ctx.fillRect(x, y, size, size);
  }
  
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(4, 2);
  
  return texture;
}
