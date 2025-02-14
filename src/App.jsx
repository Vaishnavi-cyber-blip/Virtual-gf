import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";

function App() {
  return (
    <Canvas camera={{ position: [0, -3, 11], fov: 75 }}>
      <color attach="background" args={["#f4c2c2"]} />
      <Experience />
    </Canvas>
  );
}

export default App;





