import {
  shaderMaterial,
  Sparkles,
  Center,
  useTexture,
  useGLTF,
} from "@react-three/drei";
import * as THREE from "three";
import { useFrame, extend } from "@react-three/fiber";
import { useRef } from "react";
import portalVertexShader from "../../../shaders/portal/vertex.glsl";
import portalFragmentShader from "../../../shaders/portal/fragment.glsl";

const PortalMaterial = shaderMaterial(
  {
    uTime: 0,
    uColorStart: new THREE.Color("#ffffff"),
    uColorEnd: new THREE.Color("#000000"),
  },
  portalVertexShader,
  portalFragmentShader
);

extend({ PortalMaterial });

export default function Portal() {
  const { nodes } = useGLTF("./model/my-portal.glb");

  const bakedTexture = useTexture("./model/my-baked.jpg");
  bakedTexture.flipY = false;

  const portalMaterial = useRef();

  useFrame((state, delta) => {
    portalMaterial.current.uTime += delta;
  });

  return (
    <>
      <Center position={[0, 1, 0]}>
        <mesh geometry={nodes.baked.geometry}>
          <meshBasicMaterial map={bakedTexture} />
        </mesh>

        <mesh
          geometry={nodes.poleLightA.geometry}
          position={nodes.poleLightA.position}
        >
          <meshBasicMaterial color="#ffffe5" />
        </mesh>

        <mesh
          geometry={nodes.poleLightB.geometry}
          position={nodes.poleLightB.position}
        >
          <meshBasicMaterial color="#ffffe5" />
        </mesh>

        <mesh
          geometry={nodes.portalLight.geometry}
          position={nodes.portalLight.position}
          rotation={nodes.portalLight.rotation}
        >
          <portalMaterial ref={portalMaterial} />
        </mesh>

        <Sparkles
          size={6}
          scale={[4, 2, 4]}
          position-y={1}
          speed={0.2}
          count={40}
        />
      </Center>
    </>
  );
}
