import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";
import { useInteraction } from "../lib/stores/useInteraction";
import { useAudio } from "../lib/stores/useAudio";
import { SofaModel } from "./sofaModel";

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
      registerInteractiveObject(couchRef.current, "Couch & Controllers", () => {
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
      });
      couchRef.current.userData.registered = true;
    }
  });

  return (
    <group ref={couchRef} position={position} rotation={rotation} name="couch-area">
     <SofaModel nodes={{}} materials={{}}/>
    </group>
  );
}
