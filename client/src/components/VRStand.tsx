import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";
import { useInteraction } from "../lib/stores/useInteraction";
import { useAudio } from "../lib/stores/useAudio";
import { useLighting } from "../lib/stores/useLighting";

interface VRStandProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
}

export default function VRStand({ position = [0, 0, 0], rotation = [0, 0, 0] }: VRStandProps) {
  const vrRef = useRef<THREE.Group>(null);
  const headsetRef = useRef<THREE.Mesh>(null);
  const controllerLeftRef = useRef<THREE.Mesh>(null);
  const controllerRightRef = useRef<THREE.Mesh>(null);
  const standRef = useRef<THREE.Mesh>(null);
  const lightRef = useRef<THREE.PointLight>(null);
  
  const { registerInteractiveObject } = useInteraction();
  const { playHit, playSuccess } = useAudio();
  const { rgbColor } = useLighting();
  
  // VR headset light animation
  useFrame((state, delta) => {
    if (lightRef.current) {
      lightRef.current.color = new THREE.Color(rgbColor);
      lightRef.current.intensity = 0.2 + Math.sin(state.clock.elapsedTime * 1.5) * 0.1;
    }
  });
  
  // Animate headset slightly to simulate a "pickup" effect
  const animateHeadset = () => {
    if (headsetRef.current) {
      const currentY = headsetRef.current.position.y;
      headsetRef.current.position.y = currentY + 0.1;
      playHit();
      
      setTimeout(() => {
        if (headsetRef.current) headsetRef.current.position.y = currentY;
      }, 300);
    }
  };
  
  // Register interactive elements when component mounts
  useEffect(() => {
    if (vrRef.current) {
      // Register the entire VR setup with VR experience links
      registerInteractiveObject(
        vrRef.current,
        "VR Gaming Station",
        "vr",
        "A complete virtual reality gaming setup with a high-end headset and motion controllers. This setup provides an immersive gaming experience with full 360-degree tracking.",
        undefined,
        [
          {
            text: "Experience: Google Earth VR",
            url: "https://arvr.google.com/earth/",
            icon: "🌎"
          },
          {
            text: "Experience: Beat Saber",
            url: "https://www.beatsaber.com/",
            icon: "🎵"
          },
          {
            text: "Experience: Half-Life: Alyx",
            url: "https://www.half-life.com/en/alyx/",
            icon: "🔫"
          },
          {
            text: "Experience: VRChat",
            url: "https://hello.vrchat.com/",
            icon: "👥"
          }
        ]
      );
    }
    
    if (headsetRef.current) {
      // Register the headset specifically
      registerInteractiveObject(
        headsetRef.current,
        "VR Headset",
        "vr",
        "A high-resolution VR headset with integrated audio and inside-out tracking. Features dual OLED displays with a combined resolution of 2880x1600, providing crisp visuals and deep blacks for immersive experiences.",
        animateHeadset
      );
    }
    
    if (controllerLeftRef.current) {
      // Register left controller
      registerInteractiveObject(
        controllerLeftRef.current,
        "Left VR Controller",
        "vr",
        "Motion controller for the left hand with precise tracking. Includes analog sticks, buttons, and haptic feedback for interacting with virtual environments."
      );
    }
    
    if (controllerRightRef.current) {
      // Register right controller
      registerInteractiveObject(
        controllerRightRef.current,
        "Right VR Controller",
        "vr",
        "Motion controller for the right hand with precise tracking. Includes analog sticks, buttons, and haptic feedback for interacting with virtual environments."
      );
    }
    
    if (standRef.current) {
      // Register the stand
      registerInteractiveObject(
        standRef.current,
        "VR Headset Stand",
        "vr",
        "A premium stand designed to hold and display the VR headset and controllers when not in use. The weighted base provides stability while showing off your gaming equipment."
      );
    }
  }, [registerInteractiveObject, playHit]);

  return (
    <group ref={vrRef} position={position} rotation={rotation} name="vr-stand">
      {/* Stand Base */}
      <mesh ref={standRef} receiveShadow castShadow position={[0, 0.1, 0]}>
        <cylinderGeometry args={[0.2, 0.25, 0.05, 16]} />
        <meshStandardMaterial color="#2A2A2A" roughness={0.8} />
      </mesh>
      
      {/* Stand Pole */}
      <mesh receiveShadow castShadow position={[0, 0.7, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 1.2, 8]} />
        <meshStandardMaterial color="#1A1A1A" roughness={0.6} metalness={0.3} />
      </mesh>
      
      {/* VR Headset */}
      <group position={[0, 1.1, 0]}>
        <mesh ref={headsetRef} receiveShadow castShadow>
          <boxGeometry args={[0.2, 0.1, 0.15]} />
          <meshStandardMaterial color="#1A1A1A" roughness={0.8} />
        </mesh>
        
        {/* Headset faceplate */}
        <mesh position={[0, 0, 0.08]} receiveShadow castShadow>
          <boxGeometry args={[0.19, 0.09, 0.01]} />
          <meshStandardMaterial color="#0A0A0A" roughness={0.6} />
        </mesh>
        
        {/* Headset Lenses */}
        <mesh position={[-0.05, 0, -0.01]} receiveShadow castShadow rotation={[Math.PI/2, 0, 0]}>
          <cylinderGeometry args={[0.03, 0.03, 0.06, 16]} />
          <meshStandardMaterial color="#0A0A0A" roughness={0.2} />
        </mesh>
        
        <mesh position={[0.05, 0, -0.01]} receiveShadow castShadow rotation={[Math.PI/2, 0, 0]}>
          <cylinderGeometry args={[0.03, 0.03, 0.06, 16]} />
          <meshStandardMaterial color="#0A0A0A" roughness={0.2} />
        </mesh>
        
        {/* Headset Strap */}
        <mesh position={[0, 0, -0.08]} receiveShadow castShadow>
          <torusGeometry args={[0.08, 0.01, 8, 16, Math.PI]} />
          <meshStandardMaterial color="#3A3A3A" roughness={0.9} />
        </mesh>
        
        {/* Small light on headset */}
        <pointLight 
          ref={lightRef}
          position={[0.09, 0.04, 0.08]} 
          intensity={0.3} 
          distance={0.3}
          color={rgbColor}
        />
        
        <mesh position={[0.09, 0.04, 0.08]} receiveShadow castShadow>
          <sphereGeometry args={[0.005, 8, 8]} />
          <meshStandardMaterial
            color="#FFFFFF"
            emissive={rgbColor}
            emissiveIntensity={1}
          />
        </mesh>
      </group>
      
      {/* VR Controllers */}
      <mesh ref={controllerRightRef} position={[0.15, 0.5, 0]} receiveShadow castShadow>
        <cylinderGeometry args={[0.02, 0.01, 0.15, 8]} />
        <meshStandardMaterial color="#1A1A1A" roughness={0.7} />
      </mesh>
      
      <mesh ref={controllerLeftRef} position={[-0.15, 0.5, 0]} receiveShadow castShadow>
        <cylinderGeometry args={[0.02, 0.01, 0.15, 8]} />
        <meshStandardMaterial color="#1A1A1A" roughness={0.7} />
      </mesh>
      
      {/* Controller rings */}
      <mesh position={[0.15, 0.53, 0]} receiveShadow castShadow>
        <torusGeometry args={[0.03, 0.005, 8, 16]} />
        <meshStandardMaterial color="#2A2A2A" roughness={0.7} />
      </mesh>
      
      <mesh position={[-0.15, 0.53, 0]} receiveShadow castShadow>
        <torusGeometry args={[0.03, 0.005, 8, 16]} />
        <meshStandardMaterial color="#2A2A2A" roughness={0.7} />
      </mesh>
      
      {/* Small shelf for accessories */}
      <mesh position={[0, 0.3, 0]} receiveShadow castShadow>
        <cylinderGeometry args={[0.15, 0.15, 0.02, 16]} />
        <meshStandardMaterial color="#2A2A2A" roughness={0.8} />
      </mesh>
      
      {/* Information label (for accessibility) */}
      <Text
        position={[0, 1.5, 0]}
        rotation={[0, Math.PI - rotation[1], 0]}
        fontSize={0.1}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        visible={false} // Hidden but will be shown on interaction
      >
        VR Headset Stand
      </Text>
    </group>
  );
}
