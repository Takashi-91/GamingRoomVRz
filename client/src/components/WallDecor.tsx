import { useRef } from "react";
import { Text } from "@react-three/drei";
import * as THREE from "three";
import { useTexture } from "@react-three/drei";

export default function WallDecor() {
  const posterGroup = useRef<THREE.Group>(null);
  const shelfGroup = useRef<THREE.Group>(null);
  
  // Load textures
  const woodTexture = useTexture("/textures/wood.jpg");
  
  // Configure texture repeat for wood
  woodTexture.wrapS = woodTexture.wrapT = THREE.RepeatWrapping;
  woodTexture.repeat.set(1, 1);

  return (
    <group name="wall-decor">
      {/* Posters on wall */}
        

        
        {/* Gaming poster 3 */}
        <group position={[0, 1.8, -4.95]} rotation={[0, 0, 0]}>
          <mesh receiveShadow>
            <planeGeometry args={[1.5, 1]} />
            <meshStandardMaterial color="#226611" emissive="#226611" emissiveIntensity={0.2} />
          </mesh>
          
          <Text
            position={[0, 0, 0.01]}
            fontSize={0.12}
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
            maxWidth={1.3}
            textAlign="center"
          >
            COSMIC JOURNEY
          </Text>
        </group>
      </group>
  );
}
