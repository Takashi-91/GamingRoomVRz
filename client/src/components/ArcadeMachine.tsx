import { useRef, useState, useEffect } from "react";
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
  const marqueeRef = useRef<THREE.Mesh>(null);
  const joystickRef = useRef<THREE.Mesh>(null);
  const buttonRef1 = useRef<THREE.Mesh>(null);
  const buttonRef2 = useRef<THREE.Mesh>(null);
  const buttonRef3 = useRef<THREE.Mesh>(null);
  const coinSlotRef = useRef<THREE.Mesh>(null);
  const [isScreenOn, setIsScreenOn] = useState(false);
  
  const { registerInteractiveObject } = useInteraction();
  const { playHit, playSuccess } = useAudio();
  
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
  
  // Register interactive elements when component mounts
  useEffect(() => {
    if (arcadeRef.current) {
      // Register the entire cabinet as interactive
      registerInteractiveObject(
        arcadeRef.current,
        "Retro Arcade Cabinet",
        "arcade",
        "A classic stand-up arcade cabinet featuring multiple retro games. The cabinet features authentic controls and a vibrant display, perfect for enjoying classic arcade titles like Pac-Man, Galaga, and Space Invaders."
      );
    }
    
    if (screenRef.current) {
      // Register screen as interactive
      registerInteractiveObject(
        screenRef.current,
        "Arcade Screen",
        "arcade",
        "A vibrant CRT display showing colorful pixel graphics. The screen is currently " + (isScreenOn ? "on" : "off") + ". Click to toggle the power.",
        () => {
          // Toggle screen power
          setIsScreenOn(!isScreenOn);
          playSuccess();
          
          if (screenRef.current) {
            const material = screenRef.current.material as THREE.MeshStandardMaterial;
            if (!isScreenOn) {
              material.emissive.set("#30C080");
            } else {
              material.emissive.set("#000000");
            }
          }
        }
      );
    }
    
    if (joystickRef.current) {
      // Register joystick as interactive
      registerInteractiveObject(
        joystickRef.current,
        "Arcade Joystick",
        "arcade",
        "A responsive 8-way joystick with a distinctive red ball top. The design provides tactile feedback for precise movement controls in classic arcade games."
      );
    }
    
    if (buttonRef1.current) {
      // Register button 1
      registerInteractiveObject(
        buttonRef1.current,
        "Red Button",
        "arcade",
        "The primary action button, typically used for firing weapons or confirming selections in arcade games.",
        () => playHit()
      );
    }
    
    if (buttonRef2.current) {
      // Register button 2
      registerInteractiveObject(
        buttonRef2.current,
        "Blue Button",
        "arcade",
        "Secondary action button used for alternate weapons or special moves in fighting games.",
        () => playHit()
      );
    }
    
    if (buttonRef3.current) {
      // Register button 3
      registerInteractiveObject(
        buttonRef3.current,
        "Yellow Button",
        "arcade",
        "Utility button used for jumping, blocking, or tertiary actions depending on the game."
      );
    }
    
    if (marqueeRef.current) {
      // Register marquee
      registerInteractiveObject(
        marqueeRef.current,
        "Arcade Marquee",
        "arcade",
        "A backlit display at the top of the cabinet showing the arcade's name. Traditional arcades featured iconic artwork and logos here to attract players."
      );
    }
    
    if (coinSlotRef.current) {
      // Register coin slot
      registerInteractiveObject(
        coinSlotRef.current,
        "Coin Slot",
        "arcade",
        "The coin mechanism where players would insert quarters to play. This cabinet has been modified to offer free play.",
        () => {
          // Play coin sound
          playHit();
          
          // Turn screen on if it's off
          if (!isScreenOn && screenRef.current) {
            setIsScreenOn(true);
            const material = screenRef.current.material as THREE.MeshStandardMaterial;
            material.emissive.set("#30C080");
          }
        }
      );
    }
  }, [registerInteractiveObject, playHit, playSuccess, isScreenOn]);

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
      <mesh ref={joystickRef} position={[-0.2, 0.88, 0.1]} receiveShadow castShadow>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshStandardMaterial color="#FF0000" roughness={0.6} />
      </mesh>
      
      <mesh position={[-0.2, 0.85, 0.1]} receiveShadow castShadow>
        <cylinderGeometry args={[0.01, 0.01, 0.06, 8]} />
        <meshStandardMaterial color="#0A0A0A" roughness={0.6} />
      </mesh>
      
      {/* Buttons */}
      <mesh ref={buttonRef1} position={[0.1, 0.88, 0.1]} receiveShadow castShadow rotation={[Math.PI/2, 0, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 0.02, 16]} />
        <meshStandardMaterial color="#FF0000" roughness={0.6} />
      </mesh>
      
      <mesh ref={buttonRef2} position={[0.2, 0.88, 0.1]} receiveShadow castShadow rotation={[Math.PI/2, 0, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 0.02, 16]} />
        <meshStandardMaterial color="#0000FF" roughness={0.6} />
      </mesh>
      
      <mesh ref={buttonRef3} position={[0.3, 0.88, 0.1]} receiveShadow castShadow rotation={[Math.PI/2, 0, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 0.02, 16]} />
        <meshStandardMaterial color="#FFFF00" roughness={0.6} />
      </mesh>
      
      {/* Marquee Box */}
      <mesh position={[0, 1.8, -0.2]} receiveShadow castShadow>
        <boxGeometry args={[0.7, 0.2, 0.3]} />
        <meshStandardMaterial color="#2A2A2A" roughness={0.7} />
      </mesh>
      
      {/* Marquee Display */}
      <mesh ref={marqueeRef} position={[0, 1.8, -0.15]} receiveShadow castShadow>
        <planeGeometry args={[0.6, 0.15]} />
        <meshStandardMaterial 
          color="#000000" 
          emissive={isScreenOn ? "#4040FF" : "#000000"} 
          emissiveIntensity={0.8}
          roughness={0.4}
        />
      </mesh>
      
      {/* Coin slot housing */}
      <mesh ref={coinSlotRef} position={[0, 0.6, 0.25]} receiveShadow castShadow>
        <boxGeometry args={[0.2, 0.05, 0.05]} />
        <meshStandardMaterial color="#3A3A3A" metalness={0.5} roughness={0.7} />
      </mesh>
      
      {/* Coin slot */}
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
