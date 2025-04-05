import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";
import { useInteraction } from "../lib/stores/useInteraction";
import { useAudio } from "../lib/stores/useAudio";

interface CouchProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
}

export default function Couch({ position = [0, 0, 0], rotation = [0, 0, 0] }: CouchProps) {
  const couchRef = useRef<THREE.Group>(null);
  const controllerRef = useRef<THREE.Mesh>(null);
  
  const { registerInteractiveObject } = useInteraction();
  const { playHit } = useAudio();
  
  // Register interactive elements
  useFrame(() => {
    if (couchRef.current && !couchRef.current.userData.registered) {
      registerInteractiveObject(
        couchRef.current, 
        "Couch & Gaming Console", 
        "couch",
        "A comfortable seating area with a modern gaming console set up for relaxed gameplay. The coffee table holds controllers and other gaming accessories for convenient access.",
        () => {
          console.log("Couch area interaction");
          playHit();
          
          // Animated effect for the controller
          if (controllerRef.current) {
            const currentY = controllerRef.current.position.y;
            // Simple animation - move controller up slightly
            controllerRef.current.position.y = currentY + 0.05;
            setTimeout(() => {
              if (controllerRef.current) controllerRef.current.position.y = currentY;
            }, 300);
          }
        },
        [
          {
            text: "Game: Fortnite",
            url: "https://www.fortnite.com/",
            icon: "🎮"
          },
          {
            text: "Game: FIFA 23",
            url: "https://www.ea.com/games/fifa/fifa-23",
            icon: "⚽"
          },
          {
            text: "Game: Call of Duty",
            url: "https://www.callofduty.com/",
            icon: "🎯"
          },
          {
            text: "Game: Minecraft",
            url: "https://www.minecraft.net/",
            icon: "⛏️"
          }
        ]
      );
      couchRef.current.userData.registered = true;
    }
  });

  return (
    <group ref={couchRef} position={position} rotation={rotation} name="couch-area">
      {/* Couch base */}
      <mesh receiveShadow castShadow position={[0, 0.3, 0]}>
        <boxGeometry args={[2, 0.6, 0.8]} />
        <meshStandardMaterial color="#444E5E" roughness={0.8} />
      </mesh>
      
      {/* Couch back */}
      <mesh receiveShadow castShadow position={[0, 0.7, -0.35]}>
        <boxGeometry args={[2, 0.8, 0.1]} />
        <meshStandardMaterial color="#444E5E" roughness={0.8} />
      </mesh>
      
      {/* Couch arms */}
      <mesh receiveShadow castShadow position={[1.05, 0.5, 0]}>
        <boxGeometry args={[0.1, 0.4, 0.8]} />
        <meshStandardMaterial color="#444E5E" roughness={0.8} />
      </mesh>
      
      <mesh receiveShadow castShadow position={[-1.05, 0.5, 0]}>
        <boxGeometry args={[0.1, 0.4, 0.8]} />
        <meshStandardMaterial color="#444E5E" roughness={0.8} />
      </mesh>
      
      {/* Couch cushions */}
      <mesh receiveShadow castShadow position={[-0.5, 0.65, 0]}>
        <boxGeometry args={[0.9, 0.1, 0.7]} />
        <meshStandardMaterial color="#5B687A" roughness={0.9} />
      </mesh>
      
      <mesh receiveShadow castShadow position={[0.5, 0.65, 0]}>
        <boxGeometry args={[0.9, 0.1, 0.7]} />
        <meshStandardMaterial color="#5B687A" roughness={0.9} />
      </mesh>
      
      {/* Back cushions */}
      <mesh receiveShadow castShadow position={[-0.5, 0.9, -0.25]}>
        <boxGeometry args={[0.9, 0.4, 0.1]} />
        <meshStandardMaterial color="#5B687A" roughness={0.9} />
      </mesh>
      
      <mesh receiveShadow castShadow position={[0.5, 0.9, -0.25]}>
        <boxGeometry args={[0.9, 0.4, 0.1]} />
        <meshStandardMaterial color="#5B687A" roughness={0.9} />
      </mesh>
      
      {/* Coffee table */}
      <mesh receiveShadow castShadow position={[0, 0.2, 1]}>
        <boxGeometry args={[1.2, 0.1, 0.6]} />
        <meshStandardMaterial color="#3D3426" roughness={0.7} />
      </mesh>
      
      {/* Table legs */}
      <mesh receiveShadow castShadow position={[-0.5, 0.1, 0.8]}>
        <boxGeometry args={[0.05, 0.2, 0.05]} />
        <meshStandardMaterial color="#2A251A" roughness={0.7} />
      </mesh>
      
      <mesh receiveShadow castShadow position={[0.5, 0.1, 0.8]}>
        <boxGeometry args={[0.05, 0.2, 0.05]} />
        <meshStandardMaterial color="#2A251A" roughness={0.7} />
      </mesh>
      
      <mesh receiveShadow castShadow position={[-0.5, 0.1, 1.2]}>
        <boxGeometry args={[0.05, 0.2, 0.05]} />
        <meshStandardMaterial color="#2A251A" roughness={0.7} />
      </mesh>
      
      <mesh receiveShadow castShadow position={[0.5, 0.1, 1.2]}>
        <boxGeometry args={[0.05, 0.2, 0.05]} />
        <meshStandardMaterial color="#2A251A" roughness={0.7} />
      </mesh>
      
      {/* Game controllers */}
      <mesh ref={controllerRef} receiveShadow castShadow position={[-0.3, 0.65, 0.2]}>
        <boxGeometry args={[0.15, 0.05, 0.1]} />
        <meshStandardMaterial color="#1A1A1A" roughness={0.7} />
      </mesh>
      
      <mesh receiveShadow castShadow position={[0.3, 0.26, 1]}>
        <boxGeometry args={[0.15, 0.05, 0.1]} />
        <meshStandardMaterial color="#1A1A1A" roughness={0.7} />
      </mesh>
      
      {/* Game console */}
      <mesh receiveShadow castShadow position={[0, 0.3, 1]}>
        <boxGeometry args={[0.3, 0.05, 0.2]} />
        <meshStandardMaterial color="#1A1A1A" roughness={0.7} metalness={0.3} />
      </mesh>
      
      {/* Console power light */}
      <mesh position={[0.12, 0.33, 1.05]}>
        <sphereGeometry args={[0.01, 8, 8]} />
        <meshStandardMaterial emissive="#00FF00" emissiveIntensity={1} />
      </mesh>
      
      {/* Information label (for accessibility) */}
      <Text
        position={[0, 1.2, 0]}
        rotation={[0, Math.PI - rotation[1], 0]}
        fontSize={0.1}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        visible={false} // Hidden but will be shown on interaction
      >
        Console Gaming Area
      </Text>
    </group>
  );
}
