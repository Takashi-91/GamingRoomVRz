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

export function TVModel(props: ModelProps) {
  // Load the GLTF SetupModel using useGLTF hook
  const { nodes, materials } = useGLTF('/TV.glb') as any;

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
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tv1_2.geometry}
        material={materials.Tv1_Stand_Material}
      />
    </group>
  </group>
)
}


useGLTF.preload('/TV.glb')
