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

export function ArcadeModel(props: ModelProps) {
  // Load the GLTF SetupModel using useGLTF hook
  const { nodes, materials } = useGLTF('/final_fight_arcade.glb') as any;

  return (
        <group {...props} dispose={null}>
          <group rotation={[-Math.PI / 2, 0, 0]} scale={0.002}>
            <group rotation={[Math.PI / 2, 0, 0]}>
              <group position={[49, 392.765, 155]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Stick_1_Rubber_0.geometry}
                  material={materials.Rubber}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes['Stick_1_Silver_-_High_Reflection_0'].geometry}
                  material={materials['Silver_-_High_Reflection']}
                />
              </group>
              <group position={[-114, 392.765, 155]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Stick_Rubber_0.geometry}
                  material={materials.Rubber}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes['Stick_Silver_-_High_Reflection_0'].geometry}
                  material={materials['Silver_-_High_Reflection']}
                />
              </group>
              <group position={[0, 387.75, 140]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Board_Blue_Light_0.geometry}
                  material={materials.Blue_Light}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Board_Black_Plastic_0.geometry}
                  material={materials.Black_Plastic}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Board_Board_Sticker_0.geometry}
                  material={materials.Board_Sticker}
                />
              </group>
              <group position={[0, 692.985, 8.638]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Body_Top_Sticker_0.geometry}
                  material={materials.Top_Sticker}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Body_Black_Plastic1_0.geometry}
                  material={materials['Black_Plastic.1']}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Body_Screen_0.geometry}
                  material={materials.Screen}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Body_Screen_Sticker_0.geometry}
                  material={materials.Screen_Sticker}
                />
              </group>
              <group position={[-156, 377.911, -36]} rotation={[0, -Math.PI / 2, 0]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Side_Sticker_Side_Sticker_0.geometry}
                  material={materials.Side_Sticker}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Side_Sticker_Blue_Light_0.geometry}
                  material={materials.Blue_Light}
                />
              </group>
              <group position={[-150, 377.015, 25.583]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Side_Left_Side_Sticker_0.geometry}
                  material={materials.Side_Sticker_0}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Side_Left_Yellow_Light_0.geometry}
                  material={materials.Yellow_Light}
                />
              </group>
              <group position={[156, 377.911, -36]} rotation={[0, Math.PI / 2, 0]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Side_Sticker_Right_Side_Sticker_0.geometry}
                  material={materials.Side_Sticker}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Side_Sticker_Right_Blue_Light_0.geometry}
                  material={materials.Blue_Light}
                />
              </group>
              <group position={[150, 377.015, 25.583]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Side_Right_Side_Sticker1_0.geometry}
                  material={materials['Side_Sticker.1']}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Side_Right_Yellow_Light_0.geometry}
                  material={materials.Yellow_Light}
                />
              </group>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Coin_1_Red_Btn_0.geometry}
                material={materials.Red_Btn}
                position={[16, 239.015, 158]}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Coin_Red_Btn_0.geometry}
                material={materials.Red_Btn}
                position={[-16, 239.015, 158]}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Attack_2_Red_Btn_0.geometry}
                material={materials.Red_Btn}
                position={[89, 392.765, 155]}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Jump_2_Blue_Btn_0.geometry}
                material={materials.Blue_Btn}
                position={[115, 392.765, 155]}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Start_White_Btn_0.geometry}
                material={materials.White_Btn}
                position={[-14, 392.765, 86]}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Select_White_Btn_0.geometry}
                material={materials.White_Btn}
                position={[14, 392.765, 86]}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Jump_Blue_Btn_0.geometry}
                material={materials.Blue_Btn}
                position={[-48, 392.765, 155]}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Attack_Red_Btn_0.geometry}
                material={materials.Red_Btn}
                position={[-74, 392.765, 155]}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Panel_Rubber2_0.geometry}
                material={materials['Rubber.2']}
                position={[0, 211.015, 154]}
              />
            </group>
          </group>
        </group>
  );
}

// Preload the GLTF SetupModel for better performance
useGLTF.preload('/final_fight_arcade.glb');
