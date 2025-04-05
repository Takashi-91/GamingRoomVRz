import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";
import { useInteraction } from "../lib/stores/useInteraction";
import { useLighting } from "../lib/stores/useLighting";
import { useAudio } from "../lib/stores/useAudio";
import { SetupModel } from "./SetupModel";

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
      // Register the monitor as interactive
      registerInteractiveObject(
        monitorRef.current,
        "Monitor",
        "pc",
        "A 27-inch high refresh rate gaming monitor with 144Hz and 1ms response time. Perfect for fast-paced games with minimal motion blur.",
        () => {
          // Toggle monitor on/off
          if (monitorRef.current) {
            const material = monitorRef.current.material as THREE.MeshStandardMaterial;
            material.emissive.set(
              material.emissive.r === 0 ? "#104060" : "#000000"
            );
            playHit();
          }
        }
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
     <SetupModel nodes={{}} materials={{}} />
    </group>
  );
}
