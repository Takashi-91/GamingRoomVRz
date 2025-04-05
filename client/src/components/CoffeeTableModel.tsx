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

export function CoffeeTableModel(props: ModelProps) {
  // Load the GLTF SetupModel using useGLTF hook
  const { nodes, materials } = useGLTF('/coffee_table.glb') as any;

  return (
    <group {...props} dispose={null}>
    <group rotation={[-Math.PI / 2, 0, 0]} scale={[0.524, 0.207, 0.35]}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_2.geometry}
        material={materials['None.001']}
        scale={[0.553, 1, 0.687]}
        position={[-1.5, 0, 2]}
        
      />
    </group>
  </group>
)
}

useGLTF.preload('/coffee_table.glb')
