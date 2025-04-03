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
      <group ref={posterGroup}>
        {/* Gaming poster 1 */}
        <group position={[-4.95, 1.8, -2]}>
          <mesh receiveShadow>
            <planeGeometry args={[1.2, 0.8]} />
            <meshStandardMaterial color="#112266" emissive="#112266" emissiveIntensity={0.2} />
          </mesh>
          
          <Text
            position={[0, 0, 0.01]}
            fontSize={0.1}
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
            maxWidth={1}
            textAlign="center"
          >
            PIXEL LEGENDS
          </Text>
        </group>
        
        {/* Gaming poster 2 */}
        <group position={[4.95, 1.8, -1]}>
          <mesh receiveShadow>
            <planeGeometry args={[1.2, 0.8]} />
            <meshStandardMaterial color="#661122" emissive="#661122" emissiveIntensity={0.2} />
          </mesh>
          
          <Text
            position={[0, 0, 0.01]}
            fontSize={0.1}
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
            maxWidth={1}
            textAlign="center"
          >
            BATTLE ARENA
          </Text>
        </group>
        
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
      
      {/* Bookshelves */}
      <group ref={shelfGroup}>
        {/* Bookshelf 1 */}
        <group position={[-4.9, 1, 0]}>
          {/* Main shelf structure */}
          <mesh receiveShadow castShadow>
            <boxGeometry args={[0.3, 2, 1.5]} />
            <meshStandardMaterial 
              map={woodTexture} 
              color="#5D4037" 
              roughness={0.8} 
            />
          </mesh>
          
          {/* Shelf dividers */}
          <mesh position={[0, 0.3, 0]} receiveShadow castShadow>
            <boxGeometry args={[0.3, 0.03, 1.5]} />
            <meshStandardMaterial 
              map={woodTexture} 
              color="#4E342E" 
              roughness={0.8} 
            />
          </mesh>
          
          <mesh position={[0, -0.3, 0]} receiveShadow castShadow>
            <boxGeometry args={[0.3, 0.03, 1.5]} />
            <meshStandardMaterial 
              map={woodTexture} 
              color="#4E342E" 
              roughness={0.8} 
            />
          </mesh>
          
          {/* Books on shelves */}
          <group position={[0, 0.5, 0]}>
            {/* Books are simplified blocks with different colors */}
            <mesh position={[0, 0, -0.4]} receiveShadow castShadow>
              <boxGeometry args={[0.2, 0.25, 0.5]} />
              <meshStandardMaterial color="#2E7D32" roughness={0.9} />
            </mesh>
            
            <mesh position={[0, 0, -0.1]} receiveShadow castShadow>
              <boxGeometry args={[0.2, 0.3, 0.15]} />
              <meshStandardMaterial color="#1565C0" roughness={0.9} />
            </mesh>
            
            <mesh position={[0, 0, 0.1]} receiveShadow castShadow>
              <boxGeometry args={[0.2, 0.2, 0.2]} />
              <meshStandardMaterial color="#C62828" roughness={0.9} />
            </mesh>
            
            <mesh position={[0, 0, 0.3]} receiveShadow castShadow>
              <boxGeometry args={[0.2, 0.25, 0.3]} />
              <meshStandardMaterial color="#6A1B9A" roughness={0.9} />
            </mesh>
          </group>
          
          {/* Gaming collectibles on middle shelf */}
          <group position={[0, 0, 0]}>
            <mesh position={[0, 0, -0.4]} receiveShadow castShadow>
              <boxGeometry args={[0.15, 0.15, 0.15]} />
              <meshStandardMaterial color="#F57F17" roughness={0.7} metalness={0.3} />
            </mesh>
            
            <mesh position={[0, 0, 0]} receiveShadow castShadow>
              <sphereGeometry args={[0.1, 8, 8]} />
              <meshStandardMaterial color="#F06292" roughness={0.8} />
            </mesh>
            
            <mesh position={[0, 0, 0.4]} receiveShadow castShadow>
              <cylinderGeometry args={[0.05, 0.05, 0.2, 8]} />
              <meshStandardMaterial color="#4DB6AC" roughness={0.6} metalness={0.4} />
            </mesh>
          </group>
          
          {/* Bottom shelf with game cases */}
          <group position={[0, -0.5, 0]}>
            <mesh position={[0, 0, -0.45]} receiveShadow castShadow>
              <boxGeometry args={[0.2, 0.3, 0.05]} />
              <meshStandardMaterial color="#424242" roughness={0.8} />
            </mesh>
            
            <mesh position={[0, 0, -0.35]} receiveShadow castShadow>
              <boxGeometry args={[0.2, 0.3, 0.05]} />
              <meshStandardMaterial color="#424242" roughness={0.8} />
            </mesh>
            
            <mesh position={[0, 0, -0.25]} receiveShadow castShadow>
              <boxGeometry args={[0.2, 0.3, 0.05]} />
              <meshStandardMaterial color="#424242" roughness={0.8} />
            </mesh>
            
            <mesh position={[0, 0, 0]} receiveShadow castShadow>
              <boxGeometry args={[0.2, 0.2, 0.4]} />
              <meshStandardMaterial color="#212121" roughness={0.8} metalness={0.2} />
            </mesh>
            
            <mesh position={[0, 0, 0.4]} receiveShadow castShadow>
              <boxGeometry args={[0.2, 0.15, 0.15]} />
              <meshStandardMaterial color="#0D47A1" roughness={0.6} />
            </mesh>
          </group>
        </group>
      </group>
      
      {/* Floating Shelves */}
      <group position={[4.9, 1.5, 2]}>
        {/* Top shelf */}
        <mesh receiveShadow castShadow position={[0, 0.5, 0]}>
          <boxGeometry args={[0.3, 0.05, 1.2]} />
          <meshStandardMaterial 
            map={woodTexture} 
            color="#5D4037" 
            roughness={0.8} 
          />
        </mesh>
        
        {/* Bottom shelf */}
        <mesh receiveShadow castShadow position={[0, 0, 0]}>
          <boxGeometry args={[0.3, 0.05, 1.2]} />
          <meshStandardMaterial 
            map={woodTexture} 
            color="#5D4037" 
            roughness={0.8} 
          />
        </mesh>
        
        {/* Decorative items */}
        <mesh position={[0, 0.6, -0.4]} receiveShadow castShadow>
          <sphereGeometry args={[0.1, 8, 8]} />
          <meshStandardMaterial color="#F44336" roughness={0.6} />
        </mesh>
        
        <mesh position={[0, 0.6, 0]} receiveShadow castShadow>
          <boxGeometry args={[0.15, 0.2, 0.15]} />
          <meshStandardMaterial color="#4CAF50" roughness={0.8} />
        </mesh>
        
        <mesh position={[0, 0.6, 0.4]} receiveShadow castShadow>
          <cylinderGeometry args={[0.08, 0.08, 0.2, 8]} />
          <meshStandardMaterial color="#2196F3" roughness={0.7} />
        </mesh>
        
        {/* Bottom shelf items */}
        <mesh position={[0, 0.15, -0.3]} receiveShadow castShadow>
          <boxGeometry args={[0.2, 0.25, 0.1]} />
          <meshStandardMaterial color="#3F51B5" roughness={0.8} />
        </mesh>
        
        <mesh position={[0, 0.15, 0.2]} receiveShadow castShadow>
          <boxGeometry args={[0.2, 0.3, 0.4]} />
          <meshStandardMaterial color="#212121" roughness={0.7} />
        </mesh>
      </group>
    </group>
  );
}
