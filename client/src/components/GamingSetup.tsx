import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";
import { useInteraction } from "../lib/stores/useInteraction";
import { useLighting } from "../lib/stores/useLighting";
import { useAudio } from "../lib/stores/useAudio";

interface GamingSetupProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
}

export default function GamingSetup({ position = [0, 0, 0], rotation = [0, 0, 0] }: GamingSetupProps) {
  const setupRef = useRef<THREE.Group>(null);
  const pcRef = useRef<THREE.Group>(null);
  const monitorRef = useRef<THREE.Mesh>(null);
  const keyboardRef = useRef<THREE.Mesh>(null);
  const chairRef = useRef<THREE.Group>(null);
  const rgbLightRef = useRef<THREE.PointLight>(null);
  
  const { registerInteractiveObject } = useInteraction();
  const { rgbColor } = useLighting();
  const { playHit } = useAudio();
  
  // PC animation (fans, lights)
  useFrame((state, delta) => {
    if (rgbLightRef.current) {
      rgbLightRef.current.color = new THREE.Color(rgbColor);
      rgbLightRef.current.intensity = 0.5 + Math.sin(state.clock.elapsedTime * 2) * 0.2;
    }
  });
  
  // Register interactive elements when component mounts
  useEffect(() => {
    if (setupRef.current) {
      // Register the entire setup as interactive
      registerInteractiveObject(
        setupRef.current,
        "Gaming Setup",
        "pc",
        "A complete gaming workstation with a high-performance PC, RGB lighting, mechanical keyboard, and ergonomic chair. This setup is perfect for both intensive gaming and productivity work."
      );
    }
    
    if (pcRef.current) {
      // Register the PC tower as interactive
      registerInteractiveObject(
        pcRef.current,
        "Gaming PC",
        "pc",
        "A custom gaming PC with RGB lighting, high-end graphics card, and liquid cooling. Features a transparent side panel to showcase the internal components and lighting effects."
      );
    }
    
    if (monitorRef.current) {
      // Register the monitor as interactive with projects and social links
      registerInteractiveObject(
        monitorRef.current,
        "My Portfolio Monitor",
        "pc",
        "Welcome to my interactive portfolio! This interactive display showcases my projects and social media links. Click to browse through my work and connect with me.",
        () => {
          // Turn on the monitor
          if (monitorRef.current) {
            const material = monitorRef.current.material as THREE.MeshStandardMaterial;
            material.emissive.set("#104060");
            playHit();
          }
        },
        [
          {
            text: "GitHub Profile",
            url: "https://github.com/yourusername",
            icon: "🐙"
          },
          {
            text: "LinkedIn",
            url: "https://linkedin.com/in/yourusername",
            icon: "🔗"
          },
          {
            text: "Personal Website",
            url: "https://yourwebsite.com",
            icon: "🌐"
          },
          {
            text: "Twitter/X",
            url: "https://twitter.com/yourusername",
            icon: "🐦"
          },
          {
            text: "Project: Weather App",
            url: "https://github.com/yourusername/weather-app",
            icon: "☁️"
          },
          {
            text: "Project: Task Manager",
            url: "https://github.com/yourusername/task-manager",
            icon: "📝"
          }
        ],
        true // Mark as monitor for special UI
      );
    }
    
    if (keyboardRef.current) {
      // Register keyboard as interactive
      registerInteractiveObject(
        keyboardRef.current,
        "Mechanical Keyboard",
        "pc",
        "A custom mechanical keyboard with Cherry MX Brown switches, PBT keycaps, and programmable RGB lighting. The tactile feedback provides a satisfying typing experience."
      );
    }
    
    if (chairRef.current) {
      // Register chair as interactive
      registerInteractiveObject(
        chairRef.current,
        "Gaming Chair",
        "pc",
        "An ergonomic gaming chair with adjustable height, lumbar support, and armrests. Designed for comfort during long gaming sessions."
      );
    }
  }, [registerInteractiveObject, playHit]);

  return (
    <group ref={setupRef} position={position} rotation={rotation} name="gaming-setup">
      {/* Gaming Desk */}
      <mesh receiveShadow castShadow position={[0, 0.4, 0]}>
        <boxGeometry args={[1.6, 0.05, 0.8]} />
        <meshStandardMaterial color="#2C2C2C" roughness={0.8} />
      </mesh>
      
      {/* Desk legs */}
      <mesh receiveShadow castShadow position={[-0.7, 0.2, 0.35]}>
        <boxGeometry args={[0.05, 0.4, 0.05]} />
        <meshStandardMaterial color="#1A1A1A" roughness={0.5} />
      </mesh>
      
      <mesh receiveShadow castShadow position={[0.7, 0.2, 0.35]}>
        <boxGeometry args={[0.05, 0.4, 0.05]} />
        <meshStandardMaterial color="#1A1A1A" roughness={0.5} />
      </mesh>
      
      <mesh receiveShadow castShadow position={[-0.7, 0.2, -0.35]}>
        <boxGeometry args={[0.05, 0.4, 0.05]} />
        <meshStandardMaterial color="#1A1A1A" roughness={0.5} />
      </mesh>
      
      <mesh receiveShadow castShadow position={[0.7, 0.2, -0.35]}>
        <boxGeometry args={[0.05, 0.4, 0.05]} />
        <meshStandardMaterial color="#1A1A1A" roughness={0.5} />
      </mesh>
      
      {/* PC Tower */}
      <group ref={pcRef} position={[-0.5, 0.55, 0]}>
        <mesh receiveShadow castShadow>
          <boxGeometry args={[0.3, 0.5, 0.5]} />
          <meshStandardMaterial color="#0A0A0A" roughness={0.6} metalness={0.4} />
        </mesh>
        
        {/* PC Front panel */}
        <mesh position={[0.151, 0, 0]}>
          <boxGeometry args={[0.01, 0.48, 0.48]} />
          <meshStandardMaterial 
            color="#151515" 
            emissive={rgbColor}
            emissiveIntensity={0.2}
            roughness={0.7} 
          />
        </mesh>
        
        {/* Power button */}
        <mesh position={[0.16, 0.2, 0]} castShadow>
          <cylinderGeometry args={[0.01, 0.01, 0.01, 8]} />
          <meshStandardMaterial color="#404040" emissive="#00FF00" emissiveIntensity={1} />
        </mesh>
        
        {/* RGB lighting for PC */}
        <pointLight 
          ref={rgbLightRef}
          position={[0, 0, 0]} 
          intensity={0.8} 
          distance={0.6}
          color={rgbColor}
        />
      </group>
      
      {/* Monitor */}
      <group position={[0.1, 0.75, -0.1]}>
        <mesh ref={monitorRef} receiveShadow castShadow rotation={[0, 0, 0]}>
          <boxGeometry args={[0.6, 0.35, 0.02]} />
          <meshStandardMaterial 
            color="#0A0A0A" 
            roughness={0.5} 
            metalness={0.5}
            emissive="#000000"
          />
        </mesh>
        
        {/* Monitor Stand */}
        <mesh receiveShadow castShadow position={[0, -0.2, 0.05]}>
          <boxGeometry args={[0.1, 0.05, 0.1]} />
          <meshStandardMaterial color="#1A1A1A" roughness={0.6} />
        </mesh>
        
        <mesh receiveShadow castShadow position={[0, -0.1, 0.05]}>
          <boxGeometry args={[0.03, 0.2, 0.03]} />
          <meshStandardMaterial color="#1A1A1A" roughness={0.6} />
        </mesh>
      </group>
      
      {/* Keyboard */}
      <mesh ref={keyboardRef} receiveShadow castShadow position={[0.1, 0.425, 0.1]}>
        <boxGeometry args={[0.4, 0.02, 0.15]} />
        <meshStandardMaterial color="#1A1A1A" roughness={0.7} />
      </mesh>
      
      {/* Mouse */}
      <mesh receiveShadow castShadow position={[0.4, 0.425, 0.1]}>
        <boxGeometry args={[0.06, 0.02, 0.1]} />
        <meshStandardMaterial color="#1A1A1A" roughness={0.7} />
      </mesh>
      
      {/* Mousepad */}
      <mesh receiveShadow position={[0.4, 0.415, 0.1]}>
        <boxGeometry args={[0.2, 0.005, 0.2]} />
        <meshStandardMaterial color="#0A0A0A" roughness={1} />
      </mesh>
      
      {/* Chair */}
      <group ref={chairRef} position={[0, 0.4, 0.6]}>
        {/* Chair seat */}
        <mesh receiveShadow castShadow position={[0, 0, 0]}>
          <boxGeometry args={[0.5, 0.05, 0.5]} />
          <meshStandardMaterial color="#212121" roughness={0.9} />
        </mesh>
        
        {/* Chair back */}
        <mesh receiveShadow castShadow position={[0, 0.3, -0.25]}>
          <boxGeometry args={[0.48, 0.6, 0.05]} />
          <meshStandardMaterial color="#212121" roughness={0.9} />
        </mesh>
        
        {/* Chair base */}
        <mesh receiveShadow castShadow position={[0, -0.15, 0]}>
          <cylinderGeometry args={[0.25, 0.3, 0.05, 16]} />
          <meshStandardMaterial color="#1A1A1A" roughness={0.7} metalness={0.3} />
        </mesh>
        
        {/* Chair leg */}
        <mesh receiveShadow castShadow position={[0, -0.2, 0]}>
          <cylinderGeometry args={[0.03, 0.03, 0.3, 8]} />
          <meshStandardMaterial color="#1A1A1A" metalness={0.5} roughness={0.5} />
        </mesh>
        
        {/* Chair wheels */}
        <mesh receiveShadow castShadow position={[0.2, -0.35, 0.2]}>
          <sphereGeometry args={[0.04, 8, 8]} />
          <meshStandardMaterial color="#0A0A0A" roughness={0.5} />
        </mesh>
        
        <mesh receiveShadow castShadow position={[-0.2, -0.35, 0.2]}>
          <sphereGeometry args={[0.04, 8, 8]} />
          <meshStandardMaterial color="#0A0A0A" roughness={0.5} />
        </mesh>
        
        <mesh receiveShadow castShadow position={[0.2, -0.35, -0.2]}>
          <sphereGeometry args={[0.04, 8, 8]} />
          <meshStandardMaterial color="#0A0A0A" roughness={0.5} />
        </mesh>
        
        <mesh receiveShadow castShadow position={[-0.2, -0.35, -0.2]}>
          <sphereGeometry args={[0.04, 8, 8]} />
          <meshStandardMaterial color="#0A0A0A" roughness={0.5} />
        </mesh>
        
        <mesh receiveShadow castShadow position={[0, -0.35, -0.25]}>
          <sphereGeometry args={[0.04, 8, 8]} />
          <meshStandardMaterial color="#0A0A0A" roughness={0.5} />
        </mesh>
      </group>
      
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
        Gaming PC Setup
      </Text>
    </group>
  );
}
