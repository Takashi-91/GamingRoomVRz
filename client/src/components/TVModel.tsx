import React, { useState } from 'react';
import { useLoader } from '@react-three/fiber';
import { useGLTF, Html } from '@react-three/drei';
import * as THREE from 'three';

interface ModelProps {
  nodes: {
    [key: string]: THREE.Mesh;
  };
  materials: {
    [key: string]: THREE.MeshStandardMaterial;
  };
}

export function TVModel(props: Partial<ModelProps>) {
  // Load the GLTF model
  const { nodes, materials } = useGLTF('/TV.glb') as any;

  const [showDialog, setShowDialog] = useState(false);  // State for controlling the dialog visibility
  const handleTVClick = () => {
    setShowDialog(!showDialog);
  };

  // Load the TV screen image texture
  const screenTexture = useLoader(THREE.TextureLoader, '/Netflix-Spotify-1.png');

  // Apply texture to the TV screen (glass material)
  if (materials.Tv1_Glass_Material) {
    materials.Tv1_Glass_Material.map = screenTexture;
    materials.Tv1_Glass_Material.needsUpdate = true;
  }

  return (
    <group {...props} dispose={null}>
      <group scale={0.315}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Tv1_0.geometry}
          material={materials.Tv1_Material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Tv1_1.geometry}
          material={materials.Tv1_Glass_Material}
          onClick={handleTVClick}  // Toggle dialog visibility when clicked
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Tv1_2.geometry}
          material={materials.Tv1_Stand_Material}
        />
      </group>
    </group>
  );
}

// Preload the model for performance
useGLTF.preload('/TV.glb');
export default TVModel;