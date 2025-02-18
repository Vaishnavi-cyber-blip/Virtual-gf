// import { Environment, OrbitControls, useTexture , GizmoHelper, GizmoViewport} from "@react-three/drei";
// import { useThree, useFrame } from "@react-three/fiber";
// import { Avatar } from "./Avatar";

// export const Experience = () => {
  // const texture = useTexture("textures/bg.png");
  // const viewport = useThree((state) => state.viewport);

//   useFrame(({ camera }) => {
//     console.log(camera);
//   });

//   return (
//     <>
//       <OrbitControls />
//       <GizmoHelper alignment="bottom-right" margin={[80,80]}>  
//         <GizmoViewport axisColors={['red', 'green', 'blue', 'yellow', 'purple', 'cyan']} labelColor="white"/>  
//       </GizmoHelper>
      
//       <Avatar position={[0, 0, 0]} scale={3} />
//       <Environment preset="sunset" />
//       {/* <mesh>
//         <planeGeometry args={[viewport.width, viewport.height]} />
//         <meshBasicMaterial map={texture} />
//       </mesh> */}
//     </>
//   );
// };



import { Environment, OrbitControls} from "@react-three/drei";
import { useThree, useFrame } from "@react-three/fiber";
import { Avatar } from "./Avatar";
import { useEffect } from "react";

export const Experience = () => {
  const { camera } = useThree();
  


  useEffect(() => {
    camera.position.set(-1, -20, 6); // Set the camera position
    camera.lookAt(1, -1, 0); // Make the camera face the model
  }, [camera]);

  // useFrame(() => {
  //   console.log(camera.position, camera.rotation); // Debugging camera movement
  // });

  return (
    <>
      <OrbitControls />
      {/* <GizmoHelper alignment="bottom-right" margin={[80, 80]}>  
        <GizmoViewport axisColors={['red', 'green', 'blue']} labelColor="white"/>  
      </GizmoHelper>       */}
      <Avatar position={[0, -10, 0]} scale={3} />

      <Environment preset="sunset" />
      
    </>
  );
};



