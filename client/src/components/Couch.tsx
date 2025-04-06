import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";
import { useInteraction } from "../lib/stores/useInteraction";
import { useAudio } from "../lib/stores/useAudio";
import {SofaModel} from "./SofaModel";

interface CouchProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
}

export default function Couch({ position = [0, 0, 0], rotation = [0, 0, 0] }: CouchProps) {
  const couchRef = useRef<THREE.Group>(null);
  const controllerRef = useRef<THREE.Mesh>(null);
  
  const { registerInteractiveObject } = useInteraction();
  const { playHit } = useAudio();
  
  // Register interactive element

  return (
    <group ref={couchRef} position={position} rotation={rotation} name="couch-area">
     <SofaModel nodes={{}} materials={{}}/>
    </group>
  );
}
