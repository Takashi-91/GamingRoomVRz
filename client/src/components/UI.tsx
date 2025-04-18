import { useState, useEffect } from "react";
import { useKeyboardControls } from "@react-three/drei";
import { useAudio } from "../lib/stores/useAudio";
import { useLighting } from "../lib/stores/useLighting";
import { useInteraction } from "../lib/stores/useInteraction";
import { cn } from "../lib/utils";
import { ObjectDetails } from "./ui/ObjectDetails";

export default function UI() {
  const [showControls, setShowControls] = useState(false);
  const [showInfo, setShowInfo] = useState(true);
  const isMuted = useAudio((state) => state.isMuted);
  const { toggleMute } = useAudio();
  const { rgbColor, lightMode, toggleLightMode } = useLighting();
  const isInspecting = useInteraction((state) => state.isInspecting);
  
  // Fade out info message after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowInfo(false);
    }, 5000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Convert rgb hex to rgb css color
  const getRgbStyle = () => {
    const hexToRgb = (hex: string) => {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return `rgb(${r}, ${g}, ${b})`;
    };
    
    return {
      color: hexToRgb(rgbColor),
      textShadow: `0 0 10px ${hexToRgb(rgbColor)}`,
    };
  };

  return (
    <div className="fixed inset-0 pointer-events-none">
      {/* Top bar - controls and info - hide when inspecting an object */}
      {!isInspecting && (
        <div className="absolute top-0 left-0 right-0 flex justify-between items-center p-4">
          <div className="flex gap-2">
            <button 
              className="bg-black/70 text-white px-4 py-2 rounded pointer-events-auto hover:bg-black/90 transition-colors"
              onClick={() => setShowControls(!showControls)}
            >
              Controls
            </button>
            
            <button 
              className="bg-black/70 text-white px-4 py-2 rounded pointer-events-auto hover:bg-black/90 transition-colors"
              onClick={toggleMute}
            >
              {isMuted ? "🔇 Unmute" : "🔊 Mute"}
            </button>
            
          </div>
          
          <div className="text-white px-4 py-2 bg-black/70 rounded">
            Welcome to the VR Experience
          </div>
        </div>
      )}
      
      {/* Controls modal */}
      {showControls && !isInspecting && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/60 pointer-events-auto">
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-lg max-w-md">
            <h2 className="text-white text-xl font-bold mb-4">Controls</h2>
            
            <ul className="text-white space-y-2">
              <li className="flex justify-between">
                <span>Camera Movement:</span>
                <span>Click + Drag or Arrow Keys / WASD</span>
              </li>
              <li className="flex justify-between">
                <span>Camera Zoom:</span>
                <span>Mouse Wheel</span>
              </li>
              <li className="flex justify-between">
                <span>Interact with Objects:</span>
                <span>Click on them</span>
              </li>
              <li className="flex justify-between">
                <span>Toggle RGB Lighting:</span>
                <span>L Key</span>
              </li>
              <li className="flex justify-between">
                <span>Exit Focus Mode:</span>
                <span>Click anywhere or press Escape</span>
              </li>
            </ul>
            
            <button 
              className="mt-6 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded w-full transition-colors"
              onClick={() => setShowControls(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
      
      {/* Info message - hide when inspecting */}
      {!isInspecting && (
        <div className={cn(
          "absolute bottom-8 left-1/2 -translate-x-1/2 bg-black/70 text-white px-6 py-3 rounded-lg transition-opacity duration-1000",
          showInfo ? "opacity-100" : "opacity-0"
        )}>
          Click and drag to look around. Click on objects to interact with them.
        </div>
      )}
      
      {/* Object details panel */}
      <ObjectDetails />
    </div>
  );
}
