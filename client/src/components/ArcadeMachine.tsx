import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";
import { useInteraction } from "../lib/stores/useInteraction";
import { useAudio } from "../lib/stores/useAudio";

interface ArcadeMachineProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
}

export default function ArcadeMachine({ position = [0, 0, 0], rotation = [0, 0, 0] }: ArcadeMachineProps) {
  const arcadeRef = useRef<THREE.Group>(null);
  const screenRef = useRef<THREE.Mesh>(null);
  const [isScreenOn, setIsScreenOn] = useState(false);
  
  const { registerInteractiveObject } = useInteraction();
  const { playSuccess } = useAudio();
  
  // Screen animation
  useFrame((state) => {
    if (screenRef.current && isScreenOn) {
      // Animate screen colors when on
      const material = screenRef.current.material as THREE.MeshStandardMaterial;
      const t = state.clock.getElapsedTime();
      
      // Create a pulsing effect with changing colors
      const r = Math.sin(t * 1.5) * 0.5 + 0.5;
      const g = Math.sin(t * 1.2 + 2) * 0.5 + 0.5;
      const b = Math.sin(t * 1.0 + 4) * 0.5 + 0.5;
      
      material.emissive.setRGB(r * 0.3, g * 0.3, b * 0.3);
    }
  });
  
  // Register interactive elements
  useFrame(() => {
    if (arcadeRef.current && !arcadeRef.current.userData.registered) {
      registerInteractiveObject(arcadeRef.current, "Arcade Machine", () => {
        console.log("Arcade machine interaction");
        setIsScreenOn(!isScreenOn);
        playSuccess();
        
        // Toggle screen
        if (screenRef.current) {
          const material = screenRef.current.material as THREE.MeshStandardMaterial;
          if (!isScreenOn) {
            material.emissive.set("#30C080");
          } else {
            material.emissive.set("#000000");
          }
        }
      });
      arcadeRef.current.userData.registered = true;
    }
  });

  return (
    <group ref={arcadeRef} position={position} rotation={rotation} name="arcade-machine">
      {/* Arcade Cabinet Base */}
      <mesh receiveShadow castShadow position={[0, 0.9, 0]}>
        <boxGeometry args={[0.7, 1.8, 0.7]} />
        <meshStandardMaterial color="#1A1A1A" roughness={0.8} />
      </mesh>
      
      {/* Screen Area */}
      <mesh position={[0, 1.3, -0.15]} receiveShadow castShadow>
        <boxGeometry args={[0.6, 0.5, 0.1]} />
        <meshStandardMaterial color="#0A0A0A" roughness={0.5} />
      </mesh>
      
      {/* Screen */}
      <mesh 
        ref={screenRef} 
        position={[0, 1.3, -0.1]} 
        receiveShadow 
        castShadow
      >
        <planeGeometry args={[0.5, 0.4]} />
        <meshStandardMaterial 
          color="#000000" 
          emissive="#000000" 
          roughness={0.4}
        />
      </mesh>
      
      {/* Control Panel */}
      <mesh position={[0, 0.8, 0]} receiveShadow castShadow>
        <boxGeometry args={[0.65, 0.15, 0.5]} />
        <meshStandardMaterial color="#2E2E2E" roughness={0.7} />
      </mesh>
      
      {/* Joystick */}
      <mesh position={[-0.2, 0.88, 0.1]} receiveShadow castShadow>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshStandardMaterial color="#FF0000" roughness={0.6} />
      </mesh>
      
      <mesh position={[-0.2, 0.85, 0.1]} receiveShadow castShadow>
        <cylinderGeometry args={[0.01, 0.01, 0.06, 8]} />
        <meshStandardMaterial color="#0A0A0A" roughness={0.6} />
      </mesh>
      
      {/* Buttons */}
      <mesh position={[0.1, 0.88, 0.1]} receiveShadow castShadow>
        <cylinderGeometry args={[0.03, 0.03, 0.02, 16]} rotation={[Math.PI/2, 0, 0]} />
        <meshStandardMaterial color="#FF0000" roughness={0.6} />
      </mesh>
      
      <mesh position={[0.2, 0.88, 0.1]} receiveShadow castShadow>
        <cylinderGeometry args={[0.03, 0.03, 0.02, 16]} rotation={[Math.PI/2, 0, 0]} />
        <meshStandardMaterial color="#0000FF" roughness={0.6} />
      </mesh>
      
      <mesh position={[0.3, 0.88, 0.1]} receiveShadow castShadow>
        <cylinderGeometry args={[0.03, 0.03, 0.02, 16]} rotation={[Math.PI/2, 0, 0]} />
        <meshStandardMaterial color="#FFFF00" roughness={0.6} />
      </mesh>
      
      {/* Marquee */}
      <mesh position={[0, 1.8, -0.2]} receiveShadow castShadow>
        <boxGeometry args={[0.7, 0.2, 0.3]} />
        <meshStandardMaterial color="#2A2A2A" roughness={0.7} />
      </mesh>
      
      <mesh position={[0, 1.8, -0.15]} receiveShadow castShadow>
        <planeGeometry args={[0.6, 0.15]} />
        <meshStandardMaterial 
          color="#000000" 
          emissive={isScreenOn ? "#4040FF" : "#000000"} 
          emissiveIntensity={0.8}
          roughness={0.4}
        />
      </mesh>
      
      {/* Coin slots */}
      <mesh position={[0, 0.6, 0.25]} receiveShadow castShadow>
        <boxGeometry args={[0.2, 0.05, 0.05]} />
        <meshStandardMaterial color="#3A3A3A" metalness={0.5} roughness={0.7} />
      </mesh>
      
      <mesh position={[0, 0.6, 0.28]} receiveShadow castShadow>
        <boxGeometry args={[0.15, 0.03, 0.01]} />
        <meshStandardMaterial color="#1A1A1A" roughness={0.7} />
      </mesh>
      
      {/* Information label (for accessibility) */}
      <Text
        position={[0, 2.1, 0]}
        rotation={[0, Math.PI - rotation[1], 0]}
        fontSize={0.1}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        visible={false} // Hidden but will be shown on interaction
      >
        Retro Arcade Machine
      </Text>
    </group>
  );
}
