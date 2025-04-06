import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useInteraction } from "../lib/stores/useInteraction";
import { useAudio } from "../lib/stores/useAudio";
import { useLighting } from "../lib/stores/useLighting";
import { TVModel } from "./TVModel";

interface TVProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
}

// Dummy animate function as placeholder
const animateHeadset = () => {
  console.log("Animating headset...");
};

export default function TV({ position = [0, 0, 0], rotation = [0, 0, 0] }: TVProps) {
  const vrRef = useRef<THREE.Group>(null);
  const headsetRef = useRef<THREE.Group>(null);
  const controllerLeftRef = useRef<THREE.Group>(null);
  const controllerRightRef = useRef<THREE.Group>(null);
  const standRef = useRef<THREE.Group>(null);

  const { registerInteractiveObject } = useInteraction();
  const { playHit, playSuccess } = useAudio();
  const { rgbColor } = useLighting();

  // Animate with lighting effects if needed
  useFrame(() => {
    if (rgbColor) {
      // Example: Add RGB light pulsation or color effect here
    }
  });

  const experiences = [
    {
      text: "Experience: Google Earth VR",
      url: "https://arvr.google.com/earth/",
      icon: "🌎",
    },
    {
      text: "Experience: Beat Saber",
      url: "https://www.beatsaber.com/",
      icon: "🎵",
    },
    {
      text: "Experience: Half-Life: Alyx",
      url: "https://www.half-life.com/en/alyx/",
      icon: "🔫",
    },
    {
      text: "Experience: VRChat",
      url: "https://hello.vrchat.com/",
      icon: "👥",
    },
  ];

  useEffect(() => {

    if (vrRef.current) {
      registerInteractiveObject(
        vrRef.current,
        "VR Gaming Station",
        "vr",
        "A complete virtual reality gaming setup with a high-end headset and motion controllers. This setup provides an immersive gaming experience with full 360-degree tracking.",
        () => {
          const handleEvent = (e: Event) => {
            e.stopPropagation();
            playHit();
          };
          handleEvent(new Event("custom"));
        },
      );
    }

    if (headsetRef.current) {
      registerInteractiveObject(
        headsetRef.current,
        "VR Headset",
        "vr",
        "A high-resolution VR headset with integrated audio and inside-out tracking. Features dual OLED displays with a combined resolution of 2880x1600, providing crisp visuals and deep blacks for immersive experiences.",
        animateHeadset
      );
    }

    if (controllerLeftRef.current) {
      registerInteractiveObject(
        controllerLeftRef.current,
        "Left VR Controller",
        "vr",
        "Motion controller for the left hand with precise tracking. Includes analog sticks, buttons, and haptic feedback for interacting with virtual environments."
      );
    }

    if (controllerRightRef.current) {
      registerInteractiveObject(
        controllerRightRef.current,
        "Right VR Controller",
        "vr",
        "Motion controller for the right hand with precise tracking. Includes analog sticks, buttons, and haptic feedback for interacting with virtual environments."
      );
    }

    if (standRef.current) {
      registerInteractiveObject(
        standRef.current,
        "VR Headset Stand",
        "vr",
        "A premium stand designed to hold and display the VR headset and controllers when not in use. The weighted base provides stability while showing off your gaming equipment."
      );
    }
  }, [registerInteractiveObject, playHit]);

  return (
    <group position={position} rotation={rotation}>
      <group ref={vrRef} name="vr-setup">
        <TVModel nodes={{}} materials={{}} />
      </group>
      <group ref={headsetRef} name="vr-headset" />
      <group ref={controllerLeftRef} name="vr-controller-left" />
      <group ref={controllerRightRef} name="vr-controller-right" />
      <group ref={standRef} name="vr-stand" />
    </group>
  );
}
