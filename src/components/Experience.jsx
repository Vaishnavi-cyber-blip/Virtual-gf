import { Environment, OrbitControls, useTexture } from "@react-three/drei";
// import { useThree } from "@react-three/fiber";
import { Avatar } from "./Avatar";

export const Experience = () => {
  // const texture = useTexture("textures/bg.png");
  // const viewport = useThree((state) => state.viewport);

  return (
    <>
      <OrbitControls />
      <Avatar position={[0, -3, 0]} scale={3} />
      <Environment preset="sunset" />
      {/* <mesh>
        <planeGeometry args={[viewport.width, viewport.height]} />
        <meshBasicMaterial map={texture} />
      </mesh> */}
    </>
  );
};


