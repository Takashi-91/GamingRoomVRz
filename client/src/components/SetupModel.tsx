import React, { useEffect, useMemo } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

interface ModelProps {
  nodes: {
    [key: string]: THREE.Mesh;
  };
  materials: {
    [key: string]: THREE.MeshStandardMaterial;
  };
}

export function SetupModel(props: ModelProps) {
  const { nodes, materials } = useGLTF('/gaming_setup.glb') as any;

  // Texture loader
  const textureLoader = useMemo(() => new THREE.TextureLoader(), []);

  // Load textures
  const woodTexture = useMemo(() => textureLoader.load('/textures/wood.jpg'), []);
  const screenTexture = useMemo(() => textureLoader.load('/textures/screen.jpg'), []);
  const metalTexture = useMemo(() => textureLoader.load('/textures/metal.jpg'), []);

  // Texture settings
  useEffect(() => {
    woodTexture.wrapS = woodTexture.wrapT = THREE.RepeatWrapping;
    woodTexture.repeat.set(2, 2);
    screenTexture.wrapS = screenTexture.wrapT = THREE.ClampToEdgeWrapping;
    metalTexture.wrapS = metalTexture.wrapT = THREE.RepeatWrapping;
  }, [woodTexture, screenTexture, metalTexture]);

  // Create textured materials
  const texturedDeskMaterial = useMemo(() => new THREE.MeshStandardMaterial({ map: woodTexture }), [woodTexture]);
  const texturedScreenMaterial = useMemo(() => new THREE.MeshStandardMaterial({ map: screenTexture, emissive: new THREE.Color(0xffffff), emissiveIntensity: 0.6 }), [screenTexture]);
  const texturedMetalMaterial = useMemo(() => new THREE.MeshStandardMaterial({ map: metalTexture, metalness: 0.8, roughness: 0.2 }), [metalTexture]);

  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]} scale={[0.093, 0.096, 0.099]}>
        <group position={[-0.114, -4.116, 2.597]} rotation={[0, 0, -3.141]} scale={0.245}>
          <lineSegments geometry={nodes.Object_5.geometry} material={materials.material_0} />
          <mesh geometry={nodes['Green-material'].geometry} material={materials.Green} castShadow receiveShadow />
          <mesh geometry={nodes['Black-material'].geometry} material={materials.Black} castShadow receiveShadow />
        </group>

        <group position={[-12.114, 3.491, 5.31]} rotation={[0, 0, 0.548]} scale={0.137}>
          <mesh geometry={nodes['Gray-material'].geometry} material={materials.Gray} castShadow receiveShadow />
          <mesh geometry={nodes['Mouse1-material'].geometry} material={materials.Mouse1} castShadow receiveShadow />
        </group>

        <group position={[-0.165, 5.6, 5.26]} scale={0.124}>
          <mesh geometry={nodes['Gray-material_1'].geometry} material={materials.Gray} castShadow receiveShadow />
          <mesh geometry={nodes['Red-material'].geometry} material={materials.material} castShadow receiveShadow />
          <mesh geometry={nodes['Mouse1-material_1'].geometry} material={materials.Mouse1} castShadow receiveShadow />
          <mesh geometry={nodes['Blue-material'].geometry} material={materials.Lamp} castShadow receiveShadow />
          <mesh geometry={nodes['Yellow-material'].geometry} material={materials.Yellow} castShadow receiveShadow />
        </group>

        <group position={[7.849, 4.599, 8.46]} rotation={[0, 0, 2.462]} scale={2.751}>
          <mesh geometry={nodes['Mouse1-material_3'].geometry} material={materials.Mouse1} castShadow receiveShadow />
          <mesh geometry={nodes['Gray-material_2'].geometry} material={materials.Gray} castShadow receiveShadow />
        </group>

        <group position={[2.821, 5.095, 8.664]} rotation={[1.99, 0.041, -1.589]} scale={0.206}>
          <mesh geometry={nodes['Mouse1-material_4'].geometry} material={materials.Mouse1} castShadow receiveShadow />
          <mesh geometry={nodes['Green-material_1'].geometry} material={materials.Green} castShadow receiveShadow />
        </group>

        <group position={[3.949, 1.458, 4.927]} rotation={[0, 0, -1.242]} scale={0.182}>
          <mesh geometry={nodes['Mouse1-material_5'].geometry} material={materials.Mouse1} castShadow receiveShadow />
          <mesh geometry={nodes['Mouse2-material'].geometry} material={materials.Mouse2} castShadow receiveShadow />
        </group>

        <group position={[-10.188, 11.271, -0.189]} scale={2.081}>
          <mesh geometry={nodes['Mouse1-material_6'].geometry} material={materials.Mouse1} castShadow receiveShadow />
          <mesh geometry={nodes['Red-material_1'].geometry} material={materials.material} castShadow receiveShadow />
          <mesh geometry={nodes['Green-material_2'].geometry} material={materials.Green} castShadow receiveShadow />
          <mesh geometry={nodes['L_Blue-material_1'].geometry} material={materials.L_Blue} castShadow receiveShadow />
        </group>

        {/* Desk with wood texture */}
        <mesh
          geometry={nodes['Desk_Wood1-material'].geometry}
          material={texturedDeskMaterial}
          position={[-0.217, -0.504, -0.512]}
          castShadow
          receiveShadow
        />

        {/* Screens with screen texture */}
        <mesh
          geometry={nodes['Right_Scn-material'].geometry}
          material={texturedScreenMaterial}
          position={[-12.114, 3.491, 5.31]}
          rotation={[0, 0, 0.548]}
          scale={0.137}
          castShadow
          receiveShadow
        />
        <mesh
          geometry={nodes['Left_Scn-material'].geometry}
          material={texturedScreenMaterial}
          position={[7.849, 4.599, 8.46]}
          rotation={[0, 0, 2.462]}
          scale={2.751}
          castShadow
          receiveShadow
        />
        <mesh
          geometry={nodes['Middle_Scn-material'].geometry}
          material={texturedScreenMaterial}
          position={[-0.165, 5.6, 5.26]}
          scale={0.124}
          castShadow
          receiveShadow
        />

        {/* Metal texture for lamp base */}
        <mesh
          geometry={nodes['Gray-material_3'].geometry}
          material={texturedMetalMaterial}
          position={[-0.131, 2.438, 4.946]}
          rotation={[0, 0, -3.141]}
          scale={0.717}
          castShadow
          receiveShadow
        />

        <mesh
          geometry={nodes['Mouse1-material_2'].geometry}
          material={materials.Mouse1}
          position={[-0.717, 2.062, 5.641]}
          scale={0.188}
          castShadow
          receiveShadow
        />

        <mesh
          geometry={nodes['L_Blue-material'].geometry}
          material={materials.L_Blue}
          position={[-0.131, 2.438, 4.946]}
          rotation={[0, 0, -3.141]}
          scale={0.717}
          castShadow
          receiveShadow
        />
      </group>
    </group>
  );
}

useGLTF.preload('/gaming_setup.glb');
