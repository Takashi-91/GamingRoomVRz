import React from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

// Define the interface for the model props
interface ModelProps {
  nodes: {
    [key: string]: THREE.Mesh;
  };
  materials: {
    [key: string]: THREE.MeshStandardMaterial;
  };
}

export function SofaModel(props: ModelProps) {
  // Load the GLTF SetupModel using useGLTF hook
  const { nodes, materials } = useGLTF('/sofa.glb') as any;

  return (
    <group {...props} dispose={null}>
    <mesh
      castShadow
      receiveShadow
      geometry={nodes.geometry_0.geometry}
      material={nodes.geometry_0.material}
      position={[0, 0.5, 0]}
      scale={[2.658, 2, 2.559]}
    />
  </group>
  );
}

// Preload the GLTF SetupModel for better performance
useGLTF.preload('/sofa.glb');
