import { Suspense, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { KeyboardControls } from "@react-three/drei";
import Experience from "./components/Experience";
import Loader from "./components/Loader";
import UI from "./components/UI";
import "@fontsource/inter";

// Define control keys for navigation
const controls = [
  { name: "forward", keys: ["KeyW", "ArrowUp"] },
  { name: "backward", keys: ["KeyS", "ArrowDown"] },
  { name: "leftward", keys: ["KeyA", "ArrowLeft"] },
  { name: "rightward", keys: ["KeyD", "ArrowRight"] },
  { name: "interact", keys: ["KeyE"] },
  { name: "toggleLight", keys: ["KeyL"] },
];

function App() {
  const [loaded, setLoaded] = useState(false);
  const [showCanvas, setShowCanvas] = useState(false);

  // Ensure everything is loaded before displaying the canvas
  useEffect(() => {
    setShowCanvas(true);
    // Load fonts or any other resources here if needed
  }, []);

  return (
    <div className="h-screen w-screen bg-black">
      {showCanvas && (
        <KeyboardControls map={controls}>
          <Canvas
            shadows
            camera={{
              position: [0, 1.8, 4],
              fov: 60,
              near: 0.1,
              far: 200
            }}
            gl={{
              antialias: true,
              powerPreference: "default"
            }}
          >
            <color attach="background" args={["#000000"]} />
            <fog attach="fog" args={["#000000", 10, 20]} />
            
            <Suspense fallback={null}>
              <Experience onLoaded={() => setLoaded(true)} />
            </Suspense>
          </Canvas>
          
          <UI />
          {!loaded && <Loader />}
        </KeyboardControls>
      )}
    </div>
  );
}

export default App;
