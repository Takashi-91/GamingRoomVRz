import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";
import Room from "./Room";
import GamingSetup from "./GamingSetup";
import Couch from "./Couch";
import ArcadeMachine from "./ArcadeMachine";
import VRStand from "./TVStand";
import Lighting from "./Lighting";
import WallDecor from "./WallDecor";
import { useInteraction } from "../lib/stores/useInteraction";
import { useAudio } from "../lib/stores/useAudio";
import { CoffeeTableModel } from "./CoffeeTableModel";
import TVStand from "./TVStand";
import TV from "./TV";  
import { Play } from "lucide-react";
import PlaystationSetup from "./PlaystationSetup";

interface ExperienceProps {
  onLoaded: () => void;
}

export default function Experience({ onLoaded }: ExperienceProps) {
  const { camera } = useThree();
  const controlsRef = useRef<any>(null);
  const { init: initInteraction, setCamera, setControls } = useInteraction();

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
      controlsRef.current.maxPolarAngle = Math.PI * 0.90; // Limit looking up
      controlsRef.current.minDistance = 2; // Minimum zoom
      controlsRef.current.maxDistance = 3; // Maximum zoom
      
      // Pass the controls to the interaction system
      setControls(controlsRef.current);
      
      // Also set the camera (backup in case the automatic detection fails)
      if (camera) {
        setCamera(camera);
      }
    }
  }, [camera, setCamera, setControls]);

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
      <GamingSetup position={[-1.2, 0, -4]} rotation={[0, Math.PI * 0.25, 0]} />
      
      {/* Couch area */}
      <Couch position={[1.5, 0, -0.1]} rotation={[0, -Math.PI * 0.5, 0]} />
      
      {/* Retro arcade machine */}
      <ArcadeMachine position={[1.5, 0, -4]} rotation={[0, -Math.PI * 0.25, 0]} />
      
      <PlaystationSetup position ={[-1.6, 0.5, -0.3]} rotation={[0, Math.PI * 0.50, 0]}/>

      <TV position={[-1.6, 0.5, -0.3]} rotation={[0, Math.PI * 0.50, 0]} />
      {/* VR headset stand */}
      <TVStand position={[-1.5, -0.8, -1]} rotation={[0, Math.PI * 0.50, 0]} />
 
      
      {/* Dynamic lighting system */}
      <Lighting />
    </>
  );
}
