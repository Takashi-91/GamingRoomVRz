import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useKeyboardControls } from "@react-three/drei";
import { useLighting } from "../lib/stores/useLighting";

export default function Lighting() {
  const mainLightRef = useRef<THREE.DirectionalLight>(null);
  const rgbLight1Ref = useRef<THREE.PointLight>(null);
  const rgbLight2Ref = useRef<THREE.PointLight>(null);
  const rgbLight3Ref = useRef<THREE.PointLight>(null);
  const rgbLight4Ref = useRef<THREE.PointLight>(null);
  
  const { rgbColor, toggleLightMode, cycleColor } = useLighting();
  
  // Check for 'L' key press to toggle light mode
  const toggleLight = useKeyboardControls(state => state.toggleLight);
  
  useEffect(() => {
    if (toggleLight) {
      toggleLightMode();
    }
  }, [toggleLight, toggleLightMode]);
  
  // Animate RGB lights
  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    
    // Make RGB lights pulse and move slightly
    if (rgbLight1Ref.current) {
      rgbLight1Ref.current.intensity = 0.8 + Math.sin(t * 2) * 0.2;
      rgbLight1Ref.current.position.y = 2.8 + Math.sin(t * 1.5) * 0.05;
      rgbLight1Ref.current.color = new THREE.Color(rgbColor);
    }
    
    if (rgbLight2Ref.current) {
      rgbLight2Ref.current.intensity = 0.8 + Math.sin(t * 2 + 1) * 0.2;
      rgbLight2Ref.current.position.y = 2.8 + Math.sin(t * 1.5 + 2) * 0.05;
      rgbLight2Ref.current.color = new THREE.Color(rgbColor);
    }
    
    if (rgbLight3Ref.current) {
      rgbLight3Ref.current.intensity = 0.8 + Math.sin(t * 2 + 2) * 0.2;
      rgbLight3Ref.current.position.y = 2.8 + Math.sin(t * 1.5 + 4) * 0.05;
      rgbLight3Ref.current.color = new THREE.Color(rgbColor);
    }
    
    if (rgbLight4Ref.current) {
      rgbLight4Ref.current.intensity = 0.8 + Math.sin(t * 2 + 3) * 0.2;
      rgbLight4Ref.current.position.y = 2.8 + Math.sin(t * 1.5 + 6) * 0.05;
      rgbLight4Ref.current.color = new THREE.Color(rgbColor);
    }
    
    // Every 10 seconds, cycle the RGB color
    if (Math.floor(t) % 10 === 0 && Math.floor(t) !== Math.floor(t - delta)) {
      cycleColor();
    }
  });

  return (
    <>
      {/* Main ambient light */}
      <ambientLight intensity={0.3} />
      
      {/* Main directional light (like sun/ceiling light) */}
      <directionalLight
        ref={mainLightRef}
        position={[1, 8, 2]}
        intensity={0.7}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={10}
        shadow-camera-left={-5}
        shadow-camera-right={5}
        shadow-camera-top={5}
        shadow-camera-bottom={-5}
      />
      
      {/* Ceiling mounted RGB light strips */}
      <pointLight
        ref={rgbLight1Ref}
        position={[-3, 2.8, -3]}
        intensity={0.8}
        distance={5}
        color={rgbColor}
        castShadow
      />
      
      <pointLight
        ref={rgbLight2Ref}
        position={[3, 2.8, -3]}
        intensity={0.8}
        distance={5}
        color={rgbColor}
        castShadow
      />
      
      <pointLight
        ref={rgbLight3Ref}
        position={[-3, 2.8, 3]}
        intensity={0.8}
        distance={5}
        color={rgbColor}
        castShadow
      />
      
      <pointLight
        ref={rgbLight4Ref}
        position={[3, 2.8, 3]}
        intensity={0.8}
        distance={5}
        color={rgbColor}
        castShadow
      />
      
      {/* General room lights */}
      <pointLight
        position={[0, 2.8, 0]}
        intensity={0.4}
        distance={8}
        color="#FFFFFF"
      />
      
      {/* Subtle fill light to prevent complete darkness */}
      <hemisphereLight 
        args={["#FFFFFF", "#333333", 0.3]} 
      />
    </>
  );
}
