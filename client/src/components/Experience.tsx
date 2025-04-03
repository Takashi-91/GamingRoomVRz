import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";
import Room from "./Room";
import GamingSetup from "./GamingSetup";
import Couch from "./Couch";
import ArcadeMachine from "./ArcadeMachine";
import VRStand from "./VRStand";
import Lighting from "./Lighting";
import WallDecor from "./WallDecor";
import { useInteraction } from "../lib/stores/useInteraction";
import { useAudio } from "../lib/stores/useAudio";

interface ExperienceProps {
  onLoaded: () => void;
}

export default function Experience({ onLoaded }: ExperienceProps) {
  const { camera } = useThree();
  const controlsRef = useRef<any>(null);
  const { init: initInteraction } = useInteraction();

  // Initialize audio elements
  useEffect(() => {
    // Background music
    const bgMusic = new Audio("/sounds/background.mp3");
    bgMusic.loop = true;
    bgMusic.volume = 0.3;
    
    // Interaction sounds
    const hitSound = new Audio("/sounds/hit.mp3");
    const successSound = new Audio("/sounds/success.mp3");

    // Set the audio in the store
    useAudio.getState().setBackgroundMusic(bgMusic);
    useAudio.getState().setHitSound(hitSound);
    useAudio.getState().setSuccessSound(successSound);

    // Initialize interaction system
    initInteraction();

    // Let parent know we're loaded
    onLoaded();
  }, [onLoaded, initInteraction]);

  // Add continuous rotation or special effects here if needed
  useFrame((state, delta) => {
    // Example: Smoothly update camera or other continuous effects
  });

  // Setup camera limits to prevent going through walls or objects
  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.minPolarAngle = Math.PI * 0.15; // Limit looking down
      controlsRef.current.maxPolarAngle = Math.PI * 0.75; // Limit looking up
      controlsRef.current.minDistance = 1.5; // Minimum zoom
      controlsRef.current.maxDistance = 6; // Maximum zoom
      
      // Constrain horizontal rotation as needed
      // controlsRef.current.minAzimuthAngle = -Math.PI * 0.5;
      // controlsRef.current.maxAzimuthAngle = Math.PI * 0.5;
    }
  }, []);

  return (
    <>
      {/* Main camera */}
      <PerspectiveCamera makeDefault position={[0, 1.8, 4]} />
      
      {/* User controls */}
      <OrbitControls
        ref={controlsRef}
        enableDamping
        dampingFactor={0.05}
        rotateSpeed={0.5}
        enableZoom={true}
        enablePan={false}
        target={[0, 1.6, 0]}
      />

      {/* Room structure and components */}
      <Room />
      
      {/* Gaming setup components */}
      <GamingSetup position={[-2, 0, -2]} rotation={[0, Math.PI * 0.25, 0]} />
      
      {/* Couch area */}
      <Couch position={[2, 0, 0]} rotation={[0, -Math.PI * 0.5, 0]} />
      
      {/* Retro arcade machine */}
      <ArcadeMachine position={[3, 0, -3]} rotation={[0, -Math.PI * 0.25, 0]} />
      
      {/* VR headset stand */}
      <VRStand position={[-2, 0, 1]} rotation={[0, Math.PI * 0.25, 0]} />
      
      {/* Wall decoration (posters, shelves, etc) */}
      <WallDecor />
      
      {/* Dynamic lighting system */}
      <Lighting />
    </>
  );
}
