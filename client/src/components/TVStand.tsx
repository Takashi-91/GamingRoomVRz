import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";
import { useInteraction } from "../lib/stores/useInteraction";
import { useAudio } from "../lib/stores/useAudio";
import { useLighting } from "../lib/stores/useLighting";
import { Coffee } from "lucide-react";
import { CoffeeTableModel } from "./CoffeeTableModel";

interface VRStandProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
}

export default function TVStand({ position = [0, 0, 0], rotation = [0, 0, 0] }: VRStandProps) {
  const vrRef = useRef<THREE.Group>(null);
  const headsetRef = useRef<THREE.Mesh>(null);
  const controllerLeftRef = useRef<THREE.Mesh>(null);
  const controllerRightRef = useRef<THREE.Mesh>(null);
  const standRef = useRef<THREE.Mesh>(null);
  const lightRef = useRef<THREE.PointLight>(null);
  
  const { registerInteractiveObject } = useInteraction();
  const { playHit, playSuccess } = useAudio();
  const { rgbColor } = useLighting();
  
  // VR headset light animation
  useFrame((state, delta) => {
    if (lightRef.current) {
      lightRef.current.color = new THREE.Color(rgbColor);
      lightRef.current.intensity = 0.2 + Math.sin(state.clock.elapsedTime * 1.5) * 0.1;
    }
  });
  
  // Animate headset slightly to simulate a "pickup" effect
  const animateHeadset = () => {
    if (headsetRef.current) {
      const currentY = headsetRef.current.position.y;
      headsetRef.current.position.y = currentY + 0.1;
      playHit();
      
      setTimeout(() => {
        if (headsetRef.current) headsetRef.current.position.y = currentY;
      }, 300);
    }
  };
  
  // Register interactive elements when component mounts
  useEffect(() => {
    if (vrRef.current) {
      // Register the entire VR setup
      registerInteractiveObject(
        vrRef.current,
        "VR Gaming Station",
        "vr",
        "A complete virtual reality gaming setup with a high-end headset and motion controllers. This setup provides an immersive gaming experience with full 360-degree tracking."
      );
    }
    
    if (headsetRef.current) {
      // Register the headset specifically
      registerInteractiveObject(
        headsetRef.current,
        "VR Headset",
        "vr",
        "A high-resolution VR headset with integrated audio and inside-out tracking. Features dual OLED displays with a combined resolution of 2880x1600, providing crisp visuals and deep blacks for immersive experiences.",
        animateHeadset
      );
    }
    
    if (controllerLeftRef.current) {
      // Register left controller
      registerInteractiveObject(
        controllerLeftRef.current,
        "Left VR Controller",
        "vr",
        "Motion controller for the left hand with precise tracking. Includes analog sticks, buttons, and haptic feedback for interacting with virtual environments."
      );
    }
    
    if (controllerRightRef.current) {
      // Register right controller
      registerInteractiveObject(
        controllerRightRef.current,
        "Right VR Controller",
        "vr",
        "Motion controller for the right hand with precise tracking. Includes analog sticks, buttons, and haptic feedback for interacting with virtual environments."
      );
    }
    
    if (standRef.current) {
      // Register the stand
      registerInteractiveObject(
        standRef.current,
        "VR Headset Stand",
        "vr",
        "A premium stand designed to hold and display the VR headset and controllers when not in use. The weighted base provides stability while showing off your gaming equipment."
      );
    }
  }, [registerInteractiveObject, playHit]);

  return (
    <group ref={vrRef} position={position} rotation={rotation} name="vr-stand">
      <CoffeeTableModel nodes={{}} materials={{}}/>
      {/* Information label (for accessibility) */}
      <Text
        position={[0, 1.5, 0]}
        rotation={[0, Math.PI - rotation[1], 0]}
        fontSize={0.1}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        visible={false} // Hidden but will be shown on interaction
      >
        VR Headset Stand
      </Text>
    </group>
    

  );
}
