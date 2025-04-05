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

export function ConsoleModel(props: ModelProps) {
  // Load the GLTF SetupModel using useGLTF hook
  const { nodes, materials } = useGLTF('/ps5.glb') as any;

  return (
        <group {...props} dispose={null}>
          <group position={[0, -199.067, 197.453]} rotation={[-1.57, 0, 0]}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_2.geometry}
              material={materials['Glass_-_Heavy_Color']}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_3.geometry}
              material={materials['Plastic_-_Textured_-_Regular']}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_4.geometry}
              material={materials['Plastic_-_Translucent_Glossy_Blue']}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_5.geometry}
              material={materials['Plastic_-_Translucent_Glossy_Gray']}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_6.geometry}
              material={materials['Plastic_-_Translucent_Matte_Gray']}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_7.geometry}
              material={materials['Plastic_-_Translucent_Matte_Gray_1']}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_8.geometry}
              material={materials['Steel_-_Satin']}
            />
          </group>
        </group>
      )
    }
  

useGLTF.preload('/ps5.glb')
