import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";

function App() {
  return (
    <Canvas camera={{ position: [1, 1,3], fov: 30 }}>
      <color attach="background" args={["#f4c2c2"]} />
      <Experience />
    </Canvas>
  );
}

export default App;





