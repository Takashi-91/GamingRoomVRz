import { useRef } from "react";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

export default function Room() {
  const roomRef = useRef<THREE.Group>(null);
  
  // Load textures
  const woodTexture = useTexture("/textures/wood.jpg");
  
  // Configure texture repeat for larger surfaces
  woodTexture.wrapS = woodTexture.wrapT = THREE.RepeatWrapping;
  woodTexture.repeat.set(4, 4);
  
  // Basic room dimensions
  const roomWidth = 10;
  const roomLength = 10;
  const roomHeight = 3.5;
  const wallThickness = 0.1;

  return (
    <group ref={roomRef} name="room">
      {/* Floor */}
      <mesh 
        receiveShadow 
        position={[0, 0, 0]} 
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <planeGeometry args={[roomWidth, roomLength]} />
        <meshStandardMaterial 
          map={woodTexture} 
          color="#8B4513" 
          roughness={0.8}
        />
      </mesh>

      {/* Ceiling */}
      <mesh 
        position={[0, roomHeight, 0]} 
        rotation={[Math.PI / 2, 0, 0]}
      >
        <planeGeometry args={[roomWidth, roomLength]} />
        <meshStandardMaterial color="#CCCCCC" roughness={1} />
      </mesh>

      {/* Left Wall */}
      <mesh 
        receiveShadow 
        position={[-roomWidth / 2, roomHeight / 2, 0]} 
        rotation={[0, Math.PI / 2, 0]}
      >
        <planeGeometry args={[roomLength, roomHeight]} />
        <meshStandardMaterial color="#E8E8E8" roughness={0.9} />
      </mesh>

      {/* Right Wall */}
      <mesh 
        receiveShadow 
        position={[roomWidth / 2, roomHeight / 2, 0]} 
        rotation={[0, -Math.PI / 2, 0]}
      >
        <planeGeometry args={[roomLength, roomHeight]} />
        <meshStandardMaterial color="#E0E0E0" roughness={0.9} />
      </mesh>

      {/* Back Wall */}
      <mesh 
        receiveShadow 
        position={[0, roomHeight / 2, -roomLength / 2]} 
      >
        <planeGeometry args={[roomWidth, roomHeight]} />
        <meshStandardMaterial color="#D8D8D8" roughness={0.9} />
      </mesh>

      {/* Front Wall (with door cutout) */}
      <group position={[0, roomHeight / 2, roomLength / 2]}>
        {/* Main front wall */}
        <mesh receiveShadow rotation={[0, Math.PI, 0]}>
          <planeGeometry args={[roomWidth, roomHeight]} />
          <meshStandardMaterial color="#D0D0D0" roughness={0.9} />
        </mesh>
        
        {/* Door cutout (negative space) */}
        <mesh position={[2, -roomHeight/4, 0.01]} rotation={[0, Math.PI, 0]}>
          <planeGeometry args={[2, roomHeight/2]} />
          <meshBasicMaterial color="#000000" transparent opacity={0} />
        </mesh>
      </group>

      {/* Base boards */}
      <group>
        {/* Left base board */}
        <mesh position={[-roomWidth/2 + wallThickness/2, wallThickness/2, 0]}>
          <boxGeometry args={[wallThickness, wallThickness, roomLength]} />
          <meshStandardMaterial color="#5D4037" />
        </mesh>
        
        {/* Right base board */}
        <mesh position={[roomWidth/2 - wallThickness/2, wallThickness/2, 0]}>
          <boxGeometry args={[wallThickness, wallThickness, roomLength]} />
          <meshStandardMaterial color="#5D4037" />
        </mesh>
        
        {/* Back base board */}
        <mesh position={[0, wallThickness/2, -roomLength/2 + wallThickness/2]}>
          <boxGeometry args={[roomWidth, wallThickness, wallThickness]} />
          <meshStandardMaterial color="#5D4037" />
        </mesh>
        
        {/* Front base board - split for door opening */}
        <mesh position={[-roomWidth/4 - 1, wallThickness/2, roomLength/2 - wallThickness/2]}>
          <boxGeometry args={[roomWidth/2 - 1, wallThickness, wallThickness]} />
          <meshStandardMaterial color="#5D4037" />
        </mesh>
        
        <mesh position={[roomWidth/4 + 1, wallThickness/2, roomLength/2 - wallThickness/2]}>
          <boxGeometry args={[roomWidth/2 - 1, wallThickness, wallThickness]} />
          <meshStandardMaterial color="#5D4037" />
        </mesh>
      </group>
    </group>
  );
}
