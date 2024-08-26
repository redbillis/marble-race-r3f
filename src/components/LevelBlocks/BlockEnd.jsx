import { Float, Text, useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import * as THREE from "three";
import Portal from "./SModels/Portal";

const boxGeometry = new THREE.BoxGeometry(1, 0, 1);

const floor1Material = new THREE.MeshStandardMaterial({
  color: "#b2b652",
});

export function BlockEnd({ position = [0, 0, 0] }) {
  const hamburger = useGLTF("./hamburger.glb");
  hamburger.scene.children.forEach((mesh) => {
    mesh.castShadow = true;
  });

  return (
    <group position={position}>
      <Float floatIntensity={0.25} rotationIntensity={0.25}>
        <Text
          font="./bebas-neue-v9-latin-regular.woff"
          scale={1}
          position={[0, 2.25, 2]}
        >
          FINISH
          <meshBasicMaterial toneMapped={false} />
        </Text>
      </Float>
      <mesh
        geometry={boxGeometry}
        material={floor1Material}
        position={[0, 0, 0]}
        scale={[4, 0.2, 4]}
        receiveShadow
      />
      <RigidBody
        type="fixed"
        colliders="trimesh"
        position={[0, 0, 0]}
        restitution={0.2}
        friction={0}
      >
        <Portal />
      </RigidBody>
    </group>
  );
}
